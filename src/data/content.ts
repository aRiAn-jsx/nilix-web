/** Marketing copy shared by several pages. Every entry carries both languages. */
import type { ScreenKind } from '../components/Screen.astro';

type Pair = { fa: string; en: string };
export interface Role {
  id: 'store' | 'distributor' | 'driver' | 'admin';
  icon: string;
  color: string;
  screen: ScreenKind;
  name: Pair;
  who: Pair;
  pitch: Pair;
  features: { icon: string; title: Pair; text: Pair }[];
}

export const ROLES: Role[] = [
  {
    id: 'store',
    icon: 'store',
    color: '#f43f5e',
    screen: 'cart',
    name: { fa: 'فروشگاه‌ها', en: 'Stores' },
    who: { fa: 'سوپرمارکت، هایپر، داروخانه، فروشگاه دیجیتال و هر خرده‌فروشی که عمده خرید می‌کند', en: 'Supermarkets, hypermarkets, pharmacies, electronics shops — any retailer that buys wholesale' },
    pitch: { fa: 'از چند شرکت پخش در یک سبد خرید کنید، قیمت کارتنی ببینید و سفارش را تا دم مغازه دنبال کنید.', en: 'Buy from several distributors in one cart, see carton prices and follow every order to your door.' },
    features: [
      { icon: 'layers', title: { fa: 'کاتالوگ چند پخش', en: 'Many distributors, one catalogue' }, text: { fa: 'کالای همه‌ی مراکز پخش فعال در یک جا، با دسته‌بندی، فیلتر قیمت کارتن، حاشیه‌ی سود و تخفیف پلکانی.', en: 'Every active distributor in one place, filtered by category, carton price, margin and tier discounts.' } },
      { icon: 'cart', title: { fa: 'سفارش سریع کارتنی', en: 'Quick carton ordering' }, text: { fa: 'تعداد را روی خود کارت محصول بزنید؛ حداقل سفارش و موجودی انبار همان‌جا کنترل می‌شود.', en: 'Set quantities right on the product card; minimum order and live stock are checked on the spot.' } },
      { icon: 'invoice', title: { fa: 'پیش‌فاکتور و فاکتور رسمی', en: 'Pro-forma and official invoice' }, text: { fa: 'قبل از قطعی شدن پیش‌فاکتور می‌گیرید و بعد از تأیید، فاکتور رسمی با ارزش افزوده و QR.', en: 'A pro-forma before anything is final, then an official invoice with VAT and QR codes.' } },
      { icon: 'bell', title: { fa: 'ردیابی لحظه‌ای', en: 'Live tracking' }, text: { fa: 'از بسته‌بندی تا بارگیری و تحویل، هر مرحله با اعلان و پیامک خبر داده می‌شود.', en: 'Packing, loading, delivery — every step arrives as a notification and SMS.' } },
      { icon: 'qr', title: { fa: 'تحویل با اسکن QR', en: 'QR-verified delivery' }, text: { fa: 'هنگام تحویل QR فاکتور را اسکن می‌کنید تا تعداد کارتن‌ها با سفارش یکی باشد.', en: 'Scan the invoice QR on delivery so the carton count matches what you ordered.' } },
      { icon: 'star', title: { fa: 'امتیاز و سابقه', en: 'Ratings and history' }, text: { fa: 'به هر سفارش امتیاز می‌دهید و سابقه‌ی خریدها و فاکتورها همیشه در دسترس است.', en: 'Rate each order and keep every purchase and invoice on hand.' } },
    ],
  },
  {
    id: 'distributor',
    icon: 'building',
    color: '#fbbf24',
    screen: 'vendor',
    name: { fa: 'شرکت‌های پخش و بنکداران', en: 'Distributors & wholesalers' },
    who: { fa: 'شرکت‌های پخش مویرگی، بنکداری‌ها، واردکننده‌ها و تولیدکنندگانی که مستقیم می‌فروشند', en: 'Distribution companies, wholesalers, importers and manufacturers selling direct' },
    pitch: { fa: 'سفارش‌ها را بررسی و تأیید کنید، انبار را مدیریت کنید، ناوگان را بفرستید و حسابداری را خودکار ببینید.', en: 'Review and confirm orders, run inventory, dispatch your fleet and watch the books update themselves.' },
    features: [
      { icon: 'box', title: { fa: 'برد سفارش‌ها', en: 'Order board' }, text: { fa: 'پیش‌فاکتورهای جدید، بسته‌بندی، در مسیر و تحویل‌شده در یک نگاه؛ تعداد هر ردیف را قبل از صدور فاکتور تأیید یا اصلاح کنید.', en: 'New, packing, in transit and delivered at a glance; confirm or adjust each line before invoicing.' } },
      { icon: 'tag', title: { fa: 'ثبت کالای کامل', en: 'Complete product listings' }, text: { fa: 'تا هفت عکس، بارکد، تعداد در کارتن، حداقل سفارش، تخفیف پلکانی و توضیحات.', en: 'Up to seven photos, barcode, units per carton, minimum order, tier discounts and a description.' } },
      { icon: 'shield', title: { fa: 'تعهدات صنفی', en: 'Trade commitments' }, text: { fa: 'تعهد سلامت و اصالت کالا برای هر صنف؛ تاریخ انقضا برای خوراکی، سیب سلامت و IRC برای دارو، گارانتی برای دیجیتال.', en: 'Health and authenticity pledges per trade: expiry for food, IRC for medicine, warranty for electronics.' } },
      { icon: 'truck', title: { fa: 'ناوگان و رانندگان', en: 'Fleet and drivers' }, text: { fa: 'رانندگان خودتان را عضو کنید، بار را به آن‌ها بسپارید و ناوگان بین‌المللی را برای صادرات تعریف کنید.', en: 'Bring your own drivers, hand them loads and define an international fleet for export.' } },
      { icon: 'chart', title: { fa: 'حسابداری و گزارش', en: 'Accounting and reports' }, text: { fa: 'فروش، مطالبات، هزینه‌ها و سود به‌صورت خودکار از روی سفارش‌ها ثبت می‌شود، با خروجی اکسل.', en: 'Sales, receivables, expenses and profit post themselves from orders, with Excel export.' } },
      { icon: 'users', title: { fa: 'باشگاه مشتریان', en: 'Customer club' }, text: { fa: 'مشتریان وفادار را بشناسید، پیامک گروهی بفرستید و برای هر گروه تخفیف بگذارید.', en: 'Know your loyal buyers, send group SMS and set discounts per segment.' } },
    ],
  },
  {
    id: 'driver',
    icon: 'truck',
    color: '#38bdf8',
    screen: 'driver',
    name: { fa: 'رانندگان', en: 'Drivers' },
    who: { fa: 'رانندگان ناوگان شرکت‌های پخش و رانندگان مستقل حمل‌ونقل داخلی و بین‌المللی', en: 'Distributor fleet drivers and independent domestic or international hauliers' },
    pitch: { fa: 'بارنامه، مسیر و مقصدها روی گوشی؛ تحویل با QR و کد یک‌بار مصرف، بدون کاغذبازی.', en: 'Manifest, route and stops on your phone; QR and one-time-code delivery, no paperwork.' },
    features: [
      { icon: 'file', title: { fa: 'بارنامه‌ی دیجیتال', en: 'Digital manifest' }, text: { fa: 'فهرست کارتن‌ها و مقصدهای هر بار، مرتب و همیشه همراه.', en: 'Every carton and stop of a load, in order, always with you.' } },
      { icon: 'scan', title: { fa: 'اسکن تحویل', en: 'Delivery scanning' }, text: { fa: 'با دوربین گوشی QR را اسکن کنید تا تحویل برای همه ثبت شود.', en: 'Scan the QR with your phone camera and the handover is recorded for everyone.' } },
      { icon: 'lock', title: { fa: 'کد تحویل', en: 'Delivery code' }, text: { fa: 'کد شش‌رقمی یک‌بار مصرف، تحویل را به خریدار واقعی گره می‌زند.', en: 'A six-digit one-time code ties each handover to the real buyer.' } },
      { icon: 'globe', title: { fa: 'حمل بین‌المللی', en: 'International haulage' }, text: { fa: 'ثبت مدارک CMR و TIR و مجوز حمل برای رانندگان خارج از کشور.', en: 'CMR, TIR and transport permits for cross-border drivers.' } },
    ],
  },
  {
    id: 'admin',
    icon: 'gauge',
    color: '#a78bfa',
    screen: 'admin',
    name: { fa: 'مدیران سامانه', en: 'Platform admins' },
    who: { fa: 'تیم نیلیکس یا مالک یک بازار اختصاصی', en: 'The nilix team or the owner of a private marketplace' },
    pitch: { fa: 'عضویت‌ها را تأیید کنید، تعهدات صنفی را بررسی کنید و سلامت کل بازار را زیر نظر بگیرید.', en: 'Approve members, check trade commitments and keep an eye on the whole marketplace.' },
    features: [
      { icon: 'users', title: { fa: 'تأیید کاربران', en: 'Member approval' }, text: { fa: 'بررسی مدارک فروشگاه‌ها، شرکت‌های پخش و رانندگان قبل از فعال شدن.', en: 'Review store, distributor and driver documents before they go live.' } },
      { icon: 'chart', title: { fa: 'نمای کلی تجارت', en: 'Commerce overview' }, text: { fa: 'سفارش‌ها، حجم فروش و وضعیت تحویل در کل سامانه.', en: 'Orders, sales volume and delivery status across the platform.' } },
      { icon: 'message', title: { fa: 'پیامک و اعلان', en: 'SMS and notifications' }, text: { fa: 'مرکز پیامک و اعلان برای اطلاع‌رسانی به همه یا یک گروه.', en: 'One centre for SMS and in-app notices to everyone or a segment.' } },
      { icon: 'shield', title: { fa: 'کیفیت و اعتماد', en: 'Quality and trust' }, text: { fa: 'امتیازها، شکایت‌ها و تعهدات هر فروشنده در یک پرونده.', en: 'Ratings, complaints and each seller\'s commitments in one file.' } },
    ],
  },
];

