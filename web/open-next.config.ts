import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every route is prerendered at build time. Prerendered dynamic routes
// ([slug] pages) are served from the incremental cache on Workers, so a
// read-only, build-time cache backed by static assets is required — it costs
// nothing and needs no bindings. When ISR or on-demand revalidation arrives,
// switch to R2 incremental cache + DO queue + D1 tag cache — see
// https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
