var fs = require('fs')
const csv2json = require('../models/csv2json')
const path = require('path')
const UI_PATH = path.join(__dirname, "../models/IU.csv")
const csv = fs.readFileSync(UI_PATH, {encoding: 'utf-8'})
const { MongoClient } = require('mongodb')
require('dotenv').config()
const map = new Map()
const set = new Set()
async function start(){
    const client = await MongoClient.connect(
        process.env.DB_HOST,
        {
            useUnifiedTopology: true,
            useNewUrlParser : true,
        }
    )
    const db = client.db()
    const info = await db.collection('Song').find().toArray()
    for(let i = 0; i < info.length; i++){   
        if(!info[i].tags || info[i].tags == null) continue
        for(let j = 0; j < info[i].tags.length; j++){
            map[info[i].tags[j]] = map[info[i].tags[j]] ? map[info[i].tags[j]] + 1 : 1;
            if(!set.has(info[i].tags[j])) set.add(info[i].tags[j])
        }
    }
    for(let it of set){
        console.log(it)
        const arr = [{
            tag : it,
            count : map[it]
        }]
        db.collection('Tags').insertMany(arr)
        console.log(it + "db에 업데이트 성공")
    }
}

start()