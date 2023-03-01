import { LessonsInCourses } from '../../models/lessons-in-courses.model'

export const lessonsInCoursesStub = (): LessonsInCourses => {
  return <LessonsInCourses>{
    id: 1,
    lesson_id: 1,
    course_id: 1,
  }
}
