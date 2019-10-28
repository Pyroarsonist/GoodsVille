export const queries = [
  `
  # Retrieves information about the currently logged-in user
  databaseGetLoggedInUser: DatabaseUser
`,
];

export const resolvers = {
  RootQuery: {
    async databaseGetLoggedInUser() {
      return null;
    },
  },
};
