import { CreateLessonsDto } from '../../dto/create-lessons.dto'

export const lessonsCreateStub = (): CreateLessonsDto => {
  return <CreateLessonsDto>{
    name: 'First lesson',
    image: 'uploads/test.jpg',
  }
}
