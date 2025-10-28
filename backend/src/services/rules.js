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
      "create:budget-adjustment-requests",
      "view:budget-adjustment-requests",
      "update:budget-adjustment-requests",
      "view:applications"
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
      "create:tasks",
      "view:tasks",
      "view:applications",
      "view:teams",
      "update:tasks",
      "*:budget-adjustment-requests",
      "*:recruitment-requests",
    ]
  },
  "service manager": {
    can: [
      "create:tasks",
      "view:tasks",
      "view:applications",
      "view:teams",
      "update:tasks",
      "*:budget-adjustment-requests",
      "*:recruitment-requests",
    ]
  },
  "decorating architect": {
    can: [
      "view:tasks",
      "view:applications",
      "view:teams",
      "update:tasks",
    ]
  },
  "decorating assistant": {
    can: [
      "view:tasks",
      "view:applications",
      "view:teams",
      "update:tasks",
    ]
  },
  "audio engineer": {
    can: [
      "view:health",
      "view:tasks",
      "view:applications",
      "view:teams",
      "update:tasks",
    ]
  },
  "network engineer": {
    can: [
      "view:health",
      "view:tasks",
      "view:applications",
      "view:teams",
      "update:tasks",
    ]
  },
  "photographer": {
    can: [
      "view:health",
      "view:tasks",
      "view:applications",
      "view:teams",
      "update:tasks",
    ]
  },
  "graphic designer": {
    can: [
      "view:health",
      "view:tasks",
      "view:applications",
      "view:teams",
      "update:tasks",
    ]
  },
  "senior hr manager": {
    can: [
      "*:recruitment-requests",
    ]
  },
  "hr assistant": {
    can: [
      "*:recruitment-requests",
    ]
  }
};