
const NotFound = () => {

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-xl text-gray-700">Pagina não Encontrada</p>
        <img src="https://bing.com/th/id/OIP.OCOPlTacfjcxDGIZkDM9hgHaHa?cb=thvnextc2&rs=1&pid=ImgDetMain" alt="Not Found" className=" w-92 h-92" />
        
        <a href="/" className="mt-6 text-blue-500 hover:underline">
            Go back to Home
        </a>
        </div>
    );
}

export default NotFound;