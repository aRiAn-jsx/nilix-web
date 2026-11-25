/**
 * nilix Partner API v1 — the reference shown on /docs.
 * This is the published contract for partners (warehouse, accounting, CRM, ERP).
 */
type Pair = { fa: string; en: string };
export interface Param { name: string; type: string; req?: boolean; d: Pair }
export interface Endpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  scope: string;
  title: Pair;
  d: Pair;
  params?: Param[];
  body?: string;
  response: string;
}
export interface Group { id: string; title: Pair; intro: Pair; endpoints: Endpoint[] }

export const API_BASE = 'https://api.nilix.co/v1';
export const SANDBOX_BASE = 'https://sandbox.api.nilix.co/v1';

const product = `{
  "id": "prd_8Kq2v1",
  "external_id": "WMS-10042",
  "barcode": "6264591596821",
  "name": "روغن سرخ‌کردنی ۲.۲ لیتری",
  "category": "supermarket",
  "units_per_carton": 6,
  "carton_price": 2860000,
  "currency": "IRT",
  "min_cartons": 2,
  "stock_cartons": 340,
  "tier_discounts": [{ "from_cartons": 10, "percent": 3 }],
  "compliance": { "expiry_date": "1405-08-30" },
  "images": ["https://cdn.nilix.co/p/prd_8Kq2v1/1.webp"],
  "active": true,
  "updated_at": "2026-11-20T08:14:02Z"
}`;

const order = `{
  "id": "ord_10428",
  "status": "packing",
  "buyer": { "id": "cus_51x", "external_id": "CRM-883", "name": "سوپرمارکت آفتاب", "city": "Mashhad" },
  "lines": [
    {
      "product_id": "prd_8Kq2v1",
      "external_id": "WMS-10042",
      "cartons_requested": 5,
      "cartons_confirmed": 4,
      "carton_price": 2860000,
      "discount_percent": 0
    }
  ],
  "totals": { "subtotal": 11440000, "discount": 0, "vat": 1144000, "payable": 12584000, "currency": "IRT" },
  "invoice_id": "inv_10428",
  "shipment": { "driver_id": "drv_77", "loaded_at": null, "delivered_at": null },
  "international": null,
  "created_at": "2026-11-20T07:52:40Z",
  "updated_at": "2026-11-20T08:30:11Z"
}`;

