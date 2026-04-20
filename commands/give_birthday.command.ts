import {
	ApplicationCommandOptionType,
	MessageFlags,
	PermissionFlagsBits,
} from "discord.js";
import { BIRTHDAY_ROLE_ID } from "../consts";
import type { Command } from "./types";

export default {
	description: "Celebrate a user's birthday!",
	environment: "guild",
	permissions: [PermissionFlagsBits.Administrator],
	options: [
		{
			name: "user",
			description: "User to give the role to",
			type: ApplicationCommandOptionType.User,
			required: true,
		},
	],
	run: async (interaction) => {
		const user = interaction.options.getUser("user", true);
		const member = await interaction.guild.members.fetch(user.id);

		await member.roles.add(BIRTHDAY_ROLE_ID);

		await interaction.reply({
			content: "Birthday role given!",
			flags: MessageFlags.Ephemeral,
		});
	},
} satisfies Command<"guild">;
