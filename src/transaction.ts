import PagarMe from "./pagarme";
import {Endpoint} from "./base";
import {CardHashKey} from "./objects";

export class LazyTransactionCollection {
    constructor(private pagarme: PagarMe) { }

    cardHashKey() {
        return new Endpoint<CardHashKey>(`transactions/card_hash_key`, {encryption_key: this.pagarme.encryption_key});
    }
}
