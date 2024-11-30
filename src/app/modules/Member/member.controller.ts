import { Request, Response } from "express";
import { MemberService } from "./member.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createMember = catchAsync(async (req: Request, res: Response) => {
  const result = await MemberService.createMember(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Member created successfully",
    data: result,
  });
});

const getAllMembers = catchAsync(async (req: Request, res: Response) => {
  const result = await MemberService.getAllMembers();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Members retrieved successfully",
    data: result,
  });
});

const findMemberById = catchAsync(async (req: Request, res: Response) => {
  const { memberId } = req.params;

  const result = await MemberService.findMemberById(memberId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Member retrieved successfully",
    data: result,
  });
});

const updateMembers = catchAsync(async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const updatedMember = req.body;

  const result = await MemberService.updateMember(memberId, updatedMember);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Member updated successfully",
    data: result,
  });
});

const deleteMember = catchAsync(async (req: Request, res: Response) => {
  const { memberId } = req.params;

  await MemberService.deleteMember(memberId);
  res.status(204).json({
    success: true,
    statusCode: StatusCodes.OK,
    message: "Member successfully deleted",
  });
});

export const MemberController = {
  createMember,
  getAllMembers,
  updateMembers,
  findMemberById,
  deleteMember,
};
