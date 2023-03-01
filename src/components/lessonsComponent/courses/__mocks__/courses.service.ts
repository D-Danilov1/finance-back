import { coursesStub } from '../test/stubs/courses.stub'

export const CoursesService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(coursesStub()),
  findAll: jest.fn().mockResolvedValue([coursesStub()]),
  findByPk: jest.fn().mockResolvedValue(coursesStub()),
  findByName: jest.fn().mockResolvedValue(coursesStub()),
  update: jest.fn().mockResolvedValue({ affectedCount: 1 }),
  destroy: jest.fn().mockResolvedValue(1),
})
