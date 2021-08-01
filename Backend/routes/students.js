const router = require("express").Router();
let Student = require("../models/Student");

router.route("/add").post((req,res)=>{


    console.log(req.body);
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent =  new Student({
        name,
        age,
        gender
    });
    //sent object  as a doc to database
    newStudent.save().then(()=>{
        res.json("Student added");//yawanne json format eken
    }).catch((err)=>{
        console.log(err);
    });

})
//get data from db
router.route("/").get((req,res)=>{
        Student.find().then((students)=>{
            res.json(students)
        }).catch((err)=>{
            console.log(err)
        })
});



router.route("/update/:id").put(async(req,res) =>  {
        // let userId =  req.params.id;
        // const {name,age,gender} = req.body;
    
        // const updateStudent = {
        //     name,
        //     age,
        //     gender
        // },

    // Student.findByIdAndUpdate(userId,updateStudent,{new :true}).then(()=>
    //     res.status(200).send({status:"User feched",user:user});
    // ).catch(() => {
    //     console.log(err.message);
    //     res.status(500).send({status:"error with get user",error:err.message});
    // });

    // await Student.findByIdAndUpdate(userId,updateStudent,{new :true}).then();


    // await Student.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true,
    //     runValidators: true,
    //   })
    //   .then(() => res.json("Item Updated Successfully!"))
    //   .catch((err) => res.status(500).json("Error :" + err));





    try {
        let userId =  req.params.id;
        const {name,age,gender} = req.body;
    
        const updateStudent = {
            name,
            age,
            gender
        };

        const upStu = await Student.findByIdAndUpdate(userId,updateStudent,{new :true}) ;
        if (upStu) {
            res.status(200).send({status:"user updated",user:upStu});
         }
    } catch (error) {
        res.status(500).send({status:"Error with delete user",error:err.message}); 
    }

})

router.route("/delete/:id").delete(async (req,res)=>{
    let userId = req.params.id;
    await Student.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"user deleted"});
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status:"Error with delete user",error:err.message});
    })
})

router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;
    const user = await Student.findById(userId)
    .then((student)=>{
        res.status(200).send({status:"User feched",user:student})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status:"error with get user",error:err.message});
    })
})

//aniwa module eka export krnn one

module.exports = router;