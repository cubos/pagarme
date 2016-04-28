
export interface CardHashKey {
    date_created: string;
    id: number;
    ip: string;
    public_key: string;
}

export interface Plan {
    object: "plan";
    id: number;
    amount: number;
    days: number;
    name: string;
    trial_days: number;
    date_created: Date;
    payment_methods: ("boleto" | "credit_card")[];
    color?: string;
    charges: number;
    installments: number;
}

export interface Card {
    object: "card";
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
