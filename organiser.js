// let path = require("path")
const fs = require("fs");
let ext=require("./ext.js")
let path=require("path");


function isFolder(path_string){
    return fs.lstatSync(path_string).isDirectory();   // fs.lstatSync will check the folder and give us the folder
}

function organizeFolder(loc){
    let extension=path.extname(loc).split(".")[1];   // path.extname will give the extensions of the files in the folder
    let filename=path.basename(loc);  // it will give the filename
    if(ext.audio.extensions.includes(extension)){  // it will check whether the extension exists in the int object
        fs.copyFileSync(loc,`./organised_folder/audio/${filename}`) // it will copy the file in the folder in organised folder
        ext.audio.count++;  // the count of the files has been increased
    }else if(ext.documents.extensions.includes(extension)){
        fs.copyFileSync(loc,`./organised_folder/documents/${filename}`)
        ext.documents.count++;
    }
    else if(ext.video.extensions.includes(extension)){
        fs.copyFileSync(loc,`./organised_folder/video/${filename}`)
        ext.video.count++;
    }else{
        fs.copyFileSync(loc,`./organised_folder/others/${filename}`)
        ext.others.count++;
    }

}


function readFolder(loc){
   let files= fs.readdirSync(loc);   // here path has been added to the files(array) 
   files.forEach(file=>{
       if(isFolder(loc+"\\"+file)){  // here recursion is used to get the path of the folder inside the folder
           readFolder(loc+"\\"+file);
       }else{
           organizeFolder(loc+"\\"+file)  // the condition will run when there is no folder will be found in directory
       }
   })
}

// readFolder(__dirname+"\\"+"files")

module.exports={ // the readfolder function has been exported to index.js 
    readFolder
}