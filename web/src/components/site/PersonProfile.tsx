import Image from "next/image";

import type { Person } from "@/content";

import { resolveImage } from "./image-size";
import { PhotoCaption } from "./PhotoCaption";
import { isPlaceholder, Placeholder, renderText } from "./Placeholder";
import { Prose } from "./Prose";

/** Full biography page body for one person. */
export function PersonProfile({ person }: { person: Person }) {
  const img = resolveImage(person.photo.src, person.photo);

  return (
    <div className="container-site py-12 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
        <div>
          <Prose>
            {person.longBio.map((paragraph, i) => (
              <p key={i}>{renderText(paragraph)}</p>
            ))}
          </Prose>

          <section aria-labelledby="career" className="mt-12">
            <h2 id="career" className="eyebrow">
              Aviation career
            </h2>
            <ul className="mt-4">
              {person.career.map((role) => (
                <li
                  key={`${role.role}-${role.org}`}
                  className="grid grid-cols-1 gap-1 border-t border-line py-4 last:border-b sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <span className="text-base font-medium text-ink">
                    {role.role}
                  </span>
                  <span className="font-mono text-[0.8125rem] text-subtle">
                    {role.org}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="key-projects" className="mt-12">
            <h2 id="key-projects" className="eyebrow">
              Selected engagements
            </h2>
            <ul className="mt-4">
              {person.keyProjects.map((project, i) => (
                <li
                  key={project.client}
                  className={
                    i === 0
                      ? "border-t-2 border-ink py-5.5"
                      : "border-t border-line py-5.5 last:border-b"
                  }
                >
                  <p className="eyebrow-accent">
                    {project.client}
                  </p>
                  <p className="mt-2 text-base leading-[1.55] text-ink">
                    {renderText(project.body)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="flex flex-col gap-10">
          <figure className="max-w-[280px] lg:max-w-none">
            <Image
              src={img.src}
              alt={person.photo.alt}
              width={img.width}
              height={img.height}
              unoptimized={img.unoptimized}
              priority
              sizes="(min-width: 1024px) 360px, 280px"
              className="h-auto w-full rounded-lg object-cover"
            />
            <PhotoCaption>{`${person.name} · ${person.role} · New Delhi`}</PhotoCaption>
          </figure>

          <section aria-labelledby="certifications">
            <h2 id="certifications" className="eyebrow">
              Certifications
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {person.credentials.map((group) => (
                <div
                  key={group.group}
                  className="rounded-lg border border-line bg-surface px-5 py-4"
                >
                  <p className="font-mono text-sm font-medium text-ink">
                    {group.group}
                  </p>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {group.items.map((item) => (
                      <li key={item} className="text-[0.8125rem] text-subtle">
                        {renderText(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="honours">
            <h2 id="honours" className="eyebrow">
              Honours
            </h2>
            <ul className="mt-4">
              {person.honours.map((honour) => (
                <li
                  key={honour}
                  className="border-t border-line py-3.5 text-[0.9375rem] text-ink last:border-b"
                >
                  {renderText(honour)}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="affiliations">
            <h2 id="affiliations" className="eyebrow">
              Industry positions
            </h2>
            <ul className="mt-4">
              {person.affiliations.map((affiliation) => (
                <li
                  key={affiliation}
                  className="border-t border-line py-3.5 text-[0.9375rem] text-ink last:border-b"
                >
                  {renderText(affiliation)}
                </li>
              ))}
            </ul>
          </section>

          {person.linkedin && (
            <p className="eyebrow font-normal">
              LinkedIn:{" "}
              {isPlaceholder(person.linkedin) ? (
                <Placeholder>{person.linkedin}</Placeholder>
              ) : (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-aqua-700 hover:text-aqua-600"
                >
                  {person.linkedin}
                </a>
              )}
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
