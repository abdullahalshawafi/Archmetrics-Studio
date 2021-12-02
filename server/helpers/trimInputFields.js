module.exports = fields => {
    for (const field in fields) {
        if (Object.hasOwnProperty.call(fields, field) && typeof fields[field] === "string") {
            fields[field] = fields[field].trim();
        }
    }
}