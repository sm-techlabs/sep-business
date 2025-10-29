import { z } from 'zod';
import { TASK_PRIORITIES, TASK_STATUSES } from '../constants/enums.js';

const createTaskSchema = z.object({
    startsOn: z.coerce.date(),
    endsOn: z.coerce.date(),
    title: z.string().min(1),
    description: z.string().min(1),
    comments: z.string().optional(),
    priority: z.enum(TASK_PRIORITIES),
    applicationId: z.number().int().positive(),
    subteamId: z.number().int().positive(),
}).refine(
    (data) => data.endsOn >= data.startsOn,
    { message: 'endsOn must be on or after startsOn', path: ['endsOn'] }
).strict();

const updateTaskSchema = z.object({
    startsOn: z.coerce.date(),
    endsOn: z.coerce.date(),
    title: z.string().min(1),
    description: z.string().min(1),
    comments: z.string(),
    priority: z.enum(TASK_PRIORITIES),
    applicationId: z.number().int().positive(),
    subteamId: z.number().int().positive().optional(),
    applicationId: z.number().int().positive().optional(),
    assignedToId: z.number().int().positive().optional(),
}).refine(
    (data) => data.endsOn >= data.startsOn,
    { message: 'endsOn must be on or after startsOn', path: ['endsOn'] }
).strict();

export { createTaskSchema, updateTaskSchema };
