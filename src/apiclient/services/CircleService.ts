/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CircleDTO } from '../models/CircleDTO';
import type { CircleInvitationDTO } from '../models/CircleInvitationDTO';
import type { GameSuggestion } from '../models/GameSuggestion';
import type { UserToInviteToCircleDTO } from '../models/UserToInviteToCircleDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CircleService {
    /**
     * Get a circle by ID.
     * @param circleId
     * @returns CircleDTO OK
     * @throws ApiError
     */
    public static getCircleById(
        circleId?: string,
    ): CancelablePromise<CircleDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/circle',
            query: {
                'circleId': circleId,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Get a list of circles which the user is a part of.
     * @returns CircleDTO OK
     * @throws ApiError
     */
    public static getCirclesByUser(): CancelablePromise<Array<CircleDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/circle/by-user',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Suggest a game to a circle.
     * @param circleId
     * @param gameId
     * @returns any OK
     * @throws ApiError
     */
    public static suggestGame(
        circleId?: string,
        gameId?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/circle/suggest',
            query: {
                'circleId': circleId,
                'gameId': gameId,
            },
        });
    }
    /**
     * Get all games in the suggestion queue for a circle.
     * @param circleId
     * @returns GameSuggestion OK
     * @throws ApiError
     */
    public static getSuggestedGames(
        circleId?: string,
    ): CancelablePromise<Array<GameSuggestion>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/circle/suggested',
            query: {
                'circleId': circleId,
            },
        });
    }
    /**
     * Lets a user create a circle
     * @param circleName
     * @returns any OK
     * @throws ApiError
     */
    public static createCircle(
        circleName?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/circle/create',
            query: {
                'circleName': circleName,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Find a list of friends to invite to a circle. Will not show friends that are already active members of the circle.
     * @param circleId
     * @param username
     * @returns UserToInviteToCircleDTO OK
     * @throws ApiError
     */
    public static findFriendsToInvite(
        circleId?: string,
        username?: string,
    ): CancelablePromise<Array<UserToInviteToCircleDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/circle/find-friends-to-invite',
            query: {
                'circleId': circleId,
                'username': username,
            },
        });
    }
    /**
     * Lets a user invite a friend a circle
     * @param circleId
     * @param username
     * @returns any OK
     * @throws ApiError
     */
    public static inviteToCircle(
        circleId?: string,
        username?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/circle/invite',
            query: {
                'circleId': circleId,
                'username': username,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get a specific circle invitation by id
     * @param circleInvitationId
     * @returns CircleInvitationDTO OK
     * @throws ApiError
     */
    public static getCircleInvitationById(
        circleInvitationId?: number,
    ): CancelablePromise<CircleInvitationDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/circle/invitation-by-id',
            query: {
                'circleInvitationId': circleInvitationId,
            },
        });
    }
    /**
     * Get a circle invitation by circleId and user
     * @param circleId
     * @returns CircleInvitationDTO OK
     * @throws ApiError
     */
    public static getCircleInvitation(
        circleId?: string,
    ): CancelablePromise<CircleInvitationDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/circle/invitation',
            query: {
                'circleId': circleId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Let a user respond to a circle invitation
     * @param circleInvitationId
     * @param response
     * @returns any OK
     * @throws ApiError
     */
    public static invitationResponse(
        circleInvitationId?: number,
        response?: boolean,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/circle/invitation-response',
            query: {
                'circleInvitationId': circleInvitationId,
                'response': response,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Allow a user to leave a circle
     * @param circleId
     * @returns any OK
     * @throws ApiError
     */
    public static leaveCircle(
        circleId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/circle/leave',
            query: {
                'circleId': circleId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
}
