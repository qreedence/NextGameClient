/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginDTO } from '../models/LoginDTO';
import type { RegisterDTO } from '../models/RegisterDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Allows a user to log in with credentials provided
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static loginUser(
        requestBody: LoginDTO,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Allows a user to log out
     * @returns any OK
     * @throws ApiError
     */
    public static logoutUser(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Register a user
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static registerUser(
        requestBody: RegisterDTO,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Pings the server to check if the user is authorized.
     * @returns any OK
     * @throws ApiError
     */
    public static ping(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/ping',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
}
