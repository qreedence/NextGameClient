/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FileUploadRequestPayload } from "../models/FileUploadRequestPayload";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class UploadThingService {
  /**
   * @returns any OK
   * @throws ApiError
   */
  public static getApiUploadthing(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/uploadthing",
    });
  }
  /**
   * @param requestBody
   * @param slug
   * @param actionType
   * @returns any OK
   * @throws ApiError
   */
  public static postApiUploadthing(
    requestBody: FileUploadRequestPayload,
    slug?: string,
    actionType?: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/uploadthing",
      query: {
        slug: slug,
        actionType: actionType,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * @returns any OK
   * @throws ApiError
   */
  public static postApiUploadthingCallback(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/uploadthing/callback",
    });
  }
}
