import {JwtPayload} from "jwt-decode";

export default class User implements JwtPayload{
    iss?: string;
    sub?: string;
    name?: string;
    aud?: string[] | string;
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
}