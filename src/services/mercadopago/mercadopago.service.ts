import { Injectable } from '@nestjs/common';
import MercadoPagoConfig, { PreApproval } from 'mercadopago';
import { PreApprovalRequest, PreApprovalResponse } from 'mercadopago/dist/clients/preApproval/commonTypes';
import * as dotenv from 'dotenv'

dotenv.config({path: '.env.development.local'})
const mpToken = process.env.MP_ACCESS_TOKEN

@Injectable()
export class MercadopagoService {
    accesToken: string
    constructor() {}
    
    async createSubscription(data: PreApprovalRequest): Promise<PreApprovalResponse> {
         
        
        const preaproval: PreApprovalResponse = await new PreApproval(new MercadoPagoConfig({accessToken: mpToken})).create({body:data})
        .then((response) => {
            return response
        }).catch((err) => {
            return err
        })
         
        return preaproval
        
    }

    
}
