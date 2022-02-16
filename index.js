const fs=require("fs")  // we required the file fs
let ext=require("./ext.js")  // we link the file ext.js
let {readFolder}=require("./organiser.js")  // we link the file organiser.js

let folder_to_be_organised=process.argv[2]   // process.argv is used to read the input from command line and the folder whose file we are targeting will be written

fs.mkdir("./organised_folder",err=>{  // here fs.mkdir will make a folder and will ake a callback function
    if(err){
        console.log("already exists");
        organize(folder_to_be_organised);  // here the function that will organize the files
    }else{
        organize(folder_to_be_organised);
    }
})

function organize(loc){
   Object.keys(ext).forEach(type=>{  //
       try{
           fs.mkdirSync(`./organised_folder/${type}`)  // here it will make the folder for each and every extension
           console.log("folder created");
       }catch(err){
            console.log("already exists");
       }
   })
   readFolder(__dirname+"\\"+loc)     // now readfolder will be invocated
   fs.writeFileSync("test.json",JSON.stringify(ext))  // now the file will be written and JSON.stringify will convert the object into the string
}