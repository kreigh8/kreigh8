"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const clients_1 = __importDefault(require("./routes/clients"));
const users_1 = __importDefault(require("./routes/users"));
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = __importStar(require("http-errors"));
const express_session_1 = __importDefault(require("express-session"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
exports.app = (0, express_1.default)();
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin: '*'
}));
exports.app.use((0, express_session_1.default)({
    secret: validateEnv_1.default.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: connect_mongo_1.default.create({
        mongoUrl: validateEnv_1.default.MONGO_URL
    })
}));
exports.app.use('/api/clients', clients_1.default);
exports.app.use('/api/users', users_1.default);
exports.app.use((req, res, next) => {
    next((0, http_errors_1.default)(404, 'Endpoint not found'));
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.app.use((error, req, res, next) => {
    console.error(error);
    let errorMessage = 'An uknown error occured';
    let statusCode = 500;
    if ((0, http_errors_1.isHttpError)(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});
mongoose_1.default.connect(validateEnv_1.default.MONGO_URL).then(() => {
    console.log('Mongoose Connected');
    exports.app.listen(validateEnv_1.default.PORT, () => {
        console.log(`Server running on port: ${validateEnv_1.default.PORT}`);
    });
}).catch(console.error);
