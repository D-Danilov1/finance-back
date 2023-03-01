import { lessonScheduleStub } from '../test/stubs/lesson-schedule.stub'

export const LessonScheduleService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(lessonScheduleStub()),
  findAll: jest.fn().mockResolvedValue([lessonScheduleStub()]),
  findByPk: jest.fn().mockResolvedValue(lessonScheduleStub()),
  findByName: jest.fn().mockResolvedValue(lessonScheduleStub()),
  update: jest.fn().mockResolvedValue({ affectedCount: 1 }),
  destroy: jest.fn().mockResolvedValue(1),
})
