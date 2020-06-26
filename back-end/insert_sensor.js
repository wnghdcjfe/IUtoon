// Node packages for file system
const { ObjectID } = require('mongodb')
require('dotenv').config()
var fs = require('fs');
const csv2json = require('./models/csv2json')

const csv = fs.readFileSync("./models/IU.csv", {encoding: 'utf-8'})


const json = csv2json(csv, {parseNumbers: true});

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

    for(let i = 0; i<140; i++){
        if(json[i]){
            const info=[{
                id:json[i].Id,
                title:json[i].Title,
                url:json[i].Url,
                seeCount:json[i].Seecount,
                lyrics:json[i].Lyrics,
                album:json[i].Album,
                date:json[i].Date,
                albumInfo:json[i].Album_info
            }]
            await db.collection('Song').insertMany(info)
            console.log("up" + i)
        }
    }
    
}

start()
