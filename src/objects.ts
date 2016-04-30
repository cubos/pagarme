
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

export interface Transaction {
    object: "transaction";
    status: "processing" | "authorized" | "paid" | "refunded" | "waiting_payment" | "pending_refund" | "refused";
    status_reason: "acquirer" | "antifraud" | "internal_error" | "no_acquirer" | "acquirer_timeout";
    acquirer_name: "development" | "pagarme" | "stone" | "cielo" | "rede" | "mundipagg";
    acquirer_response_code: string;
    authorization_code: string;
    soft_descriptor: string;
    tid: string;
    nsu: string;
    date_created: Date;
    date_updated: Date;
    amount: number;
    installments: number;
    id: number;
    cost: number;
    postback_url: string;
    payment_method: "credit_card" | "boleto";
    boleto_url: string;
    boleto_barcode: string;
    boleto_expiration_date: Date;
    referer: string;
    ip: string;
    subscription_id: number;
    phone: Phone;
    address: Address;
    customer: Customer;
    card: Card;
    metadata: { [field: string]: any; };
}

export interface Phone {
    object: "phone";
    id: number;
    ddi: string;
    ddd: string;
    number: string;
}

export interface Address {
    object: "address";
    street: string;
    complementary: string;
    street_number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    id: number;
}

export interface Customer {
    object: "customer";
    document_number: string;
    document_type: "cpf" | "cnpj";
    name: string;
    email: string;
    born_at: Date;
    gender: "M" | "F";
    date_created: Date;
    id: string;
    phones: Phone[];
    addresses: Address[];
}

export interface Subscription {
    object: "subscription";
    plan: Plan;
    id: number;
    current_transaction: Transaction;
    postback_url: string;
    payment_method: "credit_card" | "boleto";
    current_period_start: string;
    current_period_end: string;
    charges: number;
    status: "trialing" | "paid" | "pending_payment" | "unpaid" | "canceled" | "ended";
    date_created: Date;
    phone: Phone;
    address: Address;
    customer: Customer;
    card: Card;
    metadata: { [field: string]: any; };
}

export interface Payable {
    object: "payable";
    id: number;
    status: "waiting_funds" | "paid";
    amount: number;
    fee: number;
    installment: number;
    transaction_id: number;
    split_rule_id: string;
    payment_date: string;
    type: "credit" | "refund" | "chargeback";
    date_created: Date;
}

export interface Balance {
    object: "balance";
    waiting_funds: {
        amount: number;
    };
    available: {
        amount: number;
    };
    transferred: {
        amount: number;
    };
}

export interface BalanceOperation {
    object: "balance_operation";
    id: string;
    status: "waiting_funds" | "available" | "transferred";
    balance_amount: number;
    movement_type: "payable" | "transaction" | "anticipation";
    amount: number;
    fee: number;
    date_created: Date;
    movement_object: Payable | Transaction | BulkAnticipation;
}

export interface BulkAnticipation {
    object: "bulk_anticipation";
    id: string;
    status: "building" | "pending" | "approved" | "refused" | "canceled";
    timeframe: "start" | "end";
    payment_date: Date;
    amount: number;
    fee: number;
    anticipation_fee: number;
}

export interface BankAccount {
    object: "bank_account";
    id: string;
    bank_code: string;
    agencia: string;
    agencia_dv: string;
    conta: string;
    conta_dv: string;
    document_type: "cpf" | "cnpj";
    document_number: string;
    legal_name: string;
    date_created: Date;
}

export interface Recipient {
    object: "recipient";
    id: string;
    bank_account: BankAccount;
    transfer_enabled: boolean;
    last_transfer: string;
    transfer_interval: "daily" | "weekly" | "monthly";
    transfer_day: number;
    automatic_anticipation_enabled: boolean;
    anticipatable_volume_percentage: number;
    date_created: Date;
    date_updated: Date;
}

export interface SplitRule {
    object: "split_rule";
    id: string;
    recipient_id: string;
    charge_processing_fee: boolean;
    liable: boolean;
    percentage: number;
    amount: number;
    date_created: Date;
    date_updated: Date;
}

export interface Transfer {
    object: "transfer";
    id: number;
    amount: number;
    type: "ted" | "doc" | "credito_em_conta";
    status: "pending_transfer" | "transferred" | "failed" | "processing" | "canceled";
    fee: number;
    funding_date: Date;
    funding_estimated_date: Date;
    transaction_id: number;
    bank_account: BankAccount;
    date_created: Date;
}

export interface ZipCode {
    neighborhood: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
}
