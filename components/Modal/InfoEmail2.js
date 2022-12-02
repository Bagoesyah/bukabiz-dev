import Image from "next/image";

import { useGet } from "@library/useAPI";

function InfoEmail1(props) {
  const {
    articleTitle,
    urlImageSquare,
    onClick,
    name,
    requestType,
    email,
    phone,
    province,
    city,
    postalCode,
    investment,
    onChange,
    onSubmit,
  } = props;

  const loader = ({ src }) => urlImageSquare ?? urlImageSquare;

  const { isData: isDataProv } = useGet("v1/province/fetch?limit=100");
  const { isData: isDataCity } = useGet("v1/cities/fetch?limit=1000");
  const { isData: isDataInvesment } = useGet("v1/investment/fetch");
  const { isData: isDataRequestType } = useGet("v1/request-type/fetch");

  return (
    <div
      onClick={onClick}
      className={` top-0 fixed bg-black/50 backdrop-opacity-95 w-full h-full z-30 transition-all flex justify-center items-center `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white rounded-xl relative"
      >
        <div className=" w-full md:w-[50rem] p-2">
          <div className=" py-8">
            <div className=" font-bold text-center tracking-tighter">
              Dapatkan Informasi Detail Sekarang!
            </div>
            <div className=" text-center text-xs tracking-tighter mt-2 text-gray-500">
              <span className=" text-black font-bold">Step 2 : </span>Complete
              the following form to request additional free information.
            </div>
          </div>
          <hr />
          <div className=" p-8 px-16 md:px-20">
            <div className=" bg-gray-100 rounded p-4 px-8 flex items-center space-x-3">
              <div>
                <Image
                  src={urlImageSquare}
                  loader={loader}
                  alt={articleTitle}
                  width={50}
                  height={50}
                  className=" rounded object-cover"
                />
              </div>
              <div>{articleTitle}</div>
            </div>
            <div className=" grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className=" text-sm">Nama</label>
                <input
                  type="text"
                  className=" p-2 px-3 w-full text-sm border rounded focus:outline-none mt-1"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className=" text-sm">Request</label>
                <select
                  name="requestType"
                  onChange={onChange}
                  className=" p-2 px-3 w-full text-sm border rounded focus:outline-none mt-1"
                >
                  <option disabled selected>
                    Pilih
                  </option>
                  {isDataRequestType?.data?.items?.map((item) => (
                    <option
                      key={item.requestTypeId}
                      value={item.requestTypeId}
                      selected={
                        item.requestTypeId === requestType ? true : false
                      }
                    >
                      {item.requestTypeName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className=" text-sm">Email</label>
                <input
                  type="email"
                  className=" p-2 px-3 w-full text-sm border rounded focus:outline-none mt-1"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className=" text-sm">No. Telepon</label>
                <input
                  type="number"
                  className=" p-2 px-3 w-full text-sm border rounded focus:outline-none mt-1"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className=" text-sm">Provinsi</label>
                <select
                  name="province"
                  onChange={onChange}
                  className=" p-2 px-3 w-full text-sm border rounded focus:outline-none mt-1"
                >
                  <option disabled selected>
                    Pilih
                  </option>
                  {isDataProv?.data?.items?.map((item) => (
                    <option
                      key={item.provinceId}
                      value={item.provinceId}
                      selected={item.provinceId === province ? true : false}
                    >
                      {item.provinceName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className=" text-sm">Kabupaten / Kota</label>
                <select
                  name="city"
                  onChange={onChange}
                  className=" p-2 px-3 w-full text-sm border rounded focus:outline-none mt-1"
                >
                  <option disabled selected>
                    Pilih
                  </option>
                  {isDataCity?.data?.items?.map((item) => (
                    <option
                      key={item.cityId}
                      value={item.cityId}
                      selected={item.cityId === city ? true : false}
                    >
                      {item.cityName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className=" text-sm">Kode Pos</label>
                <input
                  type="text"
                  className=" p-2 px-3 w-full text-sm border rounded focus:outline-none mt-1"
                  name="postalCode"
                  value={postalCode}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className=" text-sm">Dana Tersedia</label>
                <select
                  name="invesment"
                  onChange={onChange}
                  className=" p-2 px-3 w-full text-sm border rounded focus:outline-none mt-1"
                >
                  <option disabled selected>
                    Pilih
                  </option>
                  {isDataInvesment?.data?.items?.map((item) => (
                    <option
                      key={item.investmentId}
                      value={item.investmentId}
                      selected={item.investmentId === investment ? true : false}
                    >
                      {item.investmentTitle}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className=" text-xs text-gray-500 text-center mt-4">
              We only share your information with the selected companies. By
              submitting this form, you give
              <br />
              Franchisedirect.com consent to provide your information to these
              companies, so they may contact you via <br />
              phone, email or text. View our Privacy Policy for more
              information.
            </div>
            <div className=" mt-5 flex justify-center">
              <button
                onClick={onSubmit}
                className=" p-2 w-80 md:w-96 bg-primary text-sm text-black font-bold rounded focus:outline-none"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InfoEmail1;
