export const APP_NAME = 'دار المخازن';
export const APP_NAME_EN = 'Dar Al-Makhazin';
export const APP_DESCRIPTION = 'منصة سحابية متكاملة لإدارة المخازن والمخزون';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const SUBSCRIPTION_PRICE = 150000;
export const SUBSCRIPTION_CURRENCY = 'SDG';
export const SUBSCRIPTION_PERIOD = 'yearly';

export const PAYMENT_METHODS = [
  { id: 'bankak', name: 'بنكك', icon: '🏦' },
  { id: 'fawry', name: 'فوري', icon: '💳' },
  { id: 'ocash', name: 'أو-كاش', icon: '📱' },
  { id: 'ecash', name: 'إي-كاش', icon: '💰' },
  { id: 'bank_transfer', name: 'تحويل بنكي مباشر', icon: '🏧' },
] as const;

export const USER_ROLES = {
  PLATFORM_ADMIN: 'PLATFORM_ADMIN',
  TENANT_OWNER: 'TENANT_OWNER',
  TENANT_ADMIN: 'TENANT_ADMIN',
  TENANT_MANAGER: 'TENANT_MANAGER',
  TENANT_STAFF: 'TENANT_STAFF',
} as const;

export const SUBSCRIPTION_STATUS = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
  SUSPENDED: 'SUSPENDED',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export const STOCK_MOVEMENT_TYPES = {
  IN: 'IN',
  OUT: 'OUT',
  TRANSFER: 'TRANSFER',
  ADJUSTMENT: 'ADJUSTMENT',
  RETURN: 'RETURN',
} as const;

export const NAV_ITEMS = {
  client: [
    { label: 'لوحة التحكم', href: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'المنتجات', href: '/dashboard/products', icon: 'Package' },
    { label: 'التصنيفات', href: '/dashboard/categories', icon: 'Tags' },
    { label: 'المخازن', href: '/dashboard/warehouses', icon: 'Warehouse' },
    { label: 'الموردين', href: '/dashboard/suppliers', icon: 'Truck' },
    { label: 'العملاء', href: '/dashboard/customers', icon: 'Users' },
    { label: 'أوامر الشراء', href: '/dashboard/purchases', icon: 'ShoppingCart' },
    { label: 'فواتير البيع', href: '/dashboard/sales', icon: 'Receipt' },
    { label: 'حركة المخزون', href: '/dashboard/stock-movements', icon: 'ArrowLeftRight' },
    { label: 'التحويلات', href: '/dashboard/transfers', icon: 'Repeat' },
    { label: 'المرتجعات', href: '/dashboard/returns', icon: 'RotateCcw' },
    { label: 'تتبع الصلاحية', href: '/dashboard/expiry', icon: 'Calendar' },
    { label: 'التنبيهات', href: '/dashboard/alerts', icon: 'Bell' },
    { label: 'التقارير', href: '/dashboard/reports', icon: 'BarChart3' },
    { label: 'المستخدمين', href: '/dashboard/users', icon: 'UserCog' },
    { label: 'الإشعارات', href: '/dashboard/notifications', icon: 'BellRing' },
    { label: 'الاشتراك', href: '/dashboard/subscription', icon: 'CreditCard' },
  ],
  admin: [
    { label: 'لوحة التحكم', href: '/admin', icon: 'LayoutDashboard' },
    { label: 'إدارة العملاء', href: '/admin/clients', icon: 'Building2' },
    { label: 'الاشتراكات', href: '/admin/subscriptions', icon: 'CreditCard' },
    { label: 'المدفوعات', href: '/admin/payments', icon: 'Wallet' },
    { label: 'تحليلات المنصة', href: '/admin/analytics', icon: 'TrendingUp' },
    { label: 'الإيرادات', href: '/admin/revenue', icon: 'DollarSign' },
    { label: 'الإعلانات', href: '/admin/announcements', icon: 'Megaphone' },
    { label: 'الخطط', href: '/admin/plans', icon: 'Layers' },
    { label: 'تذاكر الدعم', href: '/admin/tickets', icon: 'LifeBuoy' },
    { label: 'سجل العمليات', href: '/admin/audit-logs', icon: 'ScrollText' },
    { label: 'إعدادات النظام', href: '/admin/settings', icon: 'Settings' },
    { label: 'إدارة المحتوى', href: '/admin/content', icon: 'FileText' },
  ],
} as const;

