import { MessageFlags } from "discord.js";
import { Birthday } from "../database/birthday";
import type { Command } from "./types";

export default {
	description: "Clear your birthday",
	environment: "guild",
	permissions: [],
	run: async (interaction) => {
		await Birthday.remove(interaction.user.id);
		interaction.reply({
			content: "Your birthday has been removed from the database.",
			flags: [MessageFlags.Ephemeral],
		});
	},
} satisfies Command<"guild">;
