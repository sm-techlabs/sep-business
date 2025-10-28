import { z } from 'zod';

const createHiringOrOutsourcingRequestSchema = z.object({
    contractType: z.enum(['Full Time', 'Part Time']),
    jobTitle: z.string().min(1),
    minYearsOfExperience: z.number().min(0),
    jobDescription: z.string().min(1),
}).strict();

export { createHiringOrOutsourcingRequestSchema };
