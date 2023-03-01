import { Test } from '@nestjs/testing'
import { lessonScheduleStub } from './stubs/lesson-schedule.stub'
import { JwtService } from '@nestjs/jwt'
import { LessonScheduleController } from '../lesson-schedule.controller'
import { LessonScheduleService } from '../lesson-schedule.service'
import { LessonSchedule } from '../models/lesson-schedule.model'
import { lessonScheduleCreateStub } from './stubs/lesson-schedule-create.stub'
import { lessonScheduleUpdateStub } from './stubs/lesson-schedule-update.stub'

jest.mock('../lesson-schedule.service')

describe('LessonScheduleController', () => {
  let controller: LessonScheduleController
  let service: LessonScheduleService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [LessonScheduleController],
      providers: [
        LessonScheduleService,
        {
          provide: JwtService,
          useValue: JwtService,
        },
      ],
    }).compile()

    controller = module.get<LessonScheduleController>(LessonScheduleController)
    service = module.get<LessonScheduleService>(LessonScheduleService)
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let lessonInCourse: LessonSchedule

      beforeEach(async () => {
        lessonInCourse = (await controller.create(lessonScheduleCreateStub())).response
      })

      it('should call lessonScheduleService', () => {
        expect(service.create).toBeCalledWith(lessonScheduleCreateStub())
      })

      it('should return a lessonInCourse', () => {
        expect(lessonInCourse).toEqual(lessonScheduleStub())
      })
    })
  })

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined()
    })

    describe('when findAll is called', () => {
      let lessonSchedule: LessonSchedule[]

      beforeEach(async () => {
        lessonSchedule = (await controller.findAll()).response
      })

      it('should call lessonScheduleService', () => {
        expect(service.findAll).toBeCalledWith()
      })

      it('should return a lessonSchedule', () => {
        expect(lessonSchedule).toEqual([lessonScheduleStub()])
      })
    })
  })

  describe('findByPk', () => {
    it('should be defined', () => {
      expect(service.findByPk).toBeDefined()
    })

    describe('when findByPk is called', () => {
      let lessonInCourse: LessonSchedule

      beforeEach(async () => {
        lessonInCourse = (await controller.findByPk(lessonScheduleStub().id)).response
      })

      it('should call lessonScheduleService', () => {
        expect(service.findByPk).toBeCalledWith(lessonScheduleStub().id)
      })

      it('should return a lessonInCourse', () => {
        expect(lessonInCourse).toEqual(lessonScheduleStub())
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
        result = (await controller.update(lessonScheduleUpdateStub())).response
      })

      it('should call lessonScheduleService', () => {
        expect(service.update).toBeCalledWith(lessonScheduleUpdateStub())
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
        result = (await controller.destroy(lessonScheduleStub().id)).response
      })

      it('should call lessonScheduleService', () => {
        expect(service.destroy).toBeCalledWith(lessonScheduleStub().id)
      })

      it('should return a affected count', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
