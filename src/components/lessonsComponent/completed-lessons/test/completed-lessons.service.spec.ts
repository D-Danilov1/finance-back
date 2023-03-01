import { Test } from '@nestjs/testing'
import { getModelToken } from '@nestjs/sequelize'
import { CompletedLessonsModel } from '../__mocks__/completed-lessons.model'
import { completedLessonsStub } from './stubs/completed-lessons.stub'
import { CompletedLessonsService } from '../completed-lessons.service'
import { CompletedLessons } from '../models/completed-lessons.model'
import { completedLessonsCreateStub } from './stubs/completed-lessons-create.stub'
import { completedLessonsUpdateStub } from './stubs/completed-lessons-update.stub'

describe('CompletedLessonsService', () => {
  let service: CompletedLessonsService
  let model: typeof CompletedLessons

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CompletedLessonsService,
        {
          provide: getModelToken(CompletedLessons),
          useValue: CompletedLessonsModel,
        },
      ],
    }).compile()

    service = module.get<CompletedLessonsService>(CompletedLessonsService)
    model = module.get<typeof CompletedLessons>(getModelToken(CompletedLessons))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let completedLesson: CompletedLessons

      beforeEach(async () => {
        completedLesson = await service.create(completedLessonsCreateStub())
      })

      it('should call model create', () => {
        expect(model.create).toBeCalled()
      })

      it('should return a completedLesson', () => {
        expect(completedLesson).toBeDefined()
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
        completedLessons = await service.findAll()
      })

      it('should call model findAll', () => {
        expect(model.findAll).toBeCalled()
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
        completedLesson = await service.findByPk(completedLessonsStub().id)
      })

      it('should call model findByPk', () => {
        expect(model.findByPk).toBeCalled()
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
      let result: number[]

      beforeEach(async () => {
        result = await service.update(completedLessonsUpdateStub())
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
        result = await service.destroy(completedLessonsStub().id)
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
