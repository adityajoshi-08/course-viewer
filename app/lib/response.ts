import { NextResponse } from "next/server";

/**
 * Wraps a response object from `responseBuilder` and returns a NextResponse,
 * using the embedded `status` field for the HTTP response code.
 *
 * ⚠️ This function is designed **only** to work with objects created by `responseBuilder.success()` or `responseBuilder.error()`.
 * Using it with other objects may lead to incorrect status codes or unexpected behavior.
 *
 * @param body - The response object from `responseBuilder`
 * @returns A `NextResponse` with the correct status code and response body.
 */
export function jsonResponse(body: any) {
  const status = body?.status ?? 200;
  return NextResponse.json(body, { status });
}

/**
 * A utility for building standardized API responses.
 *
 * - `success`: returns a successful response with data.
 * - `error`: returns a failed response with an error message.
 *
 * Each response includes:
 * - `status` (HTTP status code),
 * - `success` (boolean),
 * - `error` (null or string),
 * - `data` (payload),
 * - `timestamp` (ISO string).
 */
const responseBuilder = {
  /**
   * Creates a standardized success response.
   * @param data - The data payload to return.
   * @param status - Optional HTTP status code (default is 200).
   */
  success<T>(data: T, status = 200) {
    return {
      status,
      success: true,
      error: null,
      data,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Creates a standardized error response.
   * @param message - Error message to return.
   * @param status - Optional HTTP status code (default is 500).
   */
  error(message: string, status = 500) {
    return {
      status,
      success: false,
      error: message,
      data: null,
      timestamp: new Date().toISOString(),
    };
  },
};

export default responseBuilder;
