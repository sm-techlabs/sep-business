// src/models/RegisteredClientRequest.js
import RequestTemplate from './RequestTemplate.js';

// Scoped view of the same model; inherits all associations and mixins
const RegisteredClientRequest = RequestTemplate.scope('registered');
export default RegisteredClientRequest;
