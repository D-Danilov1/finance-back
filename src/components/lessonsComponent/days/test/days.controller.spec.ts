import { Test } from '@nestjs/testing'
import { DaysStub } from './stubs/days.stub'
import { JwtService } from '@nestjs/jwt'
import { DaysController } from '../days.controller'
import { DaysService } from '../days.service'
import { Days } from '../models/days.model'
import { DaysCreateStub } from './stubs/days-create.stub'
import { DaysUpdateStub } from './stubs/days-update.stub'

jest.mock('../Days.service')

describe('DaysController', () => {
  let controller: DaysController
  let service: DaysService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [DaysController],
      providers: [
        DaysService,
        {
          provide: JwtService,
          useValue: JwtService,
        },
      ],
    }).compile()

    controller = module.get<DaysController>(DaysController)
    service = module.get<DaysService>(DaysService)
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let day: Days

      beforeEach(async () => {
        day = (await controller.create(DaysCreateStub())).response
      })

      it('should call DaysService', () => {
        expect(service.create).toBeCalledWith(DaysCreateStub())
      })

      it('should return a day', () => {
        expect(day).toEqual(DaysStub())
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
        Days = (await controller.findAll()).response
      })

      it('should call DaysService', () => {
        expect(service.findAll).toBeCalledWith()
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
        day = (await controller.findByPk(DaysStub().id)).response
      })

      it('should call DaysService', () => {
        expect(service.findByPk).toBeCalledWith(DaysStub().id)
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
        day = (await controller.findByName(DaysStub().name)).response
      })

      it('should call DaysService', () => {
        expect(service.findByName).toBeCalledWith(DaysStub().name)
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
      let result

      beforeEach(async () => {
        result = (await controller.update(DaysUpdateStub())).response
      })

      it('should call DaysService', () => {
        expect(service.update).toBeCalledWith(DaysUpdateStub())
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
        result = (await controller.destroy(DaysStub().id)).response
      })

      it('should call DaysService', () => {
        expect(service.destroy).toBeCalledWith(DaysStub().id)
      })

      it('should return a affected count', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
