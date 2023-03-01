import { Test } from '@nestjs/testing'
import { lessonsStub } from './stubs/lessons.stub'
import { JwtService } from '@nestjs/jwt'
import { LessonsController } from '../lessons.controller'
import { LessonsService } from '../lessons.service'
import { Lessons } from '../models/lessons.model'
import { lessonsCreateStub } from './stubs/lessons-create.stub'
import { lessonsUpdateStub } from './stubs/lessons-update.stub'

jest.mock('../lessons.service')

describe('LessonsController', () => {
  let controller: LessonsController
  let service: LessonsService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [LessonsController],
      providers: [
        LessonsService,
        {
          provide: JwtService,
          useValue: JwtService,
        },
      ],
    }).compile()

    controller = module.get<LessonsController>(LessonsController)
    service = module.get<LessonsService>(LessonsService)
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let lesson: Lessons

      beforeEach(async () => {
        lesson = (await controller.create(lessonsCreateStub())).response
      })

      it('should call lessonsService', () => {
        expect(service.create).toBeCalledWith(lessonsCreateStub())
      })

      it('should return a lesson', () => {
        expect(lesson).toEqual(lessonsStub())
      })
    })
  })

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined()
    })

    describe('when findAll is called', () => {
      let lessons: Lessons[]

      beforeEach(async () => {
        lessons = (await controller.findAll()).response
      })

      it('should call lessonsService', () => {
        expect(service.findAll).toBeCalledWith()
      })

      it('should return a lessons', () => {
        expect(lessons).toEqual([lessonsStub()])
      })
    })
  })

  describe('findByPk', () => {
    it('should be defined', () => {
      expect(service.findByPk).toBeDefined()
    })

    describe('when findByPk is called', () => {
      let lesson: Lessons

      beforeEach(async () => {
        lesson = (await controller.findByPk(lessonsStub().id)).response
      })

      it('should call lessonsService', () => {
        expect(service.findByPk).toBeCalledWith(lessonsStub().id)
      })

      it('should return a lesson', () => {
        expect(lesson).toEqual(lessonsStub())
      })
    })
  })

  describe('findByName', () => {
    it('should be defined', () => {
      expect(service.findByName).toBeDefined()
    })

    describe('when findByName is called', () => {
      let lesson: Lessons

      beforeEach(async () => {
        lesson = (await controller.findByName(lessonsStub().name)).response
      })

      it('should call lessonsService', () => {
        expect(service.findByName).toBeCalledWith(lessonsStub().name)
      })

      it('should return a lesson', () => {
        expect(lesson).toEqual(lessonsStub())
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
        result = (await controller.update(lessonsUpdateStub())).response
      })

      it('should call lessonsService', () => {
        expect(service.update).toBeCalledWith(lessonsUpdateStub())
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
        result = (await controller.destroy(lessonsStub().id)).response
      })

      it('should call lessonsService', () => {
        expect(service.destroy).toBeCalledWith(lessonsStub().id)
      })

      it('should return a affected count', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
