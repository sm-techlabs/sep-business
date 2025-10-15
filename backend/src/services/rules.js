// Centralized RBAC rules
export default {
  admin: {
    can: ["*"], // full access
  },
  manager: {
    can: ["view:health", "update:team"], // can view all, update team only
  },
  staff: {
    can: ["edit:own_profile"],
  },
};