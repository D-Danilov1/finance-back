import { Test } from '@nestjs/testing'
import { getModelToken } from '@nestjs/sequelize'
import { LessonsModel } from '../__mocks__/lessons.model'
import { lessonsStub } from './stubs/lessons.stub'
import { LessonsService } from '../lessons.service'
import { Lessons } from '../models/lessons.model'
import { lessonsCreateStub } from './stubs/lessons-create.stub'
import { lessonsUpdateStub } from './stubs/lessons-update.stub'

describe('LessonsService', () => {
  let service: LessonsService
  let model: typeof Lessons

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LessonsService,
        {
          provide: getModelToken(Lessons),
          useValue: LessonsModel,
        },
      ],
    }).compile()

    service = module.get<LessonsService>(LessonsService)
    model = module.get<typeof Lessons>(getModelToken(Lessons))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let lesson: Lessons

      beforeEach(async () => {
        lesson = await service.create(lessonsCreateStub())
      })

      it('should call model create', () => {
        expect(model.create).toBeCalled()
      })

      it('should return a lesson', () => {
        expect(lesson).toBeDefined()
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
        lessons = await service.findAll()
      })

      it('should call model findAll', () => {
        expect(model.findAll).toBeCalled()
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
        lesson = await service.findByPk(lessonsStub().id)
      })

      it('should call model findByPk', () => {
        expect(model.findByPk).toBeCalled()
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
        lesson = await service.findByName(lessonsStub().name)
      })

      it('should call model findByName', () => {
        expect(model.findOne).toBeCalled()
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
      let result: number[]

      beforeEach(async () => {
        result = await service.update(lessonsUpdateStub())
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
        result = await service.destroy(lessonsStub().id)
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
