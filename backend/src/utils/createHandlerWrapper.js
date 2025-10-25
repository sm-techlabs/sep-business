import { AppError } from "./errors.js";

const createHandlerWrapper = (handler) => {
  return async (req, res) => {
    try {
      const data = await handler(req, res);
      res.status(200).json(data);
    } catch (err) {
      console.error(err);

      // If it’s one of our known error types
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }

      // Fallback for unexpected errors
      res.status(500).json({
        message: "Internal Server Error: " + err,
      });
    }
  };
};

export default createHandlerWrapper;