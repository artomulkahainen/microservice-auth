import { HelloWorldDTO } from '@dto/userDtos';

export const mapStringToHelloWorldDTO = (text: string): HelloWorldDTO => ({
    text,
});
