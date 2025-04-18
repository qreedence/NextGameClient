/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CircleMemberRole } from './CircleMemberRole';
import type { UserDTO } from './UserDTO';
export type CircleMemberDTO = {
    user: UserDTO;
    role: CircleMemberRole;
    joinedAt?: string;
    leftAt?: string | null;
    circleId?: string;
};

