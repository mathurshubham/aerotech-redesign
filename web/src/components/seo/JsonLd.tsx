/**
 * Renders one or more JSON-LD objects as `<script type="application/ld+json">` tags.
 * Server component — no client JS. `</script>` is escaped inside the JSON payload so a
 * literal `</script>` in string content (e.g. a title) can't terminate the tag early.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
