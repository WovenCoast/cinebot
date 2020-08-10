import { CineClient } from "./Client";
import { timeStamp } from "console";

interface CommandOptions {
    name: string;
    aliases: string[];
}

export class Command {
    private options: CommandOptions;
    private client: CineClient;

    name: string;
    aliases: string[];

    constructor(options: CommandOptions) {
        this.options = options;
    }

    async _init(client: CineClient, defaultOptions: CommandOptions) {
        this.client = client;
        this.options = Object.assign(defaultOptions, this.options);

        this.name = this.options.name;
        this.aliases = [...(new Set([this.options.name, ...this.options.aliases]))];
    }
}