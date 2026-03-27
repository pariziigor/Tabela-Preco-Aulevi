import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const useExportPdf = () => {
  const exportToPdf = async (elementId: string, filename: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 3, 
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200, 
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById(elementId);
          if (el) {
            el.style.width = '1024px';
            el.style.minWidth = '1024px';
            el.style.maxWidth = '1024px';
            el.style.margin = '0'; 
            
            const allElements = el.getElementsByTagName('*');
            for (let i = 0; i < allElements.length; i++) {
              (allElements[i] as HTMLElement).style.boxShadow = 'none';
            }
          }
        }
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename);
      
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
      alert('Ocorreu um erro ao gerar o PDF.');
    }
  };

  return { exportToPdf };
};