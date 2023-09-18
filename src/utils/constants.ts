export enum methods {
  GET = "GET",
  POST = "POST",
}

export const headers = {
  "Content-Type": "application/json",
};

export const porkbunApiKey = process.env.PORKBUN_API_KEY;

export const porkbunApiSecret = process.env.PORKBUN_API_SECRET;

export const domain = process.env.DOMAIN;
