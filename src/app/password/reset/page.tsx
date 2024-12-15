'use client';

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import resetPassWordValid from "@/src/validators/resetPassWordValid";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";

const Reset = () => {
  const [toggleHidePassWord, setToggleHidePassWord] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPassWordValid) });

  const handResetPassWord = async (data: {
    passWord: string,
    comfirmPassWord: string
  }) => {

    try {

      setLoading(true);

      const url = 'http://localhost:3000/api/password/reset';
      const res = await axios.post(url, data);
      console.log(res.data);

      router.push('/login');

    } catch (error) {
      const getError = error as {response: {data: {msg: string}}}
      const errorMsg: string = getError.response.data.msg;

      setValue('passWord', '');
      setValue("comfirmPassWord", '');
      setError("passWord", {
        type: 'manual',
        message: errorMsg
      });

      console.error(error);

    } finally {

      setLoading(false);
    };

  };


  return <>
    <header></header>
    <main id="verify-email-page" className='flex justify-center items-center min-h-screen'>
      <div id="verify-email-content">
        <div className="flex justify-center w-full mb-14">
          <h2 className="text-2xl font-serif font-semibold">Reset password</h2>
        </div>
        <form
          id="email-verification-form"
          action=""
          onSubmit={handleSubmit(handResetPassWord)}
          className='min-w-[200px] sm:min-w-[320px] md:min-w-[480px] flex flex-col gap-4 p-10 border rounded transition-shadow hover:shadow-gray-700 hover:shadow-2xl '>
          <label htmlFor="password" className='w-full flex flex-col gap-2'>
            Password
            <div className="flex-1">
              <div className="relative w-full">
                <input
                  autoComplete='true'
                  id='password'
                  type={toggleHidePassWord !== 'passWord' ? "password" : "text"}
                  placeholder='password'
                  className={`w-full text-sm p-1 rounded bg-inherit border ${errors.passWord ? 'border-red-600 outline-red-600' : ''}`}
                  {...register('passWord')}
                />
                <span
                  onClick={() => setToggleHidePassWord(toggleHidePassWord === 'passWord' ? '' : 'passWord')}
                  className=" absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer">
                  {toggleHidePassWord !== 'passWord' ? <FaRegEyeSlash size={20} /> : <FaRegEye size={18} />}
                </span>
              </div>
              <div className="w-ful flex justify-end">
                <p
                  id="password-helper-text"
                  className="font-serif text-xs text-end p-1 max-w-[240px]">
                  Password must be at least 8 characters
                  and include an uppercase letter,
                  a lowercase letter,
                  a number,
                  and a special character.(e.g., @$!%*?&#^).
                </p>
              </div>
            </div>
          </label>
          <label htmlFor="comfirm-password" className='w-full flex flex-col gap-2'>
            Comfirm Password
            <div className="flex-1 relative">
              <input
                autoComplete='true'
                id='comfirm-password'
                type={toggleHidePassWord !== 'comfirmPassWord' ? "password" : "text"}
                placeholder='Comfirm password'
                className={`w-full text-sm p-1 rounded bg-inherit border ${errors.comfirmPassWord ? 'border-red-600 outline-red-600' : ''}`}
                {...register('comfirmPassWord')}
              />
              <span
                onClick={() => setToggleHidePassWord(toggleHidePassWord === 'comfirmPassWord' ? '' : 'comfirmPassWord')}
                className=" absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer">
                {toggleHidePassWord !== 'comfirmPassWord' ? <FaRegEyeSlash size={20} /> : <FaRegEye size={18} />}
              </span>
            </div>
          </label>
          <div></div>
          <div id="log-in-submit-btn-wrapper" className='w-full flex'>
            <button
              id="submit-btn"
              className='flex-1 p-1 rounded bg-inherit border cursor-pointer hover:text-stone-400 active:text-green-300'>
              {!loading ? "Change" : "Process..."}
            </button>
          </div>
          {errors.passWord || errors.comfirmPassWord ?
            <p className="text-xs text-red-600">
              {(errors.passWord?.message || errors.comfirmPassWord?.message)?.toString()}
            </p> :
            null
          }
        </form>
      </div>
    </main>
    <footer></footer>
  </>
};

export default Reset;
