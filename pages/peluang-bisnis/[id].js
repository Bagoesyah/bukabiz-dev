import { useState } from "react"
import Image from "next/image"

import {
  Layout,
  Container,
  SectionPath,
  CardRekomendasiPeluang,
  Typography,
  LabelTag,
  ButtonTab,
  ButtonWide,
  PlayerContainer
} from '@components/index'


import ICArrowRightWhite from "@assets/ArrowRightWhite.svg"
import ICArrowRight from "@assets/ArrowRight.svg"
import ICExport from "@assets/Export.svg"
import ICBookmarkSimple from "@assets/BookmarkSimple.svg"
import ICCalendars from "@assets/Calendars.svg"
import ICMapPinLine from "@assets/MapPinLine.svg"
import ICFactory from "@assets/Factory.svg"
import ICCurrencyCircleDollar from "@assets/CurrencyCircleDollar.svg"
import ICUsersFour from "@assets/UsersFour.svg"
import ICBank from "@assets/Bank.svg"
import ICCompass from "@assets/Compass.svg"
import ICWhatsappLogo from "@assets/WhatsappLogo.svg"
import ICCircleWavyCheck from "@assets/CircleWavyCheck.svg"
import ICTwitterLogo from "@assets/TwitterLogo.svg"
import ICFacebookLogo from "@assets/FacebookLogo.svg"
import ICTiktokLogo from "@assets/TiktokLogo.svg"
import ICInstagramLogo from "@assets/InstagramLogo.svg"
import ICCampaignFlatline from "@assets/CampaignFlatline.svg"
import ICQuote from "@assets/Quote.svg"

import TukuLogo from "@assets/TukuLogo.png"
import ThumbnailPeluang from "@assets/ThumbnailPeluang.png"
import GacoanLogo from "@assets/GacoanLogo.png"

