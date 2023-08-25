class APIResponse {
  sendSuccessResponse(res, data, message = "Success", status = 200) {
    res.status(status).json({ success: true, message, data });
  }

  sendErrorResponse(res, error, message = "An error occurred", status = 500) {
    console.error("Error:", error);
    res.status(status).json({ success: false, message, error });
  }
}

export const apiResponse = new APIResponse();
