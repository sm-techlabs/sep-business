// Centralized RBAC rules
export default {
  admin: {
    can: ["*"], // full access
  },
  "customer service officer": {
    can: [
      "view:clients",
      "view:event-requests",
      "create:event-requests",
      "update:event-requests",
    ],
  },
  "senior customer service officer": {
    can: [
      "view:clients",
      "*:event-requests",
    ]
  },
};