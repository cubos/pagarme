import querystring from "querystring";
import crypto from "crypto";
import constants from "constants";
import {LazyPlanCollection, LazyPlanObject} from "./plan.ts";
import {LazyCardCollection, LazyCardObject} from "./card.ts";
import {LazyTransactionCollection} from "./transaction.ts";

export const PAGE_SIZE = 30;

export default class PagarMe {
    constructor(public api_key: string, public encryption_key: string) { }

    get cards() {
        return new LazyCardCollection(this);
    }

    get plans() {
        return new LazyPlanCollection(this);
    }

    card(id: string) {
        return new LazyCardObject(`cards/${id}`, {api_key: this.api_key});
    }

    plan(id: number) {
        return new LazyPlanObject(`plans/${id}`, {api_key: this.api_key});
    }

    get transactions() {
        return new LazyTransactionCollection(this);
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
