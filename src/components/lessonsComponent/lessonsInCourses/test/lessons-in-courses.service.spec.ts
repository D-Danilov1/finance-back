import { Test } from '@nestjs/testing'
import { getModelToken } from '@nestjs/sequelize'
import { LessonsInCoursesService } from '../lessons-in-courses.service'
import { LessonsInCourses } from '../models/lessons-in-courses.model'
import { LessonsInCoursesModel } from '../__mocks__/lessons-in-courses.model'
import { lessonsInCoursesStub } from './stubs/lessons-in-courses.stub'
import { lessonsInCoursesUpdateStub } from './stubs/lessons-in-courses-update.stub'
import { lessonsInCoursesCreateStub } from './stubs/lessons-in-courses-create.stub'

describe('LessonsInCoursesService', () => {
  let service: LessonsInCoursesService
  let model: typeof LessonsInCourses

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LessonsInCoursesService,
        {
          provide: getModelToken(LessonsInCourses),
          useValue: LessonsInCoursesModel,
        },
      ],
    }).compile()

    service = module.get<LessonsInCoursesService>(LessonsInCoursesService)
    model = module.get<typeof LessonsInCourses>(getModelToken(LessonsInCourses))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    })

    describe('when create is called', () => {
      let lessonInCourse: LessonsInCourses

      beforeEach(async () => {
        lessonInCourse = await service.create(lessonsInCoursesCreateStub())
      })

      it('should call model create', () => {
        expect(model.create).toBeCalled()
      })

      it('should return a lessonInCourse', () => {
        expect(lessonInCourse).toBeDefined()
      })
    })
  })

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined()
    })

    describe('when findAll is called', () => {
      let lessonsInCourses: LessonsInCourses[]

      beforeEach(async () => {
        lessonsInCourses = await service.findAll()
      })

      it('should call model findAll', () => {
        expect(model.findAll).toBeCalled()
      })

      it('should return a lessonsInCourses', () => {
        expect(lessonsInCourses).toEqual([lessonsInCoursesStub()])
      })
    })
  })

  describe('findByPk', () => {
    it('should be defined', () => {
      expect(service.findByPk).toBeDefined()
    })

    describe('when findByPk is called', () => {
      let lessonInCourse: LessonsInCourses

      beforeEach(async () => {
        lessonInCourse = await service.findByPk(lessonsInCoursesStub().id)
      })

      it('should call model findByPk', () => {
        expect(model.findByPk).toBeCalled()
      })

      it('should return a lessonInCourse', () => {
        expect(lessonInCourse).toEqual(lessonsInCoursesStub())
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
        result = await service.update(lessonsInCoursesUpdateStub())
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
        result = await service.destroy(lessonsInCoursesStub().id)
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
