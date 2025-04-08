/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameSearchResultDTO } from '../models/GameSearchResultDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameService {
    /**
     * @param searchTerm
     * @returns GameSearchResultDTO OK
     * @throws ApiError
     */
    public static getApiGameSearch(
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
     * @returns GameSearchResultDTO OK
     * @throws ApiError
     */
    public static getApiGameNew(): CancelablePromise<Array<GameSearchResultDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/game/new',
        });
    }
}
