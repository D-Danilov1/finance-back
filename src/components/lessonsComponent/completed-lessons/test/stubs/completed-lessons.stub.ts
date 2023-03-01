import { CompletedLessons } from '../../models/completed-lessons.model'

export const completedLessonsStub = (): CompletedLessons => {
  return <CompletedLessons>{
    id: 1,
    user_id: '4b6bea0b-62d4-40a9-a350-ae40632dc15f',
    lesson_schedule_id: 1,
  }
}
