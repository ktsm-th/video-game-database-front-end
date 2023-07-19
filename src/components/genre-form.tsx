import Link from 'next/link';
import Image from 'next/image'
import useSWR from 'swr';
import Select from 'react-select'

const fetchData = async (url:string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export default function GenreForm() {
  let formSuccess = false
  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      name: event.target.name.value,
      description: event.target.description.value,
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = 'http://192.168.1.120/api/genres'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    const result = await response.json()
    formSuccess = true
  }

  return (
    <div className={`flex mx-4 sm-desktop:justify-end flex-col-reverse basis-1/2`}>
      <div className={`sm-desktop:self-end mb-8 flex flex-col items-center`}>
        <div className="flex justify-center mb-8 w-full">
          <div className="w-full ml-8">
            <form onSubmit={handleSubmit} method="post">
              <div className="flex">
                <div className="w-full mr-1">
                  <label className="font-bold text-l" htmlFor="name">Name:</label>
                  <input className="w-full border-2" type="text" id="name" name="name" />
                </div>
              </div>
              <div className=" mt-4">
                <label className="font-bold text-l" htmlFor="description">Description:</label>
                <textarea id="description" name="description" className="block p-2.5 w-full h-24 text-sm text-gray-900 bg-white border-2 focus:ring-0 focus:ring-0 resize-none" />
              </div>
              <button type="submit" className={`text-center text-white font-bold bg-black drop-shadow-[5px_5px_0px_rgba(74,222,128,1)] w-24 h-8 flex justify-center items-center text-base mt-4 hover:drop-shadow-[5px_5px_0px_rgba(236,72,153,1)]`}>
                SUBMIT
              </button>
              {
                formSuccess ?
                  <p>Genre Submitted!</p> :
                  <p></p>
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
