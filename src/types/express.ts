declare global {
  namespace Express {
    interface Request {
      user: {
        userID: any,
        username: string
      };
    }
  }
}

export default {}