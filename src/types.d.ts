import { ProblemDocument } from 'http-problem-details'

declare global {
  namespace Express {
    interface Request {
      httpProblemJSON(problemDocument: ProblemDocument): void
    }
  }
}