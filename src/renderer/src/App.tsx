import { useState, useEffect } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { PriceTable } from './features/PriceTable/components/PriceTable';
import { CommercialConditions } from './features/Commercial/components/CommercialConditions';
import { EditModal } from './components/Modal/EditModal';
import { priceData as initialMockData } from './features/PriceTable/data/mockData';
import { useExportPdf } from './features/Export/useExportPdf';

function App(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [monthReference, setMonthReference] = useState(() => {
    return localStorage.getItem('@aulevi:monthReference') || "MARÇO 2026";
  });

  const [tableData, setTableData] = useState(() => {
    const savedTable = localStorage.getItem('@aulevi:tableData');
    if (savedTable) {
      try { return JSON.parse(savedTable); } catch (e) { console.error('Erro', e); }
    }
    return initialMockData;
  });

  const [commercialData, setCommercialData] = useState(() => {
    const savedCommercial = localStorage.getItem('@aulevi:commercialData');
    if (savedCommercial) {
      try { return JSON.parse(savedCommercial); } catch (e) { console.error('Erro', e); }
    }
    return { valor: ["Até R$5.000,00"], boleto: ["15 DD"], cartao: ["1X"] };
  });

  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const date = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      setTimestamp(`Esta tabela de preços foi gerada no dia ${date} às ${time}`);
    };

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 30000); 
    return () => clearInterval(interval);
  }, []);

  const { exportToPdf } = useExportPdf();

  const handleSave = (newTable: any, newComm: any, newMonth: string) => {
    setTableData(newTable);
    setCommercialData(newComm);
    setMonthReference(newMonth);

    localStorage.setItem('@aulevi:tableData', JSON.stringify(newTable));
    localStorage.setItem('@aulevi:commercialData', JSON.stringify(newComm));
    localStorage.setItem('@aulevi:monthReference', newMonth);
  };

  // APENAS UM RETURN AGORA:
  return (
    <>
      <MainLayout
        onEditClick={() => setIsModalOpen(true)}
        onExportClick={() => exportToPdf(
          'documento-pdf',
          `Tabela_AULEVI_${monthReference.replace(' ', '_')}.pdf`,
          `TABELA DE PREÇOS - ${monthReference}` // Passando o título para o PDF repetir
        )}
        titleBlock={
          <div id="titulo-tabela" className="text-center bg-gray-100 py-3 rounded-md border border-gray-200 shadow-sm">
            <h2 className="text-xl font-black text-gray-800 uppercase tracking-widest">
              TABELA DE PREÇOS - {monthReference}
            </h2>
          </div>
        }
      >
        <div className="flex flex-col gap-6">
          <PriceTable data={tableData} />

          <div className="flex flex-col">
            <CommercialConditions data={commercialData} />
            <div className="text-[10px] text-gray-400 font-medium text-center mt-2 italic">
              {timestamp}
            </div>
          </div>
        </div>
      </MainLayout>

      {/* O Modal agora está dentro do fragmento principal */}
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentData={tableData}
        currentCommercial={commercialData}
        currentMonth={monthReference} 
        onSave={handleSave}
      />
    </>
  );
}

export default App;