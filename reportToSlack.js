/* eslint-disable no-console */

import slack from 'slack'
import { addDays, isThursday, isTuesday } from 'date-fns'
import getLunchData from './getLunchData'

const today = addDays(new Date(), 0)

getLunchData(today).then(menu => {
  if (isTuesday(today) || isThursday(today)) {
    console.log('Nope, det er brødmat idag.')
    return
  }

  const joinedMenuString = menu.map(item => `• ${item}`).join('\n')

  slack.chat.postMessage({
    token: process.env.SLACK_TOKEN,
    username: 'Lunsj',
    icon_emoji: ':fork_and_knife:',
    channel: process.env.SLACK_CHANNEL,
    text: `På menyen idag blir det\n\n${joinedMenuString}\n\n Håper det smaker ✨`,
  }, (error, data) => {
    if (error) {
      throw error
    }

    console.log(data)
  })
})

