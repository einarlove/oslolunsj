import { getISODay, getMonth } from 'date-fns'

/* eslint-disable */
export const getWeekdayName = now => {
  switch (getISODay(now)) {
    case 1: return 'Mandag'
    case 2: return 'Tirsdag'
    case 3: return 'Onsdag'
    case 4: return 'Torsdag'
    case 5: return 'Fredag'
  }
}

export const getMonthName = now => {
  switch (getMonth(now)) {
    case 0: return 'Januar'
    case 1: return 'Februar'
    case 2: return 'Mars'
    case 3: return 'April'
    case 4: return 'Mai'
    case 5: return 'Juni'
    case 6: return 'Juli'
    case 7: return 'August'
    case 8: return 'September'
    case 9: return 'Oktober'
    case 10: return 'November'
    case 11: return 'Desember'
  }
}
