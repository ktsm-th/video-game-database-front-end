import Image from 'next/image'
import { Inter } from 'next/font/google'
import useSWR from 'swr';
import Tile from '@/components/tile';
import GameForm from '@/components/game-form';
import ConsoleForm from '@/components/console-form';
import CompanyForm from '@/components/company-form';
import PublisherForm from '@/components/publisher-form';
import GenreForm from '@/components/genre-form';

const inter = Inter({ subsets: ['latin'] })

export default function New() {
  return (
    <main >
      <div className="flex items-center justify-center">
        <h1 className="text-black font-bold pl-4 pr-4 mt-11 mb-11 h-16 flex justify-center items-center text-5xl ">ADD A NEW</h1>
        <h1 className="text-white font-bold drop-shadow-[10px_10px_0px_rgba(74,222,128,1)] bg-black mt-11 mb-11 pb-1 pr-1 w-48 h-16 flex justify-center items-center text-5xl ">GAME</h1>
      </div>
      <div className="flex items-center justify-center">
        <div className={`flex flex-wrap w-1/2 justify-center min-h-screen ${inter.className}`}>

          <div className="w-full">
            <GenreForm />
            <PublisherForm/>

          </div>

        </div>
      </div>
    </main>
  )
}
