import PagarMe from "./pagarme";
import {PAGE_SIZE} from "./pagarme";
import {LazyPromiseArray, Endpoint} from "./base";
import {Plan} from "./objects";

export class LazyPlanCollection extends LazyPromiseArray<Plan> {
    constructor(private pagarme: PagarMe) {
        super();
    }

    async forEach(callback: (plan: Plan) => void) {
        let page = 1;
        while (true) {
            const plans = await new Endpoint<Plan[]>(`plans`, {
                api_key: this.pagarme.api_key,
                page: page,
                count: PAGE_SIZE
            });
            plans.forEach(callback);
            if (plans.length < PAGE_SIZE) break;
            page += 1;
        }
    }

    insert(obj: PlanInsert) {
        return new Endpoint<Plan>(`plans`, Object.assign({}, {api_key: this.pagarme.api_key}, obj), "POST");
    }
}

export class LazyPlanObject extends Endpoint<Plan> {
    update(changes: PlanUpdate) {
        return new Endpoint<Plan>(this.path, Object.assign({}, this.params, changes), "PUT");
    }
}

export interface PlanUpdate {
    name?: string;
    trial_days?: number;
}

export interface PlanInsert {
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
