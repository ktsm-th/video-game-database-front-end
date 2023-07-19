import HeaderLink from '@/components/header-link'
import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCat, faCloud, faGamepad, faGhost, faMagnifyingGlass, faPlus, faSplotch } from '@fortawesome/free-solid-svg-icons'


export default function Document() {
  return (
    <Html lang="en">
      <Head
      />
      <body>
      <header>
          <div className="flex w-full justify-center items-center h-28 bg-header-img bg-center">
            <Link href="/">
              <h1 className="text-white font-bold bg-black drop-shadow-[10px_10px_0px_rgba(74,222,128,1)] pl-4 pr-4 mr-20  w-[320px] min-w-fit h-16 flex justify-center items-center text-5xl">
              Pixel Hunt
              </h1>
            </Link>
            <div className='flex justify-center'>
              <HeaderLink link="/games" icon={faGamepad} />
              <HeaderLink link="/consoles" icon={faSplotch} />
              <HeaderLink link="/companies" icon={faCat} />
              <HeaderLink link="/publishers" icon={faCloud} />
              <HeaderLink link="/genres" icon={faGhost} />
              <HeaderLink link="/new" icon={faPlus} />
            </div>
            <div>
            <div className='flex ml-20'>
                <input className="w-full border-2 border-gray-400 bored" type="text" id="search" name="search" />
                <button type="submit" className="text-center text-white font-bold text-3xl flex justify-center items-center ml-6 mr-2 hover:text-green-400"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
            </div>
            </div>
          </div>
        </header>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
