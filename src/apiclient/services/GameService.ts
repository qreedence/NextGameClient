/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameDTO } from '../models/GameDTO';
import type { GameSearchResultDTO } from '../models/GameSearchResultDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameService {
    /**
     * Search for a game by name.
     * @param searchTerm
     * @returns GameSearchResultDTO OK
     * @throws ApiError
     */
    public static search(
        searchTerm: string,
    ): CancelablePromise<Array<GameSearchResultDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/game/search/{searchTerm}',
            path: {
                'searchTerm': searchTerm,
            },
        });
    }
    /**
     * Get new games.
     * @returns GameSearchResultDTO OK
     * @throws ApiError
     */
    public static new(): CancelablePromise<Array<GameSearchResultDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/game/new',
        });
    }
    /**
     * Get a specific game by ID.
     * @param gameId
     * @returns GameDTO OK
     * @throws ApiError
     */
    public static getById(
        gameId?: string,
    ): CancelablePromise<GameDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/game',
            query: {
                'gameId': gameId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * @param year
     * @returns GameSearchResultDTO OK
     * @throws ApiError
     */
    public static highestRated(
        year?: number,
    ): CancelablePromise<Array<GameSearchResultDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/game/top',
            query: {
                'year': year,
            },
        });
    }
}
