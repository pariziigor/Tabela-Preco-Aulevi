export function buildHtml({
  tableData,
  commercialData,
  monthReference,
  timestamp
}: any) {
  return `
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        h2 {
          margin-top: 30px;
          background: #f0f0f0;
          padding: 6px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        th, td {
          border: 1px solid #000;
          padding: 6px;
          font-size: 12px;
        }

        th {
          background: #ddd;
        }

        .section {
          margin-top: 30px;
        }

        .footer {
          margin-top: 20px;
          font-size: 10px;
          text-align: center;
          color: #666;
        }
      </style>
    </head>

    <body>
      <h1>TABELA DE PREÇOS - ${monthReference}</h1>

      ${tableData.map((category: any) => `
        <div class="section">
          <h2>${category.name}</h2>

          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Unidade</th>
                <th>Valor</th>
              </tr>
            </thead>

            <tbody>
              ${category.items.map((item: any) => `
                <tr>
                  <td>${(item.description || '').replace(/\n/g, '<br/>')}</td>
                  <td>${item.unit || ''}</td>
                  <td>${item.value || ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `).join('')}

      <div class="section">
        <h2>Condições Comerciais</h2>

        <strong>Valor:</strong>
        <ul>
          ${commercialData.valor.map((v: string) => `<li>${v}</li>`).join('')}
        </ul>

        <strong>Boleto:</strong>
        <ul>
          ${commercialData.boleto.map((v: string) => `<li>${v}</li>`).join('')}
        </ul>

        <strong>Cartão:</strong>
        <ul>
          ${commercialData.cartao.map((v: string) => `<li>${v}</li>`).join('')}
        </ul>
      </div>

      <div class="footer">
        ${timestamp}
      </div>
    </body>
  </html>
  `;
}