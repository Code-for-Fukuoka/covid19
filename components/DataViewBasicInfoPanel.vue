<template>
  <div class="DataView-DataInfo">
    <span v-show="aText" class="DataView-DataInfo-Kind">{{ aText }}</span>
    <span class="DataView-DataInfo-summary">
      <span
        v-if="kindtype && lText > 0"
        class="DataView-DataInfo-summary-transition"
      >
        +
      </span>
      <span :style="{ color: activeColor }">{{ lText }}</span>
      <small class="DataView-DataInfo-summary-unit">{{ unit }}</small>
    </span>
    <br />
    <span v-show="rText" class="DataView-DataInfo-Rate">{{ rText }}</span>
    <small class="DataView-DataInfo-date">{{ sText }}</small>
  </div>
</template>

<style lang="scss">
.DataView {
  &-DataInfo {
    @include largerThan($large) {
      text-align: right;
      width: 50%;
      &-summary {
        display: inline-block;
        font-family: Hiragino Sans, sans-serif;
        font-style: normal;
        font-size: 30px;
        &-unit {
          font-size: 0.6em;
        }
      }
      &-date {
        white-space: normal;
        display: inline-block;
        font-size: 12px;
        line-height: 12px;
        color: $gray-3;
      }
    }

    padding-bottom: 3px;
    &-Kind {
      display: block;
      margin-bottom: 10px;
      font-size: 12px;
      font-weight: bold;
      color: $gray-3;
    }
    &-rate {
      font-size: 15px;
    }
    &-summary {
      display: inline-block;
      font-family: Hiragino Sans, sans-serif;
      font-style: normal;
      font-size: 30px;
      &-transition {
        font-size: 0.5em;
      }
      &-unit {
        font-size: 0.6em;
      }
    }
    &-date {
      white-space: normal;
      display: inline-block;
      font-size: 12px;
      line-height: 10px;
      color: $gray-3;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DataViewBasicInfoPanel extends Vue {
  @Prop() private aText!: string
  @Prop() private lText!: string
  @Prop() private rText!: string
  @Prop() private sText!: string
  @Prop() private unit!: string
  @Prop() private numType!: string
  @Prop() private dataKind!: string

  get kindtype() {
    if (this.dataKind === 'transition' && this.numType === 'number') {
      return true
    }
    return false
  }

  get activeColor() {
    if (
      !this.dataKind ||
      this.dataKind === 'cumulative' ||
      this.numType === 'percent'
    ) {
      return '#4D4D4D'
    }
    if (Number(this.lText) === 0) {
      return '#5badd6'
    } else {
      return '#de5a5a'
    }
  }
}
</script>
