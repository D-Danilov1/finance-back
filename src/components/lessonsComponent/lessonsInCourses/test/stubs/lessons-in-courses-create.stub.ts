import { CreateLessonsInCoursesDto } from '../../dto/create-lessons-in-courses.dto'

export const lessonsInCoursesCreateStub = (): CreateLessonsInCoursesDto => {
  return <CreateLessonsInCoursesDto>{
    lesson_id: 1,
    course_id: 1,
  }
}
