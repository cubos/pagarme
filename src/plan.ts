import PagarMe from "./pagarme.ts";
import {PAGE_SIZE} from "./pagarme.ts";
import {LazyPromiseArray, Endpoint} from "./base.ts";
import {Plan} from "./objects.ts";

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