export interface Step { n: number; icon: string; screen: ScreenKind; who: Pair; title: Pair; text: Pair }
/** The order, start to finish, in plain words. */
export const JOURNEY: Step[] = [
  { n: 1, icon: 'store', screen: 'home', who: { fa: 'فروشگاه', en: 'Store' }, title: { fa: 'انتخاب کالا', en: 'Pick the goods' }, text: { fa: 'فروشگاه‌دار در اپ کالاهای چند شرکت پخش را کنار هم می‌بیند و قیمت هر کارتن را مقایسه می‌کند.', en: 'The store owner browses several distributors side by side and compares the price per carton.' } },
  { n: 2, icon: 'cart', screen: 'cart', who: { fa: 'فروشگاه', en: 'Store' }, title: { fa: 'سبد و پیش‌فاکتور', en: 'Cart and pro-forma' }, text: { fa: 'تعداد کارتن را می‌زند؛ تخفیف و ارزش افزوده حساب می‌شود و پیش‌فاکتور برای پخش می‌رود. هنوز چیزی قطعی نیست.', en: 'They set carton counts; discounts and VAT are worked out and a pro-forma goes to the distributor. Nothing is final yet.' } },
  { n: 3, icon: 'building', screen: 'vendor', who: { fa: 'شرکت پخش', en: 'Distributor' }, title: { fa: 'بررسی و تأیید', en: 'Review and confirm' }, text: { fa: 'شرکت پخش موجودی را چک می‌کند، تعداد هر ردیف را تأیید یا اصلاح می‌کند و خریدار از تغییرها باخبر می‌شود.', en: 'The distributor checks stock, confirms or adjusts each line, and the buyer is told about any change.' } },
  { n: 4, icon: 'invoice', screen: 'invoice', who: { fa: 'شرکت پخش', en: 'Distributor' }, title: { fa: 'فاکتور رسمی', en: 'Official invoice' }, text: { fa: 'فاکتور رسمی با ارزش افزوده صادر می‌شود و هر ردیف کالا یک QR اختصاصی می‌گیرد.', en: 'An official invoice with VAT is issued and every line gets its own QR code.' } },
  { n: 5, icon: 'box', screen: 'vendor', who: { fa: 'انبار', en: 'Warehouse' }, title: { fa: 'بسته‌بندی', en: 'Packing' }, text: { fa: 'انبار کارتن‌ها را جمع و بسته‌بندی می‌کند و موجودی خودکار کم می‌شود.', en: 'The warehouse picks and packs the cartons; stock goes down on its own.' } },
  { n: 6, icon: 'truck', screen: 'driver', who: { fa: 'راننده', en: 'Driver' }, title: { fa: 'بارگیری و حمل', en: 'Loading and transit' }, text: { fa: 'بار به یک راننده‌ی ناوگان سپرده می‌شود؛ مسیر و مقصدها روی گوشی اوست و خریدار پیام «در مسیر» می‌گیرد.', en: 'The load goes to a fleet driver with the route on their phone; the buyer gets an "on the way" message.' } },
  { n: 7, icon: 'qr', screen: 'delivered', who: { fa: 'فروشگاه و راننده', en: 'Store & driver' }, title: { fa: 'تحویل با QR', en: 'QR handover' }, text: { fa: 'خریدار QR فاکتور را اسکن می‌کند و کد تحویل را می‌دهد؛ تعداد کارتن‌ها همان‌جا تطبیق داده می‌شود.', en: 'The buyer scans the invoice QR and gives the delivery code; cartons are matched on the spot.' } },
  { n: 8, icon: 'wallet', screen: 'delivered', who: { fa: 'فروشگاه', en: 'Store' }, title: { fa: 'پرداخت و تسویه', en: 'Payment' }, text: { fa: 'پرداخت با کارتخوان یا انتقال بانکی ثبت می‌شود و سهم هر طرف روشن است.', en: 'Payment by card terminal or bank transfer is recorded and everyone\'s share is clear.' } },
  { n: 9, icon: 'chart', screen: 'books', who: { fa: 'همه', en: 'Everyone' }, title: { fa: 'امتیاز و حسابداری', en: 'Rating and books' }, text: { fa: 'خریدار امتیاز می‌دهد و دفاتر حسابداری شرکت پخش بدون ورود دستی به‌روز می‌شود.', en: 'The buyer leaves a rating and the distributor\'s books update without manual entry.' } },
];

