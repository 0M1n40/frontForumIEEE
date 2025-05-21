import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const Unauthorized = () => {

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600">Unauthorized</h1>
            <p className="mt-4 text-lg text-gray-700">You do not have permission to access this page.</p>
            <a href="/" className="mt-6 text-blue-500 hover:underline">Go back to Home</a>
        </div>
    )
}

export default Unauthorized