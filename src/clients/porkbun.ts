import {
  methods,
  headers,
  porkbunApiKey,
  porkbunApiSecret,
  domain,
} from "../utils/constants.js";
import { validateResponse } from "../utils/fetch.js";
import { Record } from "../utils/interfaces.js";

export const updateRecord = async (content: string, ttl: string) => {
  const response = await fetch(
    `https://porkbun.com/api/json/v3/dns/editByNameType/${domain}/A/`,
    {
      method: methods.POST,
      headers,
      body: JSON.stringify({
        secretapikey: porkbunApiSecret,
        apikey: porkbunApiKey,
        content,
        ttl,
      }),
    }
  );

  return validateResponse(response);
};

export const getDomainRecords = async (
  domain: string
): Promise<Array<Record>> => {
  if (typeof porkbunApiKey !== "string") {
    console.error({
      porkbunApiKey,
    });
    throw new Error("PORKBUN_NOT_SET");
  }
  const response = await fetch(
    `https://porkbun.com/api/json/v3/dns/retrieve/${domain}`,
    {
      method: methods.POST,
      headers,
      body: JSON.stringify({
        secretapikey: porkbunApiSecret,
        apikey: porkbunApiKey,
      }),
    }
  );

  const result = await validateResponse(response);
  return result.records as Array<Record>;
};
