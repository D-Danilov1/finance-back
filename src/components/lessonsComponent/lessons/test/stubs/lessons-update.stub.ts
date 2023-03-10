import { UpdateLessonsDto } from '../../dto/update-lessons.dto'

export const lessonsUpdateStub = (): UpdateLessonsDto => {
  return <UpdateLessonsDto>{
    name: 'First lesson',
    image: 'uploads/test.jpg',
    link: 'uploads/test.mp4',
  };
}
