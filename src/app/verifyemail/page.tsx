"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState, Suspense } from "react";

const Varify = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [timing, setTiming] = useState<number>(-1);
  const [OTP, setOTP] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const router = useRouter();

  const handleTiming = () => {
    setTiming(pre => pre > 0 ? pre - 1 : 20);
    intervalRef.current = setInterval(() => {
      setTiming(pre => pre > 0 ? pre - 1 : 20);
    }, 800);

    return () => clearInterval(intervalRef.current);
  };

  const handleStopTiming = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  };

  const handleSendOTP = async () => {

    if (!email ||
      timing > 0
    ) return;

    try {

      handleTiming()

      const url = 'http://localhost:3000/api/verifyemail';
      const res = await axios(url);
      console.log(res);
    } catch (error) {
      console.error(error);
    };
  };

  const handleEmailVerification = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email ||
      loading) return;

    try {

      if (!OTP) throw ({ response: { data: { msg: 'OTP is not provided' } } });
      setLoading(true);

      const url = 'http://localhost:3000/api/verifyemail';
      const body = { OTP };
      const res = await axios.post(url, body);
      console.log(res.data);
      router.push('/');

    } catch (error) {
      const getError = error as {
        response:{data: {msg: string}}
    }
      setError(getError.response.data.msg?.toString());
      console.error(error);
    } finally {

      setLoading(false);
    };

  };

  useEffect(() => {
    if (timing === 0) {
      handleStopTiming();
    }
  }, [timing]);


  return <>
    <header></header>
    <main id="verify-email-page" className='flex justify-center items-center min-h-screen'>
      <div id="verify-email-content">
        <div className="flex justify-center w-full mb-14">
          <h2 className="text-2xl font-serif font-semibold">Email Verification</h2>
        </div>
        <form
          id="email-verification-form"
          action=""
          onSubmit={handleEmailVerification}
          className='min-w-[200px] sm:min-w-[320px] md:min-w-[480px] flex flex-col gap-4 p-10 border rounded transition-shadow hover:shadow-gray-700 hover:shadow-2xl '>
          <label htmlFor="email" className='w-full flex flex-col gap-2'>
            Email
            <input
              autoComplete='true'
              id='email'
              type="email"
              placeholder='email'
              value={email}
              onChange={(e) => e.target.value = email}
              className="flex-1 text-sm p-1 rounded bg-inherit border"
            />
          </label>
          <label htmlFor="opt" className='w-full flex flex-col gap-2'>
            OTP
            <div className="flex-1 flex items-center gap-4">
              <input
                autoComplete='true'
                id='opt'
                type="text"
                placeholder='OTP'
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                className="w-full text-sm p-1 rounded bg-inherit border" />
              <input
                id="send-opt"
                type="button"
                value={timing <= 0 ? 'OTP' : timing}
                className="font-semibold text-base font-sans w-12 h-8 cursor-pointer bg-gray-600 rounded-full"
                onClick={handleSendOTP} />
            </div>
            {error ? <p className="text-xs text-red-600"> {error} </p> : null}
            {timing === 0 ? <p className="text-xs font-semibold text-green-800 uppercase ">OTP has been sent your mail box </p> : null}
          </label>
          <div></div>
          <div id="log-in-submit-btn-wrapper" className='w-full flex'>
            <button
              id="submit-btn"
              className='flex-1 p-1 rounded bg-inherit border cursor-pointer hover:text-stone-400 active:text-green-300'>
              {!loading ? "Verify" : "Process..."}
            </button>
          </div>
        </form>
      </div>
    </main>
    <footer></footer>
  </>

};


export default function Page(){

  return <Suspense fallback={<div>Loading...</div>}>
     <Varify />
  </Suspense>
};

