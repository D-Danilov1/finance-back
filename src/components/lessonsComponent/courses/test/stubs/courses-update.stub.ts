import { UpdateCoursesDto } from '../../dto/update-courses.dto'

export const coursesUpdateStub = (): UpdateCoursesDto => {
  return <UpdateCoursesDto>{
    name: 'First lesson',
    image: 'uploads/test.jpg',
    description: 'random',
  }
}
