import { Change } from '../models/change';

export interface ChangeRequest {
  changeRequestId: string;
  color: string;
  handle: string;
  light: string;
  userEmail: string;
  type: string;
  cost: string;
  info: string;
  approved: boolean;
  changedStatus: boolean;
}

export const createChange = async (c: ChangeRequest) => {
  let change = {
    changeRequestId: c.changeRequestId,
    changedStatus: c.changedStatus,
    email: c.userEmail,
    type: c.type,
    cost: c.cost,
    approved: c.approved,
    info: c.info,
    description: {
      color: c.color,
      handle: c.handle,
      light: c.light,
    },
  };
  const savedChange = await Change.create({ ...change });
  return savedChange;
};

export const getUserChanges = async (email: string) => {
  const changes = await Change.findAll({
    where: {
      email: email,
    },
  });

  return changes.map((c) => ({
    email: c.email,
    type: c.type,
    approved: c.approved,
    description: c.description,
    cost: c.cost,
    info: c.info,
    changeRequestId: c.changeRequestId,
    changedStatus: c.changedStatus,
  }));
};

export const getAllChanges = async () => {
  const changes = await Change.findAll();

  return changes.map((c) => ({
    email: c.email,
    type: c.type,
    approved: c.approved,
    description: c.description,
    cost: c.cost,
    info: c.info,
    changeRequestId: c.changeRequestId,
    changedStatus: c.changedStatus,
  }));
};

export const updateApproval = async (
  changeRequestId: string,
  info: string,
  approval: boolean
) => {
  const change = await Change.findOne({
    where: {
      changeRequestId: changeRequestId,
    },
  });

  change.approved = approval;
  change.info = info;
  change.changedStatus = true;
  await change.save();
  return change;
};
