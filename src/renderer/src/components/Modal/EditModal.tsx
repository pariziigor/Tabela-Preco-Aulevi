import { useState, useEffect } from 'react';

export const EditModal = ({ isOpen, onClose, currentData, currentCommercial, currentMonth, onSave }: any): JSX.Element | null => {
  // Agora usamos 'name' e 'items' que vêm da planilha
  const [formData, setFormData] = useState(currentData || []);
  const [commercial, setCommercial] = useState(currentCommercial || { valor: [''], boleto: [''], cartao: [''] });
  const [month, setMonth] = useState(currentMonth || "MARÇO 2026");

  useEffect(() => {
    if (currentData) setFormData(currentData);
    if (currentCommercial) setCommercial(currentCommercial);
    if (currentMonth) setMonth(currentMonth);
  }, [currentData, currentCommercial, currentMonth, isOpen]);

  if (!isOpen) return null;

  // --- FUNÇÕES DE AJUSTE PARA A NOVA ESTRUTURA (Planilha) ---
  const handleProductChange = (catId: string, prodId: string, field: string, value: string) => {
    setFormData(formData.map((cat: any) => cat.id === catId ? {
      ...cat, items: cat.items.map((p: any) => p.id === prodId ? { ...p, [field]: value } : p)
    } : cat));
  };

  const handleCommChange = (field: 'valor' | 'boleto' | 'cartao', index: number, value: string) => {
    const newItems = [...commercial[field]];
    newItems[index] = value;
    setCommercial({ ...commercial, [field]: newItems });
  };

  const addCommLine = (field: 'valor' | 'boleto' | 'cartao') => {
    setCommercial({ ...commercial, [field]: [...commercial[field], ''] });
  };

  const removeCommLine = (field: 'valor' | 'boleto' | 'cartao', index: number) => {
    const newItems = commercial[field].filter((_: any, i: number) => i !== index);
    setCommercial({ ...commercial, [field]: newItems.length > 0 ? newItems : [''] });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">

        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">Painel de Edição - AULEVI</h2>
            <p className="text-[10px] text-orange-600 font-bold uppercase mt-1">Os preços são editados diretamente na Planilha Google</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 font-bold text-2xl transition-colors">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-10">

          {/* SEÇÃO: MÊS DE REFERÊNCIA */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-l-4 border-aulevi-orange pl-3">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Configuração do Documento</h3>
            </div>
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
              <label className="text-xs font-black text-aulevi-orange uppercase mb-3 block">Mês de Referência</label>
              <div className="flex gap-3">
                <select
                  className="flex-1 p-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-aulevi-orange/20"
                  value={month.split(' ')[0]}
                  onChange={(e) => setMonth(`${e.target.value} ${new Date().getFullYear()}`)}
                >
                  {['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <div className="w-32 p-2.5 border bg-gray-200/50 rounded-lg text-sm text-center font-bold text-gray-400">
                  {new Date().getFullYear()}
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO: VISUALIZAÇÃO DE PRODUTOS (Apenas Leitura ou Edição Temporária) */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-l-4 border-gray-300 pl-3">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Visualização dos Itens (Nuvem)</h3>
            </div>
            <div className="space-y-4">
              {formData.map((cat: any) => (
                <div key={cat.id} className="p-4 bg-white border rounded-lg border-gray-200">
                  {/* CORREÇÃO AQUI: Usando cat.name || '' para evitar o erro toUpperCase */}
                  <h4 className="text-[10px] font-black text-gray-400 uppercase mb-3">
                    {(cat.name || 'CATEGORIA SEM NOME').toUpperCase()}
                  </h4>
                  <div className="space-y-2">
                    {(cat.items || []).map((prod: any) => (
                      <div key={prod.id} className="flex gap-2">
                        <input 
                          readOnly 
                          className="flex-1 p-2 bg-gray-50 border rounded text-xs text-gray-500 italic" 
                          value={prod.description} 
                        />
                        <input 
                          readOnly 
                          className="w-24 p-2 bg-gray-50 border rounded text-xs text-center font-bold" 
                          value={prod.value} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SEÇÃO: CONDIÇÕES COMERCIAIS (Totalmente Editável) */}
          <section className="p-6 bg-orange-50/50 rounded-2xl border-2 border-dashed border-aulevi-orange/30">
            <h3 className="text-sm font-black text-aulevi-orange uppercase tracking-widest mb-6">Condições Comerciais</h3>
            <div className="grid grid-cols-3 gap-8">
              {(['valor', 'boleto', 'cartao'] as const).map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-[10px] font-black text-gray-500 uppercase mb-3 text-center">{field}</label>
                  <div className="flex flex-col gap-3">
                    {commercial[field].map((text: string, index: number) => (
                      <div key={index} className="flex gap-2 group">
                        <input className="flex-1 p-2 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-aulevi-orange/20" value={text} onChange={(e) => handleCommChange(field, index, e.target.value)} />
                        <button onClick={() => removeCommLine(field, index)} className="text-gray-300 hover:text-red-500 text-sm">✕</button>
                      </div>
                    ))}
                    <button onClick={() => addCommLine(field)} className="mt-2 text-[10px] font-bold text-aulevi-orange border border-aulevi-orange/20 py-1.5 rounded-lg hover:bg-orange-50 transition-all uppercase">+ Linha</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t bg-gray-50 rounded-b-lg">
          <button onClick={onClose} className="px-6 py-2.5 text-gray-500 font-bold hover:text-gray-700 uppercase text-xs">Descartar</button>
          <button
            onClick={() => { onSave(formData, commercial, month); onClose(); }}
            className="px-10 py-2.5 bg-aulevi-orange text-white rounded-xl font-black shadow-lg hover:bg-[#E57A1F] transition-all uppercase text-xs"
          >
            Aplicar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};