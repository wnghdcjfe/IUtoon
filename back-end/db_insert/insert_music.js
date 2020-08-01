// Node packages for file system
const { ObjectID } = require('mongodb')
require('dotenv').config()
var fs = require('fs');
const csv2json = require('../models/csv2json')
let data = fs.readFileSync('../models/song_meta.json','utf8');
let date = fs.readFileSync('../models/test.json','utf-8')
date = JSON.parse(date)
const ans = JSON.parse(data)
const csv = fs.readFileSync("../models/IU.csv", {encoding: 'utf-8'})

const map123 = new Map()
const set123 = new Set()

const json = csv2json(csv, {parseNumbers: true});

let b = [] 
let end = []
const set = new Set();

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

const { MongoClient } = require('mongodb')
async function start(){


    const client = await MongoClient.connect(
        process.env.DB_HOST,
        {
            useUnifiedTopology: true,
            useNewUrlParser : true,
        }
    ) 
    const db = client.db()
    await db.collection('Song').insertMany(json)
    for(let it of set){   
        if(obj[it] && obj[it].tag)await db.collection('Song').updateOne({title:it},{$set:{'tags' :obj[it].tag }}) 
    } 
    console.log(`
        정상적으로 DB에 삽입이 완료되었습니다.
    `)

    const info = await db.collection('Song').find().toArray()
    for(let i = 0; i < info.length; i++){   
        if(!info[i].tags || info[i].tags == null) continue
        for(let j = 0; j < info[i].tags.length; j++){
            map123[info[i].tags[j]] = map123[info[i].tags[j]] ? map123[info[i].tags[j]] + 1 : 1;
            if(!set123.has(info[i].tags[j])) set123.add(info[i].tags[j])
        }
    }
    for(let it of set123){
        console.log(it)
        const arr = [{
            tag : it,
            count : map123[it]
        }]
        db.collection('Tags').insertMany(arr)
        console.log(it + "db에 업데이트 성공")
    }
}

start()
