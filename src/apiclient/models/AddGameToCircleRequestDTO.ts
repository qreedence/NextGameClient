/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameStatus } from './GameStatus';
export type AddGameToCircleRequestDTO = {
    circleId?: string;
    gameId?: number;
    gameName?: string;
    gameCoverUrl?: string;
    players?: Array<string>;
    gameStatus?: GameStatus;
    suggestedBy: string;
};

