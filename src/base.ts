import rest from "rest";

export abstract class LazyPromise<T> {
    protected abstract async do(): Promise<T>;

    async then<U>(onFulfilled: (value: T) => U, onRejected?: (reason: any) => U): Promise<U> {
        try {
            const result = await this.do();
            return await onFulfilled(result);
        } catch (err) {
            if (typeof onRejected === "function") {
                return await onRejected(err);
            } else {
                throw err;
            }
        }
    }
}

export abstract class LazyPromiseArray<T> extends LazyPromise<T[]> {
    abstract async forEach(callback: (obj: T) => void): Promise<void>;

    protected async do() {
        const array: T[] = [];
        await this.forEach(obj => array.push(obj));
        return array;
    }
}

const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
export class Endpoint<T> extends LazyPromise<T> {
    constructor(protected path: string, protected params: any, private method = "GET") {
        super();
    }

    private fixDates(obj: any) {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (typeof(obj[prop]) === "string" && isoDateRegex.test(obj[prop])) {
                    obj[prop] = new Date(obj[prop]);
                } else if (typeof(obj[prop]) === "object") {
                    this.fixDates(obj[prop]);
                }
            }
        }
    }

    protected async do() {
        const request = {
            method: this.method,
            path: `https://api.pagar.me/1/${this.path}`,
            params: this.params
        };
        const body = (await rest(request)).entity;
        const result = JSON.parse(body);
        if (result.errors) {
            const err = result.errors[0];
            throw new Error(`PagarMe: ${err.type}: ${err.message}`);
        }
        this.fixDates(result);
        return result;
    }
}
