[![Contentstack](https://www.contentstack.com/docs/static/images/contentstack.png)](https://www.contentstack.com/)

# Contentstack GraphQL Schema Download
Contentstack is a headless CMS with an API-first approach. It is a CMS that developers can use to build powerful cross-platform applications in their favorite languages. Build your application frontend, and Contentstack will take care of the rest. [Read More](https://www.contentstack.com/).

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
  apiKey: '<STACK_API_KEY>',
  deliveryToken: '<ENVIRONMENT_SPECIFIC_DELIVERY_TOKEN>',
  environment: '<ENVIRONMENT>',
  contentTypes: '<NUMBER_OF_CONTENT_TYPES_IN_STACK>',
  fileName: '<SCHEMA_FILE_NAME>'
}
 ```

## Usage
 - Once you have updated the configuration as shown above, you can use following command to download the schema:
```
    npm run start
```

## Using a schema file

### iOS 
 - iOS requires a GraphQL schema file as input to the code generation process. A schema file is a JSON file that contains the results of an introspection query. Conventionally, this file is called schema.json.
- Note that you are required to add this in the folder where most of your code is, and NOT in the same folder where the .xcodeproj and/or .xcworkspace are located.

 Refer the [Adding a schema file to your target directory](https://www.apollographql.com/docs/ios/installation/#adding-a-schema-file-to-your-target-directory) doc for more information.

### Android
 - Android requires your GraphQL server's schema as a schema.json file. You can obtain the content of this file by running an introspection query on your server.
 - Add your schema.json file to the following directory:
 ```
 src/main/graphql/com/example/schema.json
 ```

 Refer the [Add your query](https://www.apollographql.com/docs/android/essentials/get-started-kotlin/#add-your-query) doc for more information.
 