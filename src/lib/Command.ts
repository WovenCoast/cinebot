interface CommandOptions {
    name: string;
    aliases: string[];
}

export class Command {
    private options: CommandOptions;

    constructor(options: CommandOptions) {
        this.options = options;
    }
}