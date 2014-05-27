"use strict";

/**
 * append a schema to the request
 * can be used by validate & normalize middleware
 *
 * @param {Object} schema
 * @returns {Function}
 */
function useSchema(schema) {
    if (!schema && typeof schema !== "object") {
        throw new TypeError("Schema '" + schema + "' has to be an object");
    }

    return function (req, res, next) {
        req.schema = schema;
        next();
    };
}

module.exports = useSchema;