import { CreateCompletedLessonsDto } from '../../dto/create-completed-lessons.dto'

export const completedLessonsCreateStub = (): CreateCompletedLessonsDto => {
  return <CreateCompletedLessonsDto>{
    user_id: '4b6bea0b-62d4-40a9-a350-ae40632dc15f',
    lesson_schedule_id: 1,
  }
}
