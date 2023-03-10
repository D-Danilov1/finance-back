import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { lessonScheduleCreateStub } from './stubs/lesson-schedule-create.stub';
import { lessonScheduleStub } from './stubs/lesson-schedule.stub';
import { AppGenerator } from '../../classes/app-generator';
import { TokenGenerator } from '../../classes/token-generator';
import { AppInitializer } from '../../classes/app-initializer';
import { LessonSchedule } from '../../../src/components/lessonsComponent/lessonSchedule/models/lesson-schedule.model';

describe('LessonSchedule (e2e)', () => {
  let app: INestApplication;
  let tokenAdmin: string;
  let tokenUser: string;
  let lessonsSchedule: LessonSchedule;

  beforeAll(async () => {
    AppInitializer.jestSetTimeout();
    app = await AppGenerator.getApp();
    await AppInitializer.appInitialization();
    tokenAdmin = await TokenGenerator.getAdminToken();
    tokenUser = await TokenGenerator.getUserToken();
  });

  describe('/api/lesson-schedule (POST)', () => {
    it('should create a lessonsSchedule and return status HttpStatus.CREATED because it a Admin', async () => {
      await request(app.getHttpServer())
        .post('/api/lesson-schedule')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(lessonScheduleCreateStub())
        .expect(HttpStatus.CREATED)
        .then((response) => {
          lessonsSchedule = response.body.response;
        });
    });

    it('should return status HttpStatus.OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/lesson-schedule')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(lessonScheduleCreateStub())
        .expect(HttpStatus.OK);
    });

    it('should return status HttpStatus.FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/lesson-schedule')
        .send(lessonScheduleCreateStub())
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return status HttpStatus.BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .post('/api/lesson-schedule')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/api/lesson-schedule (GET)', () => {
    it('should return lessonSchedule and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/lesson-schedule')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          console.log(response.body.response[0]);
          expect(response.body.response[0]).toEqual(lessonScheduleStub());
        });
    });

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/lesson-schedule')
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK);
    });

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/lesson-schedule')
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('/api/lesson-schedule/:id (GET)', () => {
    it('should return a lessonsSchedule and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/lesson-schedule/' + lessonsSchedule.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(lessonScheduleStub());
        });
    });

    it('should return status OK because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/lesson-schedule/' + lessonsSchedule.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.OK);
    });

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/lesson-schedule/' + lessonsSchedule.id)
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('/api/lesson-schedule/:id (DELETE)', () => {
    it('should delete a lessonsSchedule', async () => {
      await request(app.getHttpServer())
        .delete('/api/lesson-schedule/' + lessonsSchedule.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1);
        });
    });

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .delete('/api/lesson-schedule/' + lessonsSchedule.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .delete('/api/lesson-schedule/' + lessonsSchedule.id)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return status NOT_FOUND because it empty request', async () => {
      await request(app.getHttpServer())
        .delete('/api/lesson-schedule/')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
