import { Days } from '../../models/days.model'

export const DaysStub = (): Days => {
  return <Days>{
    id: 1,
    name: 'First day',
  }
}
