// services/authorization.js
import { verifyToken } from "../utils/jwt.js";
import inferAction from "../utils/inferAction.js";
import rules from "./rules.js";

/**
 * 🧩 Check if a user is authorized for an inferred action.
 * Returns:
 *  - "unauthenticated" if no/invalid token
 *  - true if authorized
 *  - false if authenticated but forbidden
 */
function isAuthorized(cookie, req) {
  if (!cookie?.token) return "unauthenticated";

  const payload = verifyToken(cookie.token);
  if (!payload) return "unauthenticated";

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
  if (
    roleRules.can.includes(`${verb}:*`) ||
    roleRules.can.includes(`*:${resource}`)
  ) {
    return true;
  }

  return false;
}

/**
 * Express middleware that enforces RBAC authorization.
 * - 401 if unauthenticated
 * - 403 if forbidden
 */
export function authorize(req, res, next) {
  const result = isAuthorized(req.cookies, req);

  if (result === "unauthenticated") {
    return res.status(401).json({ error: "Unauthorized: please log in." });
  }

  if (result === false) {
    return res.status(403).json({ error: "Forbidden: insufficient permissions." });
  }

  // ✅ Authorized — allow the request to continue
  next();
}
