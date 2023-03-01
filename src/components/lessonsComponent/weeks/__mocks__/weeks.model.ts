import { WeeksStub } from '../test/stubs/weeks.stub'

export const WeeksModel = {
  create: jest.fn().mockImplementation(() => {
    return WeeksStub()
  }),
  findAll: jest.fn().mockImplementation(() => {
    return [WeeksStub()]
  }),
  findOne: jest.fn().mockImplementation(() => {
    return WeeksStub()
  }),
  findByPk: jest.fn().mockImplementation(() => {
    return WeeksStub()
  }),
  update: jest.fn().mockImplementation(() => {
    return 1
  }),
  destroy: jest.fn().mockImplementation(() => {
    return 1
  }),
}
