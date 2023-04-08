export const apiRoute = (route: string) => {
    if (!route.startsWith('/')) {
        throw new Error('api routes must start with /');
    }
    return `/api${route}`;
};
