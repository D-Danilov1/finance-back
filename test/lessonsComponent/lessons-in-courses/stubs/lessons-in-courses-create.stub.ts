import { CreateLessonsInCoursesDto } from '../../../../src/components/lessonsComponent/lessonsInCourses/dto/create-lessons-in-courses.dto'

export const lessonsInCoursesCreateStub = (): CreateLessonsInCoursesDto =>
  <CreateLessonsInCoursesDto>{
    lesson_id: 1,
    course_id: 1,
  }
