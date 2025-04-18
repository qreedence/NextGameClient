/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameStatus } from './GameStatus';
import type { UserDTO } from './UserDTO';
export type CircleGameDTO = {
    id?: number;
    gameId?: number;
    gameName?: string;
    gameCoverUrl?: string;
    players?: Array<UserDTO>;
    displayOrder?: number;
    gameStatus?: GameStatus;
    dateAdded?: string;
    dateStarted?: string;
    dateFinished?: string;
    datesPlayed?: Array<string>;
    suggestedBy: UserDTO;
};

