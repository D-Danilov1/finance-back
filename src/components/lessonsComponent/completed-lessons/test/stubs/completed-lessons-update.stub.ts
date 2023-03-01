import { UpdateCompletedLessonsDto } from '../../dto/update-completed-lessons.dto'

export const completedLessonsUpdateStub = (): UpdateCompletedLessonsDto => {
  return <UpdateCompletedLessonsDto>{
    user_id: '4b6bea0b-62d4-40a9-a350-ae40632dc15f',
    lesson_schedule_id: 1,
  }
}
