// const { MongooseQueryParser } = require("mongoose-query-parser");

// const parser = new MongooseQueryParser()

// function queryParser(req, res, next) {
//     const parsed = parser.parse(req.query)
//     req.mquery = parsed
//     next()
// }
// module.exports = queryParser

// const qs = require('qs')

// module.exports = function queryParser(req, res, next) {
//     const queryString = req._parsedUrl ? req._parsedUrl.query : null
    
//     if (queryString) {
//         req.parsedQuery = qs.parse(queryString)
//     }
//     else {
//         req.parsedQuery = {}
//     }
//     next()
// }