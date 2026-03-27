import html2pdf from 'html2pdf.js';

export const useExportPdf = () => {
  const exportToPdf = async (elementId: string, filename: string, titleText?: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const textoCabecalho = String(titleText || 'TABELA DE PREÇOS').toUpperCase();

    try {
      const logoElement = element.querySelector('header img') as HTMLImageElement;
      const logoSrc = logoElement ? logoElement.src : null;

      const opt = {
        margin: [30, 10, 15, 10], 
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          logging: false 
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] }
      };

      const worker = html2pdf().set(opt).from(element).toPdf();

      await worker.get('pdf').then((pdf: any) => {
        const totalPages = pdf.internal.getNumberOfPages();
        const pageWidth = pdf.internal.pageSize.getWidth();

        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          
          const marginX = 10;
          const posY = 12;

          if (logoSrc) {
            pdf.addImage(logoSrc, 'PNG', marginX, posY, 42, 12);
          }

          pdf.setFontSize(11);
          pdf.setFont("helvetica", "bold");
          pdf.setTextColor(60, 60, 60);
          
          const txtWidth = (pdf.getStringUnitWidth(textoCabecalho) * pdf.internal.getFontSize()) / pdf.internal.scaleFactor;
          pdf.text(textoCabecalho, pageWidth - marginX - txtWidth, posY + 8);

          pdf.setDrawColor(229, 122, 31); 
          pdf.setLineWidth(0.6);
          pdf.line(marginX, posY + 16, pageWidth - marginX, posY + 16);
        }
      }).save();

    } catch (error) {
      console.error('Erro na exportação:', error);
    }
  };

  return { exportToPdf };
};