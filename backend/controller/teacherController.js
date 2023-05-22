const asyncHandler = require("express-async-handler");
const db = require("../mysqldb/db");

const getTeachers = asyncHandler(async (req, res) => {
    const result = await db.connection.execute(`SELECT * FROM user WHERE job="teacher"`)

    if(result) {
        res.status(200).json(result[0])
    } else {
        res.status(404)
    }
})

// const createMember = asyncHandler(async (req, res) => {
//     // const {fullname,role } = req.fields;
//     // const {avatar} = req.files;
//     const {fullname,role,avatar} = req.body;
//     if(!fullname || !avatar || !role){
//         res.status(400)
//         throw Error('Please enter full fields')
//     }

//     const member = await Member.create({
//         fullname,
//         avatar,
//         role,
//     })

//     if(member){
//         res.status(200).json({
//            _id: member.id,
//            fullname: member.fullname,
//            avatar: member.avatar,
//            role: member.role, 
//         })
//     }else{
//         res.status(400)
//         throw Error('Something went wrong')
//     }
// })


module.exports = {getTeachers}