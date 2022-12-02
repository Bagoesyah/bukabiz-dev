import {
  Layout,
  SectionPath,
  JumbotronFooter
} from '@components/index'

import ICChecked from '@assets/Checked.svg'
import ICTimes from '@assets/TimesGrey.svg'

function subscribe() {
  return (
    <Layout title="Kontak" >
      <SectionPath
        path={['Home', 'Bukabiz Pro']}
        className=" bg-gray-100"
      />
      <JumbotronFooter
        title="Bukabiz Pro"
        desc="Kami memiliki beberapa rencana memandu bisnis Anda sebagai wirausahawan kreatif. Untuk semua yang kamu butuhkan."
      />
      <div className=" justify-center md:flex">
        <div className=" py-8 mx-12 md:mx-0 md:w-[65rem] md:py-20 grid md:grid-cols-4 md:gap-4 grid-cols-1 space-y-5 md:space-y-0">
          <div className=" p-4 px-6 border rounded-lg space-y-5">
            <div className=" text-xl font-bold">Free</div>
            <div className=" flex items-center justify-between">
              <div>Akses semua artikel How To</div>
              <ICChecked />
            </div>
            <div className=" flex items-center justify-between">
              <div className=" text-gray-500">Akses Panduan Bisnis</div>
              <ICTimes />
            </div>
            <div className=" flex items-center justify-between">
              <div className=" text-gray-500">Akses Peluang Bisnis</div>
              <ICTimes />
            </div>
            <div className=" text-sm text-gray-500">Rp <span className=" text-xl font-bold text-black">0</span> /bulan</div>
            <button className=" w-full p-3 bg-primary font-bold rounded focus:outline-none">Pilih</button>
          </div>

          <div className=" p-4 px-6 border rounded-lg space-y-4 bg-black">
            <div className=" text-xl font-bold text-white">Free</div>
            <div className=" flex items-center justify-between">
              <div className=" text-gray-300">Akses semua artikel How To</div>
              <ICChecked />
            </div>
            <div className=" flex items-center justify-between">
              <div className=" text-gray-300">Akses Panduan Bisnis</div>
              <ICTimes />
            </div>
            <div className=" flex items-center justify-between">
              <div className=" text-gray-300">Akses Peluang Bisnis</div>
              <ICTimes />
            </div>
            <div className=" text-sm text-gray-300">Rp <span className=" text-xl font-bold text-white">0</span> /bulan</div>
            <button className=" w-full p-3 bg-primary font-bold rounded focus:outline-none">Pilih</button>
          </div>

          <div className=" p-4 px-6 border rounded-lg space-y-4">
            <div className=" text-xl font-bold">Free</div>
            <div className=" flex items-center justify-between">
              <div>Akses semua artikel How To</div>
              <ICChecked />
            </div>
            <div className=" flex items-center justify-between">
              <div className=" text-gray-500">Akses Panduan Bisnis</div>
              <ICTimes />
            </div>
            <div className=" flex items-center justify-between">
              <div className=" text-gray-500">Akses Peluang Bisnis</div>
              <ICTimes />
            </div>
            <div className=" text-sm text-gray-500">Rp <span className=" text-xl font-bold text-black">0</span> /bulan</div>
            <button className=" w-full p-3 bg-primary font-bold rounded focus:outline-none">Pilih</button>
          </div>

          <div className=" p-4 px-6 border rounded-lg space-y-4">
            <div className=" text-xl font-bold">Free</div>
            <div className=" flex items-center justify-between">
              <div>Akses semua artikel How To</div>
              <ICChecked />
            </div>
            <div className=" flex items-center justify-between">
              <div className=" text-gray-500">Akses Panduan Bisnis</div>
              <ICTimes />
            </div>
            <div className=" flex items-center justify-between">
              <div className=" text-gray-500">Akses Peluang Bisnis</div>
              <ICTimes />
            </div>
            <div className=" text-sm text-gray-500">Rp <span className=" text-xl font-bold text-black">0</span> /bulan</div>
            <button className=" w-full p-3 bg-primary font-bold rounded focus:outline-none">Pilih</button>
          </div>


        </div>
      </div>

    </Layout>
  )
}
export default subscribe