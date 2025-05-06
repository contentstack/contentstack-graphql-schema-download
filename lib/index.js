const path = require('path');
const { config } = require('../config');
const { introspectionFromSchema } = require('graphql');
const { loadSchema } = require('@graphql-tools/load');
const { UrlLoader } = require('@graphql-tools/url-loader');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { writeFileSync } = require('mz/fs');
const pkg = require('../package.json');
const fetch = require('node-fetch'); // Ensure this is installed

const graphqlApis = `https://${config.host}/stacks/${config.apiKey}?environment=${config.environment}`;

const limit = 100;
console.log('Loading Contentstack Schema download...');

const fetchSchemas = async () => {
  const schemas = [];
  let skip = 0;

  while (skip < config.contentTypes) {
    const currentFetchCount = Math.min(skip + limit, config.contentTypes);
    console.log(`Fetching ${currentFetchCount} of ${config.contentTypes} Content Types.`);

    const url = `${graphqlApis}&limit=${limit}&skip=${skip}`;

    const remoteSchema = await loadSchema(url, {
      headers: {
        access_token: config.deliveryToken,
        'X-User-Agent': `${pkg.name}/${pkg.version}`
      },
      fetch,
      loaders: [new UrlLoader()]
    });

    schemas.push(remoteSchema);
    skip += limit;
  }

  console.log(`${config.contentTypes} Content Types schema loaded.`);

  const mergedTypeDefs = mergeTypeDefs(schemas);
  const schema = makeExecutableSchema({ typeDefs: mergedTypeDefs });

  const pathForSchema = path.join(__dirname, `${config.fileName}`);
  console.log(`Saving schema to ${pathForSchema}`);

  writeFileSync(
    pathForSchema,
    JSON.stringify(introspectionFromSchema(schema), null, 2)
  );

  console.log('Schema saved successfully.');
};

fetchSchemas().catch((err) => {
  console.error('Failed to fetch schemas:', err);
});
