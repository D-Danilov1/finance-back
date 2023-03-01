import { UpdateLessonsInCoursesDto } from '../../dto/update-lessons-in-courses.dto'

export const lessonsInCoursesUpdateStub = (): UpdateLessonsInCoursesDto => {
  return <UpdateLessonsInCoursesDto>{
    lesson_id: 1,
    course_id: 1,
  }
}
