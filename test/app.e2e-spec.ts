import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('CountryController', () => {
    it('/countries (GET)', () => {
      return request(app.getHttpServer())
        .get('/countries')
        .expect(200);
    });
  });

  describe('HolidayController', () => {

    it('/holidays (GET)', () => {
      return request(app.getHttpServer())
        .get('/holidays').query({ country_code: 'tur', year: 2022 })
        .expect(200);
    });

    it('/holidays/status (GET)', () => {
      return request(app.getHttpServer())
        .get('/holidays/status').query({country_code: 'tur', date: '2022-04-23' })
        .expect(200);
    });

    it('/free-days-count (GET)', () => {
      return request(app.getHttpServer())
        .get('/holidays/free-days-count').query({ country_code: 'tur', year: 2022 })
        .expect(200);
    });
  });
});
