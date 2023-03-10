import { Users } from '../../../../src/components/usersComponent/users/models/users.model';

export const usersStub = (): Users => {
  return <Users>{
    id: expect.any(String),
    email: expect.any(String),
    password: expect.any(String),
    roles: expect.any(Array),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    banned_at: null,
    banned_by: null,
    start_of_subscription: null,
    end_of_subscription: null,
  };
};

export const usersStubWithoutRoles = (): Users => {
  return <Users>{
    id: expect.any(String),
    email: expect.any(String),
    password: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    banned_at: null,
    banned_by: null,
    start_of_subscription: null,
    end_of_subscription: null,
  };
};
