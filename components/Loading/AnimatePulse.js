import { useEffect, useState } from "react";
import CardPasPulse from "./CardPasPulse";
import CardTerbaruPulse from "./CardTerbaruPulse";
import SectionCategoryPulse from "./SectionCategoryPulse";
import SectionHitsPulse from "./SectionHitsPulse";
import SectionPeluangPulse from "./SectionPeluangPulse";
import SectionPanduanPulse from "./SectionPanduanPulse";
import SectionSearchPulse from "./SectionSearchPulse";
import TitleSectionPulse from "./TitleSectionPulse";
import TitlePathPulse from "./TitlePathPulse";
import TitleDetailListPulse from "./TitleDetailListPulse";
import HitsPulse from "./HitsPulse";
import ButtonWidePulse from "./ButtonWidePulse";
import MungkinSukaPulse from "./MungkinSukaPulse";

function AnimatePulse({ name, count, interval, children, isLoading }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // setInterval(() => {
      setLoading(isLoading)
    // }, interval);
  })

  const componentLoading = (name) => {
    if (name === 'section search') return <SectionSearchPulse />
    if (name === 'section category') return <SectionCategoryPulse count={count} />
    if (name === 'card terbaru') return <CardTerbaruPulse />
    if (name === 'card pas') return <CardPasPulse count={count} />
    if (name === 'title section') return <TitleSectionPulse />
    if (name === 'section hits') return <SectionHitsPulse count={count} />
    if (name === 'section peluang') return <SectionPeluangPulse count={count} />
    if (name === 'section panduan') return <SectionPanduanPulse count={count} />
    if (name === 'title path') return <TitlePathPulse />
    if (name === 'title detail list') return <TitleDetailListPulse />
    if (name === 'detail list hits') return <HitsPulse count={count} />
    if (name === 'mungkin suka') return <MungkinSukaPulse count={count} />
    if (name === 'button wide') return <ButtonWidePulse />
    if (name === '' || name === undefined) return <p>Loading ..</p>
  }

  return (
    loading ? componentLoading(name) : children
  )

}
export default AnimatePulse