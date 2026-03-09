export function createLayout(content, stylePath = '', scriptPath = '') {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/components/style.css" />
        ${stylePath ? `<link rel="stylesheet" href="${stylePath}" />` : ''}
        ${scriptPath ? `<script type="module" src="${scriptPath}"></script>` : ''}
      </head>
      <body>
        <nav class="navbar">
          <a href="/">Home</a>
          <a href="/food">Food</a>
          <a href="/album">Album</a>
          <a href="/github">GitHub</a>
        </nav>
        ${content}
      </body>
    </html>
  `;
}
