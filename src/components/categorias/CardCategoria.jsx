function CardCategoria({ categoria }) {
    if (!categoria) {
        return null;
    }

    return (
        <div className="bg-gray-200 shadow-lg w-auto rounded-lg p-4 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h3 className="text-lg text-center font-bold text-gray-800">{categoria.description}</h3> {/* Alterado para description */}
            
        </div>
    );
}

export default CardCategoria;