import { z } from 'zod';

const createBudgetAdjustmentRequestSchema = z.object({
    applicationId: z.number().int().positive(),
    requiredAmount: z.number().int().positive(),
    reason: z.string().min(1),
}).strict();

export { createBudgetAdjustmentRequestSchema };
