import { lessonsInCoursesStub } from '../test/stubs/lessons-in-courses.stub'

export const LessonsInCoursesService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(lessonsInCoursesStub()),
  findAll: jest.fn().mockResolvedValue([lessonsInCoursesStub()]),
  findByPk: jest.fn().mockResolvedValue(lessonsInCoursesStub()),
  findByName: jest.fn().mockResolvedValue(lessonsInCoursesStub()),
  update: jest.fn().mockResolvedValue({ affectedCount: 1 }),
  destroy: jest.fn().mockResolvedValue(1),
})
