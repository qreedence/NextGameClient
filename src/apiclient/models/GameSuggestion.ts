/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameVote } from './GameVote';
export type GameSuggestion = {
    id?: number;
    circleId?: string;
    gameId?: number;
    gameName?: string;
    gameCoverUrl?: string;
    suggestedBy?: string;
    votes?: Array<GameVote>;
};

