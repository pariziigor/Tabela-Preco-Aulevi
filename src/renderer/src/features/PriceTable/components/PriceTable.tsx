import React from 'react';

interface PriceTableProps {
  data: any[];
}

export const PriceTable = ({ data }: PriceTableProps): JSX.Element => {
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
          // Nova constante para identificar o Perfil Stick
          const isPerfilStick = categoryName.toUpperCase().includes('PERFIL STICK');
          const isGalvanizado100 = categoryName.toUpperCase().includes('GALVANIZADO Z100');
          const allItems = cat.items || [];
          
          const filteredItems = isSteelFrame 
            ? allItems.filter((item: any) => 
                !item.description?.toLowerCase().includes('abaixo de') && 
                !item.description?.toLowerCase().includes('acima de')
              )
            : allItems;

          // Definimos a unidade única (Pega a unidade do primeiro item se existir)
          const commonUnit = allItems[0]?.unit || 'un';

          return (
            <div
              key={cat.id}
              className="flex w-full bg-white border border-gray-200 rounded-lg shadow-md shadow-gray-200/80 overflow-hidden break-inside-avoid"
            >
              {/* Coluna Categoria */}
              <div className="w-3/12 flex items-center justify-center px-4 py-3 font-bold text-gray-900 text-center border-r border-gray-200 bg-gray-50/50">
                <span>{renderText(categoryName)}</span>
              </div>

              {/* Se for Steel Frame OU Perfil Stick, usamos o layout de coluna de unidade unificada */}
              {(isSteelFrame || isPerfilStick || isGalvanizado100) ? (
                <div className="w-9/12 flex">
                  {/* Lista de Descrições */}
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

                  {/* Unidade Centralizada (Geral para a categoria) */}
                  <div className="w-[11.11%] flex items-center justify-center px-2 py-3 text-center font-bold border-r border-gray-200">
                    <span>{commonUnit}</span>
                  </div>

                  {/* Coluna de Valores */}
                  <div className="w-[22.22%] flex flex-col items-center justify-center text-center font-bold text-gray-900">
                    {isSteelFrame ? (
                      /* Layout de faixa de peso para Steel Frame */
                      <div className="flex flex-col gap-1 px-4 py-3">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Abaixo de 1000kg</span>
                        <span className="text-base text-gray-900 mb-1">
                          {allItems.find((i: any) => i.description?.toLowerCase().includes('abaixo'))?.value || 'Consulte'}
                        </span>
                        <div className="w-3/4 border-b border-gray-200 my-1 self-center"></div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Acima de 1000kg</span>
                        <span className="text-base text-gray-900">
                          {allItems.find((i: any) => i.description?.toLowerCase().includes('acima'))?.value || 'Consulte'}
                        </span>
                      </div>
                    ) : (
                      /* Layout de valores individuais para Perfil Stick, mas mantendo a UND unificada ao lado */
                      <div className="flex flex-col w-full h-full">
                        {filteredItems.map((prod: any, index: number) => {
                          const isLast = index === filteredItems.length - 1;
                          return (
                            <div key={prod.id} className="relative flex-1 flex items-center justify-center px-4 py-3 text-base">
                              <span>{renderText(prod.value)}</span>
                              {!isLast && <div className="absolute bottom-0 left-4 right-4 border-b border-gray-200"></div>}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Layout Padrão: Para as demais categorias (Acessórios, etc) */
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