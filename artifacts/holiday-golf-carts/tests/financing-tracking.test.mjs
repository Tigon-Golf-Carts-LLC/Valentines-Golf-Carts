import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

const financingSource = await readFile(
  new URL('../src/pages/Financing.tsx', import.meta.url),
  'utf8',
);
const analyticsSource = await readFile(
  new URL('../src/lib/analytics.ts', import.meta.url),
  'utf8',
);
const financingFile = ts.createSourceFile(
  'Financing.tsx',
  financingSource,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);

function findNode(predicate) {
  let match;
  function visit(node) {
    if (!match && predicate(node)) match = node;
    if (!match) ts.forEachChild(node, visit);
  }
  visit(financingFile);
  return match;
}

function getLenders() {
  const declaration = findNode(
    (node) =>
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === 'LENDERS',
  );

  assert.ok(declaration, 'Financing must define the lender list');
  assert.ok(
    declaration.initializer && ts.isArrayLiteralExpression(declaration.initializer),
    'LENDERS must remain an array',
  );

  return declaration.initializer.elements.map((element) => {
    assert.ok(ts.isObjectLiteralExpression(element), 'Each lender must be an object');
    const values = Object.fromEntries(
      element.properties
        .filter(ts.isPropertyAssignment)
        .filter((property) => ts.isIdentifier(property.name))
        .map((property) => [
          property.name.text,
          ts.isStringLiteral(property.initializer)
            ? property.initializer.text
            : undefined,
        ]),
    );
    return { name: values.name, url: values.url };
  });
}

function getQuickApplyAnchor() {
  return findNode((node) => {
    if (!ts.isJsxElement(node) || node.openingElement.tagName.getText() !== 'a') {
      return false;
    }
    return node.getText().includes('Quick Apply');
  });
}

async function loadTrackEvent() {
  const javascript = ts.transpileModule(analyticsSource, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`;
  return (await import(moduleUrl)).trackEvent;
}

test('every lender Quick Apply link preserves its URL and safe new-tab contract', () => {
  const lenders = getLenders();
  assert.ok(lenders.length > 0, 'At least one lender must be configured');

  for (const lender of lenders) {
    assert.ok(lender.name, 'Every lender must have an attribution name');
    assert.match(lender.url ?? '', /^https:\/\//, `${lender.name} must use an external HTTPS URL`);
  }

  const anchor = getQuickApplyAnchor();
  assert.ok(anchor, 'A Quick Apply anchor must be rendered for lenders');
  const markup = anchor.openingElement.getText();
  assert.match(markup, /href=\{lender\.url\}/);
  assert.match(markup, /target="_blank"/);
  assert.match(markup, /rel="noopener noreferrer"/);
});

test('every lender Quick Apply click records lender and financing-page attribution', () => {
  const anchor = getQuickApplyAnchor();
  assert.ok(anchor, 'A Quick Apply anchor must be rendered for lenders');
  const markup = anchor.openingElement.getText().replace(/\s+/g, ' ');

  assert.match(
    markup,
    /onClick=\{\(\) => trackEvent\(["']financing_partner_clicked["'], \{ lender: lender\.name, location: ["']financing_page["'], \}\)\s*\}/,
  );
});

test('missing analytics does not throw', async () => {
  const trackEvent = await loadTrackEvent();
  globalThis.window = {};

  assert.doesNotThrow(() =>
    trackEvent('financing_partner_clicked', {
      lender: 'Test Lender',
      location: 'financing_page',
    }),
  );
});

test('throwing analytics does not throw from the click path', async () => {
  const trackEvent = await loadTrackEvent();
  globalThis.window = {
    umami: {
      track() {
        throw new Error('analytics unavailable');
      },
    },
  };

  assert.doesNotThrow(() =>
    trackEvent('financing_partner_clicked', {
      lender: 'Test Lender',
      location: 'financing_page',
    }),
  );
});