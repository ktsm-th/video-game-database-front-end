import useSWR from 'swr';
import { useRouter } from 'next/router';
import Select from 'react-select'
import NameTile from '@/components/name-tile';
import Spinner from '@/components/spinner';

export default function ConsoleGames() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json())

  const ConsoleGames = () => {
    const router = useRouter();
    const { data, error } = useSWR('http://192.168.1.120/api/consoles/${router.query.id}/games', fetcher);
    if (!data) return <Spinner />;
    let games = data.data;

    return (
      <div>
        <h2 className="mt-4 font-bold text-3xl justify-center flex">GAMES</h2>
        <div className="flex justify-center mt-4">
          {games.map((game: object, index: number) => (
            <div key={index}>
              <NameTile
                key={index}
                name={game.name}
                link={`/game/${game.id}`}
              />
            </div>
          ))}
        </div>
      </div>

    )
  }
}
