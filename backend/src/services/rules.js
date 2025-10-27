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
  "financial manager": {
    can: [
      "view:event-requests",
      "view:clients",
      "update:event-requests",

    ]
  },
  "administration manager": {
    can: [
      "view:event-requests",
      "update:event-requests",
    ]
  },
  "production manager": {
    can: [
      "view:tasks",
      "view:applications",
      "view:teams",
      "update:tasks",
    ]
  },
  "service manager": {
    can: [
      "view:tasks",
      "view:applications",
      "view:teams",
      "update:tasks",
    ]
  },

};