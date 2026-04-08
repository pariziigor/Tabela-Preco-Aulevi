import { renderPdfHtml } from './renderPdfHtml'

export function useExportPdf() {
  const exportPdf = async (props: any) => {
    try {
      const html = renderPdfHtml(props)

      // 🔥 MONTA O TÍTULO CORRETO
      const title = `TABELA DE PREÇOS - ${props.monthReference}`

      // 🔥 ENVIA HTML + TITLE
      const pdfBuffer = await window.electron.generatePdf(html, title)

      const arrayBuffer = pdfBuffer.buffer.slice(
        pdfBuffer.byteOffset,
        pdfBuffer.byteOffset + pdfBuffer.byteLength
      ) as ArrayBuffer

      const blob = new Blob([arrayBuffer], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `Tabela_AULEVI_${props.monthReference.replace(' ', '_')}.pdf`
      a.click()

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erro ao exportar PDF:', error)
    }
  }

  return { exportPdf }
}
