import { Change } from '../models/change';

export interface ChangeRequest {
  color: string;
  handle: string;
  light: string;
  userEmail: string;
  type: string;
  cost: string;
  approved: boolean;
}

export const createChange = async (c: ChangeRequest) => {
  let change = {
    email: c.userEmail,
    type: c.type,
    cost: c.cost,
    approved: c.approved,
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
  }));
};
