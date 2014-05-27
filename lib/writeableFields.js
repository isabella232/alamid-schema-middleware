"use strict";

/**
 * accepts only fields that are defined in <writeableFields>
 * ends the request with an error if invalid fields were passed
 *
 * @param {Array} writeableFields
 * @returns {Function}
 */
function writeableFields(writeableFields) {
    return function checkWriteableField(req, res, next) {

        var bodyKeys = Object.keys(req.body),
            invalidFields = [];

        bodyKeys.forEach(function (key) {
            if (writeableFields.indexOf(key) === -1) {
                invalidFields.push(key);
            }
        });

        if (invalidFields.length > 0) {
            res.invalidFields = invalidFields;
            next(new Error("Invalid Fields"));
            return;
        }

        next();
    };
}

module.exports = writeableFields;