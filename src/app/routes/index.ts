import express from "express";
import { MemberRoute } from "../modules/Member/member.route";
import { BookRoute } from "../modules/Book/book.route";
import { BorrowReturnRoute } from "../modules/BorrowReturn/brrowReturn.route";


const router = express.Router();
const moduleRoutes = [
  {
    path: "/members",
    route: MemberRoute,
  },
  {
    path: "/books",
    route: BookRoute,
  },
  {
    path: "/",
    route: BorrowReturnRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
