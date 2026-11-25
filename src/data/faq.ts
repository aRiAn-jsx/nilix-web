type Pair = { fa: string; en: string };
export interface QA { q: Pair; a: Pair; home?: boolean }

export const FAQ: { title: Pair; items: QA[] }[] = [
  {
    title: { fa: 'شروع کار', en: 'Getting started' },
    items: [
      { home: true, q: { fa: 'نیلیکس چیست؟', en: 'What is nilix?' }, a: { fa: 'نیلیکس یک بازار عمده‌فروشی آنلاین (B2B) است که فروشگاه‌ها را به شرکت‌های پخش و بنکداران وصل می‌کند. سفارش کارتنی، فاکتور رسمی، حمل با ناوگان، تحویل با QR و حسابداری در یک اپ انجام می‌شود.', en: 'nilix is an online wholesale (B2B) marketplace connecting stores with distributors and wholesalers. Carton ordering, official invoices, fleet delivery, QR handover and accounting all happen in one app.' } },
      { home: true, q: { fa: 'چه کسانی می‌توانند از نیلیکس استفاده کنند؟', en: 'Who can use nilix?' }, a: { fa: 'چهار نقش داریم: فروشگاه‌ها (خریدار عمده)، شرکت‌های پخش و بنکداران (فروشنده)، رانندگان ناوگان و مدیران سامانه. هر نقش پنل اختصاصی خودش را دارد.', en: 'There are four roles: stores (wholesale buyers), distributors and wholesalers (sellers), fleet drivers and platform admins. Each role has its own panel.' } },
      { q: { fa: 'برای ثبت‌نام چه مدارکی لازم است؟', en: 'What do I need to sign up?' }, a: { fa: 'شماره موبایل برای کد تأیید، نام کسب‌وکار، استان و شهر و نشانی. شرکت‌های پخش اطلاعات ثبتی و تعهدات صنفی را هم تکمیل می‌کنند و رانندگان مدارک حمل را. حساب‌ها پس از بررسی فعال می‌شوند.', en: 'A mobile number for the verification code, your business name, province or country, city and address. Distributors also fill in registration details and trade commitments, and drivers their transport documents. Accounts go live after review.' } },
      { home: true, q: { fa: 'اپ را از کجا نصب کنم؟', en: 'Where do I get the app?' }, a: { fa: 'نسخه‌ی اندروید را مستقیم از صفحه‌ی دانلود بگیرید؛ نسخه‌های کافه‌بازار و مایکت به‌زودی منتشر می‌شوند. روی آیفون و کامپیوتر هم می‌توانید از وب‌اپ در web.nilix.co استفاده کنید و آن را به صفحه‌ی اصلی اضافه کنید.', en: 'Get the Android app directly from the download page; Cafe Bazaar and Myket listings are coming soon. On iPhone and desktop, use the web app at web.nilix.co and add it to your home screen.' } },
    ],
  },
  {
    title: { fa: 'سفارش و تحویل', en: 'Orders and delivery' },
    items: [
      { home: true, q: { fa: 'پیش‌فاکتور با فاکتور رسمی چه فرقی دارد؟', en: 'How is a pro-forma different from the official invoice?' }, a: { fa: 'پیش‌فاکتور همان سبد خرید شماست که برای شرکت پخش فرستاده می‌شود و هنوز قطعی نیست. شرکت پخش موجودی را بررسی و تعداد را تأیید می‌کند و بعد فاکتور رسمی با ارزش افزوده و کد QR صادر می‌شود.', en: 'The pro-forma is your cart sent to the distributor; it is not final. The distributor checks stock and confirms quantities, then an official invoice with VAT and QR codes is issued.' } },
      { q: { fa: 'اگر شرکت پخش همه‌ی کالا را نداشته باشد چه می‌شود؟', en: 'What if the distributor is short on stock?' }, a: { fa: 'تعداد آن ردیف را اصلاح یا ناموجود اعلام می‌کند و مبلغ فاکتور خودکار دوباره حساب می‌شود. شما قبل از تحویل از تغییر باخبر می‌شوید.', en: 'They adjust or mark that line unavailable and the invoice total is recalculated automatically. You are told before delivery.' } },
      { q: { fa: 'تحویل با QR چطور کار می‌کند؟', en: 'How does QR delivery work?' }, a: { fa: 'هر ردیف فاکتور یک QR دارد. هنگام تحویل، خریدار کد را اسکن می‌کند و با کد تحویل شش‌رقمی تأیید می‌کند. این‌طوری تعداد کارتن‌ها و تحویل‌گیرنده ثبت می‌شود و اختلاف بعدی پیش نمی‌آید.', en: 'Each invoice line has a QR code. On delivery the buyer scans it and confirms with a six-digit delivery code, so cartons and recipient are recorded and disputes do not come up later.' } },
      { q: { fa: 'پرداخت چطور انجام می‌شود؟', en: 'How is payment made?' }, a: { fa: 'در داخل ایران پرداخت هنگام تحویل با کارتخوان یا روش توافقی با شرکت پخش ثبت می‌شود. سفارش‌های بین‌المللی با انتقال بانکی تسویه می‌شوند.', en: 'In Iran payment is taken on delivery by card terminal or a method agreed with the distributor. International orders are settled by bank transfer.' } },
    ],
  },
  {
    title: { fa: 'کیفیت و اعتماد', en: 'Quality and trust' },
    items: [
      { home: true, q: { fa: 'از کجا مطمئن شوم کالا اصل و سالم است؟', en: 'How do I know goods are genuine and safe?' }, a: { fa: 'هر شرکت پخش هنگام ثبت‌نام تعهد سلامت و اصالت کالا را می‌پذیرد و برای هر صنف شرط‌های خودش را دارد: تاریخ انقضای معتبر برای خوراکی، کد IRC و نماد سیب سلامت برای دارو، گارانتی برای کالای دیجیتال. همین شرط‌ها هنگام ثبت هر کالا هم بررسی می‌شود.', en: 'Every distributor accepts health and authenticity commitments at sign-up, with rules per trade: a valid expiry for food, IRC code for medicine, warranty for electronics. The same rules are checked whenever a product is listed.' } },
      { q: { fa: 'اطلاعات کسب‌وکار من کجا نگه‌داری می‌شود؟', en: 'Where is my business data kept?' }, a: { fa: 'اطلاعات روی سرورهای نیلیکس نگه‌داری می‌شود و فقط برای انجام سفارش در اختیار طرف معامله قرار می‌گیرد. جزئیات در صفحه‌ی حریم خصوصی آمده است.', en: 'Data is stored on nilix servers and shared only with your trading counterpart to fulfil orders. See the privacy policy for details.' } },
    ],
  },
  {
    title: { fa: 'یکپارچه‌سازی و بین‌الملل', en: 'Integrations and international' },
    items: [
      { home: true, q: { fa: 'می‌شود نیلیکس را به نرم‌افزار حسابداری یا انبار خودمان وصل کرد؟', en: 'Can nilix connect to our accounting or warehouse software?' }, a: { fa: 'بله. کالا، موجودی، سفارش، فاکتور و مشتری را می‌توانید هم وارد نیلیکس کنید و هم از آن خارج کنید: با فایل اکسل و CSV برای شروع سریع، یا با API و وبهوک برای همگام‌سازی خودکار با سیستم‌های انبار، حسابداری و CRM.', en: 'Yes. Products, stock, orders, invoices and customers can flow both in and out: Excel and CSV files for a quick start, or the API and webhooks for automatic sync with warehouse, accounting and CRM systems.' } },
      { q: { fa: 'خریداران خارج از ایران هم می‌توانند سفارش بدهند؟', en: 'Can buyers outside Iran order?' }, a: { fa: 'بله. نسخه‌ی انگلیسی اپ برای خریداران خارجی است و فقط شرکت‌های پخشی به آن‌ها نمایش داده می‌شوند که ناوگان بین‌المللی‌شان به کشور خریدار سرویس می‌دهد. شرایط حمل با اینکوترمز مشخص می‌شود.', en: 'Yes. The English app is built for foreign buyers, who only see distributors whose international fleet serves their country. Shipping terms are set with Incoterms.' } },
    ],
  },
];

export const HOME_FAQ = FAQ.flatMap((g) => g.items.filter((i) => i.home));
