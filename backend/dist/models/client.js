"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean }
});
exports.default = (0, mongoose_1.model)('Client', clientSchema);
//# sourceMappingURL=client.js.map