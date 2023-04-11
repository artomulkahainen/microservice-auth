import { isAxiosError } from 'axios';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (isAxiosError(err)) {
        res.status(err.response.status || 500).send({ error: err.message });
    } else if (err.message === 'KeycloakError') {
        res.status(400).send({ error: 'Authentication failed' });
    } else if (err.message === 'ValidationError') {
        res.status(400).send({ error: 'Invalid request values' });
    } else if (err.message === 'UnauthorizedError') {
        res.status(401).send({ error: 'Unauthorized' });
    } else if (err.message === 'ForbiddenError') {
        res.status(403).send({ error: 'Forbidden' });
    } else {
        res.status(500).send({ error: 'unknown error' });
    }
    next(err);
};
