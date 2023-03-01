import { LessonSchedule } from '../../models/lesson-schedule.model'

export const lessonScheduleStub = (): LessonSchedule => {
  return <LessonSchedule>{
    id: 1,
    lesson_id: 1,
    week_id: 1,
    day_id: 1,
    name: 'Legs',
  }
}
