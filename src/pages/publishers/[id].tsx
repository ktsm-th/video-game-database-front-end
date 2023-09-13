import Image from 'next/image'
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Spinner from '@/components/spinner';
import NameTile from '@/components/name-tile';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Publisher {
  id: string,
  name: string,
  image: string,
  founding_date: string,
  games: object,
}

const PublisherDetail = () => {
  const router = useRouter();
  const { data, error } = useSWR('http://192.168.1.120/api/publishers/' + router.query.id, fetcher);
  if (!data) return <Spinner />;
  let publisher = data.data;

  return (
    <main>
      <Head>
      <title>{publisher.name} | GAMEPAL</title>
      </Head>
      <div className="flex justify-center mt-8 mb-8">
        <div className="w-2/3 ml-4">
          <div className="flex justify-center">
            <Image
                src={publisher.image}
                width={500}
                height={500}
                alt="Profile Image"
                className=" border-8 border-black object-cover object-top"
            />
              <div className="w-96 ml-4">
              <h2 className="mt-4 font-bold text-3xl">{publisher.name}</h2>
              <p className="mt-2 font-semibold"> Founded: {publisher.founding_date}.</p>
              </div>
            </div>

          <h2 className="mt-4 font-bold text-3xl justify-center flex uppercase">GAMES RELEASED BY {publisher.name}</h2>
             <div className="flex justify-center mt-4">
              {publisher.games.map((game: object, index: number) => (
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

export default dynamic(() => Promise.resolve(PublisherDetail), {
  ssr: false,
});
