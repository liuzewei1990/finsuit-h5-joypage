'use strict'
module.exports = {
    NODE_ENV: process.env.NODE_ENV == "production" ? '"production"' : '"productionTest"'
}
