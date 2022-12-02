import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getCookie, decompress } from "@library/useUtils";

import { ContainerProfile } from "@components/index";

function nortifikasi() {
  const router = useRouter();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCookie("user");
    if (user) {
      let dataProfile = JSON.parse(decompress(user));
      setMember(dataProfile);
    } else {
      router.push("/");
    }
    setLoading(false);
  }, []);

  if (member && !loading) {
    return (
      <>
        <ContainerProfile {...member}>
          <div className=" flex flex-col w-9/12">
            <div className=" p-6 px-8 flex justify-between items-center border-b-2 border-gray-200">
              <div className=" text-2xl font-bold">Notifikasi</div>
            </div>
            <div className=" flex- flex-col p-6 px-8 ">
              <div className=" font-bold">Artikel</div>
              <div className=" mt-4 space-y-4">
                <div className=" flex items-center">
                  <div className=" w-80">How To</div>
                  <div class="flex items-center">
                    <input
                      id="checked-checkbox"
                      type="checkbox"
                      class="w-4 h-4 accent-primary rounded bg-gray-100 border-gray-300 focus:ring-gray-500 "
                      value=""
                    />
                  </div>
                </div>
                <div className=" flex items-center">
                  <div className=" w-80">Panduan Bisnis</div>
                  <div class="flex items-center">
                    <input
                      id="checked-checkbox"
                      type="checkbox"
                      class="w-4 h-4 accent-primary rounded bg-gray-100 border-gray-300 focus:ring-gray-500 "
                      value=""
                    />
                  </div>
                </div>
                <div className=" flex items-center">
                  <div className=" w-80">Peluang Bisnis To</div>
                  <div class="flex items-center">
                    <input
                      id="checked-checkbox"
                      type="checkbox"
                      class="w-4 h-4 accent-primary rounded bg-gray-100 border-gray-300 focus:ring-gray-500 "
                      value=""
                    />
                  </div>
                </div>
                <div className=" font-bold mt-4">Promo</div>
                <div className=" flex items-center">
                  <div className=" w-80">Newslatter Bukabiz</div>
                  <div class="flex items-center">
                    <input
                      id="checked-checkbox"
                      type="checkbox"
                      class="w-4 h-4 accent-primary rounded bg-gray-100 border-gray-300 focus:ring-gray-500 "
                      value=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContainerProfile>
      </>
    );
  }
}
export default nortifikasi;
