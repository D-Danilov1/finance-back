import { coursesStub } from '../test/stubs/courses.stub'

export const CoursesModel = {
  create: jest.fn().mockImplementation(() => {
    return coursesStub()
  }),
  findAll: jest.fn().mockImplementation(() => {
    return [coursesStub()]
  }),
  findOne: jest.fn().mockImplementation(() => {
    return coursesStub()
  }),
  findByPk: jest.fn().mockImplementation(() => {
    return coursesStub()
  }),
  update: jest.fn().mockImplementation(() => {
    return 1
  }),
  destroy: jest.fn().mockImplementation(() => {
    return 1
  }),
}
