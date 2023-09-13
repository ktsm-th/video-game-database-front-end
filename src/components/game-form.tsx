import Link from 'next/link';
import Image from 'next/image'
import useSWR from 'swr';
import Select from 'react-select'
import { useState } from "react";

const fetchData = async (url:string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export default function GameForm() {
  const { data : consoles, error : consoleError } = useSWR('http://192.168.1.120/api/consoles', fetchData);
  const { data : publishers, error : publisherError } = useSWR('http://192.168.1.120/api/publishers', fetchData);
  const { data: genres, error: genreError } = useSWR('http://192.168.1.120/api/genres', fetchData);

  const [selectedConsoles, setConsoles] = useState<Number[]>([])
  const [selectedGenres, setGenres] = useState<Number[]>([])

  function handleConsoleChange(option) {
    setConsoles(option.map(o => o.value))
  }

  function handleGenreChange(option) {
    setGenres(option.map(o => o.value))
  }

  let formSuccess = false
  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = new FormData();
    data.append('name', event.target.name.value)
    data.append('description', event.target.description.value)
    data.append('release_date', event.target.release_date.value)
    data.append('publisher_id', event.target.publisher_id.value)
    selectedConsoles.forEach(console => {
      data.append('console_ids[]', console)
    })
    selectedGenres.forEach(genre => {
      data.append('genre_ids[]', genre)
    })
    data.append('image', event.target.image.files[0])

    const endpoint = 'http://192.168.1.120/api/games'

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: data,
    }
    const response = await fetch(endpoint, options)
    const result = await response.json()
    formSuccess = true
  }

  if (consoleError || publisherError || genreError) {
    return <div>Error loading data</div>;
  }
  if (!consoles || !publishers || !genres) {
    return <div>Loading...</div>;
  }

  const consoleOptions = consoles.map((console: object) => {
    return {
      value: console.id, label: console.name
    }
  })

  const publisherOptions = publishers.map((publisher: object) => {
    return {
      value: publisher.id, label: publisher.name
    }
  })

  const genreOptions = genres.map((genre: object) => {
    return {
      value: genre.id, label: genre.name
    }
  })

  return (
    <div className={`flex mx-4 sm-desktop:justify-end flex-col-reverse basis-1/2`}>
      <div className={`sm-desktop:self-end mb-8 flex flex-col items-center`}>
        <h3 className={`font-bold text-xl mt-2 sm-desktop:mt-0`}></h3>
        <div className="flex justify-center mb-8">
          <div className="w-auto ml-8">
            <form onSubmit={handleSubmit} method="post">
              <div className="flex">
                <div className="w-1/2 mr-1">
                  <label className="font-bold text-l" htmlFor="name">Name:</label>
                  <input className="w-full border-2" type="text" id="name" name="name" />
                </div>
                <div className="w-1/2 ml-1">
                  <label className="font-bold text-l" htmlFor="release_date">Release Date:</label>
                  <input className="w-full border-2" type="date" id="release_date" name="release_date" />
                </div>
              </div>
              <div className="mt-4">
                <label className="font-bold text-l" htmlFor="description">Description:</label>
                <textarea id="description" name="description" className="block p-2.5 w-full h-24 text-sm text-gray-900 bg-white border-2 focus:ring-0 focus:ring-0 resize-none" />
              </div>
              <div className="mt-4">
                <label className="font-bold text-l " htmlFor="console_ids">Available on:</label>
                <Select name="console_ids" id="console_ids" onChange={handleConsoleChange} isMulti={true} options={consoleOptions} />
              </div>
              <div className="mt-4">
                <label className="font-bold text-l" htmlFor="publisher_id">Released by:</label>
                <Select name="publisher_id" id="publisher_id" options={publisherOptions} />
              </div>
              <div className="mt-4">
                <label className="font-bold text-l" htmlFor="genre_ids">Game genre:</label>
                <Select name="genre_ids" id="genre_ids" onChange={handleGenreChange} isMulti={true} options={genreOptions} />
              </div>
              <div className=" mt-4">
                <label className="font-bold text-l" htmlFor="image">image:</label>
                <input className="w-full border-2" type="file" id="image" name="image" />
              </div>

              <button type="submit" className={`text-center text-white font-bold bg-black drop-shadow-[5px_5px_0px_rgba(74,222,128,1)] w-24 h-8 flex justify-center items-center text-base mt-4 hover:drop-shadow-[5px_5px_0px_rgba(236,72,153,1)]`}>
                SUBMIT
              </button>
              {
                formSuccess ?
                  <p>Game Submitted!</p> :
                  <p></p>
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
