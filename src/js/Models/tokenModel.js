//Token Model

export class Token {
    constructor(accessToken, type, expireSec, scope, refreshToken, iat, exp) {
        this.accessToken = accessToken;
        this.type = type;
        this.expireSec = expireSec;
        this.scope = scope;
        this.refreshToken = refreshToken;
        this.iat = iat;
        this.exp = exp;
    }
}