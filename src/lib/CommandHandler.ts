import { CineClient, CineClientOptions } from "./Client";
import { Command } from "./Command";
import path from "path";
import fs from "fs";
import { Message } from "discord.js";
import { CineMessage } from "./CineMessage";

export class CommandHandler {
    private client: CineClient;
    private commands: Map<string, Command>;
    constructor(client: CineClient) {
        this.client = client;
        this.commands = new Map();
        this.client.on('message', (msg) => {
            this.handleMessage(new CineMessage(msg));
        });
        this.client.on('messageUpdate', async (oldMsg: Message, newMsg: Message) => {
            if (oldMsg.partial) oldMsg = await oldMsg.fetch();
            if (newMsg.partial) newMsg = await newMsg.fetch();
            if (oldMsg.content == newMsg.content) return;
            if ((Date.now() - this.client.config.editTimeout) >= oldMsg.createdTimestamp) return;
            this.handleMessage(new CineMessage(newMsg));
        });
    }
    async registerCommands(commandsDir: string) {
        if (!path.isAbsolute(commandsDir)) commandsDir = path.join(__dirname, "..", commandsDir);
        const dir = await fs.promises.opendir(commandsDir);
        for await (const dirent of dir) {
            if (dirent.isDirectory()) this.registerCommands(path.join(commandsDir, dirent.name));
            if (dirent.isFile()) {
                const commandClass = require(path.join(commandsDir, dirent.name)).default;
                const command: Command = new commandClass();
                await command._init(this.client, {
                    name: dirent.name.split('.')[0],
                    aliases: []
                });
                this.commands.set(command.name, command);
            }
        }
    }
    handleMessage(message: CineMessage) {

    }
}