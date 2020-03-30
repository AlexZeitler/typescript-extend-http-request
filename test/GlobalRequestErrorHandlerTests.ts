import { GlobalRequestErrorHandler } from '../src'
import express from 'express'
import * as should from 'should'
import { ProblemDocument } from 'http-problem-details'
require('should')

class Logger {
  message: string
  warn(message: string): void {
    this.message = message
  }
}
describe('GlobalRequestErrorHandler', (): void => {
  describe('when express returns an error', (): void => {
    const app = express()
    app.get('/', (req, res) => {
      res.httpProblemJSON(new ProblemDocument({}))
    })
    app.use(GlobalRequestErrorHandler(new Logger()))
    app.listen(3000)
    it.only('should send error response', done => {
      done()
    })
  })
})
