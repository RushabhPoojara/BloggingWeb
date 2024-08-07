"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateblogValidation = exports.blogContentValidation = exports.signinValidation = exports.signupValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupValidation = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().optional()
});
//sign in validation
exports.signinValidation = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
//blog input validation
exports.blogContentValidation = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
//Updata validation
exports.updateblogValidation = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.string()
});
