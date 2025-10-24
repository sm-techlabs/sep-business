/**
* Infers action from request method and path.
* Returns a string like "view:health" or "update:employees".
**/
export default function inferAction(req) {
  // Example: /api/health → "view:health"
  // Example: /api/employees → "read:employees" (depending on method)
  
  const pathParts = req.baseUrl.replace(/^\/api\//, '').split('/');
  const resource = pathParts[0] || 'unknown';

  let verb;
  switch (req.method) {
    case 'GET': verb = 'view'; break;
    case 'POST': verb = 'create'; break;
    case 'PUT':
    case 'PATCH': verb = 'update'; break;
    case 'DELETE': verb = 'delete'; break;
    default: verb = 'unknown';
  }

  return `${verb}:${resource}`;
}
