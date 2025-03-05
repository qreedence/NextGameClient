/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CircleDTO } from './CircleDTO';
import type { UserDTO } from './UserDTO';
export type CircleInvitationDTO = {
    id?: number;
    from: UserDTO;
    circle: CircleDTO;
    sentAt?: string;
};

