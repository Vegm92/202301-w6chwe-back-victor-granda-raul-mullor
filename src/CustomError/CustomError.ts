export class CustomError extends Error {
  code: string;

  constructor(
    message: string,
    public statusCode: number,
    public publucMessage: string
  ) {
    super(message);
  }
}
