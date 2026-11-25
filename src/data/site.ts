/** Everything that may change before launch lives here: links, contact, store listings. */
export const SITE = {
  name: 'nilix',
  nameFa: 'نیلیکس',
  url: 'https://nilix.co',
  webApp: 'https://web.nilix.co',
  /** Direct APK download. Move this to nilix.co/downloads once the file is hosted on the domain. */
  apk: 'https://ais-pre-eogpcyllt4gt7yisaql7rj-485076588066.europe-west2.run.app/downloads/nilix.apk',
  /** Store listings: leave null until the app is published, the buttons then read "coming soon". */
  bazaar: null as string | null,
  myket: null as string | null,
  /** Where the contact form posts JSON ({name, phone, email, topic, message}). Without it the form opens the visitor's mail app. */
  contactEndpoint: (import.meta.env.PUBLIC_CONTACT_ENDPOINT as string | undefined) || null,
  contact: {
    phone: '05137622222',
    phoneFa: '۰۵۱-۳۷۶۲۲۲۲۲',
    phoneEn: '+98 51 3762 2222',
    phoneIntl: '+985137622222',
    email: 'info@ssiholding.co',
    addressFa: 'مشهد، بلوار سجاد، بزرگمهر شمالی ۲، پلاک ۴۴، طبقه ۳',
    addressEn: 'Floor 3, No. 44, North Bozorgmehr 2, Sajjad Blvd, Mashhad, Iran',
    hoursFa: 'شنبه تا پنج‌شنبه، ۸:۰۰ تا ۲۰:۰۰ (مشاوره حضوری و تلفنی)',
    hoursEn: 'Saturday to Thursday, 8:00–20:00 Iran time (in person and by phone)',
    city: 'Mashhad',
  },
  brandColor: '#e11d48',
};
