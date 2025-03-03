/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDTO } from './UserDTO';
export type CircleDTO = {
    id: string;
    name: string;
    createdBy: UserDTO;
    createdAt: string;
    activeMembers?: Array<UserDTO>;
};

