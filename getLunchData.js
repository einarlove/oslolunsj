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
    `${getWeekdayName(date)}[\\s\\S]*?${getDate(date)} ${getMonthName(date)}`,
    `${getWeekdayName(nextDate)}[\\s\\S]*?${getDate(nextDate)} ${getMonthName(nextDate)}`,
  ].join('|'), 'i')

  const listedMenu = rawMenu
    .split(regex)[1]
    .split('\n')
    .filter(line => line)

  if (listedMenu.length > 10) {
    throw new Error('Menu to long. Probably could not match with regex')
  }

  return listedMenu
})
