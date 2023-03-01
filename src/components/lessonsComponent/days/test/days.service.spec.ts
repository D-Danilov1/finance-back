import { Test } from '@nestjs/testing'
import { getModelToken } from '@nestjs/sequelize'
import { DaysModel } from '../__mocks__/days.model'
import { DaysStub } from './stubs/days.stub'
import { DaysService } from '../days.service'
import { Days } from '../models/days.model'
import { DaysCreateStub } from './stubs/days-create.stub'
import { DaysUpdateStub } from './stubs/days-update.stub'

describe('DaysService', () => {
  let service: DaysService
  let model: typeof Days

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DaysService,
        {
          provide: getModelToken(Days),
          useValue: DaysModel,
        },
      ],
    }).compile()

    service = module.get<DaysService>(DaysService)
    model = module.get<typeof Days>(getModelToken(Days))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let day: Days

      beforeEach(async () => {
        day = await service.create(DaysCreateStub())
      })

      it('should call model create', () => {
        expect(model.create).toBeCalled()
      })

      it('should return a day', () => {
        expect(day).toBeDefined()
      })
    })
  })

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined()
    })

    describe('when findAll is called', () => {
      let Days: Days[]

      beforeEach(async () => {
        Days = await service.findAll()
      })

      it('should call model findAll', () => {
        expect(model.findAll).toBeCalled()
      })

      it('should return a Days', () => {
        expect(Days).toEqual([DaysStub()])
      })
    })
  })

  describe('findByPk', () => {
    it('should be defined', () => {
      expect(service.findByPk).toBeDefined()
    })

    describe('when findByPk is called', () => {
      let day: Days

      beforeEach(async () => {
        day = await service.findByPk(DaysStub().id)
      })

      it('should call model findByPk', () => {
        expect(model.findByPk).toBeCalled()
      })

      it('should return a day', () => {
        expect(day).toEqual(DaysStub())
      })
    })
  })

  describe('findByName', () => {
    it('should be defined', () => {
      expect(service.findByName).toBeDefined()
    })

    describe('when findByName is called', () => {
      let day: Days

      beforeEach(async () => {
        day = await service.findByName(DaysStub().name)
      })

      it('should call model findByName', () => {
        expect(model.findOne).toBeCalled()
      })

      it('should return a day', () => {
        expect(day).toEqual(DaysStub())
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
        result = await service.update(DaysUpdateStub())
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
        result = await service.destroy(DaysStub().id)
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
