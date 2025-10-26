// Centralized RBAC rules
export default {
  admin: {
    can: ["*"], // full access
  },
  manager: {
    can: [
      "view:health", 
      "view:clients",
      "create:event-requests",
      "update:team",
    ], // can view all, update team only
  },
  "senior customer service officer": {
    can: [
      "view:event-requests",
      "update:event-requests",
    ]
  },
  staff: {
    can: ["edit:own_profile"],
  },
};