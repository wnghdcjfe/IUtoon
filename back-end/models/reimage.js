const resizeImage = require('resize-image');


let img = new Image()

for(let i=1; i<=20; i++){
    img.onload= function(){
        var data = resizeImage.resize(img,200,100,resizeImage.png);
        console.log(data)
    };
    if(i<=10)img.src = "/Users/erolf0123/Desktop/web/IUtoon/back-end/models/"+i+".jpg";
    if(i>=11)img.src = "/Users/erolf0123/Desktop/web/IUtoon/back-end/models/"+i+".png";
}