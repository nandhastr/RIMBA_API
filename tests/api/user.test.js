const request = require("supertest");

const baseURL = "http://127.0.0.1:8000";

describe("API /api/users", () => {
    it("should return user data with status success", async () => {
        const res = await request(baseURL).get("/api/users");

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status", 200);
        expect(res.body).toHaveProperty("message", "success");
        expect(res.body).toHaveProperty("data");
        expect(Array.isArray(res.body.data)).toBe(true);

        console.log("GET Response:", JSON.stringify(res.body.data, null, 2));
    });
});


describe("API /api/users/{id}", () => {
    let userId;

    beforeAll(async () => {
        const res = await request(baseURL).get("/api/users");

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status", 200);
        expect(res.body).toHaveProperty("message", "success");
        expect(res.body).toHaveProperty("data");

       
        expect(Array.isArray(res.body.data)).toBe(true);

        if (res.body.data.length === 0) {
            // Jika data kosong, buat pengguna baru
            const createRes = await request(baseURL).post("/api/users").send({
                name: "Nanda",
                email: "nanda@example.com",
                age: 25,
            });

            expect(createRes.status).toBe(201);
            userId = createRes.body.data.id;
        } else {
            userId = res.body.data[0].id;
        }

    });

    it("should return user by specific ID", async () => {
        if (!userId) {
            throw new Error("No user found in the database.");
        }

        const res = await request(baseURL).get(`/api/users/${userId}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status", 200);
        expect(res.body).toHaveProperty("message", "success");
        expect(res.body).toHaveProperty("data");
        expect(res.body.data.id).toBe(userId);

        console.log(
            "GET by ID Response:",
            JSON.stringify(res.body.data, null, 2)
        );
    });
});


describe("API /api/users POST", () => {
    it("should create a new user", async () => {
        const res = await request(baseURL).post("/api/users").send({
            name: "nanda212",
            email: "testuseafr12i75@example.com",
            age: 25,
        });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("status", 201);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(typeof res.body.data).toBe("object");

        console.log("Post Response:", JSON.stringify(res.body.data, null, 2));
    }, 5000);
});

describe("API /api/users PUT", () => {
    let userId;

    beforeAll(async () => {
        const res = await request(baseURL).post("/api/users").send({
            name: "Nanda",
            email: "nanda5ww67@example.com",
            age: 25,
        });

        expect(res.status).toBe(201);
        userId = res.body.data.id;
    });

    it("should update a user", async () => {
        const res = await request(baseURL).put(`/api/users/${userId}`).send({
            name: "Nanda Update 2",
            email: "testuserfdf8011225@example.com",
            age: 26,
        });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status", 200);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.data.name).toBe("Nanda Update 2");

        console.log("Put Response: ", JSON.stringify(res.body.data, null, 2));
    });
});

describe("API /api/users DELETE", () => {
    let userId;

    beforeAll(async () => {
        const res = await request(baseURL).post("/api/users").send({
            name: "Nanda",
            email: "nanda18424f@example.com",
            age: 25,
        });

        expect(res.status).toBe(201);
        userId = res.body.data.id;
    });

    it("should delete a user", async () => {
        const res = await request(baseURL).delete(`/api/users/${userId}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status", 200);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");

        console.log(
            "Delete response: ",
            JSON.stringify(
                { message: "Data Berhasil di hapus", data: res.body.data },
                null,
                2
            )
        );

        
        const getRes = await request(baseURL).get(`/api/users/${userId}`);

        expect(getRes.status).toBe(404);
        expect(getRes.body).toHaveProperty("message", "Data tidak ditemukan");
    });
});
