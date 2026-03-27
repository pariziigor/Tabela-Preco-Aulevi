import { useState, useEffect } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { PriceTable } from './features/PriceTable/components/PriceTable';
import { CommercialConditions } from './features/Commercial/components/CommercialConditions';
import { EditModal } from './components/Modal/EditModal';
import { priceData as initialMockData } from './features/PriceTable/data/mockData';
import { useExportPdf } from './features/Export/useExportPdf';

function App(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Novo Estado: Mês de Referência (Salvo localmente)
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

  // 2. Relógio em tempo real para a mensagem de rodapé
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const date = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      setTimestamp(`Esta tabela de preços foi gerada no dia ${date} às ${time}`);
    };
    
    updateTimestamp(); // Roda a primeira vez
    const interval = setInterval(updateTimestamp, 30000); // Atualiza a cada 30 segundos
    return () => clearInterval(interval);
  }, []);
  
  const { exportToPdf } = useExportPdf();

  // 3. Atualizamos o handleSave para receber o novo mês
  const handleSave = (newTable: any, newComm: any, newMonth: string) => {
    setTableData(newTable);
    setCommercialData(newComm);
    setMonthReference(newMonth); // Atualiza o mês na tela
    
    localStorage.setItem('@aulevi:tableData', JSON.stringify(newTable));
    localStorage.setItem('@aulevi:commercialData', JSON.stringify(newComm));
    localStorage.setItem('@aulevi:monthReference', newMonth); // Salva para não perder
  };

  return (
    <>
      <MainLayout 
        onEditClick={() => setIsModalOpen(true)} 
        onExportClick={() => exportToPdf('documento-pdf', `Tabela_AULEVI_${monthReference.replace(' ', '_')}.pdf`)}
      >
        <div className="flex flex-col gap-6">
          <div className="text-center bg-gray-100 py-3 rounded-md border border-gray-200 shadow-sm">
            <h2 className="text-xl font-black text-gray-800 uppercase tracking-widest">
              TABELA DE PREÇOS - {monthReference}
            </h2>
          </div>
          
          <PriceTable data={tableData} />
          
          <div className="flex flex-col">
            <CommercialConditions data={commercialData} />
            {/* 4. Nova mensagem de data de geração abaixo da tabela comercial */}
            <div className="text-[10px] text-gray-400 font-medium text-center mt-2 italic">
              {timestamp}
            </div>
          </div>
        </div>
      </MainLayout>

      <EditModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        currentData={tableData} 
        currentCommercial={commercialData} 
        currentMonth={monthReference} // Passamos o mês para o modal ler
        onSave={handleSave} 
      />
    </>
  );
}

export default App;