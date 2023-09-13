import Image from 'next/image'
import useSWR from 'swr';
import Tile from '@/components/tile';

const fetchData = async (url:string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export default function Home() {
  const { data, error } = useSWR('http://192.168.1.120/api/genres', fetchData);
  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <main >
      <div className="flex items-center justify-center">
       <h1 className="text-white font-bold drop-shadow-[10px_10px_0px_rgba(74,222,128,1)] bg-black pl-4 pr-4 mt-11 mb-11 w-68 h-16 flex justify-center items-center text-5xl ">GENRES</h1>
      </div>
      <div className="flex items-center justify-center">
          <div className={`flex flex-wrap w-1/2 justify-center min-h-screen`}>
            {data.map((genre: object, index: number) => (
              <div key={index}>
                <Tile
                  key={index}
                  name={genre.name}
                  link={`/genres/${genre.id}`}
                  image={genre.image}
                />
              </div>
            ))}
        </div>
        </div>
    </main>
  )
}
