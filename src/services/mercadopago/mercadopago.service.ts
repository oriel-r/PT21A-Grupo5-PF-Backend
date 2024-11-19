import { Injectable } from '@nestjs/common';
import MercadoPagoConfig, { PreApproval } from 'mercadopago';
import { PreApprovalRequest } from 'mercadopago/dist/clients/preApproval/commonTypes';
import { PreApprovalCreateData } from 'mercadopago/dist/clients/preApproval/create/types';

@Injectable()
export class MercadopagoService {
    private accesToken: string
    constructor() {
        this.accesToken = process.env.MP_ACCESS_TOKEN
    }
    
    async createSubscription(data: PreApprovalRequest) {
        
        const mp = new MercadoPagoConfig({accessToken: this.accesToken})
        
        const preaproval = new PreApproval(mp)

        try{
           const response = preaproval.create({body: data})
           console.log(response)
           return response
        } catch(err) {
           return console.log(err)
        }
    }

    
}
