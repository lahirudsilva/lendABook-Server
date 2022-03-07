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

  it("Login with wrong password", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "12349",
    });
    expect(res.statusCode).toEqual(500);
    expect(response.body).toHaveProperty("error");
  });

  it("Access unauthorized route", async () => {
    const response = await request(app).get(`/user/${id}`);
    expect(response.statusCode).toEqual(403);
    expect(response.body).toHaveProperty("error");
  });  

  it("Get logged user details", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("_id");
    id = response.body._id;
  });

  it("get all users", async () => {
    const response = await request(app)
    .get("/users/")
    .set("Authorization", "Bearer " + token);
  expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("users");
    expect(response.body.users.length).toBe(4);
  });

  it("Get Subscription details of user", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });

});


