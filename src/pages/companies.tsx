import Image from 'next/image'
import { Inter } from 'next/font/google'
import useSWR from 'swr';
import Tile from '@/components/tile';

const inter = Inter({ subsets: ['latin'] })

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
  const { data, error } = useSWR('http://192.168.1.120/api/companies', fetchData);
  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <main >
      <div className="flex items-center justify-center">
       <h1 className="text-white font-bold drop-shadow-[10px_10px_0px_rgba(74,222,128,1)] bg-black pl-4 pr-4 mt-11 mb-11 w-68 h-16 flex justify-center items-center text-5xl ">COMPANIES</h1>
      </div>
      <div className="flex items-center justify-center">
          <div className={`flex flex-wrap w-1/2 justify-center min-h-screen ${inter.className}`}>
            {data.map((company: object, index: number) => (
              <div key={index}>
                <Tile
                  key={index}
                  name={company.name}
                  link={``}
                  image={company.image}
                />
              </div>
            ))}
        </div>
        </div>
    </main>
  )
}
