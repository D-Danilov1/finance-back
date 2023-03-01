import { lessonsStub } from '../test/stubs/lessons.stub'

export const LessonsModel = {
  create: jest.fn().mockImplementation(() => {
    return lessonsStub()
  }),
  findAll: jest.fn().mockImplementation(() => {
    return [lessonsStub()]
  }),
  findOne: jest.fn().mockImplementation(() => {
    return lessonsStub()
  }),
  findByPk: jest.fn().mockImplementation(() => {
    return lessonsStub()
  }),
  update: jest.fn().mockImplementation(() => {
    return 1
  }),
  destroy: jest.fn().mockImplementation(() => {
    return 1
  }),
}
