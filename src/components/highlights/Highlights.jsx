const Highlights = () => {
  return (
    <section className="highlights flex flex-wrap gap-4 px-6">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-40 h-40 bg-amber-800 shadow-md rounded-lg p-4 flex flex-col justify-between"
        >
          {/* Conteúdo principal */}
          <div>
            <h3 className="text-white font-medium line-clamp-2 mb-1">Título da dúvida...</h3>
            <p className="text-sm text-amber-100 line-clamp-2">Descrição do card</p>
          </div>

          {/* Ícones de interação */}
          <div className="flex justify-between items-center text-amber-50">
            <div className="flex space-x-3">
              <span className="flex items-center text-sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                3k
              </span>
              <span className="flex items-center text-sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                1k
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Highlights;