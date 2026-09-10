import { DesktopHero } from '@/components/home/DesktopHero'
import { MobileHero } from '@/components/home/MobileHero'
import { MarqueeRibbon } from '@/components/home/MarqueeRibbon'
import { ServiceArchitecture } from '@/components/home/ServiceArchitecture'
import { ConsultantRoster } from '@/components/home/ConsultantRoster'

/*
 * Two heroes, one rendered at a time.
 *
 * Not a responsive single hero: the desktop layout is a 7/5 split with a card
 * straddling the seam, and the mobile layout is a full-bleed 16:9 photo with the search
 * bar floating over its lower edge. Those are different structures, not one structure
 * at two widths, and forcing them into one component produces markup that is wrong at
 * both ends.
 *
 * The cost is the hidden hero's markup in the HTML. The photograph is NOT duplicated —
 * each hero requests its own size and `sizes="(max-width: 1024px) 0px, 40vw"` on the
 * desktop image keeps the browser from fetching it on a phone.
 */
export default function HomePage() {
  return (
    <>
      <DesktopHero />
      <MobileHero />
      <MarqueeRibbon />
      <ServiceArchitecture />
      <ConsultantRoster />
    </>
  )
}
