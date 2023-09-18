import { publicIpv4 } from "public-ip";
import { getDomainRecords, updateRecord } from "./clients/porkbun.js";
import { Record } from "./utils/interfaces.js";
import { domain } from "./utils/constants.js";

const cache = new Map();

const getCurrentIpv4 = async () => publicIpv4();

const getPorkbunIpv4 = async (): Promise<string> => {
  if (!domain) throw new Error("DOMAIN_NOT_PROVIDED");
  const records: Record[] = await getDomainRecords(domain);
  const record = records.find(
    (record) => record.name === domain && record.type === "A"
  );
  if (!record) throw new Error("PORKBUN_RECORD_NOT_FOUND");
  return record.content;
};

const updateRecordIfNecessary = async () => {
  console.log(`Checking update: ${cache.get("porkbun")}`);
  const currentIpv4 = await getCurrentIpv4();
  const porkbunIpv4 = cache.get("porkbun");
  if (currentIpv4 !== porkbunIpv4) {
    console.log("Updating record with: ", currentIpv4);
    await updateRecord(currentIpv4, "600");
    cache.set("porkbun", currentIpv4);
  } else {
    console.log("No update necessary");
  }
};

(async () => {
  // Initialize
  const porkbunIpv4 = await getPorkbunIpv4();
  cache.set("porkbun", porkbunIpv4);
  console.log(`Updater initialized: ${cache.get("porkbun")}`);
  await updateRecordIfNecessary();
  // Update every 5 minutes
  setInterval(updateRecordIfNecessary, 1000 * 60 * 5);
})();
