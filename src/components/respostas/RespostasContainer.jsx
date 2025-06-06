import CardResposta from "./CardResposta"

const RespostasContainer = ({respostas}) => {

    return (
        <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-3">Respostas</h2>
            {respostas.length === 0 ? (
            <p className="text-gray-500">Nenhuma resposta ainda.</p>
            ) : (
            <ul className="space-y-4">
                {respostas.map((resposta) => (
                <CardResposta 
                    content={resposta.content} 
                    id={resposta.id}
                    user={resposta.user}
                    createdAt={resposta.createdAt}
                    key={resposta.id}
                />
                
                ))}
            </ul>
            )}
        </div>
    )
}

export default RespostasContainer