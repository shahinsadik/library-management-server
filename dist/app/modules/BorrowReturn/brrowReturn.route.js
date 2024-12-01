"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowReturnRoute = void 0;
const express_1 = __importDefault(require("express"));
const brrowReturn_controller_1 = require("./brrowReturn.controller");
const router = express_1.default.Router();
router.post("/borrow", brrowReturn_controller_1.BorrowReturnController.borrowBook);
router.post("/return", brrowReturn_controller_1.BorrowReturnController.returnBook);
router.get("/overdue", brrowReturn_controller_1.BorrowReturnController.getOverdueBorrowList);
exports.BorrowReturnRoute = router;