/** Systems nilix exchanges data with, by kind. */
export const SYSTEMS = [
  { icon: 'box', name: { fa: 'انبارداری', en: 'Warehouse (WMS)' }, text: { fa: 'موجودی، بارکد، کالای ورودی و خروجی', en: 'Stock, barcodes, goods in and out' }, data: { fa: ['کالا و بارکد', 'موجودی هر انبار', 'رسید و حواله'], en: ['Products & barcodes', 'Stock per warehouse', 'Receipts & dispatches'] } },
  { icon: 'invoice', name: { fa: 'حسابداری', en: 'Accounting' }, text: { fa: 'فاکتور فروش، دریافت‌ها، اشخاص و هزینه‌ها', en: 'Sales invoices, receipts, parties and expenses' }, data: { fa: ['فاکتور فروش', 'دریافت و پرداخت', 'طرف حساب‌ها'], en: ['Sales invoices', 'Receipts & payments', 'Accounts'] } },
  { icon: 'users', name: { fa: 'CRM و مدیریت مشتری', en: 'CRM' }, text: { fa: 'مشتریان، سوابق خرید و فرصت‌های فروش', en: 'Customers, purchase history and opportunities' }, data: { fa: ['مشتری و مخاطب', 'سابقه‌ی خرید', 'برچسب و گروه'], en: ['Customers & contacts', 'Purchase history', 'Tags & segments'] } },
  { icon: 'bag', name: { fa: 'فروشگاه اینترنتی و ERP', en: 'Online store & ERP' }, text: { fa: 'کاتالوگ، قیمت و سفارش در سیستم‌های دیگر', en: 'Catalogue, prices and orders in other systems' }, data: { fa: ['کاتالوگ و قیمت', 'سفارش', 'وضعیت ارسال'], en: ['Catalogue & prices', 'Orders', 'Shipping status'] } },
];
