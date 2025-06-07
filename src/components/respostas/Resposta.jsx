import ModalNovaResposta from "./ModalNovaResposta"

const handleSalvarResposta = () => {

    toast.info("Atualizando a lista de respostas...");
}

export default function(){
    <ModalNovaResposta onRespostaSalvaComSucesso={ handleSalvarResposta } />
}