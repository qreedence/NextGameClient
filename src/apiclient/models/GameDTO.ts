/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FranchiseDTO } from './FranchiseDTO';
import type { GameLinks } from './GameLinks';
import type { InvolvedCompanyDTO } from './InvolvedCompanyDTO';
import type { MultiplayerModesDTO } from './MultiplayerModesDTO';
import type { ParentGameDTO } from './ParentGameDTO';
export type GameDTO = {
    id?: number;
    aggregatedRating?: number;
    totalRating?: number;
    coverUrl?: string | null;
    genres?: Array<string>;
    firstReleaseDate?: string;
    franchises?: Array<FranchiseDTO>;
    multiplayerModes?: MultiplayerModesDTO;
    name?: string;
    platforms?: Array<string>;
    screenshots?: Array<string>;
    storyline?: string;
    summary?: string;
    videos?: Array<string>;
    websites?: GameLinks;
    similarGames?: Array<string>;
    updatedAt?: string;
    involvedCompanies?: Array<InvolvedCompanyDTO>;
    gameModes?: Array<string>;
    keywords?: Array<string>;
    slug?: string;
    themes?: Array<string>;
    parentGame?: ParentGameDTO;
};

