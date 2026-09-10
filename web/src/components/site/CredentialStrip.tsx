import type { Credential } from "@/content";

import { renderText } from "./Placeholder";

/**
 * The highest-value element on the site: a 1px hairline grid of credentials
 * on navy. 2-up at M, 5-up at D. The gap *is* the rule.
 */
export function CredentialStrip({
  credentials,
  label = "Credentials",
}: {
  credentials: Credential[];
  label?: string;
}) {
  const items = credentials.slice(0, 5);

  return (
    <section aria-label={label} className="bg-band">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-px border-x border-band-line bg-band-line sm:grid-cols-3 lg:grid-cols-5">
          {items.map((item) => (
            <div key={item.label} className="bg-band px-4 py-4.5 lg:px-6 lg:py-7.5">
              <p className="font-mono text-[1.1875rem] leading-none font-medium text-orange-500 lg:text-[1.5625rem]">
                {renderText(item.value)}
              </p>
              <p className="mt-2 text-xs leading-[1.45] text-band-muted lg:mt-2.5 lg:text-[0.8125rem]">
                {renderText(item.label)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
