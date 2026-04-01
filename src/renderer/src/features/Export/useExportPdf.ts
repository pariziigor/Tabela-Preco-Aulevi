import { renderPdfHtml } from './renderPdfHtml';

export function useExportPdf() {
  const exportPdf = async (props: any) => {
    try {
      const html = renderPdfHtml(props);

      // 🔥 MONTA O TÍTULO CORRETO
      const title = `TABELA DE PREÇOS - ${props.monthReference}`;

      // 🔥 ENVIA HTML + TITLE
      const pdfBuffer = await window.electronAPI.generatePdf(html, title);

      const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `Tabela_AULEVI_${props.monthReference.replace(' ', '_')}.pdf`;
      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
    }
  };

  return { exportPdf };
}