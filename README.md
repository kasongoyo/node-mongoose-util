# Node Mongoose Util
A nodejs and mongoose utility library,it consists of various utilities 
to assist in mongoose-nodejs application.

## Installing
```bash
npm i --save node-mongoose-util
```

## Usage

Sample example
```bash
const nodeMongooseUtil = require('node-mongoose-util');
const User = mongoose.model('User');

/**
 * Handle Http GET on /users
 */
router.get('/users', (request, response, next) => {
    const { query, fields, page, limit } = nodeMongooseUtil.parseQuery(request.query);
    User.find(query)
});
```

## API
### nodeMongooseUtil.parseQuery(query, ignore)
It parses query to create another query which is mongoose friendly. It takes in `query` and `ignore` parameters

#### Params
+ **Query** - Object  
Contain the key value pair of query string which is the result of the [bodyParser.urlEncoded](https://github.com/expressjs/body-parser#bodyparserurlencodedoptions)

+ **ignore** - String[]
Array of string contain the name list of the query params to ignore in the final query produced by `parseQuery` function

