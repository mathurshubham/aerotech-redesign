/**
 * Generates minimal, hand-built PDF 1.4 sample documents for the compliance
 * downloads page. No dependencies — writes raw PDF object streams with a
 * correct cross-reference table. Each document is one A4 page of Helvetica
 * text via the base-14 font resource.
 *
 * Run: pnpm tsx scripts/make-sample-downloads.ts
 *
 * The document list is derived from the `downloads` block on the
 * `compliance` page in `src/content/pages.ts` — re-run this script whenever
 * that list changes, so filenames and titles stay in sync.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { pages } from "../src/content/pages";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "downloads");

// A4 in PDF points (72 dpi).
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN_X = 56;

type Doc = {
  file: string;
  title: string;
  bullets: string[];
};

/** Escape parentheses/backslashes for a PDF literal string. */
function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function buildContentStream(doc: Doc, generatedOn: string): string {
  const lines: string[] = [];
  let y = PAGE_HEIGHT - 90;

  lines.push("BT");
  lines.push("/F2 10 Tf");
  lines.push(`${MARGIN_X} ${PAGE_HEIGHT - 56} Td`);
  lines.push(`(${esc("AEROTECH SUPPORT SERVICES")}) Tj`);
  lines.push("ET");

  lines.push("BT");
  lines.push(`/F1 20 Tf`);
  lines.push(`${MARGIN_X} ${y} Td`);
  lines.push(`(${esc(doc.title)}) Tj`);
  lines.push("ET");
  y -= 34;

  lines.push("BT");
  lines.push("/F2 12 Tf");
  lines.push(`${MARGIN_X} ${y} Td`);
  lines.push(`(${esc("Sample document — final version to follow")}) Tj`);
  lines.push("ET");
  y -= 22;

  lines.push("BT");
  lines.push("/F2 10 Tf");
  lines.push(`${MARGIN_X} ${y} Td`);
  lines.push(`(${esc(`Generated ${generatedOn}`)}) Tj`);
  lines.push("ET");
  y -= 40;

  for (const bullet of doc.bullets) {
    lines.push("BT");
    lines.push("/F2 11 Tf");
    lines.push(`${MARGIN_X} ${y} Td`);
    lines.push(`(${esc(`•  ${bullet}`)}) Tj`);
    lines.push("ET");
    y -= 20;
  }

  y -= 20;
  lines.push("BT");
  lines.push("/F3 8 Tf");
  lines.push(`${MARGIN_X} ${y} Td`);
  lines.push(
    `(${esc("This is a placeholder sample used for site development and preview purposes only.")}) Tj`,
  );
  lines.push("ET");

  return lines.join("\n");
}

function buildPdf(doc: Doc, generatedOn: string): Buffer {
  const content = buildContentStream(doc, generatedOn);
  const contentBytes = Buffer.from(content, "latin1");

  const objects: string[] = [];
  // 1: Catalog
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  // 2: Pages
  objects.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  // 3: Page
  objects.push(
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] ` +
      `/Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> /Contents 4 0 R >>`,
  );
  // 4: Content stream (placeholder length, fixed below)
  objects.push(
    `<< /Length ${contentBytes.length} >>\nstream\n${content}\nendstream`,
  );
  // 5: Helvetica-Bold (titles)
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  // 6: Helvetica (body)
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  // 7: Helvetica-Oblique (footer)
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>");

  const header = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  let body = header;
  const offsets: number[] = [];

  objects.forEach((obj, i) => {
    offsets.push(Buffer.byteLength(body, "latin1"));
    body += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(body, "latin1");
  const objectCount = objects.length + 1;

  let xref = `xref\n0 ${objectCount}\n`;
  xref += "0000000000 65535 f \n";
  for (const offset of offsets) {
    xref += `${offset.toString().padStart(10, "0")} 00000 n \n`;
  }

  const trailer =
    `trailer\n<< /Size ${objectCount} /Root 1 0 R >>\n` +
    `startxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(body + xref + trailer, "latin1");
}

function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const compliance = pages.find((p) => p.slug === "compliance");
  if (!compliance) {
    throw new Error("compliance page not found in src/content/pages.ts");
  }
  const downloadsBlock = compliance.blocks.find(
    (b): b is Extract<typeof compliance.blocks[number], { type: "downloads" }> =>
      b.type === "downloads",
  );
  if (!downloadsBlock) {
    throw new Error("downloads block not found on compliance page");
  }

  const generatedOn = formatDate(new Date());

  const bulletsFor = (title: string): string[] => {
    const t = title.toLowerCase();
    if (t.includes("capability")) {
      return [
        "ORAT planning and readiness testing for new and refurbished terminals",
        "Ground operations audits, compliance reviews and CORSIA / emissions reporting",
        "Aircraft recovery and AOG support, available around the clock",
        "India market entry advisory for international carriers and ground handlers",
        "Team of former airline and airport operations leadership",
        "Delhi-based, working across South and Southeast Asian airports",
      ];
    }
    if (t.includes("iso 9001")) {
      return [
        "Quality management system certified to ISO 9001:2015",
        "Scope: aviation ground operations and airport readiness consulting",
        "Certifying body accreditation details on file with the registrar",
        "Surveillance audits conducted on an annual cycle",
      ];
    }
    if (t.includes("iso 45001")) {
      return [
        "Occupational health and safety management certified to ISO 45001:2018",
        "Applies to airside and landside consulting engagements",
        "Incident reporting and hazard management procedures documented",
        "Reviewed annually alongside the quality management system",
      ];
    }
    if (t.includes("iso 14064")) {
      return [
        "Greenhouse gas quantification and reporting per ISO 14064-1:2018",
        "Supports CORSIA and voluntary emissions disclosure programmes",
        "Scope 1 and Scope 2 boundaries defined for consulting operations",
        "Verified emissions inventory available on request",
      ];
    }
    if (t.includes("as9100d")) {
      return [
        "Aerospace quality management system certified to AS9100D",
        "Extends ISO 9001 with aviation, space and defence requirements",
        "Configuration management and traceability procedures documented",
        "Applicable to ground operations and readiness engagements",
      ];
    }
    if (t.includes("incorporation")) {
      return [
        "Certificate of incorporation issued by the Registrar of Companies",
        "Confirms the registered legal name and date of incorporation",
        "Corporate Identity Number (CIN) recorded on the certificate",
        "Registered office address as filed with the Ministry of Corporate Affairs",
      ];
    }
    if (t.includes("gst")) {
      return [
        "GST registration certificate issued under the Central Goods and Services Tax Act",
        "GSTIN recorded for invoicing and statutory compliance",
        "Registered place of business as filed with the tax authority",
        "Valid for procurement and vendor onboarding checks",
      ];
    }
    return [
      "Reference document for tender and prequalification review",
      "Details available in full on request",
      "Maintained alongside the company's compliance register",
      "Contact info@aerotechss.com for the certified original",
    ];
  };

  for (const item of downloadsBlock.items) {
    const filename = item.file.split("/").pop();
    if (!filename) continue;
    const doc: Doc = {
      file: filename,
      title: item.title,
      bullets: bulletsFor(item.title),
    };
    const pdf = buildPdf(doc, generatedOn);
    const outPath = join(OUT_DIR, filename);
    writeFileSync(outPath, pdf);
    console.log(`wrote ${outPath} (${pdf.byteLength} bytes)`);
  }
}

main();
