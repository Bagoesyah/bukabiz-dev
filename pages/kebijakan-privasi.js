import { useEffect, useState } from "react"
import Link from "next/link"

import { axiosGet } from "@library/useAxios"

import {
  Layout,
} from '@components/index'

function KebijakanPrivasi() {
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
              <div className=" font-bold">Kebijakan Privasi</div>
              <Link href={`/syarat-ketentuan`}>
                <div className=" text-gray-500 cursor-pointer">Syarat & Ketentuan</div>
              </Link>
            </div>
          </div>
          {!loading && (
            <div className=" w-2/3 space">
              <div className=" text-3xl font-bold">{other?.items[0]?.otherTitle}</div>
              <div className=" flex flex-col space-y-4 mt-6 text-gray-500">
                <div>
                  {other?.items[0]?.otherDescription}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

    </Layout>
  )
}
export default KebijakanPrivasi