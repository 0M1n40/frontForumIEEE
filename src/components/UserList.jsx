import { useEffect, useState } from "react";
import axios from '../api/axios';
import { toast } from 'react-toastify';

import Header from "../components/Header";
import Footer from "./Footer";

// UserList component to display a list of users
const UserList = ({ users }) => {

    [ users, setUsers ] = useState([])

    useEffect(async() => {
        
        try {
            const response = await axios.get('/users');
            setUsers(response.data);
        } catch (error) {
            toast.error('Error fetching users');
        }
    })


    return (
        <>
            <Header />
            <div>
                <h2>User List</h2>
                <ul>
                    {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </>
    );
}

export default UserList;