/* eslint-disable no-console */
import http from 'http'
import { addDays } from 'date-fns'
import getLunchData from './getLunchData'
import { getWeekdayName } from './utils'

const port = process.env.PORT || 8080

http.createServer((req, res) => {
  const daysFromNow = Number(req.url.replace('/', ''))
  const date = addDays(new Date(), daysFromNow)

  if (Number.isNaN(daysFromNow)) {
    res.end()
    return
  }

  getLunchData(date)
    .then(menu => {
      const dateLabel = daysFromNow ? `på ${getWeekdayName(date).toLowerCase()}` : 'idag'
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.write(`<strong>Dagens menu ${dateLabel} er</strong>`)
      res.write('<ul>')
      res.write(menu.map(item => `<li>${item}</li>`).join(''))
      res.write('</ul>')
      res.end()
    })
    .catch(error => {
      console.log(error)
      res.end(error.message)
    })
}).listen(port, error => {
  if (error) {
    console.log(error)
  } else {
    console.log('Server listening on port', port)
  }
})
