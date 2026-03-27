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
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
      
      <div className="flex w-full bg-aulevi-orange text-white text-xs uppercase font-bold tracking-wider">
        <div className="w-3/12 px-4 py-3 flex items-center justify-center text-center">Categoria</div>
        <div className="w-6/12 px-4 py-3 flex items-center justify-center text-center">Descrição do produto</div>
        <div className="w-1/12 px-4 py-3 flex items-center justify-center text-center">UND</div>
        <div className="w-2/12 px-4 py-3 flex items-center justify-center text-center">Valor</div>
      </div>
      
      <div className="flex flex-col text-sm text-gray-800">
        {data.map((cat, catIndex) => {
          const bgClass = catIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50';

          return (
            <div key={cat.id} className={`flex w-full ${bgClass} border-b border-gray-200/50 last:border-0`}>
              
              <div className="w-3/12 flex items-center justify-center px-4 py-3 font-bold text-gray-900 text-center border-r border-gray-200/50">
                <span>{renderText(cat.categoria)}</span>
              </div>
              
              <div className="w-9/12 flex flex-col">
                {cat.produtos.map((prod: any, index: number) => {
                  const isLast = index === cat.produtos.length - 1;
                  
                  return (
                    <div key={prod.id} className={`flex w-full ${isLast ? '' : 'border-b border-gray-100/50'}`}>
                      <div className="w-2/3 flex items-center justify-center px-4 py-3 text-center text-gray-600 leading-snug">
                        <span>{renderText(prod.descricao)}</span>
                      </div>
                      
                      <div className="w-[11.11%] flex items-center justify-center px-2 py-3 text-center font-medium">
                        <span>{renderText(prod.und)}</span>
                      </div>
                      
                      <div className="w-[22.22%] flex items-center justify-center px-4 py-3 text-center font-bold text-gray-900 text-base">
                        <span>{renderText(prod.valor)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}