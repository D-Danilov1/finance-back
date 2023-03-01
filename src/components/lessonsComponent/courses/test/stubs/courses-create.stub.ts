import { CreateCoursesDto } from '../../dto/create-courses.dto'

export const coursesCreateStub = (): CreateCoursesDto => {
  return <CreateCoursesDto>{
    name: 'First lesson',
    image: 'uploads/test.jpg',
    description: 'random',
  }
}
