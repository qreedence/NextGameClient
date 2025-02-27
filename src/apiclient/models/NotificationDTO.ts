/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NotificationType } from './NotificationType';
export type NotificationDTO = {
    id?: string;
    type: NotificationType;
    data: string;
    avatarUrl?: string | null;
    actionUrl?: string;
    seen?: boolean;
    createdAt?: string;
};

