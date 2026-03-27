import { useState, useEffect } from 'react';

export const EditModal = ({ isOpen, onClose, currentData, currentCommercial, currentMonth, onSave }: any): JSX.Element | null => {
  const [formData, setFormData] = useState(currentData || []);
  const [commercial, setCommercial] = useState(currentCommercial || { valor: [''], boleto: [''], cartao: [''] });
  // Novo estado para o mês
  const [month, setMonth] = useState(currentMonth || "MARÇO 2026");

  useEffect(() => {
    if (currentData) setFormData(currentData);
    if (currentCommercial) setCommercial(currentCommercial);
    if (currentMonth) setMonth(currentMonth);
  }, [currentData, currentCommercial, currentMonth, isOpen]);

  if (!isOpen) return null;

  const handleProductChange = (catId: number, prodId: number, field: string, value: string) => {
    setFormData(formData.map((cat: any) => cat.id === catId ? {
      ...cat, produtos: cat.produtos.map((p: any) => p.id === prodId ? { ...p, [field]: value } : p)
    } : cat));
  };

  const handleAddProduct = (catId: number) => {
    const newProduct = { id: Date.now(), descricao: '', und: '', valor: '' };
    setFormData(formData.map((cat: any) => cat.id === catId ? {
      ...cat, produtos: [...cat.produtos, newProduct]
    } : cat));
  };

  const handleRemoveProduct = (catId: number, prodId: number) => {
    setFormData(formData.map((cat: any) => cat.id === catId ? {
      ...cat, produtos: cat.produtos.filter((p: any) => p.id !== prodId)
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

  const handleCategoryChange = (catId: number, field: string, value: string) => {
    setFormData(formData.map((cat: any) => cat.id === catId ? { ...cat, [field]: value } : cat));
  };

  const formatCurrency = (value: string) => {
    const digits = value.replace(/\D/g, '');

    const amount = (Number(digits) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return amount;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">

        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">Painel de Edição - AULEVI</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 font-bold text-2xl transition-colors">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-10">

          <section>
            <div className="flex items-center gap-2 mb-6 border-l-4 border-aulevi-orange pl-3">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Configurações Gerais</h3>
            </div>

            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm flex flex-col">
              <label className="text-xs font-black text-aulevi-orange uppercase mb-3 tracking-wider">
                Mês de Referência (O ano é inserido automaticamente)
              </label>

              <div className="flex gap-3 w-full md:w-2/3">
                <select
                  className="flex-1 p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-aulevi-orange/20 focus:border-aulevi-orange outline-none transition-all bg-white text-gray-700 cursor-pointer"
                  value={month.split(' ')[0] || 'MARÇO'}
                  onChange={(e) => setMonth(`${e.target.value} ${new Date().getFullYear()}`)}
                >
                  {['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>

                <div
                  className="w-32 p-2.5 border border-gray-200 bg-gray-200/50 rounded-lg text-sm text-center text-gray-400 font-bold flex items-center justify-center select-none cursor-not-allowed"
                  title="O ano atual é detectado automaticamente"
                >
                  {new Date().getFullYear()}
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-6 border-l-4 border-aulevi-orange pl-3">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Produtos e Categorias</h3>
            </div>

            <div className="space-y-6">
              {formData.map((cat: any) => {
                const isSteelFrame = cat.categoria.toUpperCase().includes('LIGHT STEEL FRAME');

                return (
                  <div key={cat.id} className="p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-black text-aulevi-orange uppercase text-xs tracking-wider">{cat.categoria}</h4>
                    </div>

                    {isSteelFrame && (
                      <div className="flex gap-4 mb-4 p-4 bg-orange-50/80 rounded-lg border border-aulevi-orange/20 shadow-inner">
                        <div className="flex-1 flex flex-col gap-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Valor ABAIXO de 1000kg</label>
                          <input
                            className="p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-aulevi-orange/20 focus:border-aulevi-orange outline-none font-bold"
                            value={cat.precoAcima || ''}
                            onChange={(e) => handleCategoryChange(cat.id, 'precoAcima', formatCurrency(e.target.value))}
                            placeholder="R$ 0,00"
                          />
                        </div>
                        <div className="flex-1 flex flex-col gap-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Valor ACIMA de 1000kg</label>
                          <input
                            className="p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-aulevi-orange/20 focus:border-aulevi-orange outline-none font-bold"
                            value={cat.precoAbaixo || ''}
                            onChange={(e) => handleCategoryChange(cat.id, 'precoAbaixo', formatCurrency(e.target.value))}
                            placeholder="R$ 0,00"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      {cat.produtos.map((prod: any) => (
                        <div key={prod.id} className="flex gap-2 group items-center">
                          <input
                            className="flex-1 p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-aulevi-orange/20 focus:border-aulevi-orange outline-none transition-all"
                            value={prod.descricao}
                            onChange={(e) => handleProductChange(cat.id, prod.id, 'descricao', e.target.value)}
                            placeholder="Descrição do item"
                          />

                          {!isSteelFrame && (
                            <>
                              <input className="w-20 p-2.5 border rounded-lg text-sm text-center focus:border-aulevi-orange outline-none" value={prod.und} onChange={(e) => handleProductChange(cat.id, prod.id, 'und', e.target.value)} placeholder="UND" />
                              <input
                                className="w-32 p-2.5 border rounded-lg text-sm text-right focus:border-aulevi-orange outline-none font-bold text-gray-700"
                                value={prod.valor}
                                onChange={(e) => handleProductChange(cat.id, prod.id, 'valor', formatCurrency(e.target.value))}
                                placeholder="R$ 0,00"
                              />
                            </>
                          )}

                          <button onClick={() => handleRemoveProduct(cat.id, prod.id)} className="text-gray-300 hover:text-red-500 px-2 transition-colors" title="Remover produto">✕</button>
                        </div>
                      ))}
                    </div>

                    <button onClick={() => handleAddProduct(cat.id)} className="mt-4 text-xs font-bold text-aulevi-orange hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1">
                      + Novo Produto em {cat.categoria}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="p-6 bg-orange-50/50 rounded-2xl border-2 border-dashed border-aulevi-orange/30">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-sm font-black text-aulevi-orange uppercase tracking-widest">Condições Comerciais</h3>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {(['valor', 'boleto', 'cartao'] as const).map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-[10px] font-black text-gray-500 uppercase mb-3 text-center">{field}</label>
                  <div className="flex flex-col gap-3">
                    {commercial[field].map((text: string, index: number) => (
                      <div key={index} className="flex gap-2 group">
                        <input className="flex-1 p-2.5 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-aulevi-orange/20 focus:border-aulevi-orange bg-white transition-all" value={text} onChange={(e) => handleCommChange(field, index, e.target.value)} placeholder={`Item de ${field}...`} />
                        <button onClick={() => removeCommLine(field, index)} className="text-gray-300 hover:text-red-500 text-sm">✕</button>
                      </div>
                    ))}
                    <button onClick={() => addCommLine(field)} className="mt-2 text-[10px] font-bold text-aulevi-orange hover:text-orange-700 text-center uppercase border border-aulevi-orange/20 py-1.5 rounded-lg hover:bg-orange-50 transition-all">+ Linha</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t bg-gray-50 rounded-b-lg">
          <button onClick={onClose} className="px-6 py-2.5 text-gray-500 font-bold hover:text-gray-700 transition-colors uppercase text-xs">Descartar</button>
          <button
            onClick={() => { onSave(formData, commercial, month); onClose(); }}
            className="px-10 py-2.5 bg-aulevi-orange text-white rounded-xl font-black shadow-lg shadow-orange-200 hover:bg-[#E57A1F] hover:-translate-y-0.5 active:translate-y-0 transition-all uppercase text-xs"
          >
            Salvar Proposta
          </button>
        </div>
      </div>
    </div>
  );
};