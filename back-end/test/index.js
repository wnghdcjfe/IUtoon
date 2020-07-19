var fs = require('fs');
let data = fs.readFileSync('/Users/erolf0123/Downloads/song_meta.json','utf8');
const ans = JSON.parse(data)
const csv2json = require('../models/csv2json')
let date = fs.readFileSync('/Users/erolf0123/Downloads/test.json')
date = JSON.parse(date)
const csv = fs.readFileSync("../models/IU.csv", {encoding: 'utf-8'})
const { MongoClient } = require('mongodb')
require('dotenv').config()

const json = csv2json(csv, {parseNumbers: true});
let b = [] 
let end = []
const set = new Set();

console.log(process.env.DB_HOST)

for(let i=0; i<ans.length; i++){
    for(let j = 0; j<json.length; j++){
        if(json[j].title == ans[i].song_name && ans[i].artist_name_basket == "아이유" && !set.has(ans[i].song_name)){
            b.push({id : ans[i].id,name:json[j].title})
            set.add(ans[i].song_name)
            break
        }
    }
} 
const obj = {}
for(let i = 0; i<b.length; i++){
    for(let j = 0; j <date.length; j++){
        if(date[j].songs == undefined) continue
        for(let k = 0; k<date[j].songs.length; k++){
            if(b[i].id == date[j].songs[k]){
                if(date[j].tags){
                    if(!obj[b[i].name]){
                        obj[b[i].name] = {}; 
                        obj[b[i].name].tag = [];
                    }
                    obj[b[i].name].tag.push(...date[j].tags)
                }  
                break;
            }
        }
    }
}
console.log(1)
async function start(){
    console.log(2) 
    const client = await MongoClient.connect(
        process.env.DB_HOST,
        {
            useUnifiedTopology: true,
            useNewUrlParser : true,
        }
    )
    console.log(obj)
    const db = client.db()
    for(let it of set){   
        if(obj[it] && obj[it].tag)await db.collection('Song').updateOne({title:it},{$set:{'tags' :obj[it].tag }}) 
    } 
    console.log(`
        정상적으로 DB에 업데이트가 완료되었습니다.
    `)
}

start()
