/*
 * @file:  
 * @Author: kasongoyo@gmail.com 
 * @Date: 2018-10-10 09:27:24 
 */

module.exports = {

  /**
   * Parse Http query string params to create mongoose friendly one.
   * @param {Object} filters
   * @param {Object} filters.query - Query string object to parse
   * @param {String[]} filters.$in - array of fields to use mongo $in query operator if their values are comma separated
   */
  parseQuery(filters = {}) {
    if (typeof filters !== 'object' && filters.constructor !== Object) {
      throw new Error('invalid params provided');
    }
    const { query = {}, $in = [] } = filters;
    let fields;
    let sort;
    let page;
    let limit;
    const enhancedQuery = Object
      .keys(query)
      .reduce((acc, key) => {
        if (key === 'page') {
          // page number, works with pagination
          page = query[key];
          return acc;
        }
        if (key === 'limit') {
          // result limit, works with pagination
          limit = parseInt(query[key]);
          return acc;
        }
        if (key === 'select') {
          // fields to return;
          fields = query[key].replace(/,/g, ' ');
          return acc;
        }
        if (key === 'sort') {
          // fields to return;
          sort = query[key].replace(/,/g, ' ');
          return acc;
        }
        return key === 'id' ? { ...acc, _id: query[key] } : { ...acc, [key]: query[key] };
      }, {});

    const conditions = Object
      .keys(enhancedQuery)
      .reduce((acc, key) => {
        const value = enhancedQuery[key];
        if (typeof value === 'string' || value instanceof String) {

          const match = /\s*(neq\|)?(.*)/.exec(value);
          if (match[1]) {
            // it contain neq prefix, create $ne operator based query clause
            return { ...acc, [key]: { '$ne': match[2] } };
          }
          if (/,/.test(value) && $in.includes(key)) {
            // it contain comma separated values then build in clause otherwise normal equal clause
            return { ...acc, [key]: { '$in': value.split(',') } };
          }
        }
        return { ...acc, [key]: value };
      }, {});
    return { query: conditions, fields, sort, page, limit };
  }
}