function DeailPeluang() {
  const [tabs, setTabs] = useState('profil')

  const kategoriLainnya = [
    'Seni & Kerajinan',
    'Otomotif',
    'Kecantikan',
    'Layanan Bisnis',
    'Anak-anak',
    'Kebersihan & Perawatan',
    'Konstruksi',
    'Edukasi',
    'Hiburan',
    'Layanan Keuangan',
    'Fitnes & Kebugaran',
    'Makanan & Minuman',
    'Kesehatan',
    'Obat-obatan',
    'Hewan Peliharan',
    'Rekreasi',
    'Rretail',
    'Properti',
  ]

  const berita = [1, 2, 3, 4, 5]
  const rekomendasiPeluang = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <Layout title="Peluang Bisnis" >
      <SectionPath
        path={['Peluang Bisnis', 'Franchise']}
        className=" bg-gray-100"
      />
      <Container add=" bg-gray-100 py-6">
        <Typography
          variant="detail"
          text={`toko topi tuku`}
          className="w-[75%] uppercase"
        />
        <div className=" flex justify-between items-center mt-4 w-[75%]">
          <div className=" flex space-x-3">
            <LabelTag text={`Franchise`} className=" border-gray-400" />
            <LabelTag text={`Business Opportunity`} className=" border-gray-400" />
            <LabelTag text={`Kafe & Resto`} className=" border-gray-400" />
            <LabelTag text={`Kopi`} className=" border-gray-400" />
          </div>
          <div className=" flex space-x-4">
            <ICExport />
            <ICBookmarkSimple />
          </div>
        </div>
        <div className=" flex my-6">
          <div className=" flex flex-col w-[75%] ">
            <div className=" rounded-xl relative">
              <img src="/bukabiz/assets/ThumbnailPeluang.png" alt="thumbnail" className=" brightness-50 aspect-video rounded-xl w-full" />
            </div>
            <div className=" flex border-b items-center mt-4">
              <div className=" flex justify-between w-full">
                <ButtonTab
                  text="profil"
                  isTab={tabs}
                  onClick={() => setTabs('profil')}
                />
                <ButtonTab
                  text="video"
                  isTab={tabs}
                  onClick={() => setTabs('video')}
                />
                <ButtonTab
                  text="berita"
                  isTab={tabs}
                  onClick={() => setTabs('berita')}
                />
                <ButtonTab
                  text="keuangan"
                  isTab={tabs}
                  onClick={() => setTabs('keuangan')}
                />
                <ButtonTab
                  text="testimoni"
                  isTab={tabs}
                  onClick={() => setTabs('testimoni')}
                />
              </div>
            </div>

            {/* Tab Profil */}
            <div className={` flex-col mt-4  ${tabs == 'profil' ? 'flex' : 'hidden'}`}>
              <div className=" bg-white text-gray-500 p-8">
                Di tengah boomingnya bisnis coffee shop, Toko Kopi Tuku menjadi salah satu brand lokal yang berhasil meraih kesuksesan dan bertahan di balik ketatnya industri tersebut. Tentu saja kesuksesan tersebut berasal dari jiwa bisnis dari Andanu Prasetyo selaku pendiri.
              </div>
              <div className="flex flex-col space-y-12 mt-12">
                <div>
                  <div className=" border-b">
                    <div className=" uppercase font-bold text-xl">Sejarah Kopi Tuku</div>
                    <div className=" w-24 h-2 bg-primary"></div>
                  </div>
                  <div className=" mt-3 text-justify">
                    Berawal dari penelitian yang dilakukan demi tugas kuliah, Tyo melihat adanya peluang pada bisnis ini. Mulai dari merombak usaha distronya menjadi toko kopi lokal dan akhirnya mendirikan brand minuman kopinya sendiri.
                    Ia juga tak enggan untuk mengajak masyarakat sekitar untuk turut berpartisipasi dalam mengembangkan bisnisnya tersebut. Saat pertama kali membuka gerai Kopi Tuku, ia mengaku gerai tersebut memang diperuntukkan pada masyarakat sekitarnya. Jadi, sembari mendapat bantuan kala ramai pengunjung, Tyo juga tak ragu untuk bercengkerama dengan tetangga sekitar saat gerai sedang lenggang.
                  </div>
                </div>
                <div>
                  <div className=" border-b">
                    <div className=" uppercase font-bold text-xl">Apa Itu Kopi Tuku</div>
                    <div className=" w-24 h-2 bg-primary"></div>
                  </div>
                  <div className=" mt-3 text-justify">
                    Berawal dari penelitian yang dilakukan demi tugas kuliah, Tyo melihat adanya peluang pada bisnis ini. Mulai dari merombak usaha distronya menjadi toko kopi lokal dan akhirnya mendirikan brand minuman kopinya sendiri.
                    Ia juga tak enggan untuk mengajak masyarakat sekitar untuk turut berpartisipasi dalam mengembangkan bisnisnya tersebut. Saat pertama kali membuka gerai Kopi Tuku, ia mengaku gerai tersebut memang diperuntukkan pada masyarakat sekitarnya. Jadi, sembari mendapat bantuan kala ramai pengunjung, Tyo juga tak ragu untuk bercengkerama dengan tetangga sekitar saat gerai sedang lenggang.
                  </div>
                </div>
                <div>
                  <div className=" border-b">
                    <div className=" uppercase font-bold text-xl">Kenapa Harus Kopi Tuku</div>
                    <div className=" w-24 h-2 bg-primary"></div>
                  </div>
                  <div className=" mt-3">
                    <li>Fresh Ingredients. Famous Stix & Sauces.</li>
                    <li>Stand out branding that has attitude and appeal!</li>
                    <li>Creative innovation driving pizza into the future.</li>
                  </div>
                </div>
                <div>
                  <div className=" border-b">
                    <div className=" uppercase font-bold text-xl">Support dari toko Kopi Tuku</div>
                    <div className=" w-24 h-2 bg-primary"></div>
                  </div>
                  <div className=" mt-3">
                    <li>Layanan Training.</li>
                    <li>Dukungan Marketing Terpusat.</li>
                    <li>R & D Inovasi Produk.</li>
                    <li>Konsul Pemilihan Lokasi.</li></div>
                </div>
              </div>
            </div>

            {/* Tab Video */}
            <div className={` flex-col mt-12 space-y-12 ${tabs == 'video' ? 'flex' : 'hidden'}`}>
              <div>
                <div className=" uppercase font-bold text-xl">Tentang Brand</div>
                <div className=" w-24 h-2 bg-primary"></div>
                <div className=" mt-3 text-justify">
                  Berawal dari penelitian yang dilakukan demi tugas kuliah, Tyo melihat adanya peluang pada bisnis ini. Mulai dari merombak usaha distronya menjadi toko kopi lokal dan akhirnya mendirikan brand minuman kopinya sendiri.
                </div>
                <PlayerContainer
                  urlVideo={`https://www.youtube.com/embed/k0XacAh6teY`}
                  urlThumbnail={`http://178.128.90.130/bukabiz-cms/file/image/20220913074555_article_image_long.jpg`}
                  className=" mt-4"
                />
              </div>
              <div>
                <div className=" uppercase font-bold text-xl">Tentang Founder</div>
                <div className=" w-24 h-2 bg-primary"></div>
                <div className=" mt-3 text-justify">
                  Berawal dari penelitian yang dilakukan demi tugas kuliah, Tyo melihat adanya peluang pada bisnis ini. Mulai dari merombak usaha distronya menjadi toko kopi lokal dan akhirnya mendirikan brand minuman kopinya sendiri.
                </div>
                <PlayerContainer
                  urlVideo={`https://www.youtube.com/embed/KyItBfpOH7k`}
                  urlThumbnail={`http://178.128.90.130/bukabiz-cms/file/image/20220913074555_article_image_long.jpg`}
                  className=" mt-4"
                />
              </div>
            </div>

            {/* Tab Berita */}
            <div className={` flex-col mt-12 space-y-8 ${tabs == 'berita' ? 'flex' : 'hidden'}`}>
              {berita?.map(row => (
                <div key={row} className=" flex space-x-5 px-12">
                  <div>
                    <Image src={ThumbnailPeluang} alt="Thumbnail" width={250} height={250} className=" object-cover rounded-xl" />
                  </div>
                  <div className=" flex flex-col space-y-2">
                    <div className=" text-sm text-gray-500">10/09/2021, 17:02 WIB</div>
                    <div className=" text-xl font-bold ">Ngulik Bisnis Toko Kopi Tuku, Berawal dari Kegemaran hingga Jadi Mata Pencaharian.</div>
                    <div className=" text-sm">Peluang usaha bisa datang dari mana saja, termasuk kegemaran. Di tengah perkembangan minat bisnis masyarakat, sejumlah entrepreneur memulai u...</div>
                    <div>
                      <button className=" bg-primary p-2 px-5 text-sm rounded focus:outline-none">Baca Selengapnya</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Keuangan */}
            <div className={` flex-col mt-12 space-y-4 ${tabs == 'keuangan' ? 'flex' : 'hidden'}`}>

            </div>

            {/* Tab Testimoni */}
            <div className={` flex-col mt-12 space-y-4 ${tabs == 'testimoni' ? 'flex' : 'hidden'}`}>
              {berita?.map(row => (
                <div key={row} className=" flex bg-white rounded p-8">
                  <div className=" w-24">
                    <ICQuote />
                  </div>
                  <div>
                    <div className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit lacus, morbi sed et malesuada nulla sed vel. Ultrices convallis integer sem aliquet porta est eu magna sociis. </div>
                    <div className=" text-primary font-bold mt-4">Rudy Putra Simorangkir - Franchisee</div>
                  </div>
                </div>
              ))}
            </div>

            <div className=" mt-8">
              <button className=" p-3 px-12 text-sm font-bold text-white bg-black rounded flex space-x-2 items-center justify-center">
                <span>Hubungkan Saya Dengan Bisnis Ini</span>
                <ICArrowRightWhite />
              </button>
            </div>
          </div>


          <div className=" flex flex-col w-[25%] pl-8 ">
            <div className=" border-t-8 border-b-8 border-primary p-4">
              <div className=" text-3xl font-extrabold tracking-tighter">Info Singkat</div>
              <div className=" mt-4">
                <div className=" flex items-center">
                  <div className=" w-10">
                    <ICCalendars />
                  </div>
                  <div className=" ml-2 py-2 text-xs border-b border-gray-300  w-full">
                    <div className=" font-bold text-primary uppercase">Tahun Berdiri</div>
                    <div className=" text-gray-500">2015</div>
                  </div>
                </div>
                <div className=" flex items-center">
                  <div className=" w-10">
                    <ICMapPinLine />
                  </div>
                  <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                    <div className=" font-bold text-primary uppercase">Lokasi Tersedia</div>
                    <div className=" text-gray-500">Seluruh Indinesia</div>
                  </div>
                </div>
                <div className=" flex items-center">
                  <div className=" w-10">
                    <ICFactory />
                  </div>
                  <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                    <div className=" font-bold text-primary uppercase">Tipe Bisnis</div>
                    <div className=" text-gray-500">Kemitraan & Francise</div>
                  </div>
                </div>
                <div className=" flex items-center">
                  <div className=" w-10">
                    <ICCurrencyCircleDollar />
                  </div>
                  <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                    <div className=" font-bold text-primary uppercase">Minimum Biaya Diperlukan</div>
                    <div className=" text-gray-500">Mulai Dari IDR 50.000.000,-</div>
                  </div>
                </div>
                <div className=" flex items-center">
                  <div className=" w-10">
                    <ICBank />
                  </div>
                  <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                    <div className=" font-bold text-primary uppercase">Perusahaan Terdaftar</div>
                    <div className=" text-gray-500">Ya | Waralaba</div>
                  </div>
                </div>
                <div className=" flex items-center">
                  <div className=" w-10">
                    <ICUsersFour />
                  </div>
                  <div className=" ml-2 py-2 text-xs border-b border-gray-300  w-full">
                    <div className=" font-bold text-primary uppercase">Support Training</div>
                    <div className=" text-gray-500">Ya</div>
                  </div>
                </div>
                <div className=" flex items-center">
                  <div className=" w-10">
                    <ICWhatsappLogo />
                  </div>
                  <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                    <div className=" font-bold text-primary uppercase">Contact Person</div>
                    <div className=" text-gray-500">0897654XXX</div>
                  </div>
                </div>
                <div className=" flex items-center">
                  <div className=" w-10">
                    <ICCircleWavyCheck />
                  </div>
                  <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                    <div className=" font-bold text-primary uppercase">Diverifikasi oleh</div>
                    <div className=" text-gray-500">IFBM/AFI</div>
                  </div>
                </div>
                <div className=" flex items-center">
                  <div className=" w-10">
                    <ICCompass />
                  </div>
                  <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                    <div className=" font-bold text-primary uppercase">Website</div>
                    <div className=" text-gray-500">www.tokokopituku.com</div>
                  </div>
                </div>
                <div className=" flex items-center mt-4">
                  <div className=" ml-10 py-2 text-xs border-gray-300 w-full">
                    <div className=" font-bold text-primary uppercase">Social Media</div>
                    <div className=" flex space-x-5 mt-2">
                      <ICInstagramLogo />
                      <ICFacebookLogo />
                      <ICTiktokLogo />
                      <ICTwitterLogo />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" bg-white p-4 py-8 flex flex-col space-y-4 rounded border border-gray-500 justify-center items-center my-12">
              <Image src={TukuLogo} alt={`Tuku Logo`} width={175} height={175} />
              <ICCampaignFlatline />
              <div className=" text-2xl font-bold text-center tracking-tighter">
                Lanjut Konsultasi <br />dengan Kopi Tuku?
              </div>
              <button className=" p-3 px-6 text-sm font-bold bg-primary rounded flex space-x-4 items-center justify-center">
                <span>Request Info Detai Dong!</span>
                <ICArrowRight />
              </button>
            </div>
            <div className=" border-t-8 border-primary p-4">
              <div className=" text-3xl font-extrabold tracking-tighter">Kategori Lainnya</div>
              <div className=" flex flex-col mt-5">
                {kategoriLainnya?.map((row, index) => (
                  <div key={index} className=" font-light text-gray-500 border-b border-gray-300 py-2">{row}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <hr />
      <Container add=" bg-gray-100 py-12">
        <Typography
          variant="card"
          text={`Rekomendasi Peluang`}
        />
        <div className=" grid grid-cols-4 gap-4 py-8">
          {rekomendasiPeluang?.map(row => (
            <CardRekomendasiPeluang
              key={row}
              title={`Kedai Mie Gacoan`}
              image={GacoanLogo}
              category={`Franchise Resto Mie & Fast Food`}
              desc={`Berdiri 2015, Bandung. Jumlah outlet saat ini 8. Estimasi lama investasi kembali (Pay Back Periode) 18 - 24 bulan *.`}
            />
          ))}
        </div>
        <div className="flex justify-center py-4">
          <ButtonWide icon="right" onClick={() => alert("Soon!")} />
        </div>
      </Container>
    </Layout>
  )
}
export default DeailPeluang