export const GROUPS: Group[] = [
  {
    id: 'products',
    title: { fa: 'کالاها', en: 'Products' },
    intro: { fa: 'کاتالوگ شرکت پخش. هر کالا می‌تواند یک شناسه‌ی خارجی (external_id) از سیستم انبار یا حسابداری شما داشته باشد تا تطبیق آسان باشد. شرط‌های صنفی (مثل تاریخ انقضا یا کد IRC) همان قوانین اپ را دارند.', en: 'The distributor catalogue. Each product can carry an external_id from your warehouse or accounting system for easy matching. Trade rules (such as expiry date or IRC code) follow the same checks as the app.' },
    endpoints: [
      {
        id: 'list-products', method: 'GET', path: '/products', scope: 'products:read',
        title: { fa: 'فهرست کالاها', en: 'List products' },
        d: { fa: 'کالاهای شما را صفحه‌به‌صفحه برمی‌گرداند. با updated_since فقط تغییرات را بگیرید.', en: 'Returns your products page by page. Use updated_since to fetch only changes.' },
        params: [
          { name: 'updated_since', type: 'datetime', d: { fa: 'فقط کالاهایی که بعد از این زمان تغییر کرده‌اند', en: 'Only products changed after this time' } },
          { name: 'category', type: 'string', d: { fa: 'فیلتر دسته', en: 'Category filter' } },
          { name: 'limit', type: 'integer', d: { fa: 'تعداد در هر صفحه، حداکثر ۲۰۰', en: 'Page size, up to 200' } },
          { name: 'cursor', type: 'string', d: { fa: 'از next_cursor پاسخ قبلی', en: 'next_cursor from the previous response' } },
        ],
        response: `{\n  "data": [${product.replace(/\n/g, '\n    ')}],\n  "next_cursor": "c_2f9a"\n}`,
      },
      {
        id: 'upsert-products', method: 'POST', path: '/products/bulk', scope: 'products:write',
        title: { fa: 'ثبت یا به‌روزرسانی گروهی', en: 'Bulk create or update' },
        d: { fa: 'تا ۵۰۰ کالا را یک‌جا ثبت یا به‌روز کنید. کالا با external_id یا barcode پیدا می‌شود؛ اگر نبود ساخته می‌شود. نتیجه‌ی هر ردیف جدا برمی‌گردد.', en: 'Create or update up to 500 products at once. Products are matched by external_id or barcode and created when missing. Each row reports its own result.' },
        params: [{ name: 'Idempotency-Key', type: 'header', d: { fa: 'کلید یکتا تا ارسال تکراری دوباره اعمال نشود', en: 'A unique key so a retried request is not applied twice' } }],
        body: `{
  "match_by": "external_id",
  "items": [
    {
      "external_id": "WMS-10042",
      "barcode": "6264591596821",
      "name": "روغن سرخ‌کردنی ۲.۲ لیتری",
      "category": "supermarket",
      "units_per_carton": 6,
      "carton_price": 2860000,
      "min_cartons": 2,
      "compliance": { "expiry_date": "1405-08-30" }
    }
  ]
}`,
        response: `{
  "created": 0,
  "updated": 1,
  "failed": 0,
  "results": [{ "external_id": "WMS-10042", "id": "prd_8Kq2v1", "status": "updated" }]
}`,
      },
      {
        id: 'update-product', method: 'PATCH', path: '/products/{id}', scope: 'products:write',
        title: { fa: 'ویرایش یک کالا', en: 'Update a product' },
        d: { fa: 'فقط فیلدهایی که می‌فرستید تغییر می‌کنند. برای غیرفعال کردن، active را false بفرستید.', en: 'Only the fields you send change. Send active: false to hide a product.' },
        body: `{ "carton_price": 2950000, "active": true }`,
        response: product,
      },
    ],
  },
  {
    id: 'inventory',
    title: { fa: 'موجودی انبار', en: 'Inventory' },
    intro: { fa: 'موجودی بر حسب کارتن نگه‌داری می‌شود. اگر چند انبار دارید، موجودی هر انبار را جدا بفرستید؛ نیلیکس جمع آن‌ها را به خریدار نشان می‌دهد.', en: 'Stock is counted in cartons. With several warehouses, send each warehouse separately; buyers see the total.' },
    endpoints: [
      {
        id: 'set-stock', method: 'PUT', path: '/inventory', scope: 'inventory:write',
        title: { fa: 'ثبت موجودی', en: 'Set stock levels' },
        d: { fa: 'موجودی فعلی را از سیستم انبار بفرستید (جایگزین می‌شود، اضافه نمی‌شود). مناسب اجرای زمان‌بندی‌شده، مثلاً هر ده دقیقه.', en: 'Send current stock from your warehouse system (it replaces, not adds). Good for a scheduled job, e.g. every ten minutes.' },
        body: `{
  "warehouse": "mashhad-main",
  "items": [
    { "external_id": "WMS-10042", "stock_cartons": 340 },
    { "barcode": "6260100300214", "stock_cartons": 0 }
  ]
}`,
        response: `{ "updated": 2, "not_found": [] }`,
      },
      {
        id: 'get-stock', method: 'GET', path: '/inventory', scope: 'inventory:read',
        title: { fa: 'خواندن موجودی', en: 'Read stock levels' },
        d: { fa: 'موجودی هر کالا در هر انبار، به‌همراه کارتن‌های رزرو شده برای سفارش‌های باز.', en: 'Stock per product and warehouse, including cartons reserved by open orders.' },
        response: `{
  "data": [
    { "product_id": "prd_8Kq2v1", "external_id": "WMS-10042", "warehouse": "mashhad-main", "stock_cartons": 340, "reserved_cartons": 12 }
  ],
  "next_cursor": null
}`,
      },
    ],
  },
  {
    id: 'orders',
    title: { fa: 'سفارش‌ها', en: 'Orders' },
    intro: { fa: 'وضعیت‌ها: submitted (پیش‌فاکتور)، packing (تأیید و بسته‌بندی)، in_transit (در مسیر)، delivered (تحویل‌شده) و cancelled (لغو). مبالغ به تومان و عدد صحیح هستند.', en: 'Statuses: submitted (pro-forma), packing (confirmed, being packed), in_transit, delivered and cancelled. Amounts are whole Toman (IRT).' },
    endpoints: [
      {
        id: 'list-orders', method: 'GET', path: '/orders', scope: 'orders:read',
        title: { fa: 'فهرست سفارش‌ها', en: 'List orders' },
        d: { fa: 'سفارش‌های شرکت پخش شما. برای همگام‌سازی حسابداری، status=delivered و updated_since را با هم بفرستید.', en: 'Your distributor orders. For accounting sync, combine status=delivered with updated_since.' },
        params: [
          { name: 'status', type: 'string', d: { fa: 'یکی از وضعیت‌های بالا؛ با کاما چندتا', en: 'One of the statuses above; comma-separate for several' } },
          { name: 'updated_since', type: 'datetime', d: { fa: 'فقط سفارش‌های تغییرکرده', en: 'Only changed orders' } },
          { name: 'cursor', type: 'string', d: { fa: 'صفحه‌ی بعد', en: 'Next page' } },
        ],
        response: `{\n  "data": [${order.replace(/\n/g, '\n    ')}],\n  "next_cursor": null\n}`,
      },
      {
        id: 'confirm-order', method: 'POST', path: '/orders/{id}/confirm', scope: 'orders:write',
        title: { fa: 'تأیید تعداد و صدور فاکتور', en: 'Confirm quantities and invoice' },
        d: { fa: 'تعداد تأییدشده‌ی هر ردیف را بفرستید (۰ یعنی ناموجود). جمع‌ها و ارزش افزوده دوباره حساب می‌شود، فاکتور رسمی صادر و وضعیت packing می‌شود.', en: 'Send the confirmed count per line (0 = unavailable). Totals and VAT are recalculated, the official invoice is issued and the status becomes packing.' },
        body: `{
  "lines": [
    { "product_id": "prd_8Kq2v1", "cartons_confirmed": 4 }
  ]
}`,
        response: `{ "id": "ord_10428", "status": "packing", "invoice_id": "inv_10428", "totals": { "payable": 12584000, "currency": "IRT" } }`,
      },
      {
        id: 'ship-order', method: 'POST', path: '/orders/{id}/ship', scope: 'orders:write',
        title: { fa: 'ثبت بارگیری', en: 'Mark as loaded' },
        d: { fa: 'بار را به یکی از رانندگان ناوگان شما می‌سپارد و وضعیت را in_transit می‌کند. خریدار پیام «در مسیر» می‌گیرد.', en: 'Assigns the load to one of your fleet drivers and sets in_transit. The buyer is notified.' },
        body: `{ "driver_id": "drv_77" }`,
        response: `{ "id": "ord_10428", "status": "in_transit" }`,
      },
      {
        id: 'cancel-order', method: 'POST', path: '/orders/{id}/cancel', scope: 'orders:write',
        title: { fa: 'لغو سفارش', en: 'Cancel an order' },
        d: { fa: 'سفارشی را که هنوز بارگیری نشده لغو می‌کند. دلیل برای خریدار نمایش داده می‌شود.', en: 'Cancels an order that has not been loaded yet. The reason is shown to the buyer.' },
        body: `{ "reason": "out_of_stock", "note": "تأمین‌کننده موجودی ندارد" }`,
        response: `{ "id": "ord_10428", "status": "cancelled" }`,
      },
    ],
  },
  {
    id: 'invoices',
    title: { fa: 'فاکتورها', en: 'Invoices' },
    intro: { fa: 'فاکتور رسمی با ارزش افزوده که بعد از تأیید سفارش صادر می‌شود. برای ورود به نرم‌افزار حسابداری مناسب است.', en: 'The official VAT invoice issued once an order is confirmed — ready for your accounting software.' },
    endpoints: [
      {
        id: 'get-invoice', method: 'GET', path: '/invoices/{id}', scope: 'invoices:read',
        title: { fa: 'دریافت فاکتور', en: 'Get an invoice' },
        d: { fa: 'ردیف‌ها، مالیات، طرفین و وضعیت پرداخت. نسخه‌ی PDF در /invoices/{id}/pdf.', en: 'Lines, tax, parties and payment status. The PDF is at /invoices/{id}/pdf.' },
        response: `{
  "id": "inv_10428",
  "number": 10428,
  "order_id": "ord_10428",
  "issued_at": "2026-11-20T08:30:11Z",
  "seller": { "name": "پخش ایلیا", "national_id": "14000000000" },
  "buyer": { "name": "سوپرمارکت آفتاب", "external_id": "CRM-883" },
  "lines": [{ "external_id": "WMS-10042", "cartons": 4, "unit_price": 2860000, "discount": 0, "vat": 1144000 }],
  "totals": { "subtotal": 11440000, "vat": 1144000, "payable": 12584000, "currency": "IRT" },
  "payment": { "status": "unpaid", "method": null, "paid_at": null }
}`,
      },
    ],
  },
  {
    id: 'customers',
    title: { fa: 'مشتریان', en: 'Customers' },
    intro: { fa: 'فروشگاه‌هایی که از شما خرید کرده‌اند. برای همگام‌سازی با CRM: سابقه‌ی خرید را بخوانید و گروه‌بندی و سقف اعتبار را از CRM بفرستید.', en: 'Stores that buy from you. To sync with a CRM, read purchase history out and push segments and credit limits in.' },
    endpoints: [
      {
        id: 'list-customers', method: 'GET', path: '/customers', scope: 'customers:read',
        title: { fa: 'فهرست مشتریان', en: 'List customers' },
        d: { fa: 'با آمار خرید هر مشتری.', en: 'With purchase stats for each customer.' },
        response: `{
  "data": [
    {
      "id": "cus_51x",
      "external_id": "CRM-883",
      "name": "سوپرمارکت آفتاب",
      "phone": "+989150000000",
      "city": "Mashhad",
      "segment": "gold",
      "orders_count": 38,
      "total_spent": 1450000000,
      "last_order_at": "2026-11-20T07:52:40Z"
    }
  ],
  "next_cursor": null
}`,
      },
      {
        id: 'upsert-customers', method: 'POST', path: '/customers/bulk', scope: 'customers:write',
        title: { fa: 'به‌روزرسانی گروهی از CRM', en: 'Bulk update from your CRM' },
        d: { fa: 'شناسه‌ی CRM، گروه مشتری (برای تخفیف‌های باشگاه مشتریان) و سقف اعتبار را ثبت کنید. مشتری با شماره موبایل پیدا می‌شود.', en: 'Set your CRM id, segment (for customer-club discounts) and credit limit. Customers are matched by mobile number.' },
        body: `{
  "items": [
    { "phone": "+989150000000", "external_id": "CRM-883", "segment": "gold", "credit_limit": 200000000 }
  ]
}`,
        response: `{ "updated": 1, "not_found": [] }`,
      },
    ],
  },
  {
    id: 'files',
    title: { fa: 'ورود و خروج با فایل', en: 'File import & export' },
    intro: { fa: 'برای وقتی که برنامه‌نویس ندارید یا داده‌ی اولیه زیاد است: فایل اکسل (xlsx) یا CSV با قالب نیلیکس. همین کار از پنل شرکت پخش هم بدون API انجام می‌شود.', en: 'For when you have no developer or a lot of starting data: Excel (xlsx) or CSV in the nilix template. The same is available in the distributor panel without the API.' },
    endpoints: [
      {
        id: 'create-import', method: 'POST', path: '/imports', scope: 'imports:write',
        title: { fa: 'بارگذاری فایل', en: 'Upload a file' },
        d: { fa: 'فایل را با multipart/form-data بفرستید. type یکی از products، inventory یا customers است. پردازش در پس‌زمینه انجام می‌شود و با dry_run=true فقط گزارش خطا می‌گیرید.', en: 'Send the file as multipart/form-data. type is products, inventory or customers. Processing runs in the background; dry_run=true returns only the error report.' },
        params: [
          { name: 'type', type: 'string', req: true, d: { fa: 'products | inventory | customers', en: 'products | inventory | customers' } },
          { name: 'file', type: 'file', req: true, d: { fa: 'xlsx یا csv (UTF-8)، حداکثر ۱۰ مگابایت', en: 'xlsx or csv (UTF-8), up to 10 MB' } },
          { name: 'dry_run', type: 'boolean', d: { fa: 'فقط بررسی، بدون ثبت', en: 'Validate only, save nothing' } },
        ],
        response: `{ "id": "imp_3c1", "status": "processing", "type": "products" }`,
      },
      {
        id: 'get-import', method: 'GET', path: '/imports/{id}', scope: 'imports:write',
        title: { fa: 'نتیجه‌ی بارگذاری', en: 'Import result' },
        d: { fa: 'تعداد ردیف‌های ثبت‌شده و خطای هر ردیف با شماره‌ی سطر فایل.', en: 'Rows saved and each row error with its line number.' },
        response: `{
  "id": "imp_3c1",
  "status": "completed",
  "rows": 1240, "created": 1180, "updated": 52,
  "errors": [{ "row": 17, "field": "compliance.irc", "message": "IRC must be 16 digits" }]
}`,
      },
      {
        id: 'create-export', method: 'GET', path: '/exports', scope: 'exports:read',
        title: { fa: 'خروجی گرفتن', en: 'Export data' },
        d: { fa: 'سفارش‌ها، فاکتورها، دفاتر حسابداری، کالاها یا مشتریان در بازه‌ی دلخواه، به صورت xlsx یا csv.', en: 'Orders, invoices, ledgers, products or customers for any date range, as xlsx or csv.' },
        params: [
          { name: 'type', type: 'string', req: true, d: { fa: 'orders | invoices | ledger | products | customers', en: 'orders | invoices | ledger | products | customers' } },
          { name: 'from, to', type: 'date', d: { fa: 'بازه‌ی زمانی', en: 'Date range' } },
          { name: 'format', type: 'string', d: { fa: 'xlsx (پیش‌فرض) یا csv', en: 'xlsx (default) or csv' } },
        ],
        response: `{ "url": "https://files.nilix.co/exports/exp_91a.xlsx", "expires_at": "2026-11-20T09:30:00Z" }`,
      },
    ],
  },
];

