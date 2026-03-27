import React from 'react';

interface PriceTableProps {
  data: any[];
}

export const PriceTable = ({ data }: PriceTableProps): JSX.Element => {
  // Renderização de texto com suporte a quebra de linha e segurança contra nulos
  const renderText = (text: any) => {
    if (!text || typeof text !== 'string') return '';
    return text.split('\n').map((str, index, array) => (
      <React.Fragment key={index}>
        {str}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  if (!data || data.length === 0) {
    return <div className="text-center py-10 text-gray-400">Carregando dados da planilha...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Cabeçalho Fixo */}
      <div className="flex w-full bg-[#E57A1F] text-white text-xs uppercase font-bold tracking-wider rounded-lg shadow-sm overflow-hidden">
        <div className="w-3/12 px-4 py-3 flex items-center justify-center text-center">Categoria</div>
        <div className="w-6/12 px-4 py-3 flex items-center justify-center text-center">Descrição do produto</div>
        <div className="w-1/12 px-4 py-3 flex items-center justify-center text-center">UND</div>
        <div className="w-2/12 px-4 py-3 flex items-center justify-center text-center">Valor</div>
      </div>

      <div className="flex flex-col gap-5 text-sm text-gray-800">

        
        {data.map((cat) => {
          const categoryName = cat.name || '';
          const isSteelFrame = categoryName.toUpperCase().includes('LIGHT STEEL FRAME');
          const allItems = cat.items || [];
          
          // Filtra a lista central para NÃO mostrar as linhas de "Abaixo/Acima de 1000kg"
          const filteredItems = isSteelFrame 
            ? allItems.filter((item: any) => 
                !item.description?.toLowerCase().includes('abaixo de') && 
                !item.description?.toLowerCase().includes('acima de')
              )
            : allItems;

          return (
            <div
              key={cat.id}
              className="flex w-full bg-white border border-gray-200 rounded-lg shadow-md shadow-gray-200/80 overflow-hidden break-inside-avoid"
            >
              {/* Coluna Categoria */}
              <div className="w-3/12 flex items-center justify-center px-4 py-3 font-bold text-gray-900 text-center border-r border-gray-200 bg-gray-50/50">
                <span>{renderText(categoryName)}</span>
              </div>

              {isSteelFrame ? (
                /* Layout Especial: Steel Frame Engenheirado */
                <div className="w-9/12 flex">
                  {/* Lista de Produtos (Filtrada) */}
                  <div className="w-2/3 flex flex-col border-r border-gray-200">
                    {filteredItems.map((prod: any, index: number) => {
                      const isLast = index === filteredItems.length - 1;
                      return (
                        <div key={prod.id} className="relative flex items-center justify-center px-4 py-3 text-center text-gray-600 leading-snug flex-1">
                          <span>{renderText(prod.description)}</span>
                          {!isLast && <div className="absolute bottom-0 left-8 right-8 border-b border-gray-200"></div>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Unidade Fixa */}
                  <div className="w-[11.11%] flex items-center justify-center px-2 py-3 text-center font-bold border-r border-gray-200">
                    <span>KG</span>
                  </div>

                  {/* Quadro de Valores Laterais (Busca direto no array completo da planilha) */}
                  <div className="w-[22.22%] flex flex-col items-center justify-center px-4 py-3 text-center font-bold text-gray-900 gap-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Abaixo de 1000kg</span>
                    <span className="text-base text-gray-900 mb-1">
                      {allItems.find((i: any) => i.description?.toLowerCase().includes('abaixo'))?.value || 'Consulte'}
                    </span>

                    <div className="w-3/4 border-b border-gray-200 my-1"></div>

                    <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Acima de 1000kg</span>
                    <span className="text-base text-gray-900">
                      {allItems.find((i: any) => i.description?.toLowerCase().includes('acima'))?.value || 'Consulte'}
                    </span>
                  </div>
                </div>
              ) : (
                /* Layout Padrão: Demais Categorias */
                <div className="w-9/12 flex flex-col">
                  {filteredItems.map((prod: any, index: number) => {
                    const isLast = index === filteredItems.length - 1;
                    return (
                      <div key={prod.id} className="relative flex w-full flex-1">
                        <div className="w-2/3 flex items-center justify-center px-4 py-3 text-center text-gray-600 leading-snug">
                          <span>{renderText(prod.description)}</span>
                        </div>
                        <div className="w-[11.11%] flex items-center justify-center px-2 py-3 text-center font-medium border-l border-gray-200">
                          <span>{renderText(prod.unit)}</span>
                        </div>
                        <div className="w-[22.22%] flex items-center justify-center px-4 py-3 text-center font-bold text-gray-900 text-base border-l border-gray-200">
                          <span>{renderText(prod.value)}</span>
                        </div>
                        {!isLast && <div className="absolute bottom-0 left-8 right-8 border-b border-gray-200"></div>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};