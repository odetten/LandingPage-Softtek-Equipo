// api.js
const SPARQL_ENDPOINT = "https://query.wikidata.org/sparql";

const query = `
  SELECT ?itemLabel ?height WHERE {
    ?item wdt:P2048 ?height.
    ?item wdt:P31 wd:Q811979. # instancia directa de "estructura arquitectónica" (más rápido que el path recursivo)
    FILTER(?height > 50)
    SERVICE wikibase:label { bd:serviceParam wikibase:language "es,en". }
  }
  ORDER BY DESC(?height)
  LIMIT 30
`;

export async function fetchBuildings() {
  const url = `${SPARQL_ENDPOINT}?query=${encodeURIComponent(query)}&format=json`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000); // no esperes más de 6s

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/sparql-results+json" },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`Wikidata respondió ${res.status}`);

    const data = await res.json();
    return data.results.bindings
      .filter((b) => b.itemLabel && b.height)
      .map((b) => ({
        name: b.itemLabel.value,
        heightM: parseFloat(b.height.value),
      }));
  } catch (err) {
    clearTimeout(timeoutId);
    throw err; // deja que el componente decida el fallback
  }
}