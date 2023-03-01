import { Courses } from '../../models/courses.model'

export const coursesStub = (): Courses => {
  return <Courses>{
    id: 1,
    name: 'First lesson',
    image: 'uploads/test.jpg',
    description: 'random',
  }
}
