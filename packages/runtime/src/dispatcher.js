export class Dispatcher {
    #subscribers = new Map();
    #afters = [];

    subscribe(command, handler) {
        if (!this.#subscribers.has(command)) {
            this.#subscribers.set(command, []);
        }
        const handlers = this.#subscribers.get(command);
        if (handlers.includes(handler)) {
            return () => {};
        }
        handlers.push(handler);
        return () => {
            const index = handlers.indexOf(handler);
            if (index < 0) {
                return;
            }
            handlers.splice(index, 1);
        };
    }

    afterEveryCommand(handler) {
        this.#afters.push(handler);
        return () => {
            const index = this.#afters.indexOf(handler);
            if (index < 0) {
                return;
            }
            this.#afters.splice(index, 1);
        };
    }

    dispatch(command, payload) {
        if (!this.#subscribers.has(command)) {
            return;
        }
        for(const handler of this.#subscribers.get(command)) {
            handler(payload);
        }
        for(const handler of this.#afters) {
            handler(payload);
        }
    }
}