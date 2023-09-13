import Image from 'next/image'
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Spinner from '@/components/spinner';
import NameTile from '@/components/name-tile';

import ConsoleGames from '@/components/console-games';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Console {
  id: string,
  name: string,
  description: string,
  image: string,
  release_date: string,
  company: string,
}

const ConsoleDetail = () => {
  const router = useRouter();
  const { data, error } = useSWR('http://192.168.1.120/api/consoles/' + router.query.id, fetcher);
  if (!data) return <Spinner />;
  let platform = data.data;

  return (
    <main>
      <Head>
      <title>{platform.name} | GAMEPAL</title>
      </Head>
      <div className="flex justify-center mt-8 mb-8">
        <div className="w-2/3 ml-4">
          <div className="flex justify-center">
            <Image
                src={platform.image}
                width={500}
                height={500}
                alt="Profile Image"
                className=" border-8 border-black object-cover object-top"
            />
              <div className="w-96 ml-4">
              <h2 className="mt-4 font-bold text-3xl">{platform.name}</h2>
              <Link href={""}><h3 className="text-2xl">{platform.company.name}</h3></Link>
              <p className="mt-2">{platform.description}<span className="font-semibold"> Released: {platform.release_date}.</span></p>
              </div>
            </div>

            <h2 className="mt-4 font-bold text-3xl justify-center flex">GAMES</h2>
             <div className="flex justify-center mt-4">
              {platform.games.map((game: object, index: number) => (
                  <div key={index}>
                  <NameTile
                      key={index}
                      name={game.name}
                      link={`/games/${game.id}`}
                    />
                  </div>
                  ))}
            </div>
          </div>
      </div>

      <ConsoleGames></ConsoleGames>

    </main>
  )
}

export default dynamic(() => Promise.resolve(ConsoleDetail), {
  ssr: false,
});
