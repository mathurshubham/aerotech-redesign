import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Every route is prerendered at build time, so no incremental cache, tag cache
// or revalidation queue override is needed for the MVP. When ISR or
// on-demand revalidation arrives, add R2 incremental cache + DO queue + D1 tag
// cache here — see https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig({});
