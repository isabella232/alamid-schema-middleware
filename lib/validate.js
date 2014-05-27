"use strict";

/**
 * validate req.body using the schema.validate method
 * if <schema> was supplied the schema will be used
 * otherwise using req.schema
 *
 * @param {Object=} schema
 * @returns {Function} validate
 */
function validatorMiddleware(schema) {
    return function validate(req, res, next) {
        schema = schema || req.schema;

        schema.validate(req.body || {}, function(validation) {
            if(!validation.result) {
                res.validation = validation;
                next(new Error("Validation failed"));
                return;
            }

            next();
        });
    };
}

module.exports = validatorMiddleware;