import { UpdateDaysDto } from '../../dto/update-days.dto'

export const DaysUpdateStub = (): UpdateDaysDto => {
  return <UpdateDaysDto>{
    name: 'First day',
  }
}
