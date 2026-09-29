import mongoose from "mongoose";

export const notFound = (req, res) => {
  res.status(404).json({ error: "Not found" });
};

// Express identifies error handlers by their four-argument signature.
export const errorHandler = (err, req, res, next) => {
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Malformed JSON body" });
  }
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ error: "Request body too large" });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ error: "Invalid identifier" });
  }

  console.error(`Unhandled error on ${req.method} ${req.path}:`, err);
  res.status(500).json({ error: "Internal server error" });
};
