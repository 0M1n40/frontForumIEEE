const Questions = () => {
  return (
    <section className="questions flex flex-col items-center space-y-4 py-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="question-card w-full max-w-2xl bg-white border border-gray-300 px-4 py-3 rounded-lg shadow-sm"
        >
          {/* Cabeçalho */}
          <div className="question-header flex justify-between items-center pb-2 mb-2 border-b border-gray-200">
            <span className="user-name font-semibold text-gray-800">NomeDoUsuario</span>
            <span className="timestamp text-xs text-gray-500">16-05-2025 12:40PM</span>
          </div>

          {/* Corpo da pergunta */}
          <p className="question-body text-gray-700 mb-3">Como ordena um Array em Python?</p>

          {/* Rodapé */}
          <div className="question-footer flex justify-between items-center text-sm">
            <div className="icons flex space-x-3">
              <span className="comment-icon flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                2
              </span>
              <span className="like-icon flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                35
              </span>
            </div>
            <button className="answer-button bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
              Responder
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Questions;