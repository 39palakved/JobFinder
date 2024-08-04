const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

console.log(process.env.DB_USER);

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mernjob.cmf1qf1.mongodb.net/?retryWrites=true&w=majority&appName=mernjob`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const db = client.db("JobPortal");
    const jobsCollections = db.collection("jobs");

    // Post a job
    app.post('/post-job', async (req, res) => {
      const data = req.body;
      data.createdAt = new Date();
      const result = await jobsCollections.insertOne(data);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "Cannot insert, try again",
          status: false
        });
      }
    });

    // Get all jobs
    app.get('/all-jobs', async (req, res) => {
      const jobs = await jobsCollections.find({}).toArray();
      res.send(jobs);
    });
    app.get('/all-jobs/:id', async(req,res)=>{
      const id = req.params.id;
      const filter={_id:new ObjectId(id)}
      const jobs =await jobsCollections.findOne(filter);
      res.send(jobs)
    })
    
//get jobs by email
app.get("/myJobs/:email",async(req,res)=>{
console.log(req.params.email);

    const jobs= await jobsCollections.find({
        postedBy:req.params.email}).toArray();
        res.send(jobs);
})
//dlete the job
app.delete("/job/:id",async(req,res)=>{
  const id=req.params.id;
  const filter={_id:new ObjectId(id)}
  const result=await jobsCollections.deleteOne(filter);
  res.send(result)
})
//update a job
app.patch("/update-job/:id",async(req,res)=>{
  const id=req.params.id;
  const jobData=req.body;
  const filter={_id:new ObjectId(id)};
  const options={upsert:true};
  const updateDoc={
    $set:{
      ...jobData
    },
  };
  const result=await jobsCollections.updateOne(filter,updateDoc,options);
  res.send(result);

})


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error(error);
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
