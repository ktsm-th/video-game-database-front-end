import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import NewForms from '@/components/new-forms';
import GenreForm from '@/components/genre-form';

export default function New() {
  const forms = ['GAME','CONSOLE','COMPANY','PUBLISHER','GENRE']
  const [selectedForm, setForm] = useState<number>(0)

  function updateForm() {
    (selectedForm + 1 > forms.length - 1) ? setForm(0) : setForm(selectedForm + 1)
  }


  return (
    <main >
      <div className="flex items-center justify-center ">
        <h1 className="text-black font-bold pl-4 pr-4 mt-11 mb-11 h-16 flex justify-center items-center text-5xl ">ADD A NEW</h1>
        <div>
          <h1 className="text-white font-bold drop-shadow-[10px_10px_0px_rgba(74,222,128,1)] bg-black mt-11 mb-11 pb-1 px-4 w-72 h-16 flex justify-center items-center text-5xl ">{forms[selectedForm]}</h1>
        </div>
        <div className='ml-10'>
          <button onClick={updateForm}>
            <FontAwesomeIcon className="" icon={faArrowsRotate} size="2xl" style={{ color: "#000000", }} />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className={`flex flex-wrap w-1/2 justify-center min-h-screen`}>

          <div className="w-full">
            <NewForms
            currentForm={selectedForm}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
