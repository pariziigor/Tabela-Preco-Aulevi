import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { MainLayout } from './layouts/MainLayout';
import { PriceTable } from './features/PriceTable/components/PriceTable';
import { CommercialConditions } from './features/Commercial/components/CommercialConditions';
import { EditModal } from './components/Modal/EditModal';
import { useExportPdf } from './features/Export/useExportPdf';

function App(): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [commercialData, setCommercialData] = useState<any>({ valor: [], boleto: [], cartao: [] });
  const [timestamp, setTimestamp] = useState("");

  const [monthReference, setMonthReference] = useState(() => {
    return localStorage.getItem('@aulevi:monthReference') || "MARÇO 2026";
  });

  const URL_PRODUTOS = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSFkpSAzKMyWN6urNZjiSzpm6sCzvZlBCJdLayfHaDQ3aHY9LvCVQkoPVFIJ-AIzjv9b26iyHKhOm13/pub?gid=0&single=true&output=csv";
  const URL_CONDICOES = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSFkpSAzKMyWN6urNZjiSzpm6sCzvZlBCJdLayfHaDQ3aHY9LvCVQkoPVFIJ-AIzjv9b26iyHKhOm13/pub?gid=1325148737&single=true&output=csv";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProd = await fetch(URL_PRODUTOS);
        const csvProd = await resProd.text();

        Papa.parse(csvProd, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const grouped = (results.data as any[]).reduce((acc: any[], row: any) => {
              if (!row.categoria) return acc;

              let cat = acc.find(c => c.name === row.categoria);

              if (!cat) {
                cat = {
                  id: crypto.randomUUID(),
                  name: row.categoria,
                  items: []
                };
                acc.push(cat);
              }

              cat.items.push({
                id: crypto.randomUUID(),
                description: row.descricao,
                unit: row.unidade,
                value: row.valor
              });

              return acc;
            }, []);

            setTableData(grouped);
          }
        });

        const resCond = await fetch(URL_CONDICOES);
        const csvCond = await resCond.text();

        Papa.parse(csvCond, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const rows = results.data as any[];

            setCommercialData({
              valor: rows.filter(r => r.tipo === 'valor').map(r => r.texto),
              boleto: rows.filter(r => r.tipo === 'boleto').map(r => r.texto),
              cartao: rows.filter(r => r.tipo === 'cartao').map(r => r.texto)
            });
          }
        });

      } catch (e) {
        console.error("Erro ao carregar planilha:", e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      setTimestamp(
        `Esta tabela de preços foi gerada no dia ${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        })}`
      );
    };

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 30000);

    return () => clearInterval(interval);
  }, []);

  const { exportPdf } = useExportPdf();

  const handleSave = (_newTable: any, _newComm: any, newMonth: string) => {
    setMonthReference(newMonth);
    localStorage.setItem('@aulevi:monthReference', newMonth);
    setIsModalOpen(false);
  };

  return (
    <>
      <MainLayout
        onEditClick={() => setIsModalOpen(true)}
        onExportClick={() =>
          exportPdf({
            tableData,
            commercialData,
            monthReference,
            timestamp
          })
        }
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

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentData={tableData}
        currentCommercial={commercialData}
        currentMonth={monthReference}
        onSave={handleSave}
        isReadOnly={true}
      />
    </>
  );
}

export default App;