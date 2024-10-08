const express = require("express")
const app = express()
const path = require("path")
const fs =require("fs")
const { isUtf8 } = require("buffer")




app.use (express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"Public")))

app.get("/",(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render("index",{files:files})
    })

})
app.get("/files/:filename",(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
        res.render("show",{filename:req.params.filename,filedata:filedata})
    })
})
app.get("/edit/:filename",(req,res)=>{
    res.render("edit",{filename:req.params.filename})
})
app.post("/edit",(req,res)=>{
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.New}.txt`,(err)=>{
        res.redirect("/")
    })
})
app.post("/create",(req,res)=>{
   fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details,(err)=>{
        res.redirect("/")
   });
})

app.get("/delete/:id",(req,res)=>{
    fs.unlink(`./files/${req.params.id}`,(err)=>{
        res.redirect("/")
    })
})

app.listen(2001,()=>{
    console.log("it's running");
    
})