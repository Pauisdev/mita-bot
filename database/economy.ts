import { db } from "./database";

async function addMoney(userId: string) {
	const INCREMENT_AMOUNT = 5;
	await db
		.insertInto("economy")
		.values({ user_id: userId, amount: INCREMENT_AMOUNT })
		.onConflict((oc) =>
			oc.column("user_id").doUpdateSet((eb) => ({
				amount: eb("economy.amount", "+", INCREMENT_AMOUNT),
			})),
		)
		.execute();
}

async function queryAmount(userId: string) {
	return await db
		.selectFrom("economy")
		.select("amount")
		.where("user_id", "=", userId)
		.executeTakeFirst()
		.then((rows) => rows?.amount ?? 0);
}

export namespace Economy {
	export function of(userId: string) {
		return {
			addMoney: () => addMoney(userId),
			queryAmount: () => queryAmount(userId),
		};
	}
}
