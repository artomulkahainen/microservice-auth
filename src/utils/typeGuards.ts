export const isNotEmptyString = (value?: unknown) =>
    !!value && typeof value === 'string' && (value as string).length > 0;
