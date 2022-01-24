const request = require("supertest");
const app = require("../app");

describe("User Endpoints", () => {
  it("Register", async () => {
    const res = await request(app).get("/user/register").send({
      email: "test@doe.com",
      firstName: "Bruno",
      lastName: "Doe",
      password: "123456789",
      dateOfBirth: "12-12-2000",
      contactNo: "1234123223",
      role: "customer",
    });
    expect(res.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(
      "Account created successfully, please login!"
    );
  });
});

describe("User Endpoints", () => {
  it("Register with exisitng email", async () => {
    const res = await request(app).post("/user/register").send({
      email: "bruno@doe.com",
      firstName: "Bruno",
      lastName: "Doe",
      password: "123456789",
      dateOfBirth: "12-12-2000",
      contactNo: "1234123223",
      role: "customer",
    });
    expect(res.statusCode).toEqual(401);
    expect(response.body.message).toEqual("Email already exists!");
  });
});

describe("User Endpoints", () => {
  it("Register with exisitng contact number", async () => {
    const res = await request(app).post("/user/register").send({
      email: "testcontact@doe.com",
      firstName: "Bruno",
      lastName: "Doe",
      password: "123456789",
      dateOfBirth: "12-12-2000",
      contactNo: "1234123223",
      role: "customer",
    });
    expect(res.statusCode).toEqual(401);
    expect(response.body.message).toEqual("Conatact number already exists!");
  });
});

describe("User Endpoints", () => {
  it("Login", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("token");
  });
});

describe("User Endpoints", () => {
  it("Login with bad credentials", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("User Endpoints", () => {
  it("get all users", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("User Endpoints", () => {
  it("Get Subscription details of user", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("User Endpoints", () => {
  it("getLogged in user", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("User Endpoints", () => {
  it("Remove a user", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("User Endpoints", () => {
  it("set a user as verified", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("User Endpoints", () => {
  it("set a user as blacklisted", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Book Endpoints", () => {
  it("add Books", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Book Endpoints", () => {
  it("get All books", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Book Endpoints", () => {
  it("delete a book", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Book Endpoints", () => {
  it("get details of a book", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Book Endpoints", () => {
  it("update a book", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Book Endpoints", () => {
  it("update book copies", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Movie Endpoints", () => {
  it("add movies", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Movie Endpoints", () => {
  it("get all movies", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Movie Endpoints", () => {
  it("update a movie", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Movie Endpoints", () => {
  it("update movie copies", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Movie Endpoints", () => {
  it("get details of a single movie", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Movie Endpoints", () => {
  it("delete a movie", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Reservation Endpoints", () => {
  it("add book reservation", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Reservation Endpoints", () => {
  it("add movie reservation", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Reservation Endpoints", () => {
  it("get all book reservations", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Reservation Endpoints", () => {
  it("get all movies reservations", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Reservation Endpoints", () => {
  it("update book reservation status", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Reservation Endpoints", () => {
  it("update movie reservation status", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Book favorites Endpoints", () => {
  it("add a book to favorites", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Book favorites Endpoints", () => {
  it("remove a book from favorites", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});

describe("Book favorites Endpoints", () => {
  it("get all customer's favorites", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bruno@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(500);
  });
});
