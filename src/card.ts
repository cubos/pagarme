import PagarMe from "./pagarme";
import {Endpoint} from "./base";
import {Card} from "./objects";

export class LazyCardCollection {
    constructor(private pagarme: PagarMe) { }

    insert(cardHash: string) {
        return new Endpoint<Card>(`cards`, {api_key: this.pagarme.api_key, card_hash: cardHash}, "POST");
    }
}

export class LazyCardObject extends Endpoint<Card> {

}
