// services/authorization.js
import { verifyToken } from "../utils/jwt.js";
import inferAction from "../utils/inferAction.js";

// Centralized RBAC rules
const rules = {
  admin: {
    can: ["*"], // full access
  },
  manager: {
    can: ["view:*", "update:team"], // can view all, update team only
  },
  staff: {
    can: ["edit:own_profile"],
  },
};

/**
 * 🧩 Check if a user is authorized for an inferred action.
 */
export function isAuthorized(cookie, req) {
  if (!cookie?.token) return false;

  const payload = verifyToken(cookie.token);
  if (!payload) return false;

  const role = payload.jobTitle?.toLowerCase();
  const roleRules = rules[role];
  if (!roleRules) return false;

  const action = inferAction(req); // e.g. "view:health"
  const [verb, resource] = action.split(":");

  // 1️⃣ Wildcard: full access
  if (roleRules.can.includes("*")) return true;

  // 2️⃣ Exact match
  if (roleRules.can.includes(action)) return true;

  // 3️⃣ Partial wildcard: e.g., "view:*" or "*:health"
  if (roleRules.can.includes(`${verb}:*`) || roleRules.can.includes(`*:${resource}`)) return true;

  return false;
}

/**
 * Express middleware that enforces RBAC authorization.
 * Automatically infers the action (e.g., "view:health")
 * and sends a 403 if unauthorized.
 */
export function authorize(req, res, next) {
  const allowed = isAuthorized(req.cookies, req);
  if (!allowed) {
    return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
  }

  // ✅ Authorized — allow the request to continue
  next();
}
