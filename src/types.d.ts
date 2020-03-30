import { ProblemDocument } from 'http-problem-details'

declare global {
  namespace Express {
    interface Response {
      httpProblemJSON(problemDocument: ProblemDocument): void
    }
  }
}
