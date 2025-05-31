import { useAuth } from "../../contexts/AuthContext";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const defaultHome = () => {
    return (
        <div className="home">
            <h1>Home Page</h1>
            <p>Welcome to the home page!</p>
        </div>
    )
}

const loggedInHome = () => {
    return (
        <div className="home">
            <h1>Welcome Back!</h1>
            <p>You are logged in.</p>
        </div>
    )
}

const Home = () => {

    const { user } = useAuth();


    // return user ? defaultHome() : loggedInHome();
    return (
        <div className="home">
            <h1>Home Page</h1>
            <p>Welcome to the home page!</p>
        </div>
    )
}

export default Home;