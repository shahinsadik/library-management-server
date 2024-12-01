"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowReturnController = void 0;
const brrowReturn_service_1 = require("./brrowReturn.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const borrowBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, memberId } = req.body;
    if (!bookId || !memberId) {
        res.status(400).json({
            success: false,
            message: "Both bookId and memberId are required",
        });
        return;
    }
    const result = yield brrowReturn_service_1.BorrowReturnService.borrowBook(bookId, memberId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Book borrowed successfully",
        data: result,
    });
}));
const returnBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { borrowId } = req.body;
    if (!borrowId) {
        res.status(400).json({
            success: false,
            message: "Borrow ID is required",
        });
        return;
    }
    const result = yield brrowReturn_service_1.BorrowReturnService.returnBook(borrowId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Book returned successfully",
        data: result,
    });
}));
const getOverdueBorrowList = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const overdueList = yield brrowReturn_service_1.BorrowReturnService.getOverdueBorrowList();
    const message = overdueList.length > 0
        ? "Overdue borrow list fetched"
        : "No overdue books";
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message,
        data: overdueList,
    });
}));
exports.BorrowReturnController = {
    borrowBook,
    returnBook, getOverdueBorrowList
};
