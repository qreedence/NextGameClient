/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameLinks } from './GameLinks';
import type { MultiplayerModesDTO } from './MultiplayerModesDTO';
export type GameDTO = {
    id?: number;
    aggregatedRating?: number;
    coverUrl?: string | null;
    genres?: Array<string>;
    firstReleaseDate?: string;
    multiplayerModes?: MultiplayerModesDTO;
    name?: string;
    platforms?: Array<string>;
    screenshots?: Array<string>;
    storyline?: string;
    summary?: string;
    videos?: Array<string>;
    websites?: GameLinks;
    similarGames?: Array<string>;
};

