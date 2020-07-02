let url = "https://youtu.be/d9IxdwEFk1c"
let a = url.split("https://youtu.be/")
let ret = "https://youtube.com/" + 'embed/' + a[1]; 
console.log(ret) 