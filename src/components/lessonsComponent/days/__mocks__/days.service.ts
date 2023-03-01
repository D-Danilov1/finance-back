import { DaysStub } from '../test/stubs/days.stub'

export const DaysService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(DaysStub()),
  findAll: jest.fn().mockResolvedValue([DaysStub()]),
  findByPk: jest.fn().mockResolvedValue(DaysStub()),
  findByName: jest.fn().mockResolvedValue(DaysStub()),
  update: jest.fn().mockResolvedValue({ affectedCount: 1 }),
  destroy: jest.fn().mockResolvedValue(1),
})
