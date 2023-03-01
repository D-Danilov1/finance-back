import { LessonsInCourses } from '../../../../src/components/lessonsComponent/lessonsInCourses/models/lessons-in-courses.model'

export const lessonsInCoursesStub = (): LessonsInCourses => {
  return <LessonsInCourses>{
    id: expect.any(Number),
    lesson_id: expect.any(Number),
    course_id: expect.any(Number),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  }
}
