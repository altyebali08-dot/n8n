# دار المخازن - Dar Al-Makhazin

منصة سحابية متكاملة لإدارة المخازن والمخزون للسوق السوداني

## نظرة عامة

دار المخازن هي منصة SaaS احترافية لإدارة المخازن والمخزون، مصممة خصيصاً للسوق السوداني.
تدعم المنصة إدارة مخازن متعددة، تتبع حركة المخزون، فواتير البيع والشراء، والتقارير التحليلية.

## المميزات الرئيسية

- **تصميم عربي أولاً (RTL)** - واجهة مستخدم عربية احترافية
- **إدارة مخازن متعددة** - دعم غير محدود للمخازن والفروع
- **تتبع المخزون** - رصد حركة المخزون في الوقت الفعلي
- **فواتير وأوامر شراء** - إنشاء وطباعة فواتير احترافية
- **تقارير وتحليلات** - لوحات بيانات تفاعلية وتقارير شاملة
- **تنبيهات ذكية** - تنبيهات نقص المخزون وانتهاء الصلاحية
- **دفع محلي** - دعم بنكك، فوري، أو-كاش، إي-كاش
- **أمان متقدم** - تشفير، JWT، RBAC، عزل المستأجرين
- **متعدد المستأجرين** - عزل كامل لبيانات كل عميل

## التقنيات المستخدمة

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI (shadcn/ui pattern)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (jose) with refresh tokens
- **Charts**: Recharts
- **State Management**: Zustand
- **Validation**: Zod
- **Icons**: Lucide React

## الهيكل

```
dar-al-makhazin/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── (public)/          # Public website pages
│   │   │   ├── page.tsx       # Home/landing
│   │   │   ├── features/
│   │   │   ├── pricing/
│   │   │   ├── how-it-works/
│   │   │   ├── about/
│   │   │   ├── faq/
│   │   │   ├── contact/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── subscribe/
│   │   │   ├── terms/
│   │   │   └── privacy/
│   │   ├── dashboard/         # Client dashboard
│   │   │   ├── page.tsx       # KPI dashboard
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── warehouses/
│   │   │   ├── suppliers/
│   │   │   ├── customers/
│   │   │   ├── purchases/
│   │   │   ├── sales/
│   │   │   ├── stock-movements/
│   │   │   ├── transfers/
│   │   │   ├── returns/
│   │   │   ├── expiry/
│   │   │   ├── alerts/
│   │   │   ├── reports/
│   │   │   ├── users/
│   │   │   ├── notifications/
│   │   │   └── subscription/
│   │   ├── admin/             # Platform admin dashboard
│   │   │   ├── page.tsx
│   │   │   ├── clients/
│   │   │   ├── subscriptions/
│   │   │   ├── payments/
│   │   │   ├── analytics/
│   │   │   ├── revenue/
│   │   │   ├── announcements/
│   │   │   ├── plans/
│   │   │   ├── tickets/
│   │   │   ├── audit-logs/
│   │   │   ├── settings/
│   │   │   └── content/
│   │   └── api/               # API routes
│   │       ├── auth/
│   │       ├── dashboard/
│   │       ├── admin/
│   │       └── health/
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── layout/            # Layout components
│   │   └── dashboard/         # Dashboard components
│   ├── lib/                   # Utilities
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   ├── validations.ts
│   │   ├── constants.ts
│   │   ├── utils.ts
│   │   ├── rate-limit.ts
│   │   ├── audit.ts
│   │   └── api-helpers.ts
│   ├── store/                 # Zustand stores
│   │   ├── auth-store.ts
│   │   └── ui-store.ts
│   └── middleware.ts          # Auth & security middleware
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## التشغيل

### المتطلبات
- Node.js >= 18
- PostgreSQL
- pnpm / npm / yarn

### التثبيت

```bash
cd dar-al-makhazin
npm install

# إعداد قاعدة البيانات
cp .env.example .env
# عدّل ملف .env بإعدادات قاعدة البيانات الخاصة بك

npx prisma generate
npx prisma db push

# التشغيل
npm run dev
```

### الاشتراك والدفع
- السعر السنوي: 150,000 ج.س
- طرق الدفع: بنكك، فوري، أو-كاش، إي-كاش، تحويل بنكي
- العميل يرفع إثبات الدفع → المسؤول يراجع ويفعّل الاشتراك

## الأمان

- تشفير كلمات المرور (bcrypt)
- JWT مع refresh tokens
- صلاحيات متعددة المستويات (RBAC)
- عزل المستأجرين (Tenant Isolation)
- التحقق من المدخلات (Zod)
- حماية من XSS وCSRF
- Rate limiting
- رؤوس أمان HTTP
- سجل عمليات (Audit Log)
- دعم 2FA للمسؤولين
