import React from 'react';

const Footer = () => {
  const teamMembers = [
    'Gabriel Fortini da Silva',
    'Henrique Maia Reis',
    'Mina Iura Mathias Monteiro',
    'Marco Antonio Lira Barros',
    'Maycom Estêvão Pereira de Carvalho de Souza',
    'Rafael Penela Grande Ferreira',
    'Vinicius da Silva Mendes'
  ];

  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Coluna da Logo */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          {/* Substitua o 'div' abaixo pela sua tag de imagem */}
          <div className="bg-gray-700 w-24 h-12 mb-4 flex items-center justify-center rounded-md">
            <span className="text-gray-400 text-sm">LOGO</span>
          </div>
          <h2 className="text-xl font-bold">Wolf-Byte</h2>
          <p className="text-gray-400 text-sm mt-2">© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>

        {/* Coluna dos Créditos */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Créditos da Equipe</h3>
          <ul className="space-y-2 text-gray-300">
            {teamMembers.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;