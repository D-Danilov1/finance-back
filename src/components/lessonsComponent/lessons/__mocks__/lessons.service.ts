import { lessonsStub } from '../test/stubs/lessons.stub'

export const LessonsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(lessonsStub()),
  findAll: jest.fn().mockResolvedValue([lessonsStub()]),
  findByPk: jest.fn().mockResolvedValue(lessonsStub()),
  findByName: jest.fn().mockResolvedValue(lessonsStub()),
  update: jest.fn().mockResolvedValue({ affectedCount: 1 }),
  destroy: jest.fn().mockResolvedValue(1),
})
