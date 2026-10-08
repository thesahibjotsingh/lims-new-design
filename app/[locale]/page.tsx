import { setRequestLocale } from 'next-intl/server'
import { DesktopHero } from '@/components/home/DesktopHero'
import {
  AboutSection,
  ContactSection,
  DoctorsSection,
  HealthLibrarySection,
  ServiceGroupSection,
} from '@/components/home/HomeSections'
import { MarqueeRibbon } from '@/components/home/MarqueeRibbon'
import { PhoneHome } from '@/components/home/PhoneHome'
import { AbhaCard } from '@/components/primitives/AbhaCard'
import { abhaUrl } from '@/lib/site-config'

/*
 * THE HOME PAGE, in the order of the menu:
 *
 *   1. Hero             DesktopHero (lg+) or PhoneHome (below lg)
 *   2. Specialities
 *   3. Find a doctor
 *   4. Services         (diagnostics and imaging)
 *   5. Patient care
 *   6. Health library   a "coming soon" card
 *   7. About LIMS
 *   8. Contact us
 *
 * Scrolling the page is walking down the menu. Each stop is a short preview on a phone (a swipe row
 * and a "See all" link) and a fuller section from lg up; see components/home/HomeSections.tsx.
 *
 * Two heroes, one shown at a time. Not a responsive single hero: the desktop layout is a 7/5 split
 * with a card straddling the seam, and the phone layout is a teal welcome with four errands under
 * it. Those are different structures, not one structure at two widths, and forcing them into one
 * component produces markup that is wrong at both ends.
 *
 * What is hidden at a width stays in the HTML. Its images are lazy, so a hidden section costs a
 * phone no image requests, and the desktop hero's photograph is not fetched on a phone either
 * (`sizes` says 0px).
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
      </div>
      <ServiceGroupSection categoryId="clinical" phoneTone="mist" desktopTone="mist" />
      <DoctorsSection />
      <ServiceGroupSection categoryId="diagnostics" phoneTone="mist" desktopTone="white" />
      <ServiceGroupSection categoryId="support" phoneTone="white" desktopTone="mist">
        <AbhaCard href={abhaUrl} />
      </ServiceGroupSection>
      <HealthLibrarySection />
      <AboutSection />
      <ContactSection />
    </>
  )
}
