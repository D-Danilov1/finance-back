import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { daysCreateStub } from './stubs/days-create.stub'
import { daysStub } from './stubs/days.stub'
import { AppGenerator } from '../../classes/app-generator'
import { TokenGenerator } from '../../classes/token-generator'
import { AppInitializer } from '../../classes/app-initializer'
import { Days } from '../../../src/components/lessonsComponent/days/models/days.model'

describe('Days (e2e)', () => {
  let app: INestApplication
  let tokenAdmin: string
  let tokenUser: string
  let day: Days

  beforeAll(async () => {
    AppInitializer.jestSetTimeout()
    app = await AppGenerator.getApp()
    await AppInitializer.appInitialization()
    tokenAdmin = await TokenGenerator.getAdminToken()
    tokenUser = await TokenGenerator.getUserToken()
  })

  describe('/api/days (POST)', () => {
    it('should create a day and return status HttpStatus.CREATED because it a Admin', async () => {
      await request(app.getHttpServer())
        .post('/api/days')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(daysCreateStub())
        .expect(HttpStatus.CREATED)
        .then((response) => {
          day = response.body.response
        })
    })

    it('should return status HttpStatus.OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/days')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(daysCreateStub())
        .expect(HttpStatus.OK)
    })

    it('should return status HttpStatus.FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/days')
        .send(daysCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .post('/api/days')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/api/days (PUT)', () => {
    it('should update a day', async () => {
      day.name = 'Test' + Date.now()
      await request(app.getHttpServer())
        .put('/api/days')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(day)
        .then((response) => {
          expect(response.body.response).toEqual([1])
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .put('/api/days')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(day)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).put('/api/days').send(day).expect(HttpStatus.FORBIDDEN)
    })

    it('should return status BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .put('/api/days')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/api/days (GET)', () => {
    it('should return days and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/days')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          console.log(response.body.response[0])
          expect(response.body.response[0]).toEqual(daysStub())
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/days')
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).get('/api/days').expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/api/days/:id (GET)', () => {
    it('should return a day and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/days/' + day.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(daysStub())
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/days/' + day.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/days/' + day.id)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/api/days/name/:name (GET)', () => {
    it('should return a day and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/days/name/' + day.name)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(daysStub())
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/days/name/' + day.name)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/days/name/' + day.name)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/api/days/:id (DELETE)', () => {
    it('should delete a day', async () => {
      await request(app.getHttpServer())
        .delete('/api/days/' + day.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1)
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .delete('/api/days/' + day.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .delete('/api/days/' + day.id)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status NOT_FOUND because it empty request', async () => {
      await request(app.getHttpServer())
        .delete('/api/days/')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.NOT_FOUND)
    })
  })
})
