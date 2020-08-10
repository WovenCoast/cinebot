import { Client, ClientOptions as DiscordClientOptions } from "discord.js";
import { CommandHandler } from "./CommandHandler";

const defaultCineClientOptions = {
    token: undefined,
    commandsDir: "./commands",
    eventsDir: "./events",
    editTimeout: 1.5 * (60 * 1e3) // 1.5 minutes
}
export interface CineClientOptions {
    token: string;
    commandsDir: string;
    eventsDir: string;
    editTimeout: number;
}

export class CineClient extends Client {
    public config: CineClientOptions;
    public commandHandler: CommandHandler;

    constructor(options: CineClientOptions, discordOptions?: DiscordClientOptions) {
        super(discordOptions);
        this.config = Object.assign(defaultCineClientOptions, options);
        this.commandHandler = new CommandHandler(this);
    }

    login(token?: string): Promise<string> {
        return super.login(token || this.config.token);
    }
}