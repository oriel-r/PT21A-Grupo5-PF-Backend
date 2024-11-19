import { Injectable } from '@nestjs/common';
import MercadoPagoConfig, { PreApproval } from 'mercadopago';
import { PreApprovalRequest } from 'mercadopago/dist/clients/preApproval/commonTypes';
import * as dotenv from 'dotenv'

dotenv.config({path: '.env.development.local'})

@Injectable()
export class MercadopagoService {
    accesToken: string
    constructor() {}
    
    async createSubscription(data: PreApprovalRequest) {
         
        
        const preaproval = await new PreApproval(new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN})).create({body:data})
        .then((response) => {
            const data = JSON.stringify(response)
            console.log(data)
        }).catch((err) => console.log(err))
         
        return preaproval
        
    }

    
}
