import express from "express";
import { BorrowReturnController } from "./brrowReturn.controller";


const router = express.Router();

router.post("/borrow", BorrowReturnController.borrowBook);
router.post("/return", BorrowReturnController.returnBook);
router.get("/overdue", BorrowReturnController.getOverdueBorrowList);
export const BorrowReturnRoute = router;
