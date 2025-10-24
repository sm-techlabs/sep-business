import { z } from 'zod';

/**
 * Validate req.body against a provided Zod schema.
 * - Returns true when validation passes.
 * - Returns false when validation fails and attaches a readable error on req.validationError.
 * - On success, replaces req.body with the parsed (coerced/sanitized) data.
 *
 * @param {import('express').Request} req
 * @param {z.ZodSchema<any>} schema
 * @returns {boolean}
 */
export function validateRequest(req, schema) {
	try {
		const parsed = schema.parse(req.body);
		// Use the sanitized, coerced values downstream
		req.body = parsed;
		// Clear any previous error
		if (req.validationError) delete req.validationError;
		return true;
	} catch (err) {
		// Store a compact, readable error summary on the request for the handler to inspect
		req.validationError = formatZodError(err);
		return false;
	}
}

/**
 * Convert a ZodError (or generic Error) to a concise JSON-friendly shape
 * @param {unknown} err
 */
function formatZodError(err) {
	// ZodError shape
	if (err && typeof err === 'object' && 'issues' in err && Array.isArray(err.issues)) {
		return {
			message: 'Validation failed',
			issues: err.issues.map((i) => ({
				path: Array.isArray(i.path) ? i.path.join('.') : String(i.path ?? ''),
				message: i.message,
				code: i.code,
			})),
		};
	}
	// Fallback
	return { message: err instanceof Error ? err.message : 'Validation error' };
}

/**
 * Optional convenience: build an Express middleware that validates and short-circuits with 400.
 * Not required by the ask, but handy if you want plug-and-play usage.
 *
 * @param {z.ZodSchema<any>} schema
 */
export function validateMiddleware(schema) {
	return (req, res, next) => {
		if (validateRequest(req, schema)) return next();
		return res.status(400).json({
            error: {
                type: 'ValidationError',
                details: req.validationError,
            }
        });
	};
}
