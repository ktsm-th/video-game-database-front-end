import Link from 'next/link';
import Image from 'next/image'

type TileProps = {
  link: string,
  name: string,
  image: string,
}

export default function Tile({ link, name, image,}: TileProps) {
  return (
    <div className={`flex mx-4 sm-desktop:justify-end flex-col-reverse basis-1/2`}>
      <div className={`sm-desktop:self-end mb-8 flex flex-col items-center`}>
        <h3 className={`font-bold text-xl mt-2 sm-desktop:mt-0`}>{name}</h3>
        <button className={`text-center text-white font-bold bg-black drop-shadow-[5px_5px_0px_rgba(74,222,128,1)] w-24 h-8 flex justify-center items-center text-base mt-1 hover:drop-shadow-[5px_5px_0px_rgba(236,72,153,1)]`}>
          <Link href={link}>EXPAND</Link>
        </button>
      </div>
      <Image
        src={image}
        width={275}
        height={275}
        alt="Profile Image"
        className=" border-8 border-black w-[275px] h-[275px] object-cover object-top"
      />
    </div>
  )
}
