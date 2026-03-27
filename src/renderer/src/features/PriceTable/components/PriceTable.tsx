import React from 'react';

interface PriceTableProps {
  data: any[];
}

export const PriceTable = ({ data }: PriceTableProps): JSX.Element => {
  
  const renderText = (text: string) => {
    if (!text) return '';
    return text.split('\n').map((str, index, array) => (
      <React.Fragment key={index}>
        {str}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      
      <div className="flex w-full bg-aulevi-orange text-white text-xs uppercase font-bold tracking-wider rounded-lg shadow-sm overflow-hidden">
        <div className="w-3/12 px-4 py-3 flex items-center justify-center text-center">Categoria</div>
        <div className="w-6/12 px-4 py-3 flex items-center justify-center text-center">Descrição do produto</div>
        <div className="w-1/12 px-4 py-3 flex items-center justify-center text-center">UND</div>
        <div className="w-2/12 px-4 py-3 flex items-center justify-center text-center">Valor</div>
      </div>
      
      <div className="flex flex-col gap-5 text-sm text-gray-800">
        {data.map((cat) => {
          const isSteelFrame = cat.categoria.toUpperCase().includes('LIGHT STEEL FRAME');

          return (
            <div 
  key={cat.id} 
  className="flex w-full bg-white border border-gray-200 rounded-lg shadow-md shadow-gray-200/80 overflow-hidden break-inside-avoid"
>
              
              <div className="w-3/12 flex items-center justify-center px-4 py-3 font-bold text-gray-900 text-center border-r border-gray-200 bg-gray-50/50">
                <span>{renderText(cat.categoria)}</span>
              </div>
              
              {isSteelFrame ? (
                <div className="w-9/12 flex">
                  <div className="w-2/3 flex flex-col border-r border-gray-200">
                    {cat.produtos.map((prod: any, index: number) => {
                      const isLast = index === cat.produtos.length - 1;
                      return (
                        <div key={prod.id} className="relative flex items-center justify-center px-4 py-3 text-center text-gray-600 leading-snug flex-1">
                          <span>{renderText(prod.descricao)}</span>
                          {!isLast && <div className="absolute bottom-0 left-8 right-8 border-b border-gray-200"></div>}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="w-[11.11%] flex items-center justify-center px-2 py-3 text-center font-bold border-r border-gray-200">
                    <span>KG</span>
                  </div>

                  <div className="w-[22.22%] flex flex-col items-center justify-center px-4 py-3 text-center font-bold text-gray-900 gap-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Abaixo de 1000kg</span>
                    <span className="text-base text-gray-900 mb-1">{cat.precoAbaixo || 'R$ 0,00'}</span>
                    
                    <div className="w-3/4 border-b border-gray-200 my-1"></div>
                    
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Acima de 1000kg</span>
                    <span className="text-base text-gray-900">{cat.precoAcima || 'R$ 0,00'}</span>
                  </div>
                </div>
              ) : (
                <div className="w-9/12 flex flex-col">
                  {cat.produtos.map((prod: any, index: number) => {
                    const isLast = index === cat.produtos.length - 1;
                    return (
                      <div key={prod.id} className="relative flex w-full">
                        <div className="w-2/3 flex items-center justify-center px-4 py-3 text-center text-gray-600 leading-snug">
                          <span>{renderText(prod.descricao)}</span>
                        </div>
                        <div className="w-[11.11%] flex items-center justify-center px-2 py-3 text-center font-medium border-l border-gray-200">
                          <span>{renderText(prod.und)}</span>
                        </div>
                        <div className="w-[22.22%] flex items-center justify-center px-4 py-3 text-center font-bold text-gray-900 text-base border-l border-gray-200">
                          <span>{renderText(prod.valor)}</span>
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
  )
}