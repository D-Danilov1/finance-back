import { UpdateWeeksDto } from '../../dto/update-weeks.dto'

export const WeeksUpdateStub = (): UpdateWeeksDto => {
  return <UpdateWeeksDto>{
    name: 'First week',
  }
}
