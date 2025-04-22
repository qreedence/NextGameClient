/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddGameToCircleRequestDTO } from "../models/AddGameToCircleRequestDTO";
import type { CircleDTO } from "../models/CircleDTO";
import type { CircleGameDTO } from "../models/CircleGameDTO";
import type { CircleInvitationDTO } from "../models/CircleInvitationDTO";
import type { GameStatus } from "../models/GameStatus";
import type { GameSuggestionDTO } from "../models/GameSuggestionDTO";
import type { GameVoteStatus } from "../models/GameVoteStatus";
import type { UserToInviteToCircleDTO } from "../models/UserToInviteToCircleDTO";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class CircleService {
  /**
   * Get a circle by ID.
   * @param circleId
   * @returns CircleDTO OK
   * @throws ApiError
   */
  public static getCircleById(circleId?: string): CancelablePromise<CircleDTO> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/circle",
      query: {
        circleId: circleId,
      },
      errors: {
        400: `Bad Request`,
        404: `Not Found`,
      },
    });
  }
  /**
   * Get a list of circles which the user is a part of.
   * @returns CircleDTO OK
   * @throws ApiError
   */
  public static getCirclesByUser(): CancelablePromise<Array<CircleDTO>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/circle/by-user",
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
      },
    });
  }
  /**
   * Suggest a game to a circle.
   * @param circleId
   * @param gameId
   * @param gameName
   * @param gameCoverUrl
   * @returns any OK
   * @throws ApiError
   */
  public static suggestGame(
    circleId?: string,
    gameId?: number,
    gameName?: string,
    gameCoverUrl?: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/circle/suggest",
      query: {
        circleId: circleId,
        gameId: gameId,
        gameName: gameName,
        gameCoverUrl: gameCoverUrl,
      },
    });
  }
  /**
   * Vote for a game in the suggestion queue.
   * @param gameSuggestionId
   * @param gameVoteStatus
   * @returns any OK
   * @throws ApiError
   */
  public static voteForGame(
    gameSuggestionId?: number,
    gameVoteStatus?: GameVoteStatus
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/circle/vote",
      query: {
        gameSuggestionId: gameSuggestionId,
        gameVoteStatus: gameVoteStatus,
      },
    });
  }
  /**
   * Adds a game to a list in a circle.
   * @param requestBody
   * @returns any OK
   * @throws ApiError
   */
  public static addGame(
    requestBody: AddGameToCircleRequestDTO
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/circle/add-game",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Edit game status of a circle game.
   * @param circleGameId
   * @param gameStatus
   * @returns any OK
   * @throws ApiError
   */
  public static changeGameStatus(
    circleGameId?: number,
    gameStatus?: GameStatus
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/circle/change-game-status",
      query: {
        circleGameId: circleGameId,
        gameStatus: gameStatus,
      },
    });
  }
  /**
   * Get all games for circle.
   * @param circleId
   * @returns CircleGameDTO OK
   * @throws ApiError
   */
  public static getCircleGames(
    circleId?: string
  ): CancelablePromise<Array<CircleGameDTO>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/circle/games",
      query: {
        circleId: circleId,
      },
    });
  }
  /**
   * Get all games in the suggestion queue for a circle.
   * @param circleId
   * @returns GameSuggestionDTO OK
   * @throws ApiError
   */
  public static getSuggestedGames(
    circleId?: string
  ): CancelablePromise<Array<GameSuggestionDTO>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/circle/suggested",
      query: {
        circleId: circleId,
      },
    });
  }
  /**
   * Lets a user create a circle
   * @param circleName
   * @returns any OK
   * @throws ApiError
   */
  public static createCircle(circleName?: string): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/circle/create",
      query: {
        circleName: circleName,
      },
      errors: {
        400: `Bad Request`,
      },
    });
  }
  /**
   * Find a list of friends to invite to a circle. Will not show friends that are already active members of the circle.
   * @param circleId
   * @param username
   * @returns UserToInviteToCircleDTO OK
   * @throws ApiError
   */
  public static findFriendsToInvite(
    circleId?: string,
    username?: string
  ): CancelablePromise<Array<UserToInviteToCircleDTO>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/circle/find-friends-to-invite",
      query: {
        circleId: circleId,
        username: username,
      },
    });
  }
  /**
   * Lets a user invite a friend a circle
   * @param circleId
   * @param username
   * @returns any OK
   * @throws ApiError
   */
  public static inviteToCircle(
    circleId?: string,
    username?: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/circle/invite",
      query: {
        circleId: circleId,
        username: username,
      },
      errors: {
        400: `Bad Request`,
      },
    });
  }
  /**
   * Get a specific circle invitation by id
   * @param circleInvitationId
   * @returns CircleInvitationDTO OK
   * @throws ApiError
   */
  public static getCircleInvitationById(
    circleInvitationId?: number
  ): CancelablePromise<CircleInvitationDTO> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/circle/invitation-by-id",
      query: {
        circleInvitationId: circleInvitationId,
      },
    });
  }
  /**
   * Get a circle invitation by circleId and user
   * @param circleId
   * @returns CircleInvitationDTO OK
   * @throws ApiError
   */
  public static getCircleInvitation(
    circleId?: string
  ): CancelablePromise<CircleInvitationDTO> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/circle/invitation",
      query: {
        circleId: circleId,
      },
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        404: `Not Found`,
      },
    });
  }
  /**
   * Let a user respond to a circle invitation
   * @param circleInvitationId
   * @param response
   * @returns any OK
   * @throws ApiError
   */
  public static invitationResponse(
    circleInvitationId?: number,
    response?: boolean
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/circle/invitation-response",
      query: {
        circleInvitationId: circleInvitationId,
        response: response,
      },
      errors: {
        400: `Bad Request`,
      },
    });
  }
  /**
   * Allow a user to leave a circle
   * @param circleId
   * @returns any OK
   * @throws ApiError
   */
  public static leaveCircle(circleId?: string): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/circle/leave",
      query: {
        circleId: circleId,
      },
      errors: {
        401: `Unauthorized`,
        404: `Not Found`,
      },
    });
  }
}
