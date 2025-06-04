import Popup from 'reactjs-popup';
import FormularioNovaDuvida from './FormularioNovaDuvida'

import 'reactjs-popup/dist/index.css';


function ModalDuvidas() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
                        Nova Postagem
                    </button>
                }
                modal
            >
                <FormularioNovaDuvida />
            </Popup>
        </>
    );
}

export default ModalDuvidas;