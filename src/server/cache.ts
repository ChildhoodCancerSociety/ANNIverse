import Cache from "node-cache";

const cache = new Cache({
  // 4 HR TTL
  stdTTL: 60 * 60 * 4,
  // revoke expired keys every 2 days
  checkperiod: 60 * 60 * 24 * 2,
  errorOnMissing: false,
});

export default cache;
