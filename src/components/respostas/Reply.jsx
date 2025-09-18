import ModalNewReply from "./ModalNewReply"

const saveReply = () => {

    toast.info("Atualizando a lista de respostas...");
}

function Reply () {
    return (
        <ModalNewReply onRespostaSalvaComSucesso={ saveReply } />
    )
}

export default Reply