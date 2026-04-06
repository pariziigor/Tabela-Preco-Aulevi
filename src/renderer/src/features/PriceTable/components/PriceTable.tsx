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

  const TableHeader = () => (
    <div className="flex w-full bg-[#E57A1F] text-white text-xs uppercase font-bold tracking-wider">
      <div className="w-3/12 px-2 py-2 flex items-center justify-center text-center">Categoria</div>
      <div className="w-6/12 px-2 py-2 flex items-center justify-center text-center">Descrição do produto</div>
      <div className="w-1/12 px-2 py-2 flex items-center justify-center text-center">UND</div>
      <div className="w-2/12 px-2 py-2 flex items-center justify-center text-center">Valor</div>
    </div>
  );

  if (!data || data.length === 0) {
    return <div className="text-center py-10 text-gray-400 text-sm">Carregando dados da planilha...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-4"> 
      
      {data.map((cat) => {
        const categoryName = cat.name || '';
        const isSteelFrame = categoryName.toUpperCase().includes('LIGHT STEEL FRAME');
        const isPerfilStick = categoryName.toUpperCase().includes('PERFIL STICK');
        const isGalvanizado100 = categoryName.toUpperCase().includes('GALVANIZADO Z100');
        const allItems = cat.items || [];

        const filteredItems = isSteelFrame
          ? allItems.filter((item: any) =>
              !item.description?.toLowerCase().includes('abaixo de') &&
              !item.description?.toLowerCase().includes('acima de')
            )
          : allItems;

        const commonUnit = allItems[0]?.unit || 'un';

        return (
          <div
            key={cat.id}
            className="table-block rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white"
            style={{
              pageBreakInside: 'avoid',
              breakInside: 'avoid'
            }}
          >
            <div className="overflow-hidden">
              <TableHeader />
            </div>

            <div className="flex w-full">
              
              <div className="w-3/12 flex items-center justify-center px-3 py-2 font-bold text-gray-900 text-center border-r border-gray-200 bg-gray-50">
                <span className="leading-tight">{renderText(categoryName)}</span>
              </div>

              {(isSteelFrame || isPerfilStick || isGalvanizado100) ? (
                <div className="w-9/12 flex">
                  
                  <div className="w-2/3 flex flex-col border-r border-gray-200">
                    {filteredItems.map((prod: any, index: number) => (
                      <div
                        key={prod.id}
                        className={`flex items-center justify-center px-3 py-1.5 text-center text-gray-600 leading-tight flex-1 ${
                          index !== filteredItems.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <span>{renderText(prod.description)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="w-[11.11%] flex items-center justify-center px-1 py-2 text-center font-bold border-r border-gray-200">
                    <span>{commonUnit}</span>
                  </div>

                  <div className="w-[22.22%] flex flex-col items-center justify-center text-center font-bold text-gray-900">
                    {isSteelFrame ? (
                      <div className="flex flex-col gap-1 px-2 py-2 w-full">
                        <span className="text-xs text-gray-400 uppercase">Abaixo 1000kg</span>
                        <span className="text-sm mb-1">
                          {allItems.find((i: any) => i.description?.toLowerCase().includes('abaixo'))?.value || '-'}
                        </span>

                        <div className="w-full border-b border-gray-100"></div>

                        <span className="text-xs text-gray-400 uppercase">Acima 1000kg</span>
                        <span className="text-sm">
                          {allItems.find((i: any) => i.description?.toLowerCase().includes('acima'))?.value || '-'}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col w-full h-full">
                        {filteredItems.map((prod: any, index: number) => (
                          <div
                            key={prod.id}
                            className={`flex-1 flex items-center justify-center px-2 py-1.5 text-sm ${
                              index !== filteredItems.length - 1 ? 'border-b border-gray-100' : ''
                            }`}
                          >
                            <span>{prod.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-9/12 flex flex-col">
                  {filteredItems.map((prod: any, index: number) => (
                    <div
                      key={prod.id}
                      className={`flex w-full flex-1 ${
                        index !== filteredItems.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="w-2/3 flex items-center justify-center px-3 py-1.5 text-center text-gray-600 leading-tight">
                        <span>{renderText(prod.description)}</span>
                      </div>

                      <div className="w-[11.11%] flex items-center justify-center px-1 py-1.5 text-center font-medium border-l border-gray-200">
                        <span>{prod.unit}</span>
                      </div>

                      <div className="w-[22.22%] flex items-center justify-center px-3 py-1.5 text-center font-bold text-gray-900 text-sm border-l border-gray-200">
                        <span>{prod.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};