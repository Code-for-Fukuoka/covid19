type dataArr = {
  label: string
  transition: number
  cumulative: number
}

type DataType = {
  date: Date
  graphData: Array<dataArr>
}

export default (data: DataType) => {
  const moment = require('moment')
  const twoMonthAgo = moment(data.date)
    .subtract(2, 'months')
    .format('YYYY/MM/DD h:mm')
  const diff = moment(data.date).diff(moment(twoMonthAgo))
  const duration = moment.duration(diff)
  const days = Math.floor(duration.asDays())
  if (data.graphData.length > days) {
    return data.graphData.length - days
  } else {
    return 0
  }
}
