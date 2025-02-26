/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NotificationDTO } from '../models/NotificationDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NotificationService {
    /**
     * Marks a notification as seen.
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static markNotificationAsSeen(
        id?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/notifications',
            query: {
                'id': id,
            },
        });
    }
    /**
     * Gets the logged in user's notifications.
     * @returns NotificationDTO OK
     * @throws ApiError
     */
    public static getNotifications(): CancelablePromise<Array<NotificationDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/notifications',
        });
    }
}
