import { lessonsInCoursesStub } from '../test/stubs/lessons-in-courses.stub'

export const LessonsInCoursesModel = {
  create: jest.fn().mockImplementation(() => {
    return lessonsInCoursesStub()
  }),
  findAll: jest.fn().mockImplementation(() => {
    return [lessonsInCoursesStub()]
  }),
  findOne: jest.fn().mockImplementation(() => {
    return lessonsInCoursesStub()
  }),
  findByPk: jest.fn().mockImplementation(() => {
    return lessonsInCoursesStub()
  }),
  update: jest.fn().mockImplementation(() => {
    return 1
  }),
  destroy: jest.fn().mockImplementation(() => {
    return 1
  }),
}
