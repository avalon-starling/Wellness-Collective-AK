import { ReactNode } from "react";

// A deliberately small markdown renderer — headings, paragraphs, bold/italic,
// links, and unordered lists. Resources are written by one admin, not
// arbitrary users, so this doesn't need to be a full CommonMark
// implementation or sanitize untrusted HTML — it just needs to render
// straightforward prose without pulling in a markdown dependency.

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-${i++}`}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      nodes.push(<em key={`${keyPrefix}-${i++}`}>{match[2]}</em>);
    } else if (match[3] !== undefined) {
      nodes.push(
        <a key={`${keyPrefix}-${i++}`} href={match[4]} className="text-plum underline underline-offset-2">
          {match[3]}
        </a>
      );
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export function renderMarkdown(markdown: string): ReactNode {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let key = 0;

  function flushParagraph() {
    if (paragraph.length) {
      blocks.push(
        <p key={key++} className="font-serif text-lg leading-relaxed text-ink">
          {renderInline(paragraph.join(" "), `p${key}`)}
        </p>
      );
      paragraph = [];
    }
  }
  function flushList() {
    if (list.length) {
      blocks.push(
        <ul key={key++} className="ml-5 list-disc space-y-1.5 font-serif text-lg leading-relaxed text-ink">
          {list.map((item, i) => (
            <li key={i}>{renderInline(item, `li${key}-${i}`)}</li>
          ))}
        </ul>
      );
      list = [];
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push(
        <h3 key={key++} className="mt-8 font-display text-2xl text-ink">
          {renderInline(line.slice(4), `h3-${key}`)}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push(
        <h2 key={key++} className="mt-10 font-display text-3xl text-ink">
          {renderInline(line.slice(3), `h2-${key}`)}
        </h2>
      );
    } else if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2));
    } else if (line === "") {
      flushParagraph();
      flushList();
    } else {
      flushList();
      paragraph.push(line);
    }
  }
  flushParagraph();
  flushList();

  return <div className="flex flex-col gap-5">{blocks}</div>;
}
