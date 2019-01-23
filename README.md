# Media server example

This is very simple media server implementation written in node js. It uses express and typescript and would be user as API to serve media files and metadata.

## Getting started

### Installation

#### Node js

1. Clone this repository
2. Install dependencies by running, `yarn` or `npm i`
3. Build project `yarn build`
4. Start `yarn start`

### Env

`NODE_ENV` - node env(production, development, test)

`PORT` - server port. Default is `3000`
`HOST` - server host. Default is `localhost`
`DB_PATH` - path to the metadata json file. Default is `metadata.json`
`MEDIA_STORAGE_PATH` = path to the media storage. Default is `media`

### Metadata

Metadata format contains meta information about the existing songs on the server
_Required fields:_

- `id` - unique id for a song
- `filename` - unique filename for a song
