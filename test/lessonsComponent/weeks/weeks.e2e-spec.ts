import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { weeksCreateStub } from './stubs/weeks-create.stub'
import { weeksStub } from './stubs/weeks.stub'
import { AppGenerator } from '../../classes/app-generator'
import { TokenGenerator } from '../../classes/token-generator'
import { AppInitializer } from '../../classes/app-initializer'
import { Weeks } from '../../../src/components/lessonsComponent/weeks/models/weeks.model'

describe('Weeks (e2e)', () => {
  let app: INestApplication
  let tokenAdmin: string
  let tokenUser: string
  let week: Weeks

  beforeAll(async () => {
    AppInitializer.jestSetTimeout()
    app = await AppGenerator.getApp()
    await AppInitializer.appInitialization()
    tokenAdmin = await TokenGenerator.getAdminToken()
    tokenUser = await TokenGenerator.getUserToken()
  })

  describe('/api/weeks (POST)', () => {
    it('should create a week and return status HttpStatus.CREATED because it a Admin', async () => {
      await request(app.getHttpServer())
        .post('/api/weeks')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(weeksCreateStub())
        .expect(HttpStatus.CREATED)
        .then((response) => {
          week = response.body.response
        })
    })

    it('should return status HttpStatus.OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/weeks')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(weeksCreateStub())
        .expect(HttpStatus.OK)
    })

    it('should return status HttpStatus.FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/weeks')
        .send(weeksCreateStub())
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status HttpStatus.BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .post('/api/weeks')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/api/weeks (PUT)', () => {
    it('should update a week', async () => {
      week.name = 'Test' + Date.now()
      await request(app.getHttpServer())
        .put('/api/weeks')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(week)
        .then((response) => {
          expect(response.body.response).toEqual([1])
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .put('/api/weeks')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(week)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).put('/api/weeks').send(week).expect(HttpStatus.FORBIDDEN)
    })

    it('should return status BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .put('/api/weeks')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/api/weeks (GET)', () => {
    it('should return weeks and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/weeks')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          console.log(response.body.response[0])
          expect(response.body.response[0]).toEqual(weeksStub())
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/weeks')
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).get('/api/weeks').expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/api/weeks/:id (GET)', () => {
    it('should return a week and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/weeks/' + week.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(weeksStub())
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/weeks/' + week.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/weeks/' + week.id)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/api/weeks/name/:name (GET)', () => {
    it('should return a week and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/weeks/name/' + week.name)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(weeksStub())
        })
    })

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/weeks/name/' + week.name)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/weeks/name/' + week.name)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/api/weeks/:id (DELETE)', () => {
    it('should delete a week', async () => {
      await request(app.getHttpServer())
        .delete('/api/weeks/' + week.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1)
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .delete('/api/weeks/' + week.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .delete('/api/weeks/' + week.id)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status NOT_FOUND because it empty request', async () => {
      await request(app.getHttpServer())
        .delete('/api/weeks/')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.NOT_FOUND)
    })
  })
})
