import React from 'react';
// 1. Importe a imagem aqui (verifique se o nome e a extensão batem com o seu arquivo)
import logoAulevi from '../assets/logo.png'; 

interface MainLayoutProps {
  children: React.ReactNode;
  onEditClick: () => void;
  onExportClick: () => void;
}

export const MainLayout = ({ children, onEditClick, onExportClick }: MainLayoutProps): JSX.Element => {
  return (
    <div id="documento-pdf" className="min-h-screen flex flex-col bg-white text-gray-900 font-sans p-8 max-w-5xl mx-auto">
      
      <header className="flex justify-between items-start border-b-2 border-aulevi-orange pb-6 mb-8 mt-4">
        <div className="flex flex-col">
          {/* 2. Substituímos o h1 pela tag img */}
          <img 
            src={logoAulevi} 
            alt="Logo AULEVI" 
            className="h-14 object-contain" // Ajuste o 'h-14' (height) para maior ou menor se precisar
          />
          
          {/* Obs: Se a sua imagem da logo já tiver o texto "LIVING THE FUTURE" embutido nela, 
              você pode apagar a linha do <span> abaixo. Se a imagem for só o símbolo/nome, mantenha. */}
        </div>
        
        <div className="flex gap-3" data-html2canvas-ignore="true">
          <button 
            onClick={onEditClick}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-semibold text-sm transition-colors border border-gray-300 shadow-sm"
          >
            Alterar Dados
          </button>
          <button 
            onClick={onExportClick}
            className="px-5 py-2.5 bg-aulevi-orange hover:bg-[#E57A1F] text-white rounded-md font-semibold text-sm transition-colors shadow-sm"
          >
            Exportar para PDF
          </button>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-12 pt-6 border-t-2 border-aulevi-orange text-center text-[10px] text-gray-600 font-medium leading-relaxed">
        <p>Alameda Sinlioku Tanaka, 202 - Pq. Tecnológico Damha 2 - CEP: 13565-261 - São Carlos / SP</p>
        <p>CNPJ: 38.302.713/0001-82 / IE: 637.533.294.119 - www.aulevi.com.br</p>
      </footer>
    </div>
  );
};