import express from 'express'
import { ProblemDocument } from 'http-problem-details'

const registerExpressProblemJsonResponse = (): void => {
  express.response.httpProblemJSON = function(
    problemDocument: ProblemDocument
  ): void {
    this.set('Content-Type', 'application/problem+json')
    this.status(problemDocument.status)
    this.send(problemDocument)
  }
}

import { NextFunction, Request, Response } from 'express'

const GlobalRequestErrorHandler = (logger: any) => {
  return (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    logger.error(`${req.method} ${req.url} Error: ${err}`, { error: err })
    if (!res.headersSent) {
      return res.httpProblemJSON(
        new ProblemDocument({ status: 500, type: 'https://tempuri.org/error' })
      )
    } else {
      logger.warn(
        `[global-request-error-handler] ${req.method} ${req.url} has an error path returning a response already`
      )
    }
  }
}

export { registerExpressProblemJsonResponse, GlobalRequestErrorHandler }
