import { Test } from '@nestjs/testing'
import { getModelToken } from '@nestjs/sequelize'
import { LessonScheduleService } from '../lesson-schedule.service'
import { LessonSchedule } from '../models/lesson-schedule.model'
import { LessonScheduleModel } from '../__mocks__/lesson-schedule.model'
import { lessonScheduleStub } from './stubs/lesson-schedule.stub'
import { lessonScheduleUpdateStub } from './stubs/lesson-schedule-update.stub'
import { lessonScheduleCreateStub } from './stubs/lesson-schedule-create.stub'

describe('LessonScheduleService', () => {
  let service: LessonScheduleService
  let model: typeof LessonSchedule

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LessonScheduleService,
        {
          provide: getModelToken(LessonSchedule),
          useValue: LessonScheduleModel,
        },
      ],
    }).compile()

    service = module.get<LessonScheduleService>(LessonScheduleService)
    model = module.get<typeof LessonSchedule>(getModelToken(LessonSchedule))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let lessonInCourse: LessonSchedule

      beforeEach(async () => {
        lessonInCourse = await service.create(lessonScheduleCreateStub())
      })

      it('should call model create', () => {
        expect(model.create).toBeCalled()
      })

      it('should return a lessonInCourse', () => {
        expect(lessonInCourse).toBeDefined()
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
        lessonSchedule = await service.findAll()
      })

      it('should call model findAll', () => {
        expect(model.findAll).toBeCalled()
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
        lessonInCourse = await service.findByPk(lessonScheduleStub().id)
      })

      it('should call model findByPk', () => {
        expect(model.findByPk).toBeCalled()
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
      let result: number[]

      beforeEach(async () => {
        result = await service.update(lessonScheduleUpdateStub())
      })

      it('should call model update', () => {
        expect(model.update).toBeCalled()
      })

      it('should return a number of updated records', () => {
        expect(result).toEqual(1)
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
        result = await service.destroy(lessonScheduleStub().id)
      })

      it('should call model destroy', () => {
        expect(model.destroy).toBeCalled()
      })

      it('should return a number of deleted records', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
