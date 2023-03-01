import { LessonSchedule } from '../../../../src/components/lessonsComponent/lessonSchedule/models/lesson-schedule.model'

export const lessonScheduleStub = (): LessonSchedule => {
  return <LessonSchedule>{
    id: expect.any(Number),
    lesson_id: expect.any(Number),
    name: expect.any(String),
    week_id: expect.any(Number),
    day_id: expect.any(Number),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  }
}
