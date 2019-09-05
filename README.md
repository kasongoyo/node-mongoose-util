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
### nodeMongooseUtil.parseQuery(params) => Object
It takes in query params from user and parse it to make them mongo friendly. It has the following characteristics;
- Pagination support    
It will not include `page` and `limit` fields in the result query if supplied. 
- Not equal clause  
If the query param field value preceded by `neq|`, it will output `$ne` operator query clause. 
- Include query clause  
It can create `$in` query clause for field contain comma seaprated values and included in `params.$in` key.

#### params
+ **params.query[required]** - Object  
Required. Specifies the query object to be parsed

+ **params.$in** - String[]
Array of field names which can be transformed to `$in` query clause if they have comma separated values 

#### Return 
Object with the following properties
+ **query** - object    
Mongoose friendly criteria object
+ **fields** - string   
Space separated field names to select
+ **sort** - string       
Space separated field names to use for sorting
+ **page** - number     
Page number used with pagination
+ **limit** - number        
Result limit used with pagination