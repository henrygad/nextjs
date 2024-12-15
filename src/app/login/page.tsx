import Link from 'next/link';
import Loginform from '../components/auth/LogInform';
import styles from './style.module.css';

const login = () => {

  return <>
    <header></header>
    <main id="sign-up-page" className={styles.sec}>
      <div id='sign-up-content' className={styles.contentBody} >
        <div>
          <div id='logo' className='mb-2'>
            <span className="font-mono text-xl text-yellow-300 capitalize">
              ToDo-u
            </span>
          </div>
          <div id='sign-up-title' className='mb-10'>
            <h2 className='capitalize text-xl'>
              Log in
            </h2>
          </div>
          <Loginform />
        </div>

      </div>
    </main>
    <footer className='w-full flex justify-center'>
      <div className='space-y-2'>
        <p>{`Don't have an account?`}</p>
        <div className='w-full flex justify-center'>
          <button className='transition-colors duration-500 hover:text-stone-300 active:text-green-200 px-2 py-1 border rounded'>
            <Link href="/signup">
              Sign up
            </Link>
          </button>
        </div>
      </div>
    </footer>
  </>
};

export default login;