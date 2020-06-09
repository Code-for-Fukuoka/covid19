type patientsArr = {
  リリース日: Date
  曜日: number
  居住地: string
  年代: string
  性別: string
  退院: string
  date: Date
}

type DataType = {
  date: Date
  data: Array<patientsArr>
}

type GraphDataType = {
  date: Date
  data: {
    福岡市: number[]
    北九州市: number[]
    '福岡県※': number[]
    'それ以外※': number[]
  }
  labels: string[]
}

export default (data: DataType) => {
  const graphData: GraphDataType = {
    date: data.date,
    data: {
      福岡市: [],
      北九州市: [],
      '福岡県※': [],
      'それ以外※': []
    },
    labels: []
  }

  const moment = require('moment')
  const dateFirst = data.data[0]['リリース日']
  const dateLast = data.data.slice(-1)[0]['リリース日']
  const diff = moment(dateLast).diff(dateFirst)
  const duration = moment.duration(diff)
  const days = Math.floor(duration.asDays())

  for (let i = 0; i <= days; i++) {
    const date = moment
      .utc(dateFirst)
      .add('days', i)
      .format()
    graphData.labels.push(moment(date).format('MM/DD'))
    const result = data.data.filter(data => data['リリース日'] === date)
    const countArr = [0, 0, 0, 0]
    if (result.length > 0) {
      result.forEach(d => {
        switch (true) {
          case d['居住地'].includes('福岡市'):
            countArr[0] += 1
            break
          case d['居住地'].includes('北九州市'):
            if (d['居住地'] === '北九州市外') {
              countArr[3] += 1
            } else {
              countArr[1] += 1
            }
            break
          default:
            if (d['居住地'] === '調査中' || d['居住地'] === '海外') {
              countArr[3] += 1
            } else if (
              d['居住地'].includes('県') &&
              !d['居住地'].includes('福岡')
            ) {
              countArr[3] += 1
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
                countArr[1] += 1
              } else {
                countArr[0] += 1
              }
            } else if (d['居住地'].includes('確認中')) {
              countArr[3] += 1
            } else {
              countArr[2] += 1
            }
        }
      })
    }
    graphData.data['福岡市'].push(countArr[0])
    graphData.data['北九州市'].push(countArr[1])
    graphData.data['福岡県※'].push(countArr[2])
    graphData.data['それ以外※'].push(countArr[3])
  }

  return graphData
}
