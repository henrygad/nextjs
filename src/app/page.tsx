import Link from "next/link"


export default function Home() {

  return <>
    <header >
      <menu className="flex justify-between gap-4 items-center h-10">
        <span className="font-mono text-xl text-yellow-300 capitalize">
          ToDo-u
        </span>
        <ul className="flex justify-around items-center gap-4 text-xs px-2">
          <li className="transition-colors duration-500 hover:text-stone-300 active:text-green-200 px-2 py-1 border rounded">
            <Link href="/login">
              Log in
            </Link>
          </li>
          <li>
            <Link href="/signup">
              Sign up
            </Link>
          </li>
        </ul>
      </menu>
    </header>
    <main id="home-page">
      <div id="hero-sec" className="space-4">
        <hr />
      </div>
    </main>
    <footer>
    </footer>
  </>
};
