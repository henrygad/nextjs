"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import signUpValid from "@/src/validators/signUpValid";
import axios from "axios";
import { useRouter } from 'next/navigation';


const SignUpform = () => {
  const [toggleHidePassWord, setToggleHidePassWord] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpValid) });

  const handleSignUpForm = async (data: {
    userName: string,
    email: string,
    passWord: string,
    comfirmPassWord: string
  }) => {
    if (loading) return;

    try {
      setLoading(true);

      const url = 'http://localhost:3000/api/signup';
      const res = await axios.post(url, data);

      if (res.data) {

        const url = 'http://localhost:3000/api/status';
        const res = await axios(url);
        const body = await res.data
        const { email } = body.data
        console.log(body)

        router.push(`/verifyemail?email=${email}`);
      };


    } catch (error) {
      const getError = error as {response: {data: {msg: string}}}
      const errorMsg: string = getError.response.data.msg;

      setValue('passWord', '');
      setValue("comfirmPassWord", '');

      if (errorMsg.toLocaleLowerCase().includes('username')) {
        setError("userName", {
          type: 'manual',
          message: errorMsg
        });
      };

      if (errorMsg.toLocaleLowerCase().includes('email')) {
        setError("email", {
          type: 'manual',
          message: errorMsg
        });
      };
      if (errorMsg.toLocaleLowerCase().includes('password')) {
        setError("passWord", {
          type: 'manual',
          message: errorMsg
        });
      };
      if (errorMsg.toLocaleLowerCase().includes('match')) {
        setError("comfirmPassWord", {
          type: 'manual',
          message: errorMsg
        });
      };

      console.error(error);
    } finally {

      setToggleHidePassWord('');
      setLoading(false);
    };

  };

  return <form
    id="signup-form"
    action=""
    className='min-w-[200px] sm:min-w-[320px] md:min-w-[480px] flex flex-col gap-4 p-10 border rounded transition-shadow hover:shadow-gray-700 hover:shadow-2xl '
    onSubmit={handleSubmit(handleSignUpForm)}
  >
    <label htmlFor="username" className='w-full flex flex-col gap-2'>
      User name
      <input
        autoComplete='true'
        id='username'
        type="text"
        placeholder='User name'
        className={`flex-1 text-sm p-1 rounded bg-inherit border ${errors.userName ? 'border-red-600 outline-red-600' : ''}`}
        {...register('userName')}
      />
      {errors.userName && <p className="text-xs text-red-600"> {errors.userName.message?.toString()} </p>}
    </label>
    <label htmlFor="email" className='w-full flex flex-col gap-2'>
      Email
      <input
        autoComplete='true'
        id='email'
        type="email"
        placeholder='Email'
        className={`flex-1 text-sm p-1 rounded bg-inherit border ${errors.email ? 'border-red-600 outline-red-600' : ''}`}
        {...register('email')}
      />
      {errors.email && <p className="text-xs text-red-600"> {errors.email.message?.toString()} </p>}
    </label>
    <label htmlFor="password" className='w-full flex flex-col gap-2'>
      Password
      <div className="flex-1">
        <div className="relative w-full">
          <input
            autoComplete='true'
            id='password'
            type={toggleHidePassWord !== 'passWord' ? "password" : "text"}
            placeholder='Password'
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
      {errors.passWord && <p className="text-xs text-red-600"> {errors.passWord.message?.toString()} </p>}
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
      {errors.comfirmPassWord && <p className="text-xs text-red-600"> {errors.comfirmPassWord.message?.toString()} </p>}
    </label>
    <div></div>
    <div id="sign-up-submit-btn-wrapper" className='w-full flex'>
      <button
        id="submit-btn"
        className='flex-1 text-sm p-1 rounded bg-inherit border cursor-pointer hover:text-stone-400 active:text-green-300'>
        {!loading ? "Sign up" : 'Loading...'}
      </button>
    </div>
  </form>
};

export default SignUpform;