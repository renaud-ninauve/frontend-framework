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
        return () => unsubscribe(handlers, handler);
    }

    afterEveryCommand(handler) {
        this.#afters.push(handler);
        return () => unsubscribe(this.#afters, handler);
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

function unsubscribe(handlers, handler) {
    const index = handlers.indexOf(handler);
    if (index < 0) {
        return;
    }
    handlers.splice(index, 1);
}