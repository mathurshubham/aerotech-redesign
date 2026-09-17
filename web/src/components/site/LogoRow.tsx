import Image from "next/image";

import { site } from "@/content";

import { resolveImage } from "./image-size";

/**
 * Static greyscale client grid on a white strip. Never a marquee.
 */
export function LogoRow({ label = "Selected clients" }: { label?: string }) {
  return (
    <section
      aria-label={label}
      className="border-b border-line bg-surface py-7 lg:py-11"
    >
      <div className="container-site lg:flex lg:items-center lg:gap-14">
        <p className="eyebrow whitespace-nowrap">{label}</p>
        <ul className="mt-4.5 grid grid-cols-3 items-center gap-x-3 gap-y-5 opacity-[0.62] grayscale lg:mt-0 lg:flex lg:flex-1 lg:justify-between lg:gap-0">
          {site.clients.map((client) => {
            const img = resolveImage(client.logo.src, client.logo);
            return (
              <li key={client.name} className="flex items-center justify-center">
                <Image
                  src={img.src}
                  alt={client.alt}
                  width={img.width}
                  height={img.height}
                  unoptimized={img.unoptimized}
                  loading="lazy"
                  sizes="(min-width: 1024px) 170px, 33vw"
                  className="h-auto w-full max-w-[96px] lg:max-w-[130px]"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
