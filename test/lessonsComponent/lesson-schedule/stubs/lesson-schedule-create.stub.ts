import { CreateLessonScheduleDto } from '../../../../src/components/lessonsComponent/lessonSchedule/dto/create-lesson-schedule.dto';

export const lessonScheduleCreateStub = (): CreateLessonScheduleDto =>
  <CreateLessonScheduleDto>{
    lesson_id: 1,
    week_id: 1,
    day_id: 1,
    name: 'Ноги',
  };
