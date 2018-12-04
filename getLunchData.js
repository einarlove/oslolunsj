import scrapeIt from 'scrape-it'
import { isWeekend, getDate, addDays, isFriday } from 'date-fns'
import { getWeekdayName, getMonthName } from './utils'

export default date => scrapeIt('http://www.oslolunsj.no/', {
  content: '.main-content',
}).then(page => {
  if (isWeekend(date)) {
    throw new Error('No menu in weekends')
  }

  const nextDate = addDays(date, isFriday(date) ? 3 : 1)
  const rawMenu = page.content.split(/– MENYER –|Bare meny/)[1]

  const regex = new RegExp([
    `^${getWeekdayName(date).substr(0, 3)}.*? ${getDate(date)} ${getMonthName(date).substr(0, 3)}.*?$`,
    `^${getWeekdayName(nextDate).substr(0, 3)}.*? ${getDate(nextDate)} ${getMonthName(nextDate).substr(0, 3)}.*?$`,
  ].join('|'), 'im')

  const listedMenu = rawMenu
    .split(regex)[1]
    .trim()
    .split('\n')
    .filter(line => line)

  if (listedMenu.length > 10) {
    throw new Error('Menu to long. Probably could not match with regex')
  }

  return listedMenu
})
