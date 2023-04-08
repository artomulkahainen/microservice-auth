import { HelloWorldDTO } from '../../../dto/helloWorldDtos';
import { superTestApi } from '../../config/testConfig';

const isHelloWorldDTO = (value: unknown) => !!(value as HelloWorldDTO).text;

describe('HelloWorldApi', () => {
    it('GET /api/hello-world', async () => {
        const res = await superTestApi.get('/api/hello-world');
        expect(res.statusCode).toBe(200);
        expect(isHelloWorldDTO(res.body)).toEqual(true);
        expect((res.body as HelloWorldDTO).text).toEqual(
            'hello world from service!'
        );
    });
});
