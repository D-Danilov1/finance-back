import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { lessonsCreateStub } from './stubs/lessons-create.stub'
import { lessonsStub } from './stubs/lessons.stub'
import { AppGenerator } from '../../classes/app-generator'
import { TokenGenerator } from '../../classes/token-generator'
import { AppInitializer } from '../../classes/app-initializer'
import { Lessons } from '../../../src/components/lessonsComponent/lessons/models/lessons.model'

describe('Lessons (e2e)', () => {
  let app: INestApplication
  let tokenAdmin: string
  let tokenUser: string
  let lesson: Lessons

  beforeAll(async () => {
    AppInitializer.jestSetTimeout()
    app = await AppGenerator.getApp()
    await AppInitializer.appInitialization()
    tokenAdmin = await TokenGenerator.getAdminToken()
    tokenUser = await TokenGenerator.getUserToken()
  })

  describe('/api/lessons (POST)', () => {
    it('should create a lesson and return status HttpStatus.CREATED because it a Admin', async () => {
      await request(app.getHttpServer())
        .post('/api/lessons')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(lessonsCreateStub())
        .expect(HttpStatus.CREATED)
        .then((response) => {
          lesson = response.body.response
        })
    })

    it('should return status HttpStatus.OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(lessonsCreateStub())
        .expect(HttpStatus.OK)
    })

    it('should return status HttpStatus.FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons')
        .send(lessonsCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .post('/api/lessons')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/api/lessons (PUT)', () => {
    it('should update a lesson', async () => {
      lesson.name = 'Test' + Date.now()
      await request(app.getHttpServer())
        .put('/api/lessons')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(lesson)
        .then((response) => {
          expect(response.body.response).toEqual([1])
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .put('/api/lessons')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(lesson)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .put('/api/lessons')
        .send(lesson)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .put('/api/lessons')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/api/lessons (GET)', () => {
    it('should return lessons and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          console.log(response.body.response[0])
          expect(response.body.response[0]).toEqual(lessonsStub())
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons')
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).get('/api/lessons').expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/api/lessons/:id (GET)', () => {
    it('should return a lesson and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons/' + lesson.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(lessonsStub())
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons/' + lesson.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons/' + lesson.id)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/api/lessons/name/:name (GET)', () => {
    it('should return a lesson and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons/name/' + lesson.name)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(lessonsStub())
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons/name/' + lesson.name)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons/name/' + lesson.name)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/api/lessons/:id (DELETE)', () => {
    it('should delete a lesson', async () => {
      await request(app.getHttpServer())
        .delete('/api/lessons/' + lesson.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1)
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .delete('/api/lessons/' + lesson.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .delete('/api/lessons/' + lesson.id)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status NOT_FOUND because it empty request', async () => {
      await request(app.getHttpServer())
        .delete('/api/lessons/')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.NOT_FOUND)
    })
  })
})