export const EVENTS: { name: string; d: Pair }[] = [
  { name: 'order.submitted', d: { fa: 'پیش‌فاکتور جدید ثبت شد', en: 'A new pro-forma was submitted' } },
  { name: 'order.confirmed', d: { fa: 'تعدادها تأیید و فاکتور صادر شد', en: 'Quantities confirmed and invoiced' } },
  { name: 'order.in_transit', d: { fa: 'بار تحویل راننده شد', en: 'Handed to a driver' } },
  { name: 'order.delivered', d: { fa: 'تحویل با QR تأیید شد', en: 'Delivery confirmed by QR' } },
  { name: 'order.cancelled', d: { fa: 'سفارش لغو شد', en: 'Order cancelled' } },
  { name: 'invoice.paid', d: { fa: 'پرداخت فاکتور ثبت شد', en: 'Invoice payment recorded' } },
  { name: 'product.low_stock', d: { fa: 'موجودی کالا از حد تعیین‌شده کمتر شد', en: 'Stock fell below your threshold' } },
  { name: 'customer.created', d: { fa: 'فروشگاه تازه‌ای اولین خرید را انجام داد', en: 'A new store placed its first order' } },
];

export const ERRORS: { code: string; http: number; d: Pair }[] = [
  { code: 'unauthorized', http: 401, d: { fa: 'کلید API نیست یا نامعتبر است', en: 'Missing or invalid API key' } },
  { code: 'forbidden', http: 403, d: { fa: 'کلید این دسترسی (scope) را ندارد', en: 'The key lacks this scope' } },
  { code: 'not_found', http: 404, d: { fa: 'شناسه پیدا نشد', en: 'No such id' } },
  { code: 'validation_failed', http: 422, d: { fa: 'داده نادرست است؛ جزئیات در details', en: 'Invalid data; see details' } },
  { code: 'conflict', http: 409, d: { fa: 'وضعیت سفارش اجازه‌ی این کار را نمی‌دهد', en: 'The order status does not allow this' } },
  { code: 'rate_limited', http: 429, d: { fa: 'تعداد درخواست بیش از حد؛ Retry-After را ببینید', en: 'Too many requests; see Retry-After' } },
  { code: 'server_error', http: 500, d: { fa: 'خطای سرور؛ دوباره تلاش کنید', en: 'Server error; retry' } },
];

export const SCOPES = ['products:read', 'products:write', 'inventory:read', 'inventory:write', 'orders:read', 'orders:write', 'invoices:read', 'customers:read', 'customers:write', 'imports:write', 'exports:read', 'webhooks:manage'];
