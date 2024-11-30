import { Request, Response } from "express";
import { BookService } from "./book.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body; // Assuming validation is done elsewhere
  const result = await BookService.createBook(bookData);
  sendResponse(res,{
    success: true,
    statusCode: StatusCodes.OK,
    message: "Book created successfully",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks();
  sendResponse(res,{
    success: true,
    statusCode: StatusCodes.OK,
    message: "Books retrieved successfully",
    data: result,
  });
});

const findBookById = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const book = await BookService.findBookById(bookId);
  sendResponse(res,{
    success: true,
    statusCode: StatusCodes.OK,
    message: "Book retrieved successfully",
    data: book,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const result = await BookService.updateBook(bookId, req.body);
  sendResponse(res,{
    success: true,
    statusCode: StatusCodes.OK,
    message: "Book updated successfully",
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;

  await BookService.deleteBook(bookId);
  res.status(200).json({
    success: true,
    statusCode: StatusCodes.OK,
    message: "Book deleted successfully",
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  findBookById,
  updateBook,
  deleteBook,
};
