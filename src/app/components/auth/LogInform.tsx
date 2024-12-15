"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import logInValid from "@/src/validators/logInValid";
import axios from "axios";
import { useRouter } from 'next/navigation';


const Loginform = () => {
  const [toggleHidePassWord, setToggleHidePassWord] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(logInValid) });

  const handleLoginForm = async (data: {
    userNameOrEmail: string,
    passWord: string
  }) => {
    if (loading) return;

    try {
      setLoading(true);

      const url = 'http://localhost:3000/api/login';
      const res = await axios.post(url, data);
      console.log(res.data)

      if (res.data) {

        const url = 'http://localhost:3000/api/status';
        const res = await axios(url);
        console.log(res.data)

        router.push('/');
      };


    } catch (error) {

      const getError = error as {response:{data:{msg: string}}};

      setValue('passWord', '');
      
      setError("userNameOrEmail", {
        type: 'manual',
        message: ''
      });
      setError("passWord", {
        type: 'manual',
        message: getError.response.data.msg
      });
      
      console.error(error);
    } finally {

      setToggleHidePassWord(false);
      setLoading(false);
    };

  };

  return <form
    id="login-form"
    action=""
    onSubmit={handleSubmit(handleLoginForm)}
    className='min-w-[200px] sm:min-w-[320px] md:min-w-[480px] flex flex-col gap-4 p-10 border rounded transition-shadow hover:shadow-gray-700 hover:shadow-2xl '>
    <label htmlFor="username" className='w-full flex flex-col gap-2'>
      User name / Email
      <input
        autoComplete='true'
        id='username'
        type="text"
        placeholder='user name / email'
        className={`flex-1 text-sm p-1 rounded bg-inherit border ${errors.userNameOrEmail ? 'border-red-600 outline-red-600' : ''}`}
        {...register('userNameOrEmail')}
      />
      {errors.userNameOrEmail && <p className="text-xs text-red-600"> {errors.userNameOrEmail.message?.toString()} </p>}
    </label>
    <label htmlFor="password" className='w-full flex flex-col gap-2'>
      Password
      <div className="flex-1 relative">
        <input
          autoComplete='true'
          id='password'
          type={!toggleHidePassWord ? "password" : "text"}
          placeholder='password'
          className={`text-sm w-full p-1 rounded bg-inherit border ${errors.passWord ? 'border-red-600 outline-red-600' : ''}`}
          {...register('passWord')}
        />
        <span onClick={() => setToggleHidePassWord(!toggleHidePassWord)} className=" absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer">
          {!toggleHidePassWord ? <FaRegEyeSlash size={20} /> : <FaRegEye size={18} />}
        </span>
      </div>
      {errors.passWord && <p className="text-xs text-red-600"> {errors.passWord.message?.toString()} </p>}
    </label>
    <div></div>
    <div id="log-in-submit-btn-wrapper" className='w-full flex'>
      <button
        id="submit-btn"
        className='flex-1 p-1 rounded bg-inherit border cursor-pointer hover:text-stone-400 active:text-green-300'>
        {!loading ? "Log in" : "loading..."}
      </button>
    </div>
    <label htmlFor="forget-password" className="w-full flex justify-center items-center">
      <input
        id="forget-password"
        type="button"
        value="Forget password"
        className="text-xs text-green-500 cursor-pointer" 
        onClick={()=> router.push('/password')}/>
    </label>
  </form>
};

export default Loginform;