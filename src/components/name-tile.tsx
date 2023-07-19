import Link from 'next/link';
import Image from 'next/image'

type TileProps = {
  link: string,
  name: string,
}

export default function Tile({ link, name,}: TileProps) {
  return (
    <div className={`flex mx-4 basis-1/2 `}>
      <div className={`sm-desktop:self-end mb-8 flex flex-col items-center`}>
        <button className={`text-center text-white font-bold bg-black drop-shadow-[5px_5px_0px_rgba(74,222,128,1)] w-auto p-2 h-8 flex justify-center items-center text-base mt-1 hover:drop-shadow-[5px_5px_0px_rgba(236,72,153,1)]`}>
          <Link href={link}>{name}</Link>
        </button>
      </div>
    </div>
  )
}
