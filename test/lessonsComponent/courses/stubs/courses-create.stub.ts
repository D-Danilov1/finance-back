import { CreateCoursesDto } from '../../../../src/components/lessonsComponent/courses/dto/create-courses.dto'

export const coursesCreateStub = (): CreateCoursesDto =>
  <CreateCoursesDto>{
    name: 'Test' + Date.now(),
    image: 'test.jpg',
    description: 'Test',
  }
