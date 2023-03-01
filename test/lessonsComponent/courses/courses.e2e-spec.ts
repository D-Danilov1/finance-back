import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { coursesCreateStub } from './stubs/courses-create.stub'
import { coursesStub } from './stubs/courses.stub'
import { AppGenerator } from '../../classes/app-generator'
import { TokenGenerator } from '../../classes/token-generator'
import { AppInitializer } from '../../classes/app-initializer'
import { Courses } from '../../../src/components/lessonsComponent/courses/models/courses.model'

describe('Courses (e2e)', () => {
  let app: INestApplication
  let tokenAdmin: string
  let tokenUser: string
  let course: Courses

  beforeAll(async () => {
    AppInitializer.jestSetTimeout()
    app = await AppGenerator.getApp()
    await AppInitializer.appInitialization()
    tokenAdmin = await TokenGenerator.getAdminToken()
    tokenUser = await TokenGenerator.getUserToken()
  })

  describe('/api/courses (POST)', () => {
    it('should create a course and return status HttpStatus.CREATED because it a Admin', async () => {
      await request(app.getHttpServer())
        .post('/api/courses')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(coursesCreateStub())
        .expect(HttpStatus.CREATED)
        .then((response) => {
          course = response.body.response
        })
    })

    it('should return status HttpStatus.OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/courses')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(coursesCreateStub())
        .expect(HttpStatus.OK)
    })

    it('should return status HttpStatus.FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/courses')
        .send(coursesCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .post('/api/courses')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/api/courses (PUT)', () => {
    it('should update a course', async () => {
      course.name = 'Test' + Date.now()
      await request(app.getHttpServer())
        .put('/api/courses')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(course)
        .then((response) => {
          expect(response.body.response).toEqual([1])
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .put('/api/courses')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(course)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .put('/api/courses')
        .send(course)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .put('/api/courses')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/api/courses (GET)', () => {
    it('should return courses and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/courses')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          console.log(response.body.response[0])
          expect(response.body.response[0]).toEqual(coursesStub())
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/courses')
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).get('/api/courses').expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/api/courses/:id (GET)', () => {
    it('should return a course and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/courses/' + course.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(coursesStub())
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/courses/' + course.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/courses/' + course.id)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/api/courses/name/:name (GET)', () => {
    it('should return a course and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/courses/name/' + course.name)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(coursesStub())
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/courses/name/' + course.name)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/courses/name/' + course.name)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/api/courses/:id (DELETE)', () => {
    it('should delete a course', async () => {
      await request(app.getHttpServer())
        .delete('/api/courses/' + course.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1)
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .delete('/api/courses/' + course.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .delete('/api/courses/' + course.id)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status NOT_FOUND because it empty request', async () => {
      await request(app.getHttpServer())
        .delete('/api/courses/')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.NOT_FOUND)
    })
  })
})
