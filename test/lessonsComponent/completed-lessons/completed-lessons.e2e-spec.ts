import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { completedLessonsStub } from './stubs/completed.stub'
import { AppGenerator } from '../../classes/app-generator'
import { TokenGenerator } from '../../classes/token-generator'
import { AppInitializer } from '../../classes/app-initializer'
import { CompletedLessons } from 'src/components/lessonsComponent/completed-lessons/models/completed-lessons.model'
import { completedLessonsCreateStub } from './stubs/completed-lessons-create.stub'

describe('CompletedLessons (e2e)', () => {
  let app: INestApplication
  let tokenAdmin: string
  let tokenUser: string
  let completedLesson: CompletedLessons

  beforeAll(async () => {
    AppInitializer.jestSetTimeout()
    app = await AppGenerator.getApp()
    await AppInitializer.appInitialization()
    tokenAdmin = await TokenGenerator.getAdminToken()
    tokenUser = await TokenGenerator.getUserToken()
  })

  describe('/api/completed-lessons (POST)', () => {
    it('should create a completedLesson and return status HttpStatus.CREATED because it a Admin', async () => {
      await request(app.getHttpServer())
        .post('/api/completed-lessons')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(completedLessonsCreateStub())
        .expect(HttpStatus.CREATED)
        .then((response) => {
          completedLesson = response.body.response
        })
    })

    it('should return status HttpStatus.OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/completed-lessons')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(completedLessonsCreateStub())
        .expect(HttpStatus.OK)
    })

    it('should return status HttpStatus.FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/completed-lessons')
        .send(completedLessonsCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .post('/api/completed-lessons')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/api/completed-lessons (GET)', () => {
    it('should return completedLessons and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/completed-lessons')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          console.log(response.body.response[0])
          expect(response.body.response[0]).toEqual(completedLessonsStub())
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/completed-lessons')
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).get('/api/completed-lessons').expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/api/completed-lessons/:id (GET)', () => {
    it('should return a completedLesson and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/completed-lessons/' + completedLesson.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(completedLessonsStub())
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/completed-lessons/' + completedLesson.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK)
    })

    it('should return status OK because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/completed-lessons/' + completedLesson.id)
        .expect(HttpStatus.OK)
    })
  })

  describe('/api/completed-lessons/:id (DELETE)', () => {
    it('should delete a completedLesson', async () => {
      await request(app.getHttpServer())
        .delete('/api/completed-lessons/' + completedLesson.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1)
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .delete('/api/completed-lessons/' + completedLesson.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK)
    })

    it('should return status OK because it a Unknown', async () => {
      await request(app.getHttpServer())
        .delete('/api/completed-lessons/' + completedLesson.id)
        .expect(HttpStatus.OK)
    })

    it('should return status NOT_FOUND because it empty request', async () => {
      await request(app.getHttpServer())
        .delete('/api/completed-lessons/')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.NOT_FOUND)
    })
  })
})
