import {
	type ButtonInteraction,
	type CacheType,
	MessageFlags,
} from "discord.js";
import { CARTRIDGE_EMOJI } from "../../consts";
import { Economy } from "../../database/economy";

export async function handleShopInteraction(
	interaction: ButtonInteraction<CacheType>,
) {
	const id = interaction.customId.slice("shop_".length);
	if (id === "check_balance") {
		const economy = Economy.of(interaction.user.id);
		const balance = await economy.queryBalance();
		await interaction.reply({
			content: `You currently have ${balance} ${CARTRIDGE_EMOJI}`,
			flags: [MessageFlags.Ephemeral],
		});
	}
}
