

const CardResposta = ({ id, content, user, createdAt}) => {

    return (
        <li key={id} className="p-4 bg-gray-50 border border-gray-300 rounded">
            <p className="text-gray-800">{content}</p>
            <div className="text-sm text-gray-500 mt-2">
            Respondido por {user?.name || 'Anônimo'} em{' '}
            {new Date(createdAt).toLocaleString()}
            </div>
        </li>
    )

    // sim
}

export default CardResposta