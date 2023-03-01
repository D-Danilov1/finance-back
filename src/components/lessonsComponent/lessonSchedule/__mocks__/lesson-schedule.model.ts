import { lessonScheduleStub } from '../test/stubs/lesson-schedule.stub'

export const LessonScheduleModel = {
  create: jest.fn().mockImplementation(() => {
    return lessonScheduleStub()
  }),
  findAll: jest.fn().mockImplementation(() => {
    return [lessonScheduleStub()]
  }),
  findOne: jest.fn().mockImplementation(() => {
    return lessonScheduleStub()
  }),
  findByPk: jest.fn().mockImplementation(() => {
    return lessonScheduleStub()
  }),
  update: jest.fn().mockImplementation(() => {
    return 1
  }),
  destroy: jest.fn().mockImplementation(() => {
    return 1
  }),
}
