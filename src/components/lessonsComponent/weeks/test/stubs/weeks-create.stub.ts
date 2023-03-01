import { CreateWeeksDto } from '../../dto/create-weeks.dto'

export const WeeksCreateStub = (): CreateWeeksDto => {
  return <CreateWeeksDto>{
    name: 'First week',
  }
}
