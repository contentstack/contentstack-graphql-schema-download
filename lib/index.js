import path from 'path'
import { config } from './config'
import { HttpLink } from 'apollo-link-http'
import {
  introspectSchema,
  makeRemoteExecutableSchema
} from 'apollo-server'
import { introspectionFromSchema } from 'graphql'
import { mergeSchemas } from 'graphql-tools'
import { writeFileSync } from 'mz/fs'

var fetch = require('node-fetch')
const graphqlApis = `https://${config.host}/stacks/${config.api_key}?environment=${config.environment}`

var limit = 100
console.log('Loading Contentstack Schema Stiching')

const getIntrospectSchema = async (link) => {
  return introspectSchema(link)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

const fetchSchemas = async () => {
  var schemas = []
  var skip = 0
  while (skip < config.contentTypes) {
    console.log(`Fetching ${skip + config.limit} of ${config.contentTypes} Content Types.`)
    const link = new HttpLink({
      uri: `${graphqlApis}&limit=${config.limit}&skip=${skip}`,
      headers: {
        access_token: config.deliveryToken
      },
      fetch
    })

    var remoteSchema = await getIntrospectSchema(link)
    const remoteExecutableSchema = makeRemoteExecutableSchema({
      schema: remoteSchema,
      link
    })
    schemas.push(remoteExecutableSchema)
    skip += config.limit
  }
  console.log(`Content Types ${config.contentTypes} schema loaded.`)

  const schema = mergeSchemas({
    schemas
  })

  console.log(`Saving scema to ${config.fileName}`)
  const pathForScehma = path.join(__dirname, `${config.fileName}`)
  writeFileSync(
    pathForScehma,
    JSON.stringify(introspectionFromSchema(schema), null, 2)
  )
}

fetchSchemas()
  .catch((err) => {
    console.error(err.result)
  })
