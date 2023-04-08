import { Response } from 'express';
import { HelloWorldDTO } from '@dto/helloWorldDtos';
import { mapStringToHelloWorldDTO } from '@mappers/helloWorldMapper';
import { getText } from '@services/helloWorldService';

export const getHelloWorld = (_, res: Response<HelloWorldDTO>) => {
    res.json(mapStringToHelloWorldDTO(getText()));
};
