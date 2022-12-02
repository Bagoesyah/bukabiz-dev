import { useEffect, useState } from "react"

import { axiosGet } from "@library/useAxios"
import {
  Layout,
  SectionPath,
  JumbotronFooter
} from '@components/index'

function tentang() {
  const [loading, setLoading] = useState(true)
  const [about, setAbout] = useState({})

  useEffect(() => getData(), [])

  const getData = () => {
    axiosGet(
      'v1/about-us/fetch',
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
      (success) => {
        setAbout(success.data.data)
        setLoading(false)
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Layout title="Tentang" >
      <SectionPath
        path={['Home', 'Tentang Bukabiz']}
        className=" bg-gray-100"
      />      
      <JumbotronFooter
        title={about?.metadata?.headerName}
        desc={about?.metadata?.headerDesc}
      />
      <div className=" justify-center md:flex">
        <div className="md:w-[50rem] md:py-20 py-4 px-4 md:px-0">
          {!loading && (
            <>
              <div className=" font-bold text-xl">{about?.items[0]?.aboutUsTitle}</div>
              <div className="flex flex-col space-y-6 text-gray-500 mt-2 text-justify">
                <p className="font-sm">{about?.items[0]?.aboutUsDescription}</p>
              </div>
            </>
          )}
        </div>
      </div>

    </Layout>
  )
}
export default tentang