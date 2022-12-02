import { useEffect, useState } from "react"

import {
  axiosGet,
  axiosPost
} from "@library/useAxios"

import {
  Layout,
  SectionPath,
  JumbotronFooter
} from '@components/index'

import ICPhone from '@assets/PhoneOrange.svg'
import ICMail from '@assets/MailOrange.svg'
import ICFb from '@assets/FbOrange.svg'
import ICIg from '@assets/IgOrange.svg'
import ICTw from '@assets/TwOrange.svg'
import ICYt from '@assets/YtOrange.svg'
import ICTt from '@assets/TtOrange.svg'
import Link from "next/link"

function kontak() {
  const [loading, setLoading] = useState(true)
  const [contact, setContact] = useState({})
  const [form, setForm] = useState({
    name: '',
    email: '',
    desc: ''
  })

  useEffect(() => getData(), [])

  const getData = () => {
    axiosGet(
      // 'v1/contact-type/fetch',
      'v1/contact/fetch',
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
      (success) => {
        setContact(success.data.data)
        setLoading(false)
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleSubmit = () => {
    if (form.name === '') return alert('Nama harus diisi!')
    if (form.email === '') return alert('Alamat Email harus diisi!')
    if (form.desc === '') return alert('Deskripsi harus diisi!')
    axiosPost(
      `v1/contact-question/input`,
      {
        headers: {
          // Authorization: `Bearer ${member.token}`,
          'Content-Type': 'application/json'
        },
      },
      {
        name: form.name,
        email: form.email,
        description: form.desc
      },
      success => {
        alert("Pertanyaan telah terkirim!")
        setForm(prevState => {
          return {
            ...prevState,
            name: '',
            email: '',
            desc: '',
          }
        })
      },
      error => {
        console.log(error);
      }
    )
  }

  function Items({ type, title }) {
    return (
      <div className=" flex space-x-2 items-center" >
        {type === 'Email' ? <ICMail />
          : type === 'Telepon' ? <ICPhone />
            : type === 'Twitter' ? <ICTw />
              : null
        }
        <span>{title}</span>
      </div>
    )
  }
  return (
    <Layout title="Kontak" >
      <SectionPath
        path={['Home', 'Kontak Kami']}
        className=" bg-gray-100"
      />
      <JumbotronFooter
        title={contact?.metadata?.headerName}
        desc={contact?.metadata?.headerDesc}
      />
      <div className=" justify-center flex">
        <div className=" md:w-[60rem] md:py-20 md:flex py-4 px-4 md:px-0">
          <div className=" md:w-1/2 md:space-y-20 space-y-10">
            {!loading && (
              <div className=" flex-col space-y-4" >
                <div className=" text-xl font-bold">Kontak</div>
                {contact?.items?.map(row2 => (
                  row2.contactType.contactTypeName === 'Contact' &&
                  <Items
                    key={row2.contactId}
                    type={row2.contactName}
                    title={row2.contactUrl}
                  />
                ))}
              </div>
            )}
            {!loading && (
              <div className=" flex-col space-y-4" >
                <div className=" text-xl font-bold">Ikuti Social Media Kami</div>
                {contact?.items?.map(row2 => (
                  row2.contactType.contactTypeName === 'Social Media' &&
                  <Items
                    key={row2.contactId}
                    type={row2.contactName}
                    title={row2.contactUrl}
                  />
                ))}
              </div>
            )}
          </div>
          <div className=" md:w-1/2 space">
            <div className=" text-xl font-bold mt-10 md:mt-0">Ada pertanyaan?</div>
            <div className=" flex flex-col space-y-4 mt-6">
              <input
                className=" w-full p-3 text-sm  border rounded focus:outline-none"
                placeholder="Nama.."
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => setForm(prevState => { return { ...prevState, [e.target.name]: e.target.value } })}
              />
              <input
                className=" w-full p-3 text-sm  border rounded focus:outline-none"
                placeholder="Email.."
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm(prevState => { return { ...prevState, [e.target.name]: e.target.value } })}
              />
              <textarea
                className=" w-full p-3 text-sm  border rounded focus:outline-none"
                placeholder="Deskripsi.."
                rows={5}
                name="desc"
                value={form.desc}
                onChange={(e) => setForm(prevState => { return { ...prevState, [e.target.name]: e.target.value } })}
              />
              <div>
                <button
                  className=" bg-primary p-2 px-8 text-sm font-bold rounded border border-primary hover:bg-white duration-300 focus:outline-none"
                  onClick={() => handleSubmit()}
                >
                  Kirim
                </button>
              </div>
            </div>
            <div className=" mt-6 text-sm">
              Butuh bantuan? Kunjungi bagian
              <Link href={`/faq`} legacyBehavior>
                <span className=" font-bold hover:cursor-pointer hover:underline"> Bantuan Kami </span>
              </Link>
              atau
              <Link href={`/kontak`} legacyBehavior>
                <span className=" font-bold hover:cursor-pointer hover:underline"> Hubungi Kami </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
}
export default kontak