export type UserType = {
  id: string;
  uid: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

const users: UserType[] = [];

export default {
  find: async (): Promise<UserType[]> => users,

  findById: async (id: string): Promise<UserType | undefined> =>
    users.find((u) => u.id === id),

  create: async (data: Omit<UserType, "id" | "createdAt" | "updatedAt">): Promise<UserType> => {
    const timestamp = new Date();
    const newUser: UserType = {
      ...data,
      id: Date.now().toString(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    users.push(newUser);
    return newUser;
  },

  update: async (
    id: string,
    data: Partial<Omit<UserType, "id" | "createdAt" | "updatedAt">>
  ): Promise<UserType | null> => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    users[index] = {
      ...users[index],
      ...data,
      updatedAt: new Date(),
    };
    return users[index];
  },

  delete: async (id: string): Promise<UserType | null> => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    const deleted = users.splice(index, 1)[0];
    return deleted;
  },
};
