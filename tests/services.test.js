const request = require("supertest");
const app = require("../app");

describe("User Endpoints", () => {
  it("Register", async () => {
    const res = await request(app).get("/user/register").send({
      email: "bruno@doe.com",
      firstName: "Bruno",
      lastName: "Doe",
      password: "123456789",
      dateOfBirth: "12-12-2000",
      contactNo: "0778723212",
      role: "customer",
    });
    expect(res.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(
      "Account created successfully, please login!"
    );
  });

  it("Register with exisitng email", async () => {
    const res = await request(app).post("/user/register").send({
      email: "bruno@doe.com",
      firstName: "Bruno",
      lastName: "Doe",
      password: "123456789",
      dateOfBirth: "12-12-2000",
      contactNo: "0778723212",
      role: "customer",
    });
    expect(res.statusCode).toEqual(401);
    expect(response.body.message).toEqual("Email already exists!");
  });

  it("Register with exisitng contact number", async () => {
    const res = await request(app).post("/user/register").send({
      email: "testcontact@doe.com",
      firstName: "Bruno",
      lastName: "Doe",
      password: "123456789",
      dateOfBirth: "12-12-2000",
      contactNo: "0778723212",
      role: "customer",
    });
    expect(res.statusCode).toEqual(401);
    expect(response.body.message).toEqual("Conatact number already exists!");
  });

  it("Login", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("token");
  });

  it("Login with wrong email", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "12349",
    });
    expect(res.statusCode).toEqual(500);
    expect(response.body).toHaveProperty("error");
  });

});


