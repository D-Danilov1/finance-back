import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { EntityService } from '../../../classes/core/entity.service'
import { Days } from '../days/models/days.model'
import { Lessons } from '../lessons/models/lessons.model'
import { LessonSchedule } from '../lessonSchedule/models/lesson-schedule.model'
import { LessonsInCourses } from './models/lessons-in-courses.model'

@Injectable()
export class LessonsInCoursesService extends EntityService<LessonsInCourses> {
  constructor(
    @InjectModel(LessonsInCourses)
    protected repository: typeof LessonsInCourses,
  ) {
    super(repository)
  }

  async findByCourseId(id: string) {
    const courses = await this.repository.findAll({
      where: { course_id: id },
    })

    return await Promise.all(
      courses.map(
        async (course) =>
          await LessonSchedule.findOne({
            where: {
              lesson_id: course.lesson_id,
            },
            include: [
              {
                model: Lessons,
              },
              {
                model: Days,
              },
            ],
          }),
      ),
    )
  }

  async getSortedCourse(id: string) {
    const courses = await this.repository.findAll({
      where: { course_id: id },
    })

    let lessons = await Promise.all(
      courses.map(async (course) => {
        const lesson = await LessonSchedule.findOne({
          where: {
            lesson_id: course.lesson_id,
          },
          include: [
            {
              model: Lessons,
            },
          ],
        })
        return lesson
      }),
    )

    lessons = lessons.filter((lesson) => lesson !== null)

    const groupedLessons = lessons.reduce((acc, lesson) => {
      if (!acc[lesson.week_id]) {
        acc[lesson.week_id] = {}
      }
      if (!acc[lesson.week_id][lesson.day_id]) {
        acc[lesson.week_id][lesson.day_id] = []
      }
      acc[lesson.week_id][lesson.day_id].push(lesson)
      return acc
    }, {})

    const sortedWeeks = Object.entries(groupedLessons).sort(
      ([weekIdA], [weekIdB]) => Number(weekIdA) - Number(weekIdB),
    )

    const sortedLessonsArray = sortedWeeks.map(([_, days]) =>
      Object.entries(days)
        .sort(([dayIdA], [dayIdB]) => Number(dayIdA) - Number(dayIdB))
        .map(([_, lessons]) => lessons),
    )

    return sortedLessonsArray
  }
}
