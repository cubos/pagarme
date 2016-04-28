import PagarMe from "./pagarme.ts";
import {Endpoint} from "./base.ts";
import {CardHashKey} from "./objects.ts";

export class LazyTransactionCollection {
    constructor(private pagarme: PagarMe) { }

    cardHashKey() {
        return new Endpoint<CardHashKey>(`transactions/card_hash_key`, {encryption_key: this.pagarme.encryption_key});
    }
}
