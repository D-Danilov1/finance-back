import { Courses } from '../../../../src/components/lessonsComponent/courses/models/courses.model'

export const coursesStub = (): Courses => {
  return <Courses>{
    id: expect.any(Number),
    name: expect.any(String),
    image: expect.any(String),
    description: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    deleted_at: null,
    deleted_by: null,
  };
}
