import { Test } from '@nestjs/testing'
import { getModelToken } from '@nestjs/sequelize'
import { CoursesModel } from '../__mocks__/courses.model'
import { coursesStub } from './stubs/courses.stub'
import { CoursesService } from '../courses.service'
import { Courses } from '../models/courses.model'
import { coursesCreateStub } from './stubs/courses-create.stub'
import { coursesUpdateStub } from './stubs/courses-update.stub'

describe('CoursesService', () => {
  let service: CoursesService
  let model: typeof Courses

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getModelToken(Courses),
          useValue: CoursesModel,
        },
      ],
    }).compile()

    service = module.get<CoursesService>(CoursesService)
    model = module.get<typeof Courses>(getModelToken(Courses))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let course: Courses

      beforeEach(async () => {
        course = await service.create(coursesCreateStub())
      })

      it('should call model create', () => {
        expect(model.create).toBeCalled()
      })

      it('should return a course', () => {
        expect(course).toBeDefined()
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
        courses = await service.findAll()
      })

      it('should call model findAll', () => {
        expect(model.findAll).toBeCalled()
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
        course = await service.findByPk(coursesStub().id)
      })

      it('should call model findByPk', () => {
        expect(model.findByPk).toBeCalled()
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
        course = await service.findByName(coursesStub().name)
      })

      it('should call model findByName', () => {
        expect(model.findOne).toBeCalled()
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
      let result: number[]

      beforeEach(async () => {
        result = await service.update(coursesUpdateStub())
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
        result = await service.destroy(coursesStub().id)
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
