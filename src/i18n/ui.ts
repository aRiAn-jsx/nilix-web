export type Lang = 'fa' | 'en';
export const LANGS: Lang[] = ['fa', 'en'];

/** A page path without the language prefix, e.g. '/features'. */
export function href(lang: Lang, path = '/'): string {
  const clean = path === '/' ? '' : path;
  return lang === 'fa' ? clean || '/' : `/en${clean}`;
}

/** The same page in the other language (blog posts pass their own counterpart). */
export function otherLang(lang: Lang): Lang {
  return lang === 'fa' ? 'en' : 'fa';
}

export const dirOf = (lang: Lang) => (lang === 'fa' ? 'rtl' : 'ltr');

/** Persian digits for Persian pages. */
export function num(lang: Lang, n: number | string): string {
  const s = String(n);
  return lang === 'fa' ? s.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]) : s;
}

export function formatDate(lang: Lang, d: Date): string {
  return new Intl.DateTimeFormat(lang === 'fa' ? 'fa-IR-u-ca-persian' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export const NAV = [
  { path: '/features', fa: 'قابلیت‌ها', en: 'Features' },
  { path: '/how-it-works', fa: 'روند سفارش', en: 'How it works' },
  { path: '/integrations', fa: 'یکپارچه‌سازی', en: 'Integrations' },
  { path: '/docs', fa: 'مستندات API', en: 'API docs' },
  { path: '/blog', fa: 'مقالات', en: 'Blog' },
] as const;

export const FOOTER = [
  {
    fa: 'محصول',
    en: 'Product',
    links: [
      { path: '/features', fa: 'قابلیت‌ها', en: 'Features' },
      { path: '/how-it-works', fa: 'روند سفارش', en: 'How it works' },
      { path: '/global', fa: 'صادرات و ناوگان بین‌المللی', en: 'Export & global fleet' },
      { path: '/trust', fa: 'اعتماد و ضمانت', en: 'Trust & guarantees' },
      { path: '/download', fa: 'دانلود اپ', en: 'Download' },
    ],
  },
  {
    fa: 'توسعه‌دهندگان',
    en: 'Developers',
    links: [
      { path: '/docs', fa: 'مستندات API', en: 'API reference' },
      { path: '/integrations', fa: 'یکپارچه‌سازی', en: 'Integrations' },
      { path: '/docs#webhooks', fa: 'وبهوک‌ها', en: 'Webhooks' },
      { path: '/docs#files', fa: 'ورود و خروج با اکسل', en: 'Excel import & export' },
    ],
  },
  {
    fa: 'نیلیکس',
    en: 'Company',
    links: [
      { path: '/about', fa: 'درباره ما', en: 'About us' },
      { path: '/contact', fa: 'تماس با ما', en: 'Contact' },
      { path: '/blog', fa: 'مقالات', en: 'Blog' },
      { path: '/faq', fa: 'سؤالات متداول', en: 'FAQ' },
    ],
  },
  {
    fa: 'حقوقی',
    en: 'Legal',
    links: [
      { path: '/terms', fa: 'قوانین و مقررات', en: 'Terms of use' },
      { path: '/privacy', fa: 'حریم خصوصی', en: 'Privacy policy' },
    ],
  },
] as const;

const STRINGS = {
  openApp: { fa: 'ورود به وب‌اپ', en: 'Open web app' },
  download: { fa: 'دانلود اپ', en: 'Get the app' },
  downloadApk: { fa: 'دانلود مستقیم', en: 'Direct download' },
  apkNote: { fa: 'فایل APK اندروید', en: 'Android APK' },
  bazaar: { fa: 'کافه‌بازار', en: 'Cafe Bazaar' },
  myket: { fa: 'مایکت', en: 'Myket' },
  getOn: { fa: 'دریافت از', en: 'Get it on' },
  soon: { fa: 'به‌زودی', en: 'Coming soon' },
  menu: { fa: 'منو', en: 'Menu' },
  close: { fa: 'بستن', en: 'Close' },
  skip: { fa: 'رفتن به محتوا', en: 'Skip to content' },
  langSwitch: { fa: 'English', en: 'فارسی' },
  langSwitchLabel: { fa: 'Switch to English', en: 'نسخه فارسی' },
  tagline: {
    fa: 'بازار عمده‌فروشی آنلاین؛ از انبار شرکت پخش تا قفسه‌ی مغازه',
    en: 'The wholesale marketplace from distributor warehouse to store shelf',
  },
  footerAbout: {
    fa: 'نیلیکس فروشگاه‌ها، شرکت‌های پخش، رانندگان و حسابداری را در یک جریان واحد به هم وصل می‌کند: سفارش کارتنی، فاکتور رسمی، تحویل با QR و تسویه‌ی شفاف.',
    en: 'nilix connects stores, distributors, drivers and accounting in one flow: carton ordering, official invoices, QR-verified delivery and clear settlement.',
  },
  rights: { fa: 'همه‌ی حقوق برای نیلیکس محفوظ است.', en: 'All rights reserved.' },
  readMore: { fa: 'ادامه‌ی مطلب', en: 'Read more' },
  minutes: { fa: 'دقیقه مطالعه', en: 'min read' },
  home: { fa: 'خانه', en: 'Home' },
  ctaTitle: { fa: 'خرید عمده را ساده کنید', en: 'Make wholesale simple' },
  ctaText: {
    fa: 'اپ را روی گوشی نصب کنید یا همین حالا از مرورگر وارد شوید؛ ثبت‌نام چند دقیقه بیشتر طول نمی‌کشد.',
    en: 'Install the app on your phone or sign in from your browser right now. Signing up takes a few minutes.',
  },
} as const;

export type StringKey = keyof typeof STRINGS;
export const t = (lang: Lang, key: StringKey) => STRINGS[key][lang];

/** Pick the language's half of a {fa, en} pair. */
export const L = <T,>(lang: Lang, pair: { fa: T; en: T }): T => pair[lang];
