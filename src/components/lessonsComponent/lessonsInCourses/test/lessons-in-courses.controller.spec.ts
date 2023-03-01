import { Test } from '@nestjs/testing'
import { lessonsInCoursesStub } from './stubs/lessons-in-courses.stub'
import { JwtService } from '@nestjs/jwt'
import { LessonsInCoursesController } from '../lessons-in-courses.controller'
import { LessonsInCoursesService } from '../lessons-in-courses.service'
import { LessonsInCourses } from '../models/lessons-in-courses.model'
import { lessonsInCoursesCreateStub } from './stubs/lessons-in-courses-create.stub'
import { lessonsInCoursesUpdateStub } from './stubs/lessons-in-courses-update.stub'

jest.mock('../lessons-in-courses.service')

describe('LessonsInCoursesController', () => {
  let controller: LessonsInCoursesController
  let service: LessonsInCoursesService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [LessonsInCoursesController],
      providers: [
        LessonsInCoursesService,
        {
          provide: JwtService,
          useValue: JwtService,
        },
      ],
    }).compile()

    controller = module.get<LessonsInCoursesController>(LessonsInCoursesController)
    service = module.get<LessonsInCoursesService>(LessonsInCoursesService)
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let lessonInCourse: LessonsInCourses

      beforeEach(async () => {
        lessonInCourse = (await controller.create(lessonsInCoursesCreateStub())).response
      })

      it('should call lessonsInCoursesService', () => {
        expect(service.create).toBeCalledWith(lessonsInCoursesCreateStub())
      })

      it('should return a lessonInCourse', () => {
        expect(lessonInCourse).toEqual(lessonsInCoursesStub())
      })
    })
  })

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined()
    })

    describe('when findAll is called', () => {
      let lessonsInCourses: LessonsInCourses[]

      beforeEach(async () => {
        lessonsInCourses = (await controller.findAll()).response
      })

      it('should call lessonsInCoursesService', () => {
        expect(service.findAll).toBeCalledWith()
      })

      it('should return a lessonsInCourses', () => {
        expect(lessonsInCourses).toEqual([lessonsInCoursesStub()])
      })
    })
  })

  describe('findByPk', () => {
    it('should be defined', () => {
      expect(service.findByPk).toBeDefined()
    })

    describe('when findByPk is called', () => {
      let lessonInCourse: LessonsInCourses

      beforeEach(async () => {
        lessonInCourse = (await controller.findByPk(lessonsInCoursesStub().id)).response
      })

      it('should call lessonsInCoursesService', () => {
        expect(service.findByPk).toBeCalledWith(lessonsInCoursesStub().id)
      })

      it('should return a lessonInCourse', () => {
        expect(lessonInCourse).toEqual(lessonsInCoursesStub())
      })
    })
  })

  describe('update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined()
    })

    describe('when update is called', () => {
      let result

      beforeEach(async () => {
        result = (await controller.update(lessonsInCoursesUpdateStub())).response
      })

      it('should call lessonsInCoursesService', () => {
        expect(service.update).toBeCalledWith(lessonsInCoursesUpdateStub())
      })

      it('should return a affected count', () => {
        expect(result).toEqual({ affectedCount: 1 })
      })
    })
  })

  describe('destroy', () => {
    it('should be defined', () => {
      expect(service.destroy).toBeDefined()
    })

    describe('when destroy is called', () => {
      let result: number

      beforeEach(async () => {
        result = (await controller.destroy(lessonsInCoursesStub().id)).response
      })

      it('should call lessonsInCoursesService', () => {
        expect(service.destroy).toBeCalledWith(lessonsInCoursesStub().id)
      })

      it('should return a affected count', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
