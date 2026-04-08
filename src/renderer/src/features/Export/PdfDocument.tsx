import { PriceTable } from '../PriceTable/components/PriceTable'
import { CommercialConditions } from '../Commercial/components/CommercialConditions'

export const PdfDocument = ({ tableData, commercialData, timestamp }: any) => {
  return (
    <div className="pt-2 px-6 pb-4 bg-white text-gray-800">
      <div className="pdf-header">
        <div className="flex justify-center mb-2">
          <img src="logo-aulevi.png" style={{ height: 35 }} />
        </div>
      </div>

      <div className="mb-6">
        <PriceTable data={tableData} />
      </div>

      <div className="mt-8">
        <CommercialConditions data={commercialData} />

        <div className="text-[10px] text-gray-400 text-center mt-2 italic">{timestamp}</div>
      </div>
    </div>
  )
}
