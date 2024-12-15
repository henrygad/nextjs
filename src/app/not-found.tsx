import Link from 'next/link';
import React from 'react'

const notFound = () => {
    return <>
        <header></header>
        <main id='not-found-page' className='flex justify-center items-center min-h-screen'>
            <div id='not-found-content' className='h-10 space-y-4'>
                <h2 className='text-2xl '>
                    404 <var className="border mr-1"/> Not Found Buddy
                </h2>
                <div className='flex justify-center'>
                    <button className='px-2 border rounded'>
                        <Link href={'/'}>
                            {"<"} <span>return to home</span>
                        </Link>
                    </button>
                </div>
            </div>
        </main>
        <footer></footer>
    </>
};

export default notFound;