/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCoverDTO } from './GameCoverDTO';
export type GameSearchResultDTO = {
    id?: number;
    name?: string | null;
    cover?: GameCoverDTO;
    coverUrl?: string;
    first_release_date?: number | null;
    firstReleaseDate?: string;
    aggregated_rating?: number;
    aggregated_rating_count?: number;
};

