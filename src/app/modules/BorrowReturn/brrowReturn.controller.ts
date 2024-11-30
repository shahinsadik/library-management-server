import { Request, Response } from "express";
import { BorrowReturnService } from "./brrowReturn.service";
import catchAsync from "../../../shared/catchAsync";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../../shared/sendResponse";

const borrowBook = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { bookId, memberId } = req.body;
    if (!bookId || !memberId) {
      res.status(400).json({
        success: false,
        message: "Both bookId and memberId are required",
      });
      return;
    }
    const result = await BorrowReturnService.borrowBook(bookId, memberId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Book borrowed successfully",
      data: result,
    });
  }
);

const returnBook = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { borrowId } = req.body;
    if (!borrowId) {
      res.status(400).json({
        success: false,
        message: "Borrow ID is required",
      });
      return;
    }
    const result = await BorrowReturnService.returnBook(borrowId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Book returned successfully",
      data: result,
    });
  }
);

const getOverdueBorrowList = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    const overdueList = await BorrowReturnService.getOverdueBorrowList();

    const message =
      overdueList.length > 0
        ? "Overdue borrow list fetched"
        : "No overdue books";

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message,
      data: overdueList,
    });
  }
);



export const BorrowReturnController = {
  borrowBook,
  returnBook,getOverdueBorrowList
};
