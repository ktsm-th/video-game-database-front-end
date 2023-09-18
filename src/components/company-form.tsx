import Link from 'next/link';
import Image from 'next/image'
import useSWR from 'swr';
import Select from 'react-select'
import { useState } from 'react';


export default function CompanyForm() {
  const [formErrors, setFormErrors] = useState<Object>({})

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormErrors({})

    const data = new FormData();
    data.append('name', event.target.name.value)
    data.append('founding_date', event.target.founding_date.value)
    data.append('image', event.target.image.files[0])

    const endpoint = 'http://192.168.1.120/api/companies'

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: data,
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()
    setFormErrors(result.errors)


  }
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
                  <label className="font-bold text-l" htmlFor="founding_date">Founding Date:</label>
                  <input className="w-full border-2" type="date" id="founding_date" name="founding_date" />
                </div>
              </div>
              <div className=" mt-4">
                <label className="font-bold text-l" htmlFor="image">Image:</label>
                <input className="w-full border-2" type="file" id="image" name="image" />
              </div>


              <button className={`text-center text-white font-bold bg-black drop-shadow-[5px_5px_0px_rgba(74,222,128,1)] w-24 h-8 flex justify-center items-center text-base mt-4 mb-4 hover:drop-shadow-[5px_5px_0px_rgba(236,72,153,1)]`}>
               SUBMIT
              </button>
              {
                formErrors ?
                    Object.values(formErrors).map((error) => {
                      return <p> {error} </p>
                    }) :
                  <p>Company Submitted!</p>
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
