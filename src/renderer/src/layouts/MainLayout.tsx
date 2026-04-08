import React, { ReactNode } from 'react';
import logoAulevi from '../assets/logo.png';

interface MainLayoutProps {
  children: ReactNode;
  onEditClick: () => void;
  onExportClick: () => void;
  titleBlock?: ReactNode; 
}

export const MainLayout = ({ children, onEditClick, onExportClick, titleBlock }: MainLayoutProps): JSX.Element => {
  return (
    <div id="documento-pdf" className="min-h-screen flex flex-col bg-white text-gray-900 font-sans p-8 max-w-5xl mx-auto">
      
      <div id="header-pdf" className="w-full bg-white flex flex-col">
        <header className="flex justify-between items-start border-b-2 border-aulevi-orange pb-6 mt-4">
          
          <div className="flex flex-col">
            <img 
              src={logoAulevi} 
              alt="Logo AULEVI" 
              className="h-14 object-contain"
            />
          </div>
          
          <div className="flex gap-3 flex-wrap justify-end" data-html2canvas-ignore="true">
            
            <button
              onClick={() => window.open(import.meta.env.VITE_SHEET_URL,'_blank')}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-semibold text-sm transition-colors border border-gray-300 shadow-sm"
            >
              Abrir Planilha
            </button>

            <button 
              onClick={onEditClick}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-semibold text-sm transition-colors border border-gray-300 shadow-sm"
            >
              Alterar Dados
            </button>

            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-semibold text-sm transition-colors border border-gray-300 shadow-sm"
            >
              Recarregar Página
            </button>

            <button 
              onClick={onExportClick}
              className="px-5 py-2.5 bg-aulevi-orange hover:bg-[#E57A1F] text-white rounded-md font-semibold text-sm transition-colors shadow-sm"
            >
              Exportar para PDF
            </button>

          </div>
        </header>

        {titleBlock && (
          <div className="mt-8 mb-2">
            {titleBlock}
          </div>
        )}
      </div>

      <main className="flex-1 mt-4">{children}</main>

      <footer className="mt-12 pt-6 border-t-2 border-aulevi-orange text-center text-[10px] text-gray-600 font-medium leading-relaxed">
        <p>Alameda Sinlioku Tanaka, 202 - Pq. Tecnológico Damha 2 - CEP: 13565-261 - São Carlos / SP</p>
        <p>CNPJ: 38.302.713/0001-82 / IE: 637.533.294.119 - www.aulevi.com.br</p>
      </footer>
    </div>
  );
};