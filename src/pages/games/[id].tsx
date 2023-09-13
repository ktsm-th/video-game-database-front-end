import Image from 'next/image'
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Spinner from '@/components/spinner';
import NameTile from '@/components/name-tile';
import GenreTile from '@/components/genre-tile';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Game {
  id: string,
  name: string,
  description: string,
  image: string,
  release_date: string,
  publisher: object,
  consoles: object,
  genres: object,
}

const GameDetail = () => {
  const router = useRouter();
  const { data, error } = useSWR('http://192.168.1.120/api/games/' + router.query.id, fetcher);
  if (!data) return <Spinner />;
  let game = data.data;
  console.log(game.consoles)

  return (
    <main>
      <Head>
      <title>{game.name} | GAMEPAL</title>
      </Head>
      <div className="flex justify-center mt-8 mb-8">
        <div className="w-2/3 ml-4">
          <div className="flex justify-center">
            <Image
                src={game.image}
                width={500}
                height={500}
                alt="Profile Image"
                className=" border-8 border-black object-cover object-top"
            />
              <div className="w-96 ml-4">
              <h2 className="mt-4 font-bold text-3xl">{game.name}</h2>
              <Link href={`/publishers/${game.publisher.id}`}><h3 className="text-2xl text-zinc-800">{game.publisher.name}</h3></Link>

              <p className="mt-2">{game.description}<span className="font-semibold text-zinc-800"> Released: {game.release_date}.</span></p>

                <div className="flex mt-4">
                  {game.genres.map((genre: object, index: number) => (
                      <div key={index}>
                      <GenreTile
                          key={index}
                          name={genre.name}
                          link={`/genres/${genre.id}`}
                        />
                      </div>
                      ))}
                </div>
              </div>
            </div>

            <h2 className="mt-4 font-bold text-3xl justify-center flex">AVAILABLE ON</h2>
             <div className="flex justify-center mt-4">
              {game.consoles.map((console: object, index: number) => (
                  <div key={index}>
                  <NameTile
                      key={index}
                      name={console.name}
                      link={`/consoles/${console.id}`}
                    />
                  </div>
                  ))}
            </div>
          </div>
      </div>
    </main>
  )
}

export default dynamic(() => Promise.resolve(GameDetail), {
  ssr: false,
});
