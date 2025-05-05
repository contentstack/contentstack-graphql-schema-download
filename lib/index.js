import fetch from 'node-fetch'
const path = require('path')
const { config } = require('../config')
const { introspectionFromSchema, print } = require('graphql')
const { mergeSchemas } = require('@graphql-tools/schema');
const { loadSchema } = require('@graphql-tools/load');
const { UrlLoader } = require('@graphql-tools/url-loader');
// makeRemoteExecutableSchema is deprecated and replaced by wrapSchema.
const { wrapSchema } = require('@graphql-tools/wrap');
const { writeFileSync } = require('mz/fs')
const pkg = require('../package.json')
const graphqlApis = `https://${config.host}/stacks/${config.apiKey}?environment=${config.environment}`

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
        access_token: config.deliveryToken,
        'X-User-Agent': `${pkg.name}/${pkg.version}`
      },
      loaders: [
        new UrlLoader()
      ]
    })

    // Create executer for schema
    const executor = async ({ document, variables }) => {
      const query = print(document)
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
    const remoteExecutableSchema = wrapSchema({
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

  console.log(`Saving schema to ${config.fileName}`)

  // Write to file
  const pathForSchema = path.join(__dirname, `${config.fileName}`)
  writeFileSync(
    pathForSchema,
    JSON.stringify(introspectionFromSchema(schema), null, 2)
  )
}

fetchSchemas()
  .catch((err) => {
    console.error(err.extensions.errors)
  })
