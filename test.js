import glob from 'glob'

glob("public/uploads/2020615/1592189770332.jpeg",(err, files)=>{
    files.forEach(function (f, index, arr) {
        console.log("f>>",f)
    });
})

