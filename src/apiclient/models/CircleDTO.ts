/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameSuggestionDTO } from './GameSuggestionDTO';
import type { UserDTO } from './UserDTO';
export type CircleDTO = {
    id: string;
    name: string;
    createdBy: UserDTO;
    createdAt: string;
    activeMembers?: Array<UserDTO>;
    suggestionQueue?: Array<GameSuggestionDTO>;
};

