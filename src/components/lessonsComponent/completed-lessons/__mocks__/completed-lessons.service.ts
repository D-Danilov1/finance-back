import { completedLessonsStub } from '../test/stubs/completed-lessons.stub'

export const CompletedLessonsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(completedLessonsStub()),
  findAll: jest.fn().mockResolvedValue([completedLessonsStub()]),
  findByPk: jest.fn().mockResolvedValue(completedLessonsStub()),
  findByName: jest.fn().mockResolvedValue(completedLessonsStub()),
  update: jest.fn().mockResolvedValue({ affectedCount: 1 }),
  destroy: jest.fn().mockResolvedValue(1),
})
