import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const Login = () => {

    const { login } = useAuth();

    const handleSubmit = (e) => {

        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const role = 'user';

        console.log(username, password, role);


        login({ username, password, role });

    }


    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-3xl font-bold mb-4">Login</h1>
                <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={ handleSubmit }>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login