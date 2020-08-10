import { Message } from "discord.js";

interface CineMessageOptions {

}

export class CineMessage {
    public rawMsg;
    public options: CineMessageOptions;
    constructor(msg: Message, options?: CineMessageOptions) {
        this.rawMsg = msg;
        this.options = options;
    }
}