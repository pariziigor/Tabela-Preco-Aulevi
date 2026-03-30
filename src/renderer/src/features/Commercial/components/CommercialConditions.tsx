import React from 'react';

interface CommercialProps {
  data: { valor: string[]; boleto: string[]; cartao: string[]; };
}

export const CommercialConditions = ({ data }: CommercialProps): JSX.Element | null => {
  if (!data) return null;

  const renderList = (items: string[]) => {
    return items.map((item, index) => (
      <p 
        key={index} 
        className="leading-tight py-1.5 border-b border-gray-100 last:border-0 w-full flex items-center justify-center min-h-[30px]"
      >
        {item}
      </p>
    ));
  };

  return (
    <div className="w-full mt-6 border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white break-inside-avoid">
      <div className="bg-aulevi-orange text-white text-center py-2 font-bold uppercase tracking-widest text-xs">
        Condições Comerciais
      </div>
      <div className="grid grid-cols-3 divide-x divide-gray-300">
        
        <div className="flex flex-col">
          <div className="bg-gray-100 text-center py-1.5 border-b border-gray-300 font-bold text-[10px] uppercase text-gray-500">Valor</div>
          <div className="px-4 py-2 text-sm text-gray-600 text-center min-h-[50px] flex flex-col justify-start font-medium h-full">
            <div className="w-full">{renderList(data.valor)}</div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-gray-100 text-center py-1.5 border-b border-gray-300 font-bold text-[10px] uppercase text-gray-500">Boleto</div>
          <div className="px-4 py-2 text-sm text-gray-600 text-center min-h-[50px] flex flex-col justify-start font-medium h-full">
            <div className="w-full">{renderList(data.boleto)}</div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-gray-100 text-center py-1.5 border-b border-gray-300 font-bold text-[10px] uppercase text-gray-500">Cartão</div>
          <div className="px-4 py-2 text-sm text-gray-600 text-center min-h-[50px] flex flex-col justify-start font-medium h-full">
            <div className="w-full">{renderList(data.cartao)}</div>
          </div>
        </div>

      </div>
      <div className="bg-gray-50 border-t border-gray-300 p-2 text-[10px] text-gray-500 font-medium italic text-center">
        Obs: Valores a prazo sujeitos à aprovação do departamento financeiro. Pagamento em cartão sujeito a inserção de taxas.
      </div>
    </div>
  );
};