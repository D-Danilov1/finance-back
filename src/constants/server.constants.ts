import { ConfigService } from '@nestjs/config'

export const API_URL = new ConfigService().get('API_URL')

export const CLIENT_URL = new ConfigService().get('CLIENT_URL')

export const TELEGRAM_TOKEN = new ConfigService().get('TELEGRAM_TOKEN')
