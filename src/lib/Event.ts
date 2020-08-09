interface EventOptions {
    name: string;
    aliases: string[];
}

export class Event {
    private options: EventOptions;

    constructor(options: EventOptions) {
        this.options = options;
    }
}