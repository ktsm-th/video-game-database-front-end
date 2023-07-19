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

export default function ConsoleForm() {
  const { data : companies, error : companyError } = useSWR('http://192.168.1.120/api/companies', fetchData);

  if (companyError) {
    return <div>Error loading data</div>;
  }
  if (!companies) {
    return <div>Loading...</div>;
  }

  const companyOptions = companies.map((company: object) => {
    return {
      value: company.id, label: company.name
    }
  })

  return (
    <div className={`flex mx-4 sm-desktop:justify-end flex-col-reverse basis-1/2`}>
      <div className={`sm-desktop:self-end mb-8 flex flex-col items-center`}>
        <h3 className={`font-bold text-xl mt-2 sm-desktop:mt-0`}></h3>
        <div className="flex justify-center mb-8">
          <div className="w-auto ml-8">
            <form action="/send-data-here" method="post">
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
                <label className="font-bold text-l " htmlFor="company_id">Released by:</label>
                <Select name="com
                pany_id" id="company_id" options={companyOptions} />
              </div>

              <button className={`text-center text-white font-bold bg-black drop-shadow-[5px_5px_0px_rgba(74,222,128,1)] w-24 h-8 flex justify-center items-center text-base mt-4 hover:drop-shadow-[5px_5px_0px_rgba(236,72,153,1)]`}>
                <Link href={""}>SUBMIT</Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
