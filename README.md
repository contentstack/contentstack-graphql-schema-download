[![Contentstack](https://www.contentstack.com/docs/static/images/contentstack.png)](https://www.contentstack.com/)

# Contentstack GraphQL Schema Download
Schema download is the process of creating a single GraphQL schema from Contenstack GraphQL pagination.

Contentstack GraphQL provides schema response with limit of 100 Content Types. So to create single ```schema.json``` file we need to paginate throught the GraphQL. This library will help you to generate single schema file by paginating and merging schema.

## Prerequisite
You need Node.js version 10.21.0 or later

## Setup and Installation
 - Clone this project with following command:
```
    git clone https://github.com/contentstack/contentstack-graphql-schema-dwonload.git
```
 - Install all the modules using following command:
 ```
    npm install
 ```

## Configuration
 - Update configuration details:
 ```
const config = {
  host: '<HOST>',
  api_key: '<STACK_API_KEY>',
  deliveryToken: '<ENVIRONMENT_SPECIFIV_DELIVERY_TOKEN>',
  environment: '<ENVIRONMENT>',
  contentTypes: '<NUMBER_OF_CONTENT_TYPES_IN_STACK>',
  fileName: '<SCHEMA_FILE_NAME>'
}
 ```
## Usage
 - Once all things are configured, you can run following commands
```
    npm run start
```
