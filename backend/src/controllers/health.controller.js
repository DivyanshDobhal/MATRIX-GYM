class HealthController {
  /**
   * Get server health metrics
   */
  checkHealth = async (req, res, next) => {
    try {
      const healthInfo = {
        success: true,
        status: 'OK',
        uptime: `${Math.floor(process.uptime())}s`,
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      };

      res.status(200).json(healthInfo);
    } catch (error) {
      next(error);
    }
  };
}

export default new HealthController();
