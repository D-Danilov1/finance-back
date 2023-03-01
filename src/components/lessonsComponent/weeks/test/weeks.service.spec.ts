import { Test } from '@nestjs/testing'
import { getModelToken } from '@nestjs/sequelize'
import { WeeksModel } from '../__mocks__/weeks.model'
import { WeeksStub } from './stubs/weeks.stub'
import { WeeksService } from '../weeks.service'
import { Weeks } from '../models/weeks.model'
import { WeeksCreateStub } from './stubs/weeks-create.stub'
import { WeeksUpdateStub } from './stubs/weeks-update.stub'

describe('WeeksService', () => {
  let service: WeeksService
  let model: typeof Weeks

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        WeeksService,
        {
          provide: getModelToken(Weeks),
          useValue: WeeksModel,
        },
      ],
    }).compile()

    service = module.get<WeeksService>(WeeksService)
    model = module.get<typeof Weeks>(getModelToken(Weeks))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let week: Weeks

      beforeEach(async () => {
        week = await service.create(WeeksCreateStub())
      })

      it('should call model create', () => {
        expect(model.create).toBeCalled()
      })

      it('should return a week', () => {
        expect(week).toBeDefined()
      })
    })
  })

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined()
    })

    describe('when findAll is called', () => {
      let Weeks: Weeks[]

      beforeEach(async () => {
        Weeks = await service.findAll()
      })

      it('should call model findAll', () => {
        expect(model.findAll).toBeCalled()
      })

      it('should return a Weeks', () => {
        expect(Weeks).toEqual([WeeksStub()])
      })
    })
  })

  describe('findByPk', () => {
    it('should be defined', () => {
      expect(service.findByPk).toBeDefined()
    })

    describe('when findByPk is called', () => {
      let week: Weeks

      beforeEach(async () => {
        week = await service.findByPk(WeeksStub().id)
      })

      it('should call model findByPk', () => {
        expect(model.findByPk).toBeCalled()
      })

      it('should return a week', () => {
        expect(week).toEqual(WeeksStub())
      })
    })
  })

  describe('findByName', () => {
    it('should be defined', () => {
      expect(service.findByName).toBeDefined()
    })

    describe('when findByName is called', () => {
      let week: Weeks

      beforeEach(async () => {
        week = await service.findByName(WeeksStub().name)
      })

      it('should call model findByName', () => {
        expect(model.findOne).toBeCalled()
      })

      it('should return a week', () => {
        expect(week).toEqual(WeeksStub())
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
        result = await service.update(WeeksUpdateStub())
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
        result = await service.destroy(WeeksStub().id)
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
