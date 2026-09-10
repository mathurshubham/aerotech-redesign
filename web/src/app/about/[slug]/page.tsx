import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CTABand, PageHead, PersonProfile } from "@/components/site";
import { getPerson, peopleSlugs } from "@/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return peopleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) return { title: "Not found" };

  return {
    title: person.seo.title,
    description: person.seo.description,
    alternates: { canonical: `/about/${person.slug}` },
  };
}

export default async function PersonPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) notFound();

  return (
    <>
      <PageHead
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: person.name },
        ]}
        title={person.name}
        lede={person.shortBio}
        aside={
          <div className="rounded-lg border border-band-line px-6 py-6">
            <p className="eyebrow-accent">Role</p>
            <p className="mt-3 font-display text-xl font-semibold text-white">
              {person.role}
            </p>
            <p className="mt-4 text-sm leading-[1.55] text-band-muted">
              Aerocity, New Delhi — adjacent to Delhi IGI. The person who scopes
              the engagement is the person who delivers it.
            </p>
          </div>
        }
      />

      <PersonProfile person={person} />

      <CTABand
        title="Thirty minutes, with the person who would run it"
        body="Bring a terminal opening date, an audit scope, or an approval that has stalled."
      />
    </>
  );
}
