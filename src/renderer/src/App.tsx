import { useState } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { PriceTable } from './features/PriceTable/components/PriceTable';
import { CommercialConditions } from './features/Commercial/components/CommercialConditions';
import { EditModal } from './components/Modal/EditModal';
import { priceData as initialMockData } from './features/PriceTable/data/mockData';
import { useExportPdf } from './features/Export/useExportPdf';

function App(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tableData, setTableData] = useState(() => {
    const savedTable = localStorage.getItem('@aulevi:tableData');
    if (savedTable) {
      try { return JSON.parse(savedTable); } catch (e) { console.error('Erro ao ler tabela salva', e); }
    }
    return initialMockData;
  });

  const [commercialData, setCommercialData] = useState(() => {
    const savedCommercial = localStorage.getItem('@aulevi:commercialData');
    if (savedCommercial) {
      try { return JSON.parse(savedCommercial); } catch (e) { console.error('Erro ao ler condições salvas', e); }
    }
    return {
      valor: ["Até R$5.000,00"],
      boleto: ["15 DD"],
      cartao: ["1X"]
    };
  });
  
  const { exportToPdf } = useExportPdf();

  const handleSave = (newTable: any, newComm: any) => {
    setTableData(newTable);
    setCommercialData(newComm);
    localStorage.setItem('@aulevi:tableData', JSON.stringify(newTable));
    localStorage.setItem('@aulevi:commercialData', JSON.stringify(newComm));
  };

  return (
    <>
      <MainLayout 
        onEditClick={() => setIsModalOpen(true)} 
        onExportClick={() => exportToPdf('documento-pdf', 'Tabela_AULEVI.pdf')}
      >
        <div className="flex flex-col gap-6">
          <div className="text-center bg-gray-100 py-3 rounded-md border border-gray-200 shadow-sm">
            <h2 className="text-xl font-black text-gray-800 uppercase tracking-widest">
              TABELA DE PREÇOS - MARÇO 2026
            </h2>
          </div>
          
          <PriceTable data={tableData} />
          <CommercialConditions data={commercialData} />
        </div>
      </MainLayout>

      <EditModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        currentData={tableData} 
        currentCommercial={commercialData} 
        onSave={handleSave} 
      />
    </>
  );
}

export default App;