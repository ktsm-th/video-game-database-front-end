import HeaderLink from '@/components/header-link'
import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCat, faCloud, faGamepad, faGhost, faMagnifyingGlass, faPlus, faSplotch } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'


export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://use.typekit.net/oov2wcw.css"></link>
      </Head>

      <body>
      <header>
          <div className="flex w-full justify-center items-center h-28 bg-center bg-slate-50 bg-header-img ">
            <Link href="/">
              <div>
                  <Image
                    src="/logo.png"
                    width={275}
                    height={275}
                    alt="Profile Image"
                    className="pl-4 pr-4  mr-20 w-[320px] h-[100px] min-w-fit flex justify-center items-center"
                  />
              </div>
            </Link>
            <div className='flex justify-center'>
              <HeaderLink link="/games" icon={faGamepad} text="test"/>
              <HeaderLink link="/consoles" icon={faSplotch} text="test"/>
              <HeaderLink link="/companies" icon={faCat} text="test"/>
              <HeaderLink link="/publishers" icon={faCloud} text="test"/>
              <HeaderLink link="/genres" icon={faGhost} text="test"/>
              <HeaderLink link="/new" icon={faPlus} text="test"/>
            </div>
            <div>
            <div className='flex ml-20'>
                <input className="w-auto border-2 rounded-md bored" type="text" id="search" name="search" />
                <button type="submit" className="text-center text-white  font-bold text-3xl flex justify-center items-center ml-6 mr-2 hover:text-green-400"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
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
