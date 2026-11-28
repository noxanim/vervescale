// Helper to dynamically update title, description, canonical link, and JSON-LD schema for SEO
export function useSeo({
  title,
  description,
  canonical,
  schema,
}: {
  title: string;
  description: string;
  canonical: string;
  schema?: Record<string, any>;
}) {
  if (typeof document === "undefined") return;

  document.title = title;

  // Meta description
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement("meta");
    descTag.setAttribute("name", "description");
    document.head.appendChild(descTag);
  }
  descTag.setAttribute("content", description);

  // Canonical
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement("link");
    canonicalTag.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.setAttribute("href", canonical);

  // Open Graph Title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", title);

  // Open Graph Description
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", description);

  // Open Graph URL
  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", canonical);

  // Twitter tags
  let twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute("content", title);

  let twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute("content", description);

  let twUrl = document.querySelector('meta[name="twitter:url"]');
  if (twUrl) twUrl.setAttribute("content", canonical);

  // Inject or update page-specific JSON-LD Schema
  if (schema) {
    let scriptTag = document.getElementById("page-jsonld") as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "page-jsonld";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);
  }
}
