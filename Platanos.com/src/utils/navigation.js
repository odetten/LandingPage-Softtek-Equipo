// Unnamed sections between anchors belong to the preceding navigation item.
export function getActiveSection(sections, readingLine, atBottom = false) {
  if (!sections.length) return null;
  if (atBottom) return sections.at(-1).id;
  let active = sections[0].id;
  for (const section of sections) {
    if (section.top <= readingLine) active = section.id;
    else break;
  }
  return active;
}
