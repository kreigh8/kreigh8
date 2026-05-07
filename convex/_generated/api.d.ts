/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as about from "../about.js";
import type * as auth from "../auth.js";
import type * as clients from "../clients.js";
import type * as email from "../email.js";
import type * as experience from "../experience.js";
import type * as home from "../home.js";
import type * as homeImage from "../homeImage.js";
import type * as image from "../image.js";
import type * as resume from "../resume.js";
import type * as skills from "../skills.js";
import type * as social from "../social.js";
import type * as technology from "../technology.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  about: typeof about;
  auth: typeof auth;
  clients: typeof clients;
  email: typeof email;
  experience: typeof experience;
  home: typeof home;
  homeImage: typeof homeImage;
  image: typeof image;
  resume: typeof resume;
  skills: typeof skills;
  social: typeof social;
  technology: typeof technology;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  resend: import("@convex-dev/resend/_generated/component.js").ComponentApi<"resend">;
};
