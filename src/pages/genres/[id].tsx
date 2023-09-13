import Image from 'next/image'
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Spinner from '@/components/spinner';
import NameTile from '@/components/name-tile';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Genre {
  id: string,
  name: string,
  description: string,
  games: object,
}

const GenreDetail = () => {
  const router = useRouter();
  const { data, error } = useSWR('http://192.168.1.120/api/genres/' + router.query.id, fetcher);
  if (!data) return <Spinner />;
  let genre = data.data;

  return (
    <main>
      <Head>
      <title>{genre.name} | GAMEPAL</title>
      </Head>
      <div className="flex justify-center mt-8 mb-8">
        <div className="w-2/3 ml-4">
          <div className="flex justify-center">
              <div className="w-96 ml-4">
              <h2 className="mt-4 font-bold text-3xl">{genre.name}</h2>
              <p className="mt-2">{genre.description}</p>
              </div>
            </div>

          <h2 className="mt-4 font-bold text-3xl justify-center flex uppercase">{genre.name} GAMES</h2>
             <div className="flex justify-center mt-4">
              {genre.games.map((game: object, index: number) => (
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
    </main>
  )
}

export default dynamic(() => Promise.resolve(GenreDetail), {
  ssr: false,
});
