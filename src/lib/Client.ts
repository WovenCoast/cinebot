import { Client, ClientOptions as DiscordClientOptions } from "discord.js";

const defaultCineClientOptions = {
    token: undefined,
}
interface CineClientOptions {
    token: string;
}

export class CineClient extends Client {
    private cineOptions: CineClientOptions;

    constructor(options: CineClientOptions, discordOptions?: DiscordClientOptions) {
        super(discordOptions);
        this.cineOptions = Object.assign(options);
    }

    login() {
        try {
            if (!this.cineOptions.token) {
                throw new Error(`Client options token, expected string, got ${this.cineOptions.token}`);
            }
            return super.login(this.cineOptions.token);
        } catch (e) {
            console.error(e);
            process.exit(0);
        }
    }
}