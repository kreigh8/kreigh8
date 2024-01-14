"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const ErrorMiddleware_1 = require("./middlewares/ErrorMiddleware");
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, db_1.default)();
app.use(express_1.default.json());
// Enable CORS for all routes
app.use((0, cors_1.default)({
    origin: "*",
}));
// Default
app.get("/api", (req, res) => {
    res.status(201).json({ message: "Welcome to Auth ts" });
});
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.MONGO_URL
    })
}));
// User Route
app.use('/api/clients', clientRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
// Middleware
app.use(ErrorMiddleware_1.notFound);
app.use(ErrorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
//# sourceMappingURL=index.js.map