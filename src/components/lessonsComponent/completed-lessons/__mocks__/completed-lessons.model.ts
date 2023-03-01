import { completedLessonsStub } from '../test/stubs/completed-lessons.stub'

export const CompletedLessonsModel = {
  create: jest.fn().mockImplementation(() => {
    return completedLessonsStub()
  }),
  findAll: jest.fn().mockImplementation(() => {
    return [completedLessonsStub()]
  }),
  findOne: jest.fn().mockImplementation(() => {
    return completedLessonsStub()
  }),
  findByPk: jest.fn().mockImplementation(() => {
    return completedLessonsStub()
  }),
  update: jest.fn().mockImplementation(() => {
    return 1
  }),
  destroy: jest.fn().mockImplementation(() => {
    return 1
  }),
}