export const FEATURES = [
  {
    title: 'إدارة مخازن متعددة',
    description: 'تتبع المخزون عبر عدة مخازن وفروع بكل سهولة ودقة',
    icon: 'Warehouse',
  },
  {
    title: 'تتبع حركة المخزون',
    description: 'رصد كل حركة دخول وخروج وتحويل بين المخازن في الوقت الفعلي',
    icon: 'ArrowLeftRight',
  },
  {
    title: 'فواتير وأوامر شراء',
    description: 'إنشاء فواتير بيع وأوامر شراء احترافية بضغطة زر',
    icon: 'Receipt',
  },
  {
    title: 'تنبيهات ذكية',
    description: 'تنبيهات فورية لنقص المخزون وقرب انتهاء الصلاحية',
    icon: 'Bell',
  },
  {
    title: 'تقارير وتحليلات',
    description: 'تقارير شاملة ولوحات بيانات تفاعلية لاتخاذ قرارات أفضل',
    icon: 'BarChart3',
  },
  {
    title: 'إدارة الموردين والعملاء',
    description: 'قاعدة بيانات متكاملة للموردين والعملاء مع سجل التعاملات',
    icon: 'Users',
  },
  {
    title: 'أمان متقدم',
    description: 'تشفير البيانات وصلاحيات متعددة المستويات لحماية معلوماتك',
    icon: 'Shield',
  },
  {
    title: 'دعم الدفع المحلي',
    description: 'دعم كامل لطرق الدفع السودانية: بنكك، فوري، أو-كاش وغيرها',
    icon: 'CreditCard',
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'أحمد محمد',
    role: 'مدير مخازن - شركة النيل للتجارة',
    content: 'منصة دار المخازن غيرت طريقة إدارتنا للمخزون بالكامل. أصبح كل شيء منظم وواضح.',
    avatar: 'أم',
  },
  {
    name: 'فاطمة عبدالله',
    role: 'صاحبة صيدلية الشفاء',
    content: 'تتبع صلاحية الأدوية أصبح سهلاً جداً. لم نعد نخسر منتجات منتهية الصلاحية.',
    avatar: 'فع',
  },
  {
    name: 'خالد إبراهيم',
    role: 'مدير عمليات - مجموعة البركة',
    content: 'إدارة 5 مخازن من مكان واحد كانت حلماً. الآن أصبحت حقيقة مع دار المخازن.',
    avatar: 'خإ',
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'ما هي منصة دار المخازن؟',
    answer: 'دار المخازن هي منصة سحابية متكاملة لإدارة المخازن والمخزون، مصممة خصيصاً للسوق السوداني. تتيح لك إدارة منتجاتك ومخازنك وفواتيرك من أي مكان.',
  },
  {
    question: 'كم تكلفة الاشتراك؟',
    answer: 'الاشتراك السنوي بسعر 150,000 جنيه سوداني فقط، يشمل جميع المميزات والتحديثات والدعم الفني.',
  },
  {
    question: 'ما هي طرق الدفع المتاحة؟',
    answer: 'ندعم جميع طرق الدفع المحلية: بنكك، فوري، أو-كاش، إي-كاش، والتحويل البنكي المباشر.',
  },
  {
    question: 'هل يمكنني إدارة أكثر من مخزن؟',
    answer: 'نعم! يمكنك إدارة عدد غير محدود من المخازن والفروع من حساب واحد، مع تتبع التحويلات بينها.',
  },
  {
    question: 'هل بياناتي آمنة؟',
    answer: 'نعم، نستخدم أحدث تقنيات التشفير وحماية البيانات. كل عميل لديه بيئة معزولة تماماً عن العملاء الآخرين.',
  },
  {
    question: 'هل يوجد دعم فني؟',
    answer: 'نعم، فريق الدعم الفني متاح لمساعدتك عبر نظام التذاكر داخل المنصة والبريد الإلكتروني.',
  },
  {
    question: 'هل يمكنني تصدير التقارير؟',
    answer: 'نعم، يمكنك تصدير جميع التقارير بصيغة PDF أو Excel بضغطة زر واحدة.',
  },
  {
    question: 'هل هناك فترة تجريبية؟',
    answer: 'نعم، نوفر فترة تجريبية مجانية لمدة 14 يوم لتجربة جميع مميزات المنصة قبل الاشتراك.',
  },
] as const;
