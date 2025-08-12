import http, { Server } from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const PORT = process.env.PORT ?? 3001;
const HOST = process.env.HOST ?? "127.0.0.1";

// Se encarga  de donde almacena la data y de donde la consume
class RepositoryLayer {
    static filePath = "./data-store/db.json";

    static async getData() {
        try {
            const data = await fs.readFile(this.filePath, "utf8");
            return JSON.parse(data);
        } catch (error) {
            console.error("Error reading data:", error);
            return [];
        }
    }

    static async saveData(data) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("Error saving data:", error);
        }
    }
}

// Esta capa se encarga de manejar la logica
class ServiceLayer {
    static async getTodos() {
        return await RepositoryLayer.getData();
    }

    static async addTodo(todo) {
        const todos = await RepositoryLayer.getData();

        if (!todo.text) {
            throw new Error("Text is missing");
        }

        const newTodo = {
            id: todos.length + 1,
            text: todo.text,
            completed: false,
        };

        todos.push(newTodo);
        await RepositoryLayer.saveData(todos);

        return newTodo;
    }
}

const serveStaticData = async (response, filePath, contenType) => {
    try {
        const fileData = await fs.readFile(filePath, { encoding: "utf8" });

        response.writeHead(200, { "Content-Type": contenType });
        response.end(fileData);
    } catch (error) {
        console.error({ error });
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ error: error.message }));
    }
};

const serverStaticFile = (response, url, servingCallBack) => {
    console.warn(url);

    const mapping = {
        "/static-website": "index.html",
        "/static-website/styles.css": "styles.css",
        "/static-website/script.js": "script.js",
    };

    const filePath = path.join("static-website", mapping[url] ?? "index.html");

    const contentType = url.endsWith(".css")
        ? "text/css"
        : url.endsWith(".js")
        ? "application/javascript"
        : "text/html";

    servingCallBack(response, filePath, contentType);
};

const handlePostRequests = async (request, response, method) => {
    if (method === "GET") {
        const todos = await ServiceLayer.getTodos();
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(todos));
    }

    if (method === "POST") {
        let body = "";
        request.on("data", (chunk) => {
            body += chunk.toString();
        });
        request.on("end", async () => {
            try {
                const todo = JSON.parse(body);
                const newTodo = await ServiceLayer.addTodo(todo);

                response.writeHead(201, { "Content-Type": "application/json" });
                response.end(JSON.stringify(newTodo));
            } catch (error) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ error: error.message }));
            }
        });
    }
};

const requestHandler = (request, response) => {
    const { method, url } = request;

    if (url.startsWith("/static-website") && method === "GET") {
        return serverStaticFile(response, url, serveStaticData);
    }

    if (url === "/api/todos") {
        return handlePostRequests(request, response, method);
    }

    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Not Found" }));
};

const startServer = () => {
    const server = http.createServer(requestHandler);
    server.listen(PORT, HOST, () => {
        console.log(`🚀 server running on  ... http://${HOST}:${PORT}`);
    });
};

startServer();
