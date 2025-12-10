import * as http from 'http';

const postData = JSON.stringify({
    titulo: "O Senhor dos Anéis",
    autor: "J.R.R. Tolkien",
    isbn: "978-3-16-148410-0",
    anoPublicacao: 1954,
    disponivel: true
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/livros',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

function doRequest(opts, data = null) {
    return new Promise((resolve, reject) => {
        const req = http.request(opts, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = body ? JSON.parse(body) : {};
                    resolve({ status: res.statusCode, body: parsed });
                } catch (e) {
                    // In case of empty or non-json response
                    resolve({ status: res.statusCode, body: body });
                }
            });
        });
        req.on('error', (e) => reject(e));
        if (data) req.write(data);
        req.end();
    });
}

async function runTests() {
    console.log("Starting Tests...");

    // 1. Create
    console.log("1. Creating Book...");
    const createRes: any = await doRequest(options, postData);
    console.log("Create Status:", createRes.status);
    console.log("Created Book:", createRes.body);
    const createdId = createRes.body.id;

    if (!createdId) throw new Error("Failed to create book - ID missing");

    // 2. Get All
    console.log("\n2. Get All Books...");
    const getAllRes: any = await doRequest({ ...options, method: 'GET', path: '/api/livros', headers: {} });
    console.log("Get All Status:", getAllRes.status);
    console.log("Books count:", getAllRes.body.length);

    // 3. Get By ID
    console.log(`\n3. Get Book ${createdId}...`);
    const getByIdRes: any = await doRequest({ ...options, method: 'GET', path: `/api/livros/${createdId}`, headers: {} });
    console.log("Get By ID Status:", getByIdRes.status);
    console.log("Book:", getByIdRes.body);

    // 4. Update
    console.log(`\n4. Update Book ${createdId}...`);
    const updateData = JSON.stringify({ titulo: "O Hobbit" });
    const updateRes: any = await doRequest({
        ...options,
        method: 'PUT',
        path: `/api/livros/${createdId}`,
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(updateData) }
    }, updateData);
    console.log("Update Status:", updateRes.status);
    console.log("Updated Book:", updateRes.body);

    // 5. Delete
    console.log(`\n5. Delete Book ${createdId}...`);
    const deleteRes: any = await doRequest({ ...options, method: 'DELETE', path: `/api/livros/${createdId}`, headers: {} });
    console.log("Delete Status:", deleteRes.status);

    // 6. Verify Delete
    console.log("\n6. Verify Delete...");
    const finalGetRes: any = await doRequest({ ...options, method: 'GET', path: `/api/livros/${createdId}`, headers: {} });
    console.log("Get Deleted Book Status:", finalGetRes.status); // Should be 404
}

// Wait for server to invoke
setTimeout(runTests, 2000);
