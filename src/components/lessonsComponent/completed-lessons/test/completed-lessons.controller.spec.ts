import { Test } from '@nestjs/testing'
import { completedLessonsStub } from './stubs/completed-lessons.stub'
import { JwtService } from '@nestjs/jwt'
import { CompletedLessonsController } from '../completed-lessons.controller'
import { CompletedLessonsService } from '../completed-lessons.service'
import { CompletedLessons } from '../models/completed-lessons.model'
import { completedLessonsCreateStub } from './stubs/completed-lessons-create.stub'
import { completedLessonsUpdateStub } from './stubs/completed-lessons-update.stub'

jest.mock('../completed-lessons.service')

describe('CompletedLessonsController', () => {
  let controller: CompletedLessonsController
  let service: CompletedLessonsService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CompletedLessonsController],
      providers: [
        CompletedLessonsService,
        {
          provide: JwtService,
          useValue: JwtService,
        },
      ],
    }).compile()

    controller = module.get<CompletedLessonsController>(CompletedLessonsController)
    service = module.get<CompletedLessonsService>(CompletedLessonsService)
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let completedLesson: CompletedLessons

      beforeEach(async () => {
        completedLesson = (await controller.create(completedLessonsCreateStub())).response
      })

      it('should call completedLessonsService', () => {
        expect(service.create).toBeCalledWith(completedLessonsCreateStub())
      })

      it('should return a completedLesson', () => {
        expect(completedLesson).toEqual(completedLessonsStub())
      })
    })
  })

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined()
    })

    describe('when findAll is called', () => {
      let completedLessons: CompletedLessons[]

      beforeEach(async () => {
        completedLessons = (await controller.findAll()).response
      })

      it('should call completedLessonsService', () => {
        expect(service.findAll).toBeCalledWith()
      })

      it('should return a completedLessons', () => {
        expect(completedLessons).toEqual([completedLessonsStub()])
      })
    })
  })

  describe('findByPk', () => {
    it('should be defined', () => {
      expect(service.findByPk).toBeDefined()
    })

    describe('when findByPk is called', () => {
      let completedLesson: CompletedLessons

      beforeEach(async () => {
        completedLesson = (await controller.findByPk(completedLessonsStub().id)).response
      })

      it('should call completedLessonsService', () => {
        expect(service.findByPk).toBeCalledWith(completedLessonsStub().id)
      })

      it('should return a completedLesson', () => {
        expect(completedLesson).toEqual(completedLessonsStub())
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
        result = (await controller.update(completedLessonsUpdateStub())).response
      })

      it('should call completedLessonsService', () => {
        expect(service.update).toBeCalledWith(completedLessonsUpdateStub())
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
        result = (await controller.destroy(completedLessonsStub().id)).response
      })

      it('should call completedLessonsService', () => {
        expect(service.destroy).toBeCalledWith(completedLessonsStub().id)
      })

      it('should return a affected count', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
