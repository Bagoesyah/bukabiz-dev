import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Error from "next/error"

import { axiosGet } from '@library/useAxios'
import {
  Layout,
  SectionPath,
  Dangerously
} from '@components/index'

// import ICChecked from '@assets/CheckedCircle.svg'

function DetailKarir() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (router.query.id) getData()
  }, [router])

  const getData = () => {
    axiosGet(
      `v1/job/detail/${router.query.id}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      },
      success => {
        setData(success.data.data)
        setLoading(false)
      },
      error => {
        console.log(error);
        setLoading(false)
      }
    )
  }

  if (!loading && data == null) return <Error statusCode={404} />

  return (
    <Layout title="Detail Karir" >
      <SectionPath
        path={['Home', 'Karir & Intership']}
        className=" bg-gray-100"
      />
      <div className=" flex flex-col space-y-4 text-center bg-gray-100 py-16">
        <div className=" text-black text-5xl font-bold">{data?.categoryJob?.categoryJobName}</div>
        <div>
          <button
            className=" bg-primary p-2 px-5 text-sm font-bold rounded focus:outline-none"
            onClick={() => alert('Soon!')}
          >
            Apply Now
          </button>
        </div>
      </div>
      <div className=" justify-center flex">
        <div className=" md:w-[60rem] md:py-20 py-4 px-4 md:px-0 flex flex-col">
          <div className=" p-4 md:p-8 border-2 rounded-lg flex justify-between w-full space-x-2">
            <div className=" flex flex-col items-center space-y-2 text-sm md:text-base">
              <div className=" text-gray-500">Employment type</div>
              <div className=" font-bold">{data?.typeJob?.typeJobName}</div>
            </div>
            <div className=" flex flex-col items-center space-y-2 text-sm md:text-base">
              <div className=" text-gray-500">Location</div>
              <div className=" font-bold">{data?.city?.cityName}</div>
            </div>
            <div className=" flex flex-col items-center space-y-2 text-sm md:text-base">
              <div className=" text-gray-500 ">Apply date</div>
              <div className=" font-bold ">{data?.appDateDif}</div>
            </div>
          </div>
          <div className=" py-4">
            <div className=" md:flex space-y-4">
              <div className=" w-80 font-bold py-4">Job Description</div>
              {/* <div className=" w-full">{data?.jobDescription}</div> */}
              <div className=" w-full">
                <Dangerously content={data?.jobDescription} />
              </div>
            </div>
          </div>
          <hr />
          <div className=" py-4">
            <div className=" md:flex space-y-4">
              <div className=" w-80 font-bold py-4">Requirements</div>
              <div className=" w-full">
                <Dangerously content={data?.jobRequirements} />
              </div>
              {/* <div className=" w-full ">
                <div className="flex flex-col">{data?.jobRequirements}</div>
                <div className=" flex flex-col space-y-3 mt-8">
                  <div className=" flex space-x-2">
                    <ICChecked />
                    <span>2+ years of work experience</span>
                  </div>
                  <div className=" flex space-x-2">
                    <ICChecked />
                    <span>Proficient in writing </span>
                  </div>
                  <div className=" flex space-x-2">
                    <ICChecked />
                    <span>Understanding of OOP principles and practices</span>
                  </div>
                  <div className=" flex space-x-2">
                    <ICChecked />
                    <span>MySQL database design skills</span>
                  </div>
                  <div className=" flex space-x-2">
                    <ICChecked />
                    <span>Version control and Git workflow</span>
                  </div>
                </div> 
              </div>*/}
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}
export default DetailKarir