// Parsed, sanitized values land on req.valid; controllers should read from there, never the raw request.
const validate = (schemas) => (req, res, next) => {
  req.valid = req.valid ?? {};

  for (const part of ["params", "query", "body"]) {
    if (!schemas[part]) continue;

    const result = schemas[part].safeParse(req[part] ?? {});
    if (!result.success) {
      const issues = result.error.issues.map((issue) => ({
        field: issue.path.join(".") || part,
        message: issue.message,
      }));
      return res.status(400).json({ error: issues[0].message, details: issues });
    }
    req.valid[part] = result.data;
  }

  next();
};

export default validate;
