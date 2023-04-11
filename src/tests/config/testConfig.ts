import supertest from 'supertest';
import app from '../../app';

export const superTestApi = supertest(app);

export const normalUserAccessToken =
    'Bearer eyJhbGciOiJSUzI1NiIsI' +
    'nR5cCIgOiAiSldUIiwia2lkIJ5bzVIbFRiS1FHNFYzM1B0SVlGcjNOM01KZy0zWnJPQ1' +
    'JnbVBzdWtPYk1RIn0.eyJleHAiOjE2ODE0OTIxMzQsImlhdCI6MTY4MTQ5MTgzNCwiYX' +
    'V0aF90aW1lIjoxNjgxNDkxMzc0LCJqdGkiOiIyZWQ0N2Q2ZS0xYjRiLTQ1MWYtOTllNS' +
    '1hYjFiOTA0ZGVlNjEiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODAvcmVhbG1zL2' +
    '1haW4tcmVhbG0iLCJzdWIiOiJkMzVmOWExOC1lMWVmLTQyNDEtYTJlMC1iZGRkYWQ4Zm' +
    'I0N2QiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJtaWNyb3NlcnZpY2UtYXBwIiwic2Vzc2' +
    'lvbl9zdGF0ZSI6IjdhMjY5ZmE5LTc3YjAtNDU4NS05ODNlLTY2YmY1MWNhMDMxOCIsIm' +
    'FjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDozMDAwIl' +
    '0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLW1haW4tcmVhbG' +
    '0iLCJub3JtYWxfdXNlciJdfSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiN2' +
    'EyNjlmYTktNzdiMC00NTg1LTk4M2UtNjZiZjUxY2EwMzE4IiwiZW1haWxfdmVyaWZpZW' +
    'QiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0aSIsImdpdmVuX25hbWUiOi' +
    'IiLCJ1c2VySWQiOiJkMzVmOWExOC1lMWVmLTQyNDEtYTJlMC1iZGRkYWQ4ZmI0N2QiLC' +
    'JmYW1pbHlfbmFtZSI6IiJ9.maQLM1XQvRncUdAfgEKJGpJ6ioT2DfHFxpTOpWONf7Sj5' +
    '03ijFIzKWi5fMfhgyI6R9t6WDOzBBa7vkTdop_Gh9UsGeS3JifQ7V7HzYnDXrBQuzd-l' +
    'KhUbmOTv0a2iRZo2TV1qkqgeO0CZuwFmzhLnrGfMg1UEO7G3VD-6V67SSxerE81f1aZu' +
    'L1Y9tbqW7k3MgNvBCjVG27dkGNc_2c3YYJOavzTHKSoKXFIlJ4mlT5QkTmPNhNX8i22O' +
    'qnA1EHTWg8Ow4leEhB68YeXoMpZbj1lrzpqdzokTBYwloTmKFREENEuTiyx3K1qNCrymzVMgveV_4KkS_UNPiI5fV2P6Q';
