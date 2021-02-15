/**
 *  Global interfaces that the user can import
 */

/**
 *  `postCode` response that gets return from the Wrapper
 */
export interface ImperialResponseCreateDocument {
	success: boolean;
	documentId: string;
	rawLink: string;
	formattedLink: string;
	expiresIn: string;
	instantDelete: boolean;
}

/**
 *  `getCode` response that gets return from the Wrapper
 */
export interface ImperialResponseGetDocument {
	success: boolean;
	document: string;
}

/**
 *  Common responses that get returned from the server
 */
export interface ImperialResponseCommon {
	success: boolean;
	message: string;
}

/**
 *  Options that a user can pass in the `opts` object
 */
export interface postOptions {
	longerUrls?: boolean;
	instantDelete?: boolean;
	imageEmbed?: boolean;
	expiration?: number;
}
