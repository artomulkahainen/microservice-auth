interface Token {
    realm_access: {
        roles: string[];
    };
    scope: string;
    preferred_username: string;
    userId: string;
}

export const parseJwt = (token: string): Token => {
    try {
        return JSON.parse(
            Buffer.from(token.split('.')[1], 'base64').toString()
        );
    } catch (e) {
        throw e;
    }
};
