import { useEffect, useState } from "react"
import Link from "next/link"

import { axiosGet } from "@library/useAxios"

import {
  Layout,
} from '@components/index'


function SyaratKetentuan() {
  const [loading, setLoading] = useState(true)
  const [other, setOther] = useState({})

  useEffect(() => getData(), [])

  const getData = () => {
    axiosGet(
      'v1/other/fetch',
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
      (success) => {
        setOther(success.data.data)
        setLoading(false)
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Layout title="Kebijakan Privasi" >
      <div className=" justify-center flex">
        <div className=" w-[85rem] py-40 flex">
          <div className=" w-1/3 space-y-20">
            <div className=" flex-col space-y-4">
              <Link href={`/kebijakan-privasi`}>
                <div className=" text-gray-500 cursor-pointer">Kebijakan Privasi</div>
              </Link>
              <div className=" font-bold">Syarat & Ketentuan</div>
            </div>
          </div>
          {!loading && (
            <div className=" w-2/3 space">
              <div className=" text-3xl font-bold">{other?.items[1]?.otherTitle}</div>
              <div className=" flex flex-col space-y-4 mt-6 text-gray-500">
                <div>
                  {other?.items[1]?.otherDescription}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </Layout>
  )
}
export default SyaratKetentuan