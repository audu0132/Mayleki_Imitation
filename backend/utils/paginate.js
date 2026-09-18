// Pagination helper
const paginate = (query, page = 1, limit = 10) => ({ skip: (page - 1) * limit, limit: parseInt(limit), page: parseInt(page) });
module.exports = paginate;
