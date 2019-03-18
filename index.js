/*
 * @file:  
 * @Author: kasongoyo@gmail.com 
 * @Date: 2018-10-10 09:27:24 
 */



/**
 * Takes Http query string, extract it and prepare
 * data friendly to mongoose DB.
 * @param {Object=} options - Option object
 * @param options.query {Object} - Http query object 
 * @param options.toLowerCase {String} - Convert query string value to lowercase
 * @param options.ignore {Array} - Collection of all the key to not be included in the final
 * query 
 * @returns {Object} - Object with criteria and fields key
 */
function extractQuery(options) {
  if(!options || !options.query){
    return {};
  }
  const { query, toLowerCase, ignore } = options; //query object

  let conditions = {};
  let fields;
  let sort;
  let page;
  let limit;
  Object.keys(query).forEach(key => {
    if (ignore && ignore.includes(key)) {
      return;
    }
    if (key === 'fields') {
      // fields to return;
      fields = query[key].replace(/,/g, ' ');
      return;
    }
    if (key === 'sort') {
      // fields to return;
      sort = query[key].replace(/,/g, ' ');
      return;
    }

    if (!Array.isArray(query[key])) {
      // key is not fields and it's value is not array
      if (key === 'id') {
        conditions._id = query[key];
        return;
      }
      if (key === 'page') {
        // page number, works with pagination
        page = query[key];
        return;
      }
      if (key === 'limit') {
        // result limit, works with pagination
        limit = query[key];
        return;
      }
      if (toLowerCase && typeof query[key] === 'string') {
        conditions[key] = query[key].toLowerCase();
      } else {
        conditions[key] = query[key];
      }
      return;
    }
    if (Array.isArray(query[key])) {
      // key is not fields and it's value is an array
      if (key === 'id') {
        conditions._id = { '$in': query[key] };
        return;
      }
      conditions[key] = { '$in': query[key] };
      return;
    }
  });
  return { criteria: conditions, fields, sort, page, limit };
}

module.exports = {
  extractQuery
}