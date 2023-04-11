import { Response } from 'express';
import { HelloWorldDTO } from '@dto/userDtos';
import { mapStringToHelloWorldDTO } from '@mappers/userMapper';
import { getText } from '@services/userService';

export const getHelloWorld = (_, res: Response<HelloWorldDTO>) => {
    res.json(mapStringToHelloWorldDTO(getText()));
};
