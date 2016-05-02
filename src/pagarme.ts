import querystring from "querystring";
import crypto from "crypto";
import constants from "constants";
import {LazyPlanCollection, LazyPlanObject} from "./plan";
import {LazyCardCollection, LazyCardObject} from "./card";
import {LazyBankAccountCollection, LazyBankAccountObject} from "./bank_account";
import {LazyTransactionCollection} from "./transaction";

export const PAGE_SIZE = 30;

export default class PagarMe {
    constructor(public api_key: string, public encryption_key: string) { }

    get cards() {
        return new LazyCardCollection(this);
    }

    get plans() {
        return new LazyPlanCollection(this);
    }

    get transactions() {
        return new LazyTransactionCollection(this);
    }

    get bankAccounts() {
        return new LazyBankAccountCollection(this);
    }

    card(id: string) {
        return new LazyCardObject(`cards/${id}`, {api_key: this.api_key});
    }

    plan(id: number) {
        return new LazyPlanObject(`plans/${id}`, {api_key: this.api_key});
    }

    bankAccount(id: number) {
        return new LazyBankAccountObject(`bank_accounts/${id}`, {api_key: this.api_key});
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
