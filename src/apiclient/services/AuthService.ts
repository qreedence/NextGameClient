/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginDTO } from '../models/LoginDTO';
import type { RegisterDTO } from '../models/RegisterDTO';
import type { UserProfileDTO } from '../models/UserProfileDTO';
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
     * Start a sign-in process through external login provider.
     * @param loginProvider
     * @param returnUrl
     * @returns any OK
     * @throws ApiError
     */
    public static externalLogin(
        loginProvider?: string,
        returnUrl?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/external-login',
            query: {
                'loginProvider': loginProvider,
                'returnUrl': returnUrl,
            },
        });
    }
    /**
     * Handles the response from external login provider after a sign-in attempt.
     * @param returnUrl
     * @param remoteError
     * @returns any OK
     * @throws ApiError
     */
    public static externalAuthCallback(
        returnUrl?: string,
        remoteError?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/external-auth-callback',
            query: {
                'returnUrl': returnUrl,
                'remoteError': remoteError,
            },
        });
    }
    /**
     * Handles the exchange of an token id to sign in a user that used an external login provider.
     * @param tokenId
     * @returns any OK
     * @throws ApiError
     */
    public static externalAuthComplete(
        tokenId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/external-auth-complete',
            query: {
                'tokenId': tokenId,
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
     * Checks if the tokenId for a PasswordResetToken is valid.
     * @param tokenId
     * @returns any OK
     * @throws ApiError
     */
    public static checkPasswordResetToken(
        tokenId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth',
            query: {
                'tokenId': tokenId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * Allows a user to request an email with a password reset link.
     * @param email
     * @returns any OK
     * @throws ApiError
     */
    public static forgotPassword(
        email?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/forgot-password',
            query: {
                'email': email,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Allows a user to set a new password if their tokenId matches a PasswordResetToken.
     * @param tokenId
     * @param password
     * @returns any OK
     * @throws ApiError
     */
    public static resetPassword(
        tokenId?: string,
        password?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/reset-password',
            query: {
                'tokenId': tokenId,
                'password': password,
            },
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
    /**
     * Gets the name of the logged in user.
     * @returns UserProfileDTO OK
     * @throws ApiError
     */
    public static getUserProfile(): CancelablePromise<UserProfileDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/get-user-profile',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
}
