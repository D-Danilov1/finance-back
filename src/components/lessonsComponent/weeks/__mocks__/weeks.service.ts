import { WeeksStub } from '../test/stubs/weeks.stub'

export const WeeksService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(WeeksStub()),
  findAll: jest.fn().mockResolvedValue([WeeksStub()]),
  findByPk: jest.fn().mockResolvedValue(WeeksStub()),
  findByName: jest.fn().mockResolvedValue(WeeksStub()),
  update: jest.fn().mockResolvedValue({ affectedCount: 1 }),
  destroy: jest.fn().mockResolvedValue(1),
})
