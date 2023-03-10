import { CreateLessonsDto } from '../../../../src/components/lessonsComponent/lessons/dto/create-lessons.dto'

export const lessonsCreateStub = (): CreateLessonsDto =>
  <CreateLessonsDto>{
    name: 'Test' + Date.now(),
    image: 'test.jpg',
    link: 'uploads/test.mp4',
  };
