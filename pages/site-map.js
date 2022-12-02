import { useEffect, useState } from "react"

import { axiosGet } from "@library/useAxios"
import {
  Layout,
  SectionPath,
  JumbotronFooter
} from '@components/index'

function sitemap() {
  const [loading, setLoading] = useState(true)
  const [contact, setContact] = useState({})
  const [maps, setMaps] = useState('')

  useEffect(() => getData(), [])

  const getData = () => {
    axiosGet(
      'v1/site-map/fetch',
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
      (success) => {
        setContact(success.data.data)
        setMaps('https://maps.google.com/maps?q=-6.86251496357374,107.57006917328805&hl=es&z=14&amp;output=embed')
        setLoading(false)
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Layout title="Site Map" >
      <SectionPath
        path={['Home', 'Site Map']}
        className=" bg-gray-100"
      />
      <JumbotronFooter
        title={contact?.metadata?.headerName}
        desc={contact?.metadata?.headerDesc}
      />
      <div className=" justify-center flex">
        <div className=" md:w-[60rem] md:py-20 md:flex">
          <div className=" md:w-1/2 md:pr-20 space-y-8 px-4 md:px-0 py-5 md:py-0">
            {!loading && contact?.items?.map(row => (
              <div key={row.siteMapId} className=" space-y-4">
                <div className=" text-xl font-bold">{row.siteMapName}</div>
                <div>
                  <div className=" text-gray-500 text-sm">Alamat</div>
                  <div className=" font-medium">{row.siteMapAddress}</div>
                </div>
                <div>
                  <div className=" text-gray-500 text-sm">Kontak</div>
                  <div className=" font-medium">{row.siteMapPhone}</div>
                  <div className=" font-medium">{row.siteMapMail}</div>
                </div>
              </div>
            ))}
          </div>

          {(!loading && maps !== '') && (
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  position="absolute"
                  top="0"
                  left="0"
                  bottom="0"
                  right="0"
                  width="100%"
                  height="500"
                  id="gmap_canvas"
                  // src="https://maps.google.com/maps?q=sisingamangaraja%20no%20123&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  src="https://maps.google.com/maps?q=-6.86251496357374,107.57006917328805&hl=es&z=14&amp;output=embed"
                  // src={maps}
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                >
                </iframe>
                <a href="https://123movies-to.org"></a>
                <br />
                <style>
                  {`
          .mapouter{position:relative;text-align:right;height:500px;width:100%;}
          `}
                </style>
                <a href="https://www.embedgooglemap.net">interactive google maps for website</a>
                <style>
                  {`
          .gmap_canvas {overflow:hidden;background:none!important;height:500px;width:100%;}
          `}
                </style>
              </div>
            </div>
          )}
        </div>
      </div>

    </Layout>
  )
}
export default sitemap