import { CreateDaysDto } from '../../dto/create-days.dto'

export const DaysCreateStub = (): CreateDaysDto => {
  return <CreateDaysDto>{
    name: 'First day',
  }
}
