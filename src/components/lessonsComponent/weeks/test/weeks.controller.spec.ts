import { Test } from '@nestjs/testing'
import { WeeksStub } from './stubs/weeks.stub'
import { JwtService } from '@nestjs/jwt'
import { WeeksController } from '../weeks.controller'
import { WeeksService } from '../weeks.service'
import { Weeks } from '../models/weeks.model'
import { WeeksCreateStub } from './stubs/weeks-create.stub'
import { WeeksUpdateStub } from './stubs/weeks-update.stub'

jest.mock('../Weeks.service')

describe('WeeksController', () => {
  let controller: WeeksController
  let service: WeeksService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [WeeksController],
      providers: [
        WeeksService,
        {
          provide: JwtService,
          useValue: JwtService,
        },
      ],
    }).compile()

    controller = module.get<WeeksController>(WeeksController)
    service = module.get<WeeksService>(WeeksService)
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let week: Weeks

      beforeEach(async () => {
        week = (await controller.create(WeeksCreateStub())).response
      })

      it('should call WeeksService', () => {
        expect(service.create).toBeCalledWith(WeeksCreateStub())
      })

      it('should return a week', () => {
        expect(week).toEqual(WeeksStub())
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
        Weeks = (await controller.findAll()).response
      })

      it('should call WeeksService', () => {
        expect(service.findAll).toBeCalledWith()
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
        week = (await controller.findByPk(WeeksStub().id)).response
      })

      it('should call WeeksService', () => {
        expect(service.findByPk).toBeCalledWith(WeeksStub().id)
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
        week = (await controller.findByName(WeeksStub().name)).response
      })

      it('should call WeeksService', () => {
        expect(service.findByName).toBeCalledWith(WeeksStub().name)
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
      let result

      beforeEach(async () => {
        result = (await controller.update(WeeksUpdateStub())).response
      })

      it('should call WeeksService', () => {
        expect(service.update).toBeCalledWith(WeeksUpdateStub())
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
        result = (await controller.destroy(WeeksStub().id)).response
      })

      it('should call WeeksService', () => {
        expect(service.destroy).toBeCalledWith(WeeksStub().id)
      })

      it('should return a affected count', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
