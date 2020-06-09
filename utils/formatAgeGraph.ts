type DataType = {
  リリース日: Date
  曜日: number
  居住地: string
  年代: string
  性別: string
  退院: string
  date: Date
}

interface DataArrType {
  label: string
  count: number
  percent: number
  male: number
  female: number
}

type GraphDataType = {
  label: string
  update: string
  cumulative: number
  DataArr: Array<DataArrType>
}

export default (data: DataType[]) => {
  const graphData: GraphDataType[] = [
    {
      label: 'すべて',
      update: '',
      cumulative: 0,
      DataArr: [
        { label: '10歳未満', count: 0, percent: 0, male: 0, female: 0 },
        { label: '10代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '20代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '30代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '40代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '50代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '60代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '70代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '80代以上', count: 0, percent: 0, male: 0, female: 0 },
        { label: '調査中', count: 0, percent: 0, male: 0, female: 0 }
      ]
    },
    {
      label: '福岡市',
      update: '',
      cumulative: 0,
      DataArr: [
        { label: '10歳未満', count: 0, percent: 0, male: 0, female: 0 },
        { label: '10代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '20代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '30代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '40代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '50代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '60代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '70代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '80代以上', count: 0, percent: 0, male: 0, female: 0 },
        { label: '調査中', count: 0, percent: 0, male: 0, female: 0 }
      ]
    },
    {
      label: '北九州市',
      update: '',
      cumulative: 0,
      DataArr: [
        { label: '10歳未満', count: 0, percent: 0, male: 0, female: 0 },
        { label: '10代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '20代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '30代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '40代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '50代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '60代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '70代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '80代以上', count: 0, percent: 0, male: 0, female: 0 },
        { label: '調査中', count: 0, percent: 0, male: 0, female: 0 }
      ]
    },
    {
      label: '福岡県（その他）',
      update: '',
      cumulative: 0,
      DataArr: [
        { label: '10歳未満', count: 0, percent: 0, male: 0, female: 0 },
        { label: '10代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '20代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '30代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '40代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '50代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '60代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '70代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '80代以上', count: 0, percent: 0, male: 0, female: 0 },
        { label: '調査中', count: 0, percent: 0, male: 0, female: 0 }
      ]
    },
    {
      label: 'それ以外※',
      update: '',
      cumulative: 0,
      DataArr: [
        { label: '10歳未満', count: 0, percent: 0, male: 0, female: 0 },
        { label: '10代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '20代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '30代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '40代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '50代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '60代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '70代', count: 0, percent: 0, male: 0, female: 0 },
        { label: '80代以上', count: 0, percent: 0, male: 0, female: 0 },
        { label: '調査中', count: 0, percent: 0, male: 0, female: 0 }
      ]
    }
  ]

  const cumulDataArr: number[] = [0, 0, 0, 0, 0]

  data.forEach(d => {
    let ageData: string
    const update: Date = new Date(d['リリース日'])
    const updateTxt: string = update.getMonth() + 1 + '/' + update.getDate()
    switch (true) {
      case d['年代'].includes('未満'):
        ageData = '10歳未満'
        break
      case Number(d['年代'].replace(/代/g, '')) >= 80:
        ageData = '80代以上'
        break
      case d['年代'].includes('調査中'):
        ageData = '調査中'
        break
      default:
        ageData = d['年代']
        break
    }
    const ArrIndex = graphData[0].DataArr.findIndex(v => v.label === ageData)

    graphData[0].DataArr[ArrIndex].count += 1
    cumulDataArr[0] += 1
    graphData[0].cumulative += 1
    graphData[0].update = updateTxt

    let DataArrIndex: number
    switch (true) {
      case d['居住地'].includes('福岡市'):
        DataArrIndex = 1
        break
      case d['居住地'].includes('北九州市'):
        if (d['居住地'] === '北九州市外') {
          DataArrIndex = 4
        } else {
          DataArrIndex = 2
        }
        break
      default:
        if (d['居住地'] === '調査中' || d['居住地'] === '海外') {
          DataArrIndex = 4
        } else if (
          d['居住地'].includes('県') &&
          !d['居住地'].includes('福岡')
        ) {
          DataArrIndex = 4
        } else if (d['居住地'].includes('区')) {
          const areaArr = [
            '東区',
            '博多区',
            '中央区',
            '南区',
            '西区',
            '城南区',
            '早良区'
          ]
          const index = areaArr.indexOf(d['居住地'])
          if (index === -1) {
            DataArrIndex = 2
          } else {
            DataArrIndex = 1
          }
        } else if (d['居住地'].includes('確認中')) {
          DataArrIndex = 4
        } else {
          DataArrIndex = 3
        }
    }
    graphData[DataArrIndex].DataArr[ArrIndex].count += 1
    if (d['性別'] === '女性') {
      graphData[0].DataArr[ArrIndex].female += 1
      graphData[DataArrIndex].DataArr[ArrIndex].female += 1
    } else {
      graphData[0].DataArr[ArrIndex].male += 1
      graphData[DataArrIndex].DataArr[ArrIndex].male += 1
    }
    cumulDataArr[DataArrIndex] += 1
    graphData[DataArrIndex].cumulative += 1
    graphData[DataArrIndex].update = updateTxt
  })

  graphData.forEach((d, index) => {
	let emptyArr: number[] = []
    d.DataArr.forEach( (e,indexSecond) => {
	  if(!e.count) {
	    emptyArr.push(indexSecond)
	  }
      const sum = (e.count / graphData[index].cumulative) * 100
      e.percent = Math.ceil(sum)
    })
	let count = 0
    emptyArr.forEach( f => {
	 graphData[index].DataArr.splice(f - count, 1)
	 count += 1
    })	
  })
	
  return graphData
}
