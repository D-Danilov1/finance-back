import { Test } from '@nestjs/testing'
import { coursesStub } from './stubs/courses.stub'
import { JwtService } from '@nestjs/jwt'
import { CoursesController } from '../courses.controller'
import { CoursesService } from '../courses.service'
import { Courses } from '../models/courses.model'
import { coursesCreateStub } from './stubs/courses-create.stub'
import { coursesUpdateStub } from './stubs/courses-update.stub'

jest.mock('../courses.service')

describe('CoursesController', () => {
  let controller: CoursesController
  let service: CoursesService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        CoursesService,
        {
          provide: JwtService,
          useValue: JwtService,
        },
      ],
    }).compile()

    controller = module.get<CoursesController>(CoursesController)
    service = module.get<CoursesService>(CoursesService)
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let course: Courses

      beforeEach(async () => {
        course = (await controller.create(coursesCreateStub())).response
      })

      it('should call coursesService', () => {
        expect(service.create).toBeCalledWith(coursesCreateStub())
      })

      it('should return a course', () => {
        expect(course).toEqual(coursesStub())
      })
    })
  })

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined()
    })

    describe('when findAll is called', () => {
      let courses: Courses[]

      beforeEach(async () => {
        courses = (await controller.findAll()).response
      })

      it('should call coursesService', () => {
        expect(service.findAll).toBeCalledWith()
      })

      it('should return a courses', () => {
        expect(courses).toEqual([coursesStub()])
      })
    })
  })

  describe('findByPk', () => {
    it('should be defined', () => {
      expect(service.findByPk).toBeDefined()
    })

    describe('when findByPk is called', () => {
      let course: Courses

      beforeEach(async () => {
        course = (await controller.findByPk(coursesStub().id)).response
      })

      it('should call coursesService', () => {
        expect(service.findByPk).toBeCalledWith(coursesStub().id)
      })

      it('should return a course', () => {
        expect(course).toEqual(coursesStub())
      })
    })
  })

  describe('findByName', () => {
    it('should be defined', () => {
      expect(service.findByName).toBeDefined()
    })

    describe('when findByName is called', () => {
      let course: Courses

      beforeEach(async () => {
        course = (await controller.findByName(coursesStub().name)).response
      })

      it('should call coursesService', () => {
        expect(service.findByName).toBeCalledWith(coursesStub().name)
      })

      it('should return a course', () => {
        expect(course).toEqual(coursesStub())
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
        result = (await controller.update(coursesUpdateStub())).response
      })

      it('should call coursesService', () => {
        expect(service.update).toBeCalledWith(coursesUpdateStub())
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
        result = (await controller.destroy(coursesStub().id)).response
      })

      it('should call coursesService', () => {
        expect(service.destroy).toBeCalledWith(coursesStub().id)
      })

      it('should return a affected count', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
