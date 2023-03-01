import * as TelegramBot from 'node-telegram-bot-api'
import { CLIENT_URL, TELEGRAM_TOKEN } from '../../constants/server.constants'

export class TelegramApi {
  private readonly bot: TelegramBot
  private readonly clientUrl: string = CLIENT_URL

  constructor() {
    this.bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true })
  }

  getBot(): TelegramBot {
    return this.bot
  }

  async messageResponse(msg: TelegramBot.messages) {
    const chatId = msg.chat.id

    if (msg.text === '/start') {
      await this.bot.sendMessage(
        chatId,
        '*Давайте начнем*\n\nПожалуйста, нажмите на кнопку ниже, чтобы заказать разработку',
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [[{ text: 'Сделать заказ', web_app: { url: this.clientUrl } }]],
          },
        },
      )
    }
  }
}
