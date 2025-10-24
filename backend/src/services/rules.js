// Centralized RBAC rules
export default {
  admin: {
    can: ["*"], // full access
  },
  manager: {
    can: [
      "view:health", 
      "view:clients",
      "create:requests",
      "update:team",
    ], // can view all, update team only
  },
  staff: {
    can: ["edit:own_profile"],
  },
};