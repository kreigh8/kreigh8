import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import fs from 'fs'
import fsPromises from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const logEvents = async (message, logfileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logfileName), logItem)
  } catch (error) {
    console.log(error)
  }
}

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`,  'reqLog.log')
  console.log(`${req.method} ${req.path}`)
  next()
}

export {
  logger,
  logEvents
}
