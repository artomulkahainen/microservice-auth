import { HelloWorldDTO } from '@dto/helloWorldDtos';

export const mapStringToHelloWorldDTO = (text: string): HelloWorldDTO => ({
    text,
});
