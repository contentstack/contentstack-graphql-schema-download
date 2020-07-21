import path from 'path'
import { config } from './config'
import { introspectionFromSchema, print } from 'graphql'
import {
  mergeSchemas,
  makeRemoteExecutableSchema,
  loadSchema,
  UrlLoader
} from 'graphql-tools'
import { writeFileSync } from 'mz/fs'

var fetch = require('node-fetch')
const graphqlApis = `https://${config.host}/stacks/${config.api_key}?environment=${config.environment}`

var limit = 100
console.log('Loading Contentstack Schema download')

const fetchSchemas = async () => {
  var schemas = []
  var skip = 0
  while (skip < config.contentTypes) {
    console.log(`Fetching ${config.contentTypes > limit ? skip + limit : config.contentTypes} of ${config.contentTypes} Content Types.`)

    const url = `${graphqlApis}&limit=${limit}&skip=${skip}`

    // Fetch Remote Schema with loadSchema methid
    const remoteSchema = await loadSchema(url, {
      headers: {
        access_token: config.deliveryToken
      },
      loaders: [
        new UrlLoader()
      ]
    })

    // Create executer for schema
    const executor = async ({ document, variables }) => {
      const query = print(document)
      console.log(variables)
      console.log(document)
      const fetchC = await fetch(url,
        {
          method: 'POST',
          headers: {
            access_token: config.deliveryToken
          },
          body: JSON.stringify({ query, variables })
        })
      return fetchC.json()
    }

    // Make remote Schema Executable with executor
    const remoteExecutableSchema = makeRemoteExecutableSchema({
      schema: remoteSchema,
      executor
    })
    schemas.push(remoteExecutableSchema)
    skip += limit
  }

  console.log(`${config.contentTypes} Content Types schema loaded.`)

  // Merge schemas from loaded schema
  const schema = mergeSchemas({
    schemas
  })

  console.log(`Saving scema to ${config.fileName}`)

  // Write to file
  const pathForScehma = path.join(__dirname, `${config.fileName}`)
  writeFileSync(
    pathForScehma,
    JSON.stringify(introspectionFromSchema(schema), null, 2)
  )
}

fetchSchemas()
  .catch((err) => {
    console.error(err.extensions.errors)
  })
