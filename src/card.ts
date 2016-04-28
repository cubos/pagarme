import PagarMe from "./pagarme.ts";
import {Endpoint} from "./base.ts";
import {Card} from "./objects.ts";

export class LazyCardCollection {
    constructor(private pagarme: PagarMe) { }

    insert(cardHash: string) {
        return new Endpoint<Card>(`cards`, {api_key: this.pagarme.api_key, card_hash: cardHash}, "POST");
    }
}

export class LazyCardObject extends Endpoint<Card> {

}
