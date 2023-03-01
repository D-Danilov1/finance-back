import { CreateLessonScheduleDto } from '../../dto/create-lesson-schedule.dto'

export const lessonScheduleCreateStub = (): CreateLessonScheduleDto => {
  return <CreateLessonScheduleDto>{
    lesson_id: 1,
    week_id: 1,
    day_id: 1,
    name: 'Legs'
  }
}
