import {
	ApplicationCommandOptionType,
	MessageFlags,
	PermissionFlagsBits,
} from "discord.js";
import { BIRTHDAY_ROLE_ID } from "../consts";
import { Birthday, getToday } from "../database/birthday";
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
		const today = getToday();
		await Birthday.setBirthday({
			guildId: interaction.guild.id,
			userId: interaction.user.id,
			day: today.day,
			month: today.month,
		});
		await interaction.reply({
			content: "Birthday role given!",
			flags: MessageFlags.Ephemeral,
		});
	},
} satisfies Command<"guild">;
