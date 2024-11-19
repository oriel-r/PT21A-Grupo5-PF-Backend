import MercadoPagoConfig from 'mercadopago';

export const config = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});
