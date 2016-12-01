/* eslint-disable no-console */

import slack from 'slack'
import { addDays } from 'date-fns'
import getLunchData from './getLunchData'

const today = addDays(new Date(), 0)

getLunchData(today).then(menu => {
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

