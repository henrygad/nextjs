"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const Logout = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const handleLogOut = async () => {
        if(loading) return;

        try {
            setLoading(true);

            const url = 'http://localhost:3000/api/logout';
            const res = await axios(url);
            const body = await res.data;
            console.log(body);

            router.push('/login');

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        };


    };


    return <>
        <header></header>
        <main id="sign-up-page" className='flex justify-center items-center min-h-screen'>
            <div id='btn-wrapper'>
                <button
                    className='p-2 border'
                    onClick={handleLogOut}>
                    {!loading ? "logout" : 'loading'}
                </button>
            </div>
        </main>
        <footer className='w-full flex justify-center'>

        </footer>
    </>
}

export default Logout