import PagarMe from "./pagarme";
import {PAGE_SIZE} from "./pagarme";
import {LazyPromiseArray, Endpoint} from "./base";
import {BankAccount} from "./objects";

export class LazyBankAccountCollection extends LazyPromiseArray<BankAccount> {
    constructor(private pagarme: PagarMe) {
        super();
    }

    async forEach(callback: (bankAccount: BankAccount) => void) {
        let page = 1;
        while (true) {
            const bankAccounts = await new Endpoint<BankAccount[]>(`bankAccounts`, {
                api_key: this.pagarme.api_key,
                page: page,
                count: PAGE_SIZE
            });
            bankAccounts.forEach(callback);
            if (bankAccounts.length < PAGE_SIZE) break;
            page += 1;
        }
    }

    insert(obj: BankAccountInsert) {
        return new Endpoint<BankAccount>(`bankAccounts`, Object.assign({}, {api_key: this.pagarme.api_key}, obj), "POST");
    }
}

export class LazyBankAccountObject extends Endpoint<BankAccount> {
}

export interface BankAccountInsert {
    bank_code: string;
    agencia: string;
    agencia_dv: string;
    conta: string;
    conta_dv: string;
    document_type: "cpf" | "cnpj";
    document_number: string;
    legal_name: string;
}
