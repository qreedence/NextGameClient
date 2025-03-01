/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FriendRequestDTO } from '../models/FriendRequestDTO';
import type { FriendRequestResponse } from '../models/FriendRequestResponse';
import type { FriendshipStatusDTO } from '../models/FriendshipStatusDTO';
import type { UserDTO } from '../models/UserDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Get the public profile of the first user with an exact username match, if the user exists.
     * @param userName
     * @returns UserDTO OK
     * @throws ApiError
     */
    public static findByUsername(
        userName?: string,
    ): CancelablePromise<UserDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/find-by-username',
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
            method: 'POST',
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
     * Let a user remove a friend from their friend list
     * @param username
     * @returns any OK
     * @throws ApiError
     */
    public static unfriend(
        username?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/unfriend',
            query: {
                'username': username,
            },
        });
    }
    /**
     * Get the friendship status of the logged in user and another user.
     * @param otherUserUsername
     * @returns FriendshipStatusDTO OK
     * @throws ApiError
     */
    public static getFriendshipStatus(
        otherUserUsername?: string,
    ): CancelablePromise<FriendshipStatusDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/get-friendship-status',
            query: {
                'otherUserUsername': otherUserUsername,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Lets a user see their incoming pending friend requests.
     * @returns FriendRequestDTO OK
     * @throws ApiError
     */
    public static getPendingFriendRequests(): CancelablePromise<Array<FriendRequestDTO>> {
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
     * @returns FriendRequestDTO OK
     * @throws ApiError
     */
    public static outgoingFriendRequests(): CancelablePromise<Array<FriendRequestDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/outgoing-friend-requests',
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Lets a user respond to a friend request by either accepting or denying it.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static friendRequestResponse(
        requestBody: FriendRequestResponse,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/friend-request-response',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
}
