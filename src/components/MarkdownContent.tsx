export function MarkdownContent({ content }: { content: string }) {
  const html = markdownToHtml(content);

  return (
    <div
      className="font-serif leading-relaxed text-ink"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function markdownToHtml(md: string): string {
  let html = md;

  // Escape HTML
  html = escapeHtml(html);

  // Code blocks (before inline code)
  html = html.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.slice(3, -3).trim();
    return `<pre className="bg-gray-100 p-4 rounded overflow-x-auto"><code>${escapeHtml(code)}</code></pre>`;
  });

  // Headings
  html = html.replace(/^### (.*?)$/gm, "<h3 className='text-2xl font-bold mt-6 mb-3'>$1</h3>");
  html = html.replace(/^## (.*?)$/gm, "<h2 className='text-3xl font-bold mt-8 mb-4'>$1</h2>");
  html = html.replace(/^# (.*?)$/gm, "<h1 className='text-4xl font-bold mt-10 mb-5'>$1</h1>");

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code className='bg-gray-100 px-2 py-1 rounded'>$1</code>");

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" className="text-plum hover:underline">$1</a>');

  // Horizontal rule
  html = html.replace(/^---$/gm, "<hr className='my-6 border-t border-rule' />");

  // Unordered lists
  html = html.replace(/^\* (.*?)$/gm, "<li>$1</li>");
  html = html.replace(/^\- (.*?)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*?<\/li>)/s, "<ul className='list-disc list-inside mb-4'>$1</ul>");

  // Ordered lists
  html = html.replace(/^\d+\. (.*?)$/gm, "<li>$1</li>");

  // Paragraphs
  html = html
    .split("\n\n")
    .map((para) => {
      if (
        para.startsWith("<") ||
        para.startsWith("<ul") ||
        para.startsWith("<ol")
      ) {
        return para;
      }
      return `<p className='mb-4'>${para}</p>`;
    })
    .join("");

  // Blockquotes
  html = html.replace(/^&gt; (.*?)$/gm, "<blockquote className='border-l-4 border-plum pl-4 italic my-4'>$1</blockquote>");

  return html;
}
