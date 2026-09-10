/**
 * Standardized API response format helpers for Mayleki backend
 */

export const successResponse = (res, data, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res, message = "Server Error", statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
  };
  if (errors) response.errors = errors;
  return res.status(statusCode).json(response);
};

export const paginatedResponse = (res, items, page = 1, limit = 10, total = 0, message = "Success") => {
  return res.status(200).json({
    success: true,
    message,
    pagination: {
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit) || 1,
      totalItems: total,
      itemsPerPage: Number(limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
    data: items,
  });
};
