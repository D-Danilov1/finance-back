import { CreateDaysDto } from '../../../../src/components/lessonsComponent/days/dto/create-days.dto'

export const daysCreateStub = (): CreateDaysDto =>
  <CreateDaysDto>{
    name: 'Test' + Date.now(),
  }
