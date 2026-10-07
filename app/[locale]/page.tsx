import { setRequestLocale } from 'next-intl/server'
import { DesktopHero } from '@/components/home/DesktopHero'
import { PhoneHome } from '@/components/home/PhoneHome'
import { MarqueeRibbon } from '@/components/home/MarqueeRibbon'
import { ServiceArchitecture } from '@/components/home/ServiceArchitecture'
import { ConsultantRoster } from '@/components/home/ConsultantRoster'
import { SiteIndex } from '@/components/home/SiteIndex'

/*
 * Two front pages, one shown at a time.
 *
 * Not a responsive single hero: the desktop layout is a 7/5 split with a card
 * straddling the seam, and the phone layout is a launcher (four large errands, a search
 * field, then swipe rows for departments and consultants). Those are different structures,
 * not one structure at two widths, and forcing them into one component produces markup that
 * is wrong at both ends.
 *
 * Below lg the long browsing sections (the service grids, the full roster, the map of the
 * rest of the site) are hidden: the launcher covers the same ground in a fraction of the
 * height, and every link in them is also in the menu and the footer. They stay in the HTML.
 * Their images are lazy, so a hidden section costs a phone no image requests, and the
 * desktop hero's photograph is not fetched on a phone either (`sizes` says 0px).
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  // Static rendering needs the locale set here too, not only in the layout. See the note in
  // app/[locale]/layout.tsx.
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <DesktopHero />
      <PhoneHome />
      <div className="hidden lg:block">
        <MarqueeRibbon />
        <ServiceArchitecture />
        <ConsultantRoster />
        <SiteIndex />
      </div>
    </>
  )
}
