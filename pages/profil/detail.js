import {
  useEffect,
  useRef,
  useState
} from "react"
import Image from "next/image"
import { useRouter } from "next/router"

import Layout from '@components/Layout'
import SectionPath from '@components/SectionPath'
import {
  setCookie,
  getCookie,
  deleteAllCookies,
  compress,
  decompress
} from "@library/useUtils"
import { axiosPost } from "@library/useAxios"

import Pencil from '@assets/Pencil.svg'
import Camera from '@assets/Camera.svg'

function detail() {
  const router = useRouter()
  const inputFile = useRef()
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [member, setMember] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const user = getCookie('user')
    if (user) {
      let dataProfile = JSON.parse(decompress(user))
      setMember(dataProfile)
      setProfile({
        memberId: dataProfile.memberId,
        name: dataProfile.email === dataProfile.name ? dataProfile.email.split('@')[0] : dataProfile.name,
        memberDob: dataProfile.memberDob,
        memberDobText: '1 Januari 1970',
        phone: dataProfile.phone,
        gender: dataProfile.gender,
        image: dataProfile.image,
        newImage: '',
      })
    } else {
      router.push('/')
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    deleteAllCookies()
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const handleOnChange = (e) => {
    const { name, value, files } = e.target
    let image = ''
    if (name === 'newImage') {
      image = {
        'url': URL.createObjectURL(files[0]),
        'file': files[0]
      }
    }
    setProfile({
      ...profile,
      [name]: name !== 'newImage' ? value : image
    })
  }

  const handleSubmit = () => {
    setLoadingUpdate(true)

    let formData = new FormData();
    formData.append('name', profile.name)
    formData.append('gender', profile.gender)
    formData.append('member_dob', profile.memberDob)
    formData.append('phone', profile.phone)
    formData.append('image', profile.newImage.file)
    axiosPost(
      `v1/update-myprofile`,
      {
        headers: {
          Authorization: `Bearer ${member.token}`,
          'Content-Type': 'application/json'
        },
      },
      formData,
      success => {
        let jsonUser = JSON.stringify({ ...success.data.data, 'token': member.token })
        setCookie(
          'user',
          compress(jsonUser)
        )
        window.location.reload()
      },
      error => {
        console.log(error);
      }
    )
  }

  if (member && !loading) {
    const loader = ({ src }) => member.image
    return (
      <Layout title="Profil Detail">
        <SectionPath
          path={['Profil', 'Detail']}
          className=" bg-gray-100"
        />
        <section className=" flex justify-center ">
          <div className=" flex w-[85rem]">
            <div className=" flex flex-col w-3/12 border-r-2 border-gray-200 py-12">
              <div className=" flex items-center">
                <div className=" flex justify-center items-center w-20 h-20 rounded-full bg-gray-100">
                  <Image
                    src={member.image}
                    loader={loader}
                    alt="Ava"
                    width={65}
                    height={65}
                    className=" rounded-full object-cover"
                  />
                </div>
                <div className=" flex flex-col ml-4">
                  <div className=" font-bold text-xl">{member.name.split('@')[0]}</div>
                  <div className=" text-sm">{member.email}</div>
                </div>
              </div>
              <div className=" flex flex-col space-y-6 mt-12">
                <div className=" text-xl font-bold border-l-4 border-primary pl-4">Tentang Saya</div>
                <div className=" text-gray-500 text-lg border-l-4 border-white pl-4 cursor-pointer hover:text-primary">Langganan</div>
                <div className=" text-gray-500 text-lg border-l-4 border-white pl-4 cursor-pointer hover:text-primary">Notifikasi</div>
                <div className=" text-gray-500 text-lg border-l-4 border-white pl-4 cursor-pointer hover:text-primary" onClick={handleLogout}>Keluar</div>
              </div>
            </div>
            <div className=" flex flex-col w-9/12">
              <div className=" p-6 px-8 flex justify-between items-center border-b-2 border-gray-200">
                <div className=" text-2xl font-bold">Tentang Saya</div>
                {!edit ? (
                  <button onClick={() => setEdit(!edit)} className=" p-2 px-4 text-sm font-bold border border-black rounded flex items-center space-x-2 hover:shadow-lg">
                    <Pencil />
                    <span>Ubah Profil</span>
                  </button>
                ) : (
                  <button onClick={() => handleSubmit()} className=" p-2 px-8 text-sm font-bold bg-primary border border-primary rounded hover:shadow-lg">
                    {loadingUpdate ? 'Loading..' : 'Simpan'}
                  </button>
                )}
              </div>
              <div className=" flex- flex-col p-6 px-8 pb-40">
                <div className=" text-xl font-bold">Photo Profil</div>
                <div className=" flex mt-4">
                  {!edit ? (
                    <div className=" w-48">
                      <Image
                        src={member.image}
                        loader={loader}
                        alt="Ava"
                        width={125}
                        height={125}
                        className=" rounded-full object-cover"
                      />
                    </div>
                  ) : (
                    <>
                      <div className=" w-48">
                        <Image
                          src={profile.newImage === '' ? profile.image : profile.newImage.url}
                          loader={loader}
                          alt="Ava"
                          width={125}
                          height={125}
                          className=" rounded-full object-cover"
                        />
                      </div>
                      <div className=" flex flex-col justify-between">
                        <div className=" text-xs text-gray-500">Maksimum 1 Mb. Ekstensi file yang diperbolehkan : <br />.JPG .JPEG .PNG</div>
                        <div>
                          <input
                            type="file"
                            name="newImage"
                            className="hidden"
                            accept=".jpg,.jpeg,.png"
                            ref={inputFile}
                            onChange={handleOnChange}
                          />
                          {profile.newImage !== '' ? (
                            <div className=" flex items-center">
                              <button
                                className=" p-2 px-4 text-sm font-bold border border-black rounded flex items-center space-x-2 hover:shadow-lg"
                                onClick={() => setProfile({ ...profile, newImage: '' })}
                              >
                                <span>Remove</span>
                              </button>
                              <span className=" ml-2 text-xs text-gray-500">{profile.newImage.file.name}</span>
                            </div>
                          ) : (
                            <button
                              className=" p-2 px-4 text-sm font-bold border border-black rounded flex items-center space-x-2 hover:shadow-lg"
                              onClick={() => inputFile.current.click()}
                            >
                              <Camera />
                              <span>Upload</span>
                            </button>

                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className=" mt-8 text-xl font-bold">Data Diri</div>
                <div className=" mt-4 space-y-4">
                  <div className=" flex items-center">
                    <div className=" w-48 text-gray-500">Nama</div>
                    {!edit ? (
                      <div>{profile.name}</div>
                    ) : (
                      <input
                        type="text"
                        name="name"
                        className=" p-2 px-4 w-80 text-sm bg-gray-100 border rounded focus:outline-none"
                        value={profile.name}
                        onChange={handleOnChange}
                      />
                    )}
                  </div>
                  <div className=" flex items-center">
                    <div className=" w-48 text-gray-500">Tanggal Lahir</div>
                    {!edit ? (
                      <div>{profile.memberDob}</div>
                    ) : (
                      <input
                        type="date"
                        name="memberDob"
                        className=" p-2 px-4 w-80 text-sm bg-gray-100 border rounded focus:outline-none"
                        date-format="dd-mm-yyyy"
                        value={profile.memberDob}
                        onChange={handleOnChange}
                      />
                    )}
                  </div>
                  <div className=" flex items-center">
                    <div className=" w-48 text-gray-500">Jenis Kelamin</div>
                    {!edit ? (
                      <div>{profile.gender === 1 ? 'Laki - Laki' : 'Wanita'}</div>
                    ) : (
                      <select
                        type="text"
                        name="gender"
                        className="p-2 px-4 w-80 text-sm bg-gray-100 border rounded focus:outline-none"
                        value={profile.gender}
                        onChange={handleOnChange}
                      >
                        <option value={1} selected={profile.gender === 1 ? true : false}>Laki - Laki</option>
                        <option value={2} selected={profile.gender === 2 ? true : false}>Wanita</option>
                      </select>
                    )}
                  </div>
                </div><div className=" mt-8 text-xl font-bold">Kontak</div>
                <div className=" mt-4 space-y-4">
                  <div className=" flex items-center">
                    <div className=" w-48 text-gray-500">Email</div>
                    {!edit ? (
                      <div>{member.email}</div>
                    ) : (
                      <input
                        className=" p-2 px-4 w-80 text-sm bg-gray-100 border rounded focus:outline-none cursor-not-allowed"
                        value={member.email}
                        disabled={true}
                      />
                    )}
                  </div>
                  <div className=" flex items-center">
                    <div className=" w-48 text-gray-500">Nomor HP</div>
                    {!edit ? (
                      <div>{profile.phone ? profile.phone : '-'}</div>
                    ) : (
                      <input
                        type="number"
                        name="phone"
                        className=" p-2 px-4 w-80 text-sm bg-gray-100 border rounded focus:outline-none"
                        value={profile.phone}
                        onChange={handleOnChange}
                      />
                    )}
                  </div>
                  {!edit ? (
                    <div className=" flex items-center">
                      <div className=" w-48 text-gray-500">Kata Sandi</div>
                      <div className=" text-primary cursor-pointer" onClick={() => alert("Soon!")}>Ubah</div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section >

      </Layout >
    )
  }
}
export default detail