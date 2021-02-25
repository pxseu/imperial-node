/* eslint @typescript-eslint/ban-ts-comment:0 */

import { Imperial } from "../lib";

const { IMPERIAL_TOKEN } = process.env;

let documentToDelete = "";

describe("deleteDocument", () => {
	if (!IMPERIAL_TOKEN) throw new Error("Env was not preparerd");

	beforeAll(async () => {
		const api = new Imperial(IMPERIAL_TOKEN);

		try {
			const res = await api.createDocument("test jest bro");
			if (!res.success) throw new Error("Failed to prepare tests.");
			documentToDelete = res.formattedLink;
		} catch (e) {
			throw new Error("Failed to prepare tests.");
		}
	});

	it("valid with token", async () => {
		const api = new Imperial(IMPERIAL_TOKEN);

		const res = await api.deleteDocument(documentToDelete);
		expect(res.success).toBeTruthy();
		expect(/^successfully(a-zA-Z\s)*/i.test(res.message)).toBeTruthy();
	}, 10000); // timeout 10s

	it("valid without token", async () => {
		const api = new Imperial();

		await expect(
			(async () => {
				await api.deleteDocument("test jest bro");
			})()
		).rejects.toThrow(new Error("This method requires a token to be set in the constructor!"));
	}, 10000); // timeout 10s

	it("invalid - data with wrong type", async () => {
		const api = new Imperial(IMPERIAL_TOKEN);
		await expect(
			(async () => {
				// @ts-ignore
				await api.deleteDocument({});
				// @ts-ignore
				await api.deleteDocument([]);
				// @ts-ignore
				await api.deleteDocument(12345);
				// @ts-ignore
				await api.deleteDocument(() => {}); // eslint-disable-line @typescript-eslint/no-empty-function
			})()
		).rejects.toThrow(new TypeError("Parameter `id` must be a string or an URL!"));
	});

	it("invalid - no data", async () => {
		const api = new Imperial(IMPERIAL_TOKEN);

		await expect(
			(async () => {
				//@ts-ignore
				await api.deleteDocument();
			})()
		).rejects.toThrow(new Error("No `id` was provided!"));
	});
});
