import moment from 'moment'

const formatDate = (dateString, format) => {
  return moment(dateString).format(format)
}

export { formatDate }
