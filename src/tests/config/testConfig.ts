import supertest from 'supertest';
import app from '../../app';

export const superTestApi = supertest(app);
