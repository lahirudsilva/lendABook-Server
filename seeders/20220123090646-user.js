module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "bruno@doe.com",
          firstName: "Bruno",
          lastName: "Doe",
          password: "123456789",
          dateOfBirth: "12-12-2000",
          contactNo: "1234123223",
          role: "customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "jhon@doe.com",
          firstName: "Jhon",
          lastName: "Doe",
          password: "123456789",
          dateOfBirth: "12-12-2000",
          contactNo: "1234124443",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
