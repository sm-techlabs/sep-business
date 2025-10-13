import type { Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import type RequestTemplate from './RequestTemplate';

// Scoped view of RequestTemplate; expose the same shape for IntelliSense
export default interface RegisteredClientRequest
  extends Model<InferAttributes<RequestTemplate>, InferCreationAttributes<RequestTemplate>> {}

declare module '../models/RegisteredClientRequest.js' {
  import RegisteredClientRequest from './RegisteredClientRequest';
  export default RegisteredClientRequest;
}
