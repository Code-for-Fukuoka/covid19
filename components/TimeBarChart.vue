<template>
  <data-view :title="title" :title-id="titleId" :date="date" :url="url">
    <template v-slot:kindButton>
      <data-selector v-model="dataKind" />
    </template>
    <template v-slot:selectDate>
      <v-switch
        v-model="switch1"
        label="表示期間を指定する"
      />
      <div v-show="switch1">
        <date-select-slider
          :arr-type="arrKind"
          :chart-data="chartData"
          :value="[sliderMin, sliderMax]"
          :slider-min="sliderMin"
          :slider-max="sliderMax"
          @sliderInput="sliderUpdate"
        />
      </div>
    </template>
    <bar
      :chart-id="chartId"
      :chart-data="displayData"
      :options="displayOption"
      :height="240"
    />
    <template v-slot:infoPanel>
      <data-view-basic-info-panel
        :l-text="displayInfo.lText"
        :s-text="displayInfo.sText"
        :unit="displayInfo.unit"
      />
    </template>
    <template v-if="titleId == 'number-of-reports-to-covid19-consultation-desk'">
      <div class="tempinfo">※各区保健所に設置していた相談窓口（帰国者・接触者相談センター）については、「新型コロナウイルス感染症相談ダイヤル（受診・相談センター）」に集約しています。</div>
    </template>
  </data-view>
</template>

<style>
.tempinfo{
  margin-top: 1em;
  color: red;
}

</style>

<script>
import DataView from '@/components/DataView.vue'
import DataSelector from '@/components/DataSelector.vue'
import DataViewBasicInfoPanel from '@/components/DataViewBasicInfoPanel.vue'
import DateSelectSlider from '@/components/DateSelectSlider.vue'
import makeRecentData from '@/utils/makeRecentData'

export default {
  components: { DataView, DataSelector, DataViewBasicInfoPanel, DateSelectSlider },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    titleId: {
      type: String,
      required: false,
      default: ''
    },
    chartId: {
      type: String,
      required: false,
      default: 'time-bar-chart'
    },
    chartData: {
      type: Array,
      required: false,
      default: () => []
    },
    date: {
      type: String,
      required: true,
      default: ''
    },
    unit: {
      type: String,
      required: false,
      default: ''
    },
    url: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      dataKind: 'transition',
      arrKind: 'single',
      switch1: true,
      graphRange: [0, 1],
      displayWidth: 'normal'
    }
  },
  computed: {
    sliderMin() {
      if (!this.chartData || this.chartData.length === 0) {
        return 1
      }
      const graphData = {
        date: this.date,
        graphData: this.chartData
      }
      const twoMonthAgo = makeRecentData(graphData)
      return twoMonthAgo
    },
    sliderMax() {
      if (!this.chartData || this.chartData.length === 0) {
        return 1
      }
      this.sliderUpdate([this.sliderMin, this.chartData.length - 1])
      return this.chartData.length - 1
    },
    displayCumulativeRatio() {
      const lastDay = this.chartData[this.graphRange[1]].cumulative
      const lastDayBefore = this.chartData[this.graphRange[1] - 1].cumulative
      return this.formatDayBeforeRatio(lastDay - lastDayBefore)
    },
    displayTransitionRatio() {
      const lastDay = this.chartData[this.graphRange[1]].transition
      const lastDayBefore = this.chartData[this.graphRange[1] - 1].transition
      return this.formatDayBeforeRatio(lastDay - lastDayBefore)
    },
    displayInfo() {
      if (this.dataKind === 'transition') {
        return {
          lText: `${this.chartData[
            this.graphRange[1]
          ].transition.toLocaleString()}`,
          sText: `${this.chartData[this.graphRange[1]].label} 実績値（前日比：${
            this.displayTransitionRatio
          } ${this.unit}）`,
          unit: this.unit
        }
      }
      return {
        lText: this.chartData[[this.graphRange[1]]].cumulative.toLocaleString(),
        sText: `${this.chartData[0].label} - ${
          this.chartData[this.graphRange[1]].label
        } 累計値（前日比：${this.displayCumulativeRatio} ${this.unit}）`,
        unit: this.unit
      }
    },
    displayData() {
      const displayArr = []
      for (let i = this.graphRange[0]; i <= this.graphRange[1]; i++) {
        displayArr.push(this.chartData[i])
      }
      if (this.dataKind === 'transition') {
        return {
          labels: displayArr.map(d => {
            return d.label
          }),
          datasets: [
            {
              label: this.dataKind,
              data: displayArr.map(d => {
                return d.transition
              }),
              backgroundColor: '#4A7BBA',
              borderWidth: 0
            }
          ]
        }
      }
      return {
        labels: displayArr.map(d => {
          return d.label
        }),
        datasets: [
          {
            label: this.dataKind,
            data: displayArr.map(d => {
              return d.cumulative
            }),
            backgroundColor: '#4A7BBA',
            borderWidth: 0
          }
        ]
      }
    },
    displayOption() {
      const unit = this.unit
      return {
        tooltips: {
          displayColors: false,
          callbacks: {
            label(tooltipItem) {
              const labelText =
                parseInt(tooltipItem.value).toLocaleString() + unit
              return labelText
            },
            title(tooltipItem, data) {
              return data.labels[tooltipItem[0].index].replace(
                /(\w+)\/(\w+)/,
                '$1月$2日'
              )
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              id: 'day',
              stacked: true,
              gridLines: {
                display: false
              },
              ticks: {
                fontSize: 9,
                maxTicksLimit: 20,
                fontColor: '#808080',
                maxRotation: 90,
                minRotation: 0,
                callback: label => {
                  return label.split('/')[0] + '月' + label.split('/')[1] + '日'
                }
              }
            },
            /* {
              id: 'month',
              stacked: true,
              gridLines: {
                drawOnChartArea: false,
                drawTicks: true,
                drawBorder: false,
                tickMarkLength: 10
              },
              ticks: {
                fontSize: 11,
                fontColor: '#808080',
                padding: 3,
                fontStyle: 'bold',
                gridLines: {
                  display: true
                },
                callback: label => {
                  const monthStringArry = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                  ]
                  const month = monthStringArry.indexOf(label.split(' ')[0]) + 1
                  return month + '月'
                }
              },
              type: 'time',
              time: {
                unit: 'month'
              }
            } */
          ],
          yAxes: [
            {
              location: 'bottom',
              stacked: true,
              gridLines: {
                display: true,
                color: '#E5E5E5'
              },
              ticks: {
                suggestedMin: 0,
                maxTicksLimit: 8,
                fontColor: '#808080'
              }
            }
          ]
        }
      }
    }
  },
  methods: {
    sliderUpdate(sliderValue) {
      this.graphRange = sliderValue
    },
    formatDayBeforeRatio(dayBeforeRatio) {
      const dayBeforeRatioLocaleString = dayBeforeRatio.toLocaleString()
      switch (Math.sign(dayBeforeRatio)) {
        case 1:
          return `+${dayBeforeRatioLocaleString}`
        case -1:
          return `${dayBeforeRatioLocaleString}`
        default:
          return `${dayBeforeRatioLocaleString}`
      }
    }
  }
}
</script>
