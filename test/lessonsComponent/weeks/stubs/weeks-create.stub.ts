import { CreateWeeksDto } from '../../../../src/components/lessonsComponent/weeks/dto/create-weeks.dto'

export const weeksCreateStub = (): CreateWeeksDto =>
  <CreateWeeksDto>{
    name: 'Test' + Date.now(),
  }
