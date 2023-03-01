import { DaysStub } from '../test/stubs/days.stub'

export const DaysModel = {
  create: jest.fn().mockImplementation(() => {
    return DaysStub()
  }),
  findAll: jest.fn().mockImplementation(() => {
    return [DaysStub()]
  }),
  findOne: jest.fn().mockImplementation(() => {
    return DaysStub()
  }),
  findByPk: jest.fn().mockImplementation(() => {
    return DaysStub()
  }),
  update: jest.fn().mockImplementation(() => {
    return 1
  }),
  destroy: jest.fn().mockImplementation(() => {
    return 1
  }),
}
