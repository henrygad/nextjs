'use client';

const Button = () => {
    let r = 0
    
    return <button onClick={() => { 
         console.log(r++) 
        }} >
        increase
    </button>
};

export default Button;