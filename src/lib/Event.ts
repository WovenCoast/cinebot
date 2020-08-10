import { CineClient } from "./Client";


interface EventOptions {
    name: string;
    eventName: string;
}

export class Event {
    private options: EventOptions;
    public client: CineClient;

    constructor(options: EventOptions) {
        this.options = options;
    }
}