/** A tiny highlighter for the docs: strings, numbers, keywords and comments. Returns safe HTML. */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const KEYWORDS = /\b(const|let|await|async|import|from|return|if|else|new|function|true|false|null|def|for|in)\b/g;

export function highlight(src: string): string {
  // tokenise strings and comments first so their insides are left alone
  const re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\/\/[^\n]*|#[^\n{]*$)/gm;
  let out = '';
  let last = 0;
  for (const m of src.matchAll(re)) {
    out += plain(src.slice(last, m.index));
    const tok = m[0];
    out += tok.startsWith('//') || tok.startsWith('#') ? `<span class="c">${esc(tok)}</span>` : `<span class="s">${esc(tok)}</span>`;
    last = m.index! + tok.length;
  }
  return out + plain(src.slice(last));
}

function plain(s: string): string {
  return esc(s)
    .replace(KEYWORDS, '<span class="k">$1</span>')
    .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="n">$1</span>')
    .replace(/\b(GET|POST|PUT|PATCH|DELETE)\b/g, '<span class="k">$1</span>');
}
