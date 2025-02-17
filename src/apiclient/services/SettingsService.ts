/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangePasswordDTO } from "../models/ChangePasswordDTO";
import type { UserSettingsDTO } from "../models/UserSettingsDTO";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class SettingsService {
  /**
   * Allows a user to retrieve their settings
   * @returns UserSettingsDTO OK
   * @throws ApiError
   */
  public static getUserSettings(): CancelablePromise<UserSettingsDTO> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/settings",
      errors: {
        404: `Not Found`,
      },
    });
  }
  /**
   * Allows a user to update their settings
   * @param requestBody
   * @returns any OK
   * @throws ApiError
   */
  public static updateUserSettings(
    requestBody: UserSettingsDTO
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/settings",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Allows a user to change their password by providing the old password, a new password and a confirmation of the new password
   * @param requestBody
   * @returns any OK
   * @throws ApiError
   */
  public static changePassword(
    requestBody: ChangePasswordDTO
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/settings/change-password",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        401: `Unauthorized`,
      },
    });
  }
}
