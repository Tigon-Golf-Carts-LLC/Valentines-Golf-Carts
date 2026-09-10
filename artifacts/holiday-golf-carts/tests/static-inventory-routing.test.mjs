import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const customFetchSource = await readFile(
  new URL(
    "../../../lib/api-client-react/src/custom-fetch.ts",
    import.meta.url,
  ),
  "utf8",
);
const vehicleSource = await readFile(
  new URL("../src/pages/Vehicle.tsx", import.meta.url),
  "utf8",
);

async function loadCustomFetch() {
  const javascript = ts.transpileModule(customFetchSource, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`;
  return (await import(moduleUrl)).customFetch;
}

function setNestedStaticPage() {
  globalThis.window = {
    location: {
      hostname: "valentinesgolfcarts.com",
      origin: "https://valentinesgolfcarts.com",
      pathname: "/inventory/test-vehicle",
    },
  };
  globalThis.document = {
    baseURI: "https://valentinesgolfcarts.com/inventory/test-vehicle",
  };
}

test("vehicle detail routes request the inventory snapshot from the site root", async (t) => {
  t.after(() => {
    delete globalThis.window;
    delete globalThis.document;
    delete globalThis.fetch;
  });

  setNestedStaticPage();
  let requestedUrl;
  globalThis.fetch = async (input) => {
    requestedUrl = String(input);
    return new Response(JSON.stringify({ carts: [] }), {
      headers: { "content-type": "application/json" },
    });
  };

  const customFetch = await loadCustomFetch();
  await customFetch("/api/inventory", { responseType: "json" });

  assert.equal(
    requestedUrl,
    "https://valentinesgolfcarts.com/data/inventory.json",
  );
  assert.notEqual(
    requestedUrl,
    "https://valentinesgolfcarts.com/inventory/data/inventory.json",
  );
});

test("malformed inventory snapshots are handled defensively", async (t) => {
  t.after(() => {
    delete globalThis.window;
    delete globalThis.document;
    delete globalThis.fetch;
  });

  setNestedStaticPage();
  const malformedSnapshot = { carts: "not-an-array" };
  globalThis.fetch = async () =>
    new Response(JSON.stringify(malformedSnapshot), {
      headers: { "content-type": "application/json" },
    });

  const customFetch = await loadCustomFetch();
  const result = await customFetch("/api/inventory?q=test", {
    responseType: "json",
  });

  assert.deepEqual(result, malformedSnapshot);
  assert.match(
    vehicleSource,
    /const carts = Array\.isArray\(data\?\.carts\) \? data\.carts : \[\];/,
    "Vehicle must treat a malformed carts value as an empty inventory",
  );
});