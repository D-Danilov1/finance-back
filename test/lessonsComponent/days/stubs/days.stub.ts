import { Days } from '../../../../src/components/lessonsComponent/days/models/days.model'

export const daysStub = (): Days => {
  return <Days>{
    id: expect.any(Number),
    name: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  }
}
