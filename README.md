# [Pagar.me](pagar.me) API for NodeJS

This is a very early stage of development, very few is supported and API will likely change.

This package uses promises and is targeted at ES6. It includes TypeScript definitions.


##Example:

```javascript
const pagarme = new PagarMe("api_key", "encryption_key");

const card_data = {
    card_number: "4901720080344448",
    card_holder_name: "Usuario de Teste",
    card_expiration_date: "1219",
    card_cvv: "314"
};

// Encrypt the card data so that it is never sent over the network in plain
const card_hash = await pagarme.cardHash(card_data);

const inserted_card = await pagarme.cards.insert(card_hash);
const retrieved_card = await pagarme.card(inserted_card.id);

// inserted_card == retrieved_card
```
