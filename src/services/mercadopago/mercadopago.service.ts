import { Injectable } from '@nestjs/common';
import MercadoPagoConfig, { PreApproval } from 'mercadopago';
import { PreApprovalRequest, PreApprovalResponse } from 'mercadopago/dist/clients/preApproval/commonTypes';
import * as dotenv from 'dotenv'

dotenv.config({path: '.env.development.local'})

@Injectable()
export class MercadopagoService {
    accesToken: string
    constructor() {}
    
    async createSubscription(data: PreApprovalRequest): Promise<PreApprovalResponse> {
         
        
        const preaproval: PreApprovalResponse = await new PreApproval(new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN})).create({body:data})
        .then((response) => {
            return response
        }).catch((err) => {
            return err
        })
         
        return preaproval
        
    }

    
}
