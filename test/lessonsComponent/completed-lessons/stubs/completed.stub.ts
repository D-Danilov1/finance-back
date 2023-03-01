import { CompletedLessons } from '../../../../src/components/lessonsComponent/completed-lessons/models/completed-lessons.model'

export const completedLessonsStub = (): CompletedLessons => {
  return <CompletedLessons>{
    id: expect.any(Number),
    lesson_schedule_id: expect.any(Number),
    user_id: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  }
}
