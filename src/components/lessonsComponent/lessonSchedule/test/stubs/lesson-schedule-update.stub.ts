import { UpdateLessonScheduleDto } from '../../dto/update-lesson-schedule.dto'

export const lessonScheduleUpdateStub = (): UpdateLessonScheduleDto => {
  return <UpdateLessonScheduleDto>{
    lesson_id: 1,
    week_id: 1,
    day_id: 1,
    name: 'Legs',
  }
}
