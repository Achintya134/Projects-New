const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;
const skip = (page - 1) * limit;
result = result.skip(skip).limit(limit);