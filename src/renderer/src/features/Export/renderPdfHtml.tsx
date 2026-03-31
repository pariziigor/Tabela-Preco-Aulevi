import { renderToStaticMarkup } from 'react-dom/server';
import { PdfDocument } from './PdfDocument';

import pdfStyles from './pdf.css?raw';

export function renderPdfHtml(props: any) {
  const html = renderToStaticMarkup(<PdfDocument {...props} />);

  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        
        <style>
          ${pdfStyles}
        </style>
      </head>

      <body class="bg-white">
        ${html}
      </body>
    </html>
  `;
}