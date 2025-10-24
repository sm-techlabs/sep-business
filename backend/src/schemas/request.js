import { z } from 'zod';

// Common request fields
const baseRequestSchema = z.object({
	eventType: z.string().min(1),
	startsOn: z.coerce.date(),
	endsOn: z.coerce.date(),
	estimatedBudget: z.number().nonnegative(),
	expectedNumberOfAttendees: z.number().int().nonnegative(),
	preferences: z.object({
        decorations: z.boolean(),
        parties: z.boolean(),
        photosOrFilming: z.boolean(),
        breakfastLunchDinner: z.boolean(),
        softHotDrinks: z.boolean(),
    }),
}).strict();

// Unregistered client request body (inline identity fields)
export const nonRegisteredRequestSchema = baseRequestSchema.extend({
	name: z.string().min(1),
	email: z.email(),
	businessCode: z.string().min(1),
	address: z.string().min(1),
}).refine(
	(data) => data.endsOn >= data.startsOn,
	{ message: 'endsOn must be on or after startsOn', path: ['endsOn'] }
).strict();

// Registered client request body (references existing client by recordNumber)
export const registeredRequestSchema = baseRequestSchema.extend({
	recordNumber: z.number().int().positive(),
}).refine(
	(data) => data.endsOn >= data.startsOn,
	{ message: 'endsOn must be on or after startsOn', path: ['endsOn'] }
).strict();

// Optional helpers to use inside routes
export const validateUnregisteredRequest = (body) => nonRegisteredRequestSchema.parse(body);
export const validateRegisteredRequest = (body) => registeredRequestSchema.parse(body);
