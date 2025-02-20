/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDTO } from '../models/UserDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Search for users with public accounts based on username.
     * @param userName
     * @returns UserDTO OK
     * @throws ApiError
     */
    public static searchUsers(
        userName?: string,
    ): CancelablePromise<Array<UserDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/search',
            query: {
                'userName': userName,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Get the friends for the signed in user.
     * @returns UserDTO OK
     * @throws ApiError
     */
    public static getFriends(): CancelablePromise<Array<UserDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/friends',
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Send a friend request.
     * @param username
     * @returns any OK
     * @throws ApiError
     */
    public static addFriend(
        username?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/add-friend',
            query: {
                'username': username,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Lets a user see their incoming pending friend requests.
     * @returns any OK
     * @throws ApiError
     */
    public static getPendingFriendRequests(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/pending-friend-requests',
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Lets a user see their outgoing friend requests.
     * @returns any OK
     * @throws ApiError
     */
    public static outgoingFriendRequests(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/outgoing-friend-requests',
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
}
