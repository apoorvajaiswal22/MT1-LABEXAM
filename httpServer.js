
import http from 'http';
import fs from 'fs';

let tasks = [
    { id: 1, taskName: "Login Page", assignedTo: "Rahul", status: "Pending" }
];

const server = http.createServer((req, res) => {

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to Employee Task Management</h1>');
    }

    else if (req.url === '/tasks' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));
    }

    else if (req.url === '/about' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Employee Task Management Application');
    }

    else if (req.url === '/home' && req.method === 'GET') {
        fs.readFile('./public/index.html', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('File reading error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }

    else if (req.url === '/add-task' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => body += chunk);

        req.on('end', () => {
            try {
                const task = JSON.parse(body);

                if (!task.id || !task.taskName ||
                    !task.assignedTo || !task.status) {
                    res.writeHead(400);
                    return res.end('All fields are required');
                }

                tasks.push(task);
                res.writeHead(201, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({
                    message: 'Task added successfully',
                    task
                }));

            } catch {
                res.writeHead(400);
                res.end('Invalid JSON');
            }
        });
    }

    else {
        res.writeHead(404);
        res.end('404 Page Not Found');
    }
});

server.listen(3000, () => {
    console.log('HTTP Server running at http://localhost:3000');
});
