[![Contentstack](https://www.contentstack.com/docs/static/images/contentstack.png)](https://www.contentstack.com/)

# Contentstack GraphQL Schema Download
Downloading schema is the process of creating a single GraphQL schema from the Contentstack GraphQL pagination.
Contentstack GraphQL provides a schema response with a limit of 100 Content Types. Therefore, to create a single ```schema.json``` file, we need to paginate through the GraphQL. This library will help you to generate a single schema file by paginating and merging the schema.

## Prerequisite
You need Node.js version 10 or later installed on your machine

## Setup and Installation
 - Clone this project by using the following command:
```
    git clone https://github.com/contentstack/contentstack-graphql-schema-download.git
```
 - Then, install all the required modules by using the following command:
 ```
    npm install
 ```

## Configuration
 - Update the configuration details as follows:
 ```
const config = {
  host: '<HOST>',
  api_key: '<STACK_API_KEY>',
  deliveryToken: '<ENVIRONMENT_SPECIFIC_DELIVERY_TOKEN>',
  environment: '<ENVIRONMENT>',
  contentTypes: '<NUMBER_OF_CONTENT_TYPES_IN_STACK>',
  fileName: '<SCHEMA_FILE_NAME>'
}
 ```

## Usage
 - Once you have updated the configuration, run the following command:
```
    npm run start
```
