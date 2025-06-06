// // src/components/categorias/CardCategoria.jsx
// import React from 'react';

// function CardCategoria({ categoria }) {
//   if (!categoria) {
//     return null; // Ou alguma UI de fallback se a categoria for nula/indefinida
//   }

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
//       <h3 className="text-lg font-medium text-gray-800">{categoria.descricao}</h3>
//       {/* Não há botões de editar ou deletar, conforme especificado */}
//     </div>
//   );
// }

// export default CardCategoria;

// src/components/categorias/CardCategoria.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function CardCategoria({ categoria, onDelete }) {
    if (!categoria) {
        return null;
    }

    return (
        <div className="bg-white shadow-lg w-auto rounded-lg p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h3 className="text-lg text-center font-bold text-gray-800 mb-4">{categoria.description}</h3> {/* Alterado para description */}
            <div className="flex justify-center gap-2">
                {/* <Link 
                    to={`/editarCategoria/${categoria.id}`} 
                    className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded"
                >
                    Editar
                </Link> */}
                {/* <button 
                    onClick={() => onDelete(categoria.id)}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                >
                    Deletar
                </button> */}
            </div>
        </div>
    );
}

export default CardCategoria;