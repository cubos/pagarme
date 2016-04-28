import rest from "rest";
import querystring from "querystring";
import crypto from "crypto";
import constants from "constants";

export default class PagarMe {
    constructor(public api_key: string, public encryption_key: string) { }

    get cards() {
        return new CardCollection(this);
    }

    get transactions() {
        return new TransactionCollection(this);
    }

    async cardHash(card: CardData) {
        const plain = querystring.stringify(card);
        const key = await this.transactions.cardHashKey();
        const rsa = (crypto as any).publicEncrypt({key: key.public_key, padding: constants.RSA_PKCS1_PADDING}, new Buffer(plain));
        return key.id + "_" + rsa.toString("base64");
    }
}

export interface CardData {
    card_number: string;
    card_holder_name: string;
    card_expiration_date: string;
    card_cvv: string;
}

export class CardCollection {
    constructor(private pagarme: PagarMe) {}

    get(id: string) {
        return new Endpoint<Card>(`cards/${id}`, {api_key: this.pagarme.api_key});
    }

    insert(cardHash: string) {
        return new Endpoint<Card>(`cards`, {api_key: this.pagarme.api_key, card_hash: cardHash}, "POST");
    }
}

export interface Card {
    id: string;
    date_created: string;
    date_updated: string;
    brand: string;
    holder_name: string;
    first_digits: string;
    last_digits: string;
    country: string;
    fingerprint: string;
    customer?: Customer;
    valid: boolean;
}

export interface Customer {

}

export class TransactionCollection {
    constructor(private pagarme: PagarMe) {}

    cardHashKey() {
        return new Endpoint<CardHashKey>(`transactions/card_hash_key`, {encryption_key: this.pagarme.encryption_key});
    }
}

export interface CardHashKey {
    date_created: string;
    id: number;
    ip: string;
    public_key: string;
}

export class Endpoint<T> {
    constructor(private path: string, private params: any, private method = "GET") { }

    private async do() {
        const request = {
            method: this.method,
            path: `https://api.pagar.me/1/${this.path}`,
            params: this.params
        };
        const result = JSON.parse((await rest(request)).entity);
        if (result.errors) {
            const err = result.errors[0];
            throw new Error(`PagarMe: ${err.type}: ${err.message}`);
        }
        return result;
    }

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
