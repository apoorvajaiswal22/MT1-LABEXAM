
import express from 'express';

const app = express();
app.use(express.json());

let tasks = [
    { id: 1, taskName: "Login Page", assignedTo: "Rahul", status: "Pending", priority: "High" },
    { id: 2, taskName: "Homepage", assignedTo: "Amit", status: "Completed", priority: "Medium" },
    { id: 3, taskName: "Testing", assignedTo: "Priya", status: "Pending", priority: "Low" }
];

// GET all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// GET task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));

    if (!task)
        return res.status(404).json({ message: 'Task not found' });

    res.json(task);
});

// POST new task
app.post('/tasks', (req, res) => {
    const { id, taskName, assignedTo, status, priority } = req.body;

    if (id == null || !taskName || !assignedTo || !status || !priority)
        return res.status(400).json({ message: 'All fields required' });

    if (tasks.some(t => t.id === Number(id)))
        return res.status(400).json({ message: 'ID already exists' });

    const newTask = {
        id: Number(id), taskName, assignedTo, status, priority
    };

    tasks.push(newTask);

    res.status(201).json({
        message: 'Task added successfully',
        task: newTask
    });
});

// PUT update task
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));

    if (!task)
        return res.status(404).json({ message: 'Task not found' });

    const { taskName, assignedTo, status, priority } = req.body;

    if (!taskName || !assignedTo || !status || !priority)
        return res.status(400).json({ message: 'All fields required' });

    Object.assign(task, { taskName, assignedTo, status, priority });

    res.json({ message: 'Task updated successfully', task });
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === Number(req.params.id));

    if (index === -1)
        return res.status(404).json({ message: 'Task not found' });

    tasks.splice(index, 1);

    res.json({ message: 'Task deleted successfully' });
});

// Invalid route
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(4000, () => {
    console.log('Express Server running at http://localhost:4000');
});
