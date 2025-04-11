// import express from "express";

// const app = express();

// const PORT = 5000;



// app.listen(PORT,(req,res)=>{
//     console.log(`Server is running ${PORT}`)
// })

// Routing - Routing refers to determining how an application responds to a client request to a particular endpoint,which is a URI (or path) and a specific HTTP request methos ( GET,POST,and so on).
// Each route can have one or more callback functions,which are executed when the route is matched.
// Syntax:- app.method(path,callback)
// eg app.get("/",(req,res)=>{res.send("Home Page")})

// app - app is an instance of express.
// method - is an HTTP request method, in lowercase
    // 1. get - Retrieve Data
    // 2. post - create/Insert Data
    // 1. put - Completely Update Data
    // 1. patch - partially update Data
    // 1. delete - Delete Data
    // 1. All - Any HHTP Request Method
// path -is a path on the server
// callback is the function executed when the route is matched.

// Single Call back function

// app.get("/",(req,res)=>{
//     res.send("Home Page")
// })

// More than one callback functions
// Note : Res.send we can use only one time

// app.get("/cbexample2",(req,res,next)=>{
//     console.log("First Callback")
//     next() //middleware
// },(req,res)=>{
//     console.log('Second Callback');
//     res.send("More than one callback")
// })

// An array of Callback functions

// const cb1 = (req,res,next)=>{
//     console.log('First Callback')
//     next();
// }
// const cb2 = (req,res,next)=>{
//     console.log('Second Callback')
//     next();
// }
// const cb3=(req,res)=>{
//     console.log('Third Callback')
//     res.send("An array of callback")
// }

// app.get("/anarray",[cb1,cb2,cb3])

// extra points
// all - means get,post,put,patch,delete 
// always write below request on last.
// app.all('*',(req,res)=>{
//     res.send('Page Not Found!')
// })

// For below code path is same but request is different here we can use Chained Route Callback
// app.get('/student',(req,res)=>{
//     res.send("Get all student")
// })
app.post('/student',(req,res)=>{
    res.send("Add student")
})
app.put('/student',(req,res)=>{
    res.send("Update student")
})

// Chained Route Callback

app.route('/student')
.get((req,res)=>{
    res.send("Get all student")
}).post((req,res)=>{
    res.send("Add student")
}).put((req,res)=>{
    res.send("Update student")
})