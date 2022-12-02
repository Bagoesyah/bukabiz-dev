import {
  Layout,
} from '@components/index'
import ICVisa from '@assets/Visa.svg'
import ICMasterCard from '@assets/MasterCard.svg'
import ICGopay from '@assets/Gopay.svg'
import ICOvo from '@assets/Ovo.svg'
import ICLinkaja from '@assets/Linkaja.svg'
import ICDana from '@assets/Dana.svg'

function payment() {
  return (
    <Layout title="Bukabiz Pro Payment" >
      <div className=" justify-center md:flex w-full">
        <div className=" md:w-[75rem] md:py-40 py-24 px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 md:gap-20 w-full">
          <div className=" bg-gray-100 rounded border md:order-first order-last md:w-full w-8/12">
            <div className=" md:p-8 p-4 md:px-10 px-4 flex flex-col space-y-4">
              <div className=" text-xl">Informasi penagihan</div>
              <div className=" flex flex-col space-y-2 ">
                <label className=" text-sm">Negara</label>
                <select className=" p-3 px-4 text-sm rounded-lg focus:outline-none border">
                  <option>Pilih negara</option>
                </select>
              </div>
              <div className=" flex justify-between">
                <div className=" flex flex-col space-y-2 w-1/2">
                  <label className=" text-sm">Nama Depan</label>
                  <input className=" p-3 px-4 text-sm rounded-lg focus:outline-none border" placeholder="Tulis nama" />
                </div>
                <div className=" flex flex-col space-y-2 w-1/2">
                  <label className=" text-sm">Nama Belakang</label>
                  <input className=" p-3 px-4 text-sm rounded-lg focus:outline-none border" placeholder="Tulis nama" />
                </div>
              </div>
              <div className=" flex flex-col space-y-2">
                <label className=" text-sm">Alamat</label>
                <input className=" p-3 px-4 text-sm rounded-lg focus:outline-none border" placeholder="Masukan alamat" />
              </div>
              <div className=" flex justify-between">
                <div className=" flex flex-col space-y-2 w-1/2">
                  <label className=" text-sm">Kabupaten/Kota</label>
                  <input className=" p-3 px-4 text-sm rounded-lg focus:outline-none border" placeholder="Tulis kabupaten/kota" />
                </div>
                <div className=" flex flex-col space-y-2 w-1/2">
                  <label className=" text-sm">Kode Pos</label>
                  <input className=" p-3 px-4 text-sm rounded-lg focus:outline-none border" placeholder="Masukan kode pos" />
                </div>
              </div>
            </div>
            <hr />
            <div className=" md:p-8 p-4 md:px-10 px-4 flex flex-col space-y-8">
              <div className=" text-xl">Informasi penagihan</div>
              <div className=" flex justify-between items-center">
                <div>
                  <input type="radio" name="payment" />
                  <label className=" ml-2">Kartu Kredit / Debit</label>
                </div>
                <div className=" flex space-x-2">
                  <ICVisa />
                  <ICMasterCard />
                </div>
              </div>
              <div className=" flex justify-between items-center">
                <div>
                  <input type="radio" name="payment" />
                  <label className=" ml-2">Metode Lainnya</label>
                </div>
                <div className=" flex space-x-2">
                  <ICGopay />
                  <ICOvo />
                  <ICLinkaja />
                  <ICDana />
                </div>
              </div>
              <div className=" flex flex-col space-y-2">
                <div>Langganan Anda akan otomatis diperbarui setiap bulan</div>
                <div className=" text-gray-500">
                  Langganan Anda akan diperbarui secara otomatis pada akhir masa berlaku Anda, kecuali jika Anda menonaktifkan pembaruan otomatis dari akun Anda. Harga pembaruan dapat berubah, tetapi kami akan senantiasa memberi tahu Anda sebelumnya tentang perubahan harga.
                </div>
              </div>
            </div>
            <hr />
            <div className=" md:p-8 p-4 md:px-10 px-4 flex flex-col space-y-4">
              <div class="flex items-center">
                <input
                  id="checkbox-agree"
                  name="checkbox-agree"
                  type="checkbox"
                  class="w-4 h-4 accent-primary rounded bg-gray-100 border-gray-300 focus:ring-gray-500 "
                // value=""
                // checked=""
                />
                <label for="checkbox-agree" class="ml-2 text-sm text-gray-500 cursor-pointer">
                  Ya, saya ingin menerima penawaran khusus, dan lainnya.
                </label>
              </div>
              <div className=" text-gray-500 text-sm">
                Dengan menekan saya setuju, Anda menerima
                <a className=" text-primary hover:underline"> Perjanjian Keanggotaan</a>,
                <a className=" text-primary hover:underline"> Kebijakan Privasi</a> (termasuk Penggunaan Cookie dan Teknologi Lain)
                <a className=" text-primary hover:underline"> serta Ketentuan Penggunaan.</a>
              </div>
              <button className=" p-3 text-sm font-bold bg-primary rounded border border-primary focus:outline-none hover:bg-white duration-300">Saya setuju - Bayar sekarang</button>
            </div>
          </div>
          <div className=" w-8/12 md:w-full">
            <div className=" text-xl">Ringkasan pesanan</div>
            <div className=" border-t border-b py-3 flex flex-col mt-4">
              <div className=" flex justify-between">
                <div className=" font-bold">Bukabiz Pro 1 Bulan</div>
                <div className=" text-primary font-bold">Rp 45.000</div>
              </div>
              <div className=" text-sm text-gray-500">Anda berlanganan paket Bukabiz Pro 30 Hari.</div>
            </div>
            <div className=" flex justify-between mt-4">
              <div className=" text-xl">Total</div>
              <div className=" text-xl">Rp 45.000</div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}
export default payment