/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameVoteDTO } from './GameVoteDTO';
export type GameSuggestionDTO = {
    id?: number;
    circleId?: string;
    gameId?: number;
    gameName?: string;
    gameCoverUrl?: string;
    suggestedBy?: string;
    votes?: Array<GameVoteDTO>;
};

