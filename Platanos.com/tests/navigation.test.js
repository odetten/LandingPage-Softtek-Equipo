import test from "node:test";
import assert from "node:assert/strict";
import { getActiveSection } from "../src/utils/navigation.js";

test("starts at Inicio and changes when the next section reaches the header", () => {
  assert.equal(getActiveSection([{ id: "inicio", top: 0 }, { id: "beneficios", top: 700 }], 96), "inicio");
  assert.equal(getActiveSection([{ id: "inicio", top: -604 }, { id: "beneficios", top: 96 }], 96), "beneficios");
  assert.equal(getActiveSection([{ id: "inicio", top: -603 }, { id: "beneficios", top: 97 }], 96), "inicio");
});

test("Arte remains active through its introductions and model until Interactivo begins", () => {
  const sections = [{ id: "tipos", top: -2500 }, { id: "arte", top: -1800 }, { id: "interactivo", top: 300 }, { id: "contacto", top: 1300 }];
  assert.equal(getActiveSection(sections, 96), "arte");
  assert.equal(getActiveSection(sections.map((section) => ({ ...section, top: section.top - 204 })), 96), "interactivo");
});

test("the last section is selected at the page bottom even if it cannot reach the header", () => {
  const sections = [{ id: "interactivo", top: -200 }, { id: "contacto", top: 260 }];
  assert.equal(getActiveSection(sections, 96, false), "interactivo");
  assert.equal(getActiveSection(sections, 96, true), "contacto");
});

test("missing sections do not produce an invalid active link", () => {
  assert.equal(getActiveSection([], 96), null);
  assert.equal(getActiveSection([], 96, true), null);
});
