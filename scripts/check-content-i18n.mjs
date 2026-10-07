// scripts/check-content-i18n.mjs
//
// Checks the Hindi and Punjabi department-page content in lib/content-i18n/ against the
// English in lib/services.ts and lib/service-content.ts.
//
// The resolver ignores any translated list whose length differs from the English one (a
// misaligned list would pair the wrong description with a condition), so a mismatch is
// not a crash, it is a page that silently falls back to English. This reports each one.
//
//   node scripts/check-content-i18n.mjs
//
// Exit code 1 when anything is missing or misaligned, so it can sit in CI.

import { build } from 'esbuild'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const outDir = mkdtempSync(join(tmpdir(), 'check-content-i18n-'))
const outFile = join(outDir, 'bundle.mjs')

try {
  await build({
    stdin: {
      contents: `
        export { SERVICES } from '@/lib/services'
        export { SERVICE_EXTRAS } from '@/lib/service-content'
        export { SERVICE_TEXT_HI } from '@/lib/content-i18n/services.hi'
        export { SERVICE_TEXT_PA } from '@/lib/content-i18n/services.pa'
        export { EXTRAS_HI } from '@/lib/content-i18n/extras.hi'
        export { EXTRAS_PA } from '@/lib/content-i18n/extras.pa'
      `,
      resolveDir: root,
      sourcefile: 'entry.ts',
      loader: 'ts',
    },
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile: outFile,
    alias: { '@': root },
    logLevel: 'silent',
  })

  const mod = await import(pathToFileURL(outFile).href)
  const { SERVICES, SERVICE_EXTRAS } = mod
  const tables = {
    hi: { text: mod.SERVICE_TEXT_HI, extras: mod.EXTRAS_HI },
    pa: { text: mod.SERVICE_TEXT_PA, extras: mod.EXTRAS_PA },
  }

  const problems = []
  const note = (locale, slug, message) => problems.push(`${locale}  ${slug}: ${message}`)

  const compareList = (locale, slug, field, english, translated) => {
    if (english === undefined) {
      if (translated !== undefined) note(locale, slug, `${field} has no English counterpart`)
      return
    }
    if (translated === undefined) return note(locale, slug, `${field} missing`)
    if (translated.length !== english.length) {
      return note(locale, slug, `${field} has ${translated.length} items, English has ${english.length}`)
    }
    english.forEach((item, index) => {
      const other = translated[index]
      if (typeof item === 'string') {
        if (typeof other !== 'string' || !other.trim()) note(locale, slug, `${field}[${index}] is empty`)
        return
      }
      for (const key of Object.keys(item)) {
        // `slug` on a diagnosis item comes from the English record, never from here.
        if (key === 'slug') continue
        if (typeof other?.[key] !== 'string' || !other[key].trim()) {
          note(locale, slug, `${field}[${index}].${key} is empty`)
        }
      }
    })
  }

  for (const locale of ['hi', 'pa']) {
    const { text, extras } = tables[locale]

    for (const slug of Object.keys(text)) {
      if (!SERVICES.some((service) => service.slug === slug)) note(locale, slug, 'text entry for a slug not in SERVICES')
    }
    for (const slug of Object.keys(extras)) {
      if (!SERVICE_EXTRAS[slug]) note(locale, slug, 'extras entry for a slug not in SERVICE_EXTRAS')
    }

    for (const service of SERVICES) {
      const entry = text[service.slug]
      if (!entry) {
        note(locale, service.slug, 'no entry in services table')
        continue
      }
      if (!entry.overview?.trim()) note(locale, service.slug, 'overview missing')
      if (service.commonConditions) compareList(locale, service.slug, 'commonConditions', service.commonConditions, entry.commonConditions)
      if (service.commonTreatments) compareList(locale, service.slug, 'commonTreatments', service.commonTreatments, entry.commonTreatments)
    }

    for (const [slug, english] of Object.entries(SERVICE_EXTRAS)) {
      const entry = extras[slug]
      if (!entry) {
        note(locale, slug, 'no entry in extras table')
        continue
      }
      for (const field of ['areas', 'seeDoctorIf', 'emergencyIf', 'diagnosedBy', 'prevention', 'prepare', 'during', 'after', 'safety', 'steps', 'faqs']) {
        if (english[field] !== undefined || entry[field] !== undefined) {
          compareList(locale, slug, field, english[field], entry[field])
        }
      }
    }
  }

  if (problems.length) {
    console.error(problems.join('\n'))
    console.error(`\n${problems.length} problem(s).`)
    process.exitCode = 1
  } else {
    console.log(`content-i18n OK: ${SERVICES.length} services, ${Object.keys(SERVICE_EXTRAS).length} extras, hi + pa aligned.`)
  }
} finally {
  rmSync(outDir, { recursive: true, force: true })
}
