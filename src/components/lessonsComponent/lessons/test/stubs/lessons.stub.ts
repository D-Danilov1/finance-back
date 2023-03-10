import { Lessons } from '../../models/lessons.model';

export const lessonsStub = (): Lessons => {
  return <Lessons>{
    id: 1,
    name: 'First lesson',
    image: 'uploads/test.jpg',
    link: 'uploads/test.mp4',
  };
};
