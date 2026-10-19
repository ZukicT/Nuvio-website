"""Copy the canonical static header and footer into every public page."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
for name in ('index.html', 'contact.html', 'privacy.html', 'terms.html', 'cookies.html', '404.html'):
    path = root / name
    source = path.read_text()
    for kind in ('header', 'footer'):
        partial = (root / 'partials' / (kind + '.html')).read_text().strip()
        if name == 'index.html':
            partial = partial.replace('href="index.html#', 'href="#')
        pattern = r'(<!-- shared:' + kind + r':start -->\n).*?(\n<!-- shared:' + kind + r':end -->)'
        source, count = re.subn(pattern, lambda match: match[1] + partial + match[2], source, flags=re.S)
        if count != 1:
            raise ValueError(f'{name}: expected one {kind} marker pair, found {count}')
    path.write_text('\n'.join(line.rstrip() for line in source.splitlines()) + '\n')
print('Shared header and footer synchronized across all public pages.')
