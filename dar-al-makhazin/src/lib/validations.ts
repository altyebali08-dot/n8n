import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير واحد على الأقل')
    .regex(/[0-9]/, 'يجب أن تحتوي على رقم واحد على الأقل'),
  phone: z.string().min(10, 'رقم الهاتف غير صالح'),
  businessName: z.string().min(2, 'اسم المنشأة مطلوب'),
  businessAddress: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string().min(1, 'اسم المنتج مطلوب'),
  sku: z.string().min(1, 'رمز المنتج مطلوب'),
  barcode: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  unit: z.string().min(1, 'وحدة القياس مطلوبة'),
  minStock: z.number().min(0, 'الحد الأدنى يجب أن يكون 0 أو أكثر'),
  price: z.number().min(0, 'السعر يجب أن يكون 0 أو أكثر'),
  costPrice: z.number().min(0, 'سعر التكلفة يجب أن يكون 0 أو أكثر'),
});

export const warehouseSchema = z.object({
  name: z.string().min(1, 'اسم المخزن مطلوب'),
  address: z.string().optional(),
  phone: z.string().optional(),
  managerId: z.string().optional(),
});

export const supplierSchema = z.object({
  name: z.string().min(1, 'اسم المورد مطلوب'),
  phone: z.string().optional(),
  email: z.string().email('البريد الإلكتروني غير صالح').optional().or(z.literal('')),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export const customerSchema = z.object({
  name: z.string().min(1, 'اسم العميل مطلوب'),
  phone: z.string().optional(),
  email: z.string().email('البريد الإلكتروني غير صالح').optional().or(z.literal('')),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export const purchaseSchema = z.object({
  supplierId: z.string().min(1, 'المورد مطلوب'),
  warehouseId: z.string().min(1, 'المخزن مطلوب'),
  items: z.array(z.object({
    productId: z.string().min(1, 'المنتج مطلوب'),
    quantity: z.number().min(1, 'الكمية يجب أن تكون 1 على الأقل'),
    unitPrice: z.number().min(0, 'السعر يجب أن يكون 0 أو أكثر'),
  })).min(1, 'يجب إضافة منتج واحد على الأقل'),
  notes: z.string().optional(),
});

export const saleSchema = z.object({
  customerId: z.string().optional(),
  warehouseId: z.string().min(1, 'المخزن مطلوب'),
  items: z.array(z.object({
    productId: z.string().min(1, 'المنتج مطلوب'),
    quantity: z.number().min(1, 'الكمية يجب أن تكون 1 على الأقل'),
    unitPrice: z.number().min(0, 'السعر يجب أن يكون 0 أو أكثر'),
  })).min(1, 'يجب إضافة منتج واحد على الأقل'),
  notes: z.string().optional(),
});

export const paymentProofSchema = z.object({
  method: z.enum(['BANKAK', 'FAWRY', 'OCASH', 'ECASH', 'BANK_TRANSFER']),
  notes: z.string().optional(),
});

export const supportTicketSchema = z.object({
  subject: z.string().min(1, 'الموضوع مطلوب'),
  message: z.string().min(10, 'الرسالة يجب أن تكون 10 أحرف على الأقل'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
});

export const categorySchema = z.object({
  name: z.string().min(1, 'اسم التصنيف مطلوب'),
  description: z.string().optional(),
  parentId: z.string().optional(),
});

export const transferSchema = z.object({
  fromWarehouseId: z.string().min(1, 'مخزن المصدر مطلوب'),
  toWarehouseId: z.string().min(1, 'مخزن الوجهة مطلوب'),
  items: z.array(z.object({
    productId: z.string().min(1, 'المنتج مطلوب'),
    quantity: z.number().min(1, 'الكمية يجب أن تكون 1 على الأقل'),
  })).min(1, 'يجب إضافة منتج واحد على الأقل'),
  notes: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type WarehouseInput = z.infer<typeof warehouseSchema>;
export type SupplierInput = z.infer<typeof supplierSchema>;
export type CustomerInput = z.infer<typeof customerSchema>;
export type PurchaseInput = z.infer<typeof purchaseSchema>;
export type SaleInput = z.infer<typeof saleSchema>;
export type PaymentProofInput = z.infer<typeof paymentProofSchema>;
export type SupportTicketInput = z.infer<typeof supportTicketSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type TransferInput = z.infer<typeof transferSchema>;
