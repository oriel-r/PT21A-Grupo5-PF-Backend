import { AutoRecurringRequest, PreApprovalRequest } from "mercadopago/dist/clients/preApproval/commonTypes";
import { Membership } from "../entities/membership.entity";
import { Subscription } from "src/subscriptions/entities/subscription.entity";
import * as dotenv from 'dotenv'

dotenv.config({path: '.env.development.local'})

export class MyPreApproval implements PreApprovalRequest {
    back_url?: string;
    status?: string;
    payer_email?: string;
    external_reference?: string;
    auto_recurring?: AutoRecurringRequest = {} as AutoRecurringRequest;
    card_token_id?: string;
    reason?: string;
    preapproval_plan_id?: string
    notification_url: string
    
    constructor(membership: Membership, subscription:  Subscription, vaucher?: number) {
        this.external_reference = subscription.id
        this.payer_email = membership.user.email
        this.auto_recurring = {
            frequency: 1,
            currency_id: 'ARS',
            frequency_type: 'months',
            transaction_amount: 0
        }
        this.auto_recurring.transaction_amount = this.calculateFinalPrice(subscription.price, vaucher)
        this.reason = subscription.name
        this.back_url = process.env.MP_BACK_URL
        this.notification_url = process.env.MP_NOTIFICATION_URL
    }

    private calculateFinalPrice(price: number, discount?: number): number {
        if(discount) {
            const discountDecimal = discount / 100
            return price * (1 - discountDecimal)
        }
        return price
    }
    
}