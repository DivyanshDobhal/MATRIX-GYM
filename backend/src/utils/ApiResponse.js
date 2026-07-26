/**
 * Standard ApiResponse format for MATRIX Gym Backend
 */
class ApiResponse {
  constructor(statusCode, data = {}, message = 'Success') {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  send(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data
    });
  }
}

export default ApiResponse;
