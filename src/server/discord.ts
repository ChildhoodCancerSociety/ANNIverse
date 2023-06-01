import {
  Client,
  GatewayDispatchEvents,
  GatewayIntentBits,
  InteractionType,
  MessageFlags,
} from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { WebSocketManager } from "@discordjs/ws";

const token = "";

// Create REST and WebSocket managers directly
const rest = new REST({ version: "10" }).setToken(token);

const gateway = new WebSocketManager({
  token,
  intents:
    // bitwise OR here is the equivalent of just adding these enum values up (every value is a distince power of 2, aka we're just flipping integer bits)
    // eslint-disable-next-line no-bitwise
    GatewayIntentBits.Guilds |
    GatewayIntentBits.GuildMembers |
    GatewayIntentBits.GuildWebhooks |
    GatewayIntentBits.GuildInvites |
    GatewayIntentBits.GuildMessages |
    GatewayIntentBits.GuildMessageReactions |
    GatewayIntentBits.MessageContent,
  rest,
});

// Create a client to emit relevant events.
const client = new Client({ rest, gateway });

// Listen for interactions
// Each event contains an `api` prop along with the event data that allows you to interface with the Discord REST API
client.on(
  GatewayDispatchEvents.InteractionCreate,
  async ({ data: interaction, api }) => {
    if (
      interaction.type !== InteractionType.ApplicationCommand ||
      interaction.data.name !== "ping"
    ) {
      return;
    }

    await api.interactions.reply(interaction.id, interaction.token, {
      content: "Pong!",
      flags: MessageFlags.Ephemeral,
    });
  }
);

client.on(GatewayDispatchEvents.GuildMemberAdd, async ({ data, api }) => {
  console.log(data);
  if (data.user) {
    const channel = await api.users.createDM(data.user.id);
    await api.channels.createMessage(channel.id, { content: "Hello, world!" });
  }
});

// Listen for the ready event
client.once(GatewayDispatchEvents.Ready, () => console.info("Ready!"));

// Start the WebSocket connection.
(async () => {
  try {
    await gateway.connect();
  } catch (e) {
    console.error(e);
  }
})();
