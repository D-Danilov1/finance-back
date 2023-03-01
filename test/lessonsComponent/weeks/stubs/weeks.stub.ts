import { Weeks } from '../../../../src/components/lessonsComponent/weeks/models/weeks.model'

export const weeksStub = (): Weeks => {
  return <Weeks>{
    id: expect.any(Number),
    name: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  }
}
