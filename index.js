const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yuxyuxp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const taskCollection = client.db("taskify").collection("tasks");

    app.get("/tasks/:email", async (req, res) => {
      const email = req.params.email;
      const result = await taskCollection
        .find({ owner: email, status: 'todo' })
        .sort({ deadline: 1 })
        .toArray();
      res.send(result);
    });

    app.get("/ongoingTasks/:email", async (req, res) => {
      const email = req.params.email;
      const result = await taskCollection
        .find({ owner: email, status: "ongoing" })
        .toArray();
      res.send(result);
    });
    
    app.get("/completedTasks/:email", async (req, res) => {
      const email = req.params.email;
      const result = await taskCollection
        .find({ owner: email, status: "completed" })
        .toArray();
      res.send(result);
    });

    app.get('/individual/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await taskCollection.findOne(query)
      res.send(result)
      // console.log(result)
    })


    app.post("/addTask", async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      res.send(result);
    });

    app.put('/updateTask/:id', async(req,res)=>{
      const id = req.params.id;
      const query ={_id: new ObjectId(id)}
      const options = {
        upsert: true
      }
      const task = req.body;
      const updateDoc = {
        $set: task
      }
      const result = await taskCollection.updateOne(query, updateDoc, options)
      res.send(result)
    })

    app.delete("/deleteTask/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/updateTaskStatus/:taskId", async (req, res) => {
      const { taskId } = req.params;
      const { newStatus } = req.body;

      const taskToUpdate = await taskCollection.findOne({
        _id: new ObjectId(taskId),
      });

      if (!taskToUpdate) {
        return res.status(404).json({ error: "Task not found" });
      }

      try {
        await taskCollection.updateOne(
          { _id: new ObjectId(taskId) },
          { $set: { status: newStatus } }
        );

        return res
          .status(200)
          .json({ message: "Task status updated successfully" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensure that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Taskify is listening on port ${port}`);
});
