const path = require('path')
const fs = require('fs'); 
const { MongoClient } = require('mongodb');
require('dotenv').config()
const start  = async() => {

    const client = await MongoClient.connect(
        process.env.DB_HOST,
        {
            useUnifiedTopology: true,
            useNewUrlParser : true,
        }
    ) 
    const db = client.db() 
    let songs = fs.readFileSync(path.resolve(__dirname, '..', 'models/real_song.json'),'utf8');
    let tags = fs.readFileSync(path.resolve(__dirname, '..', 'models/real_tag.json'),'utf-8')  
    db.collection('Song').insertMany(JSON.parse(songs)) 
    tags = JSON.parse(tags);
    for(let it of tags){  
        db.collection('Tags').insertMany(it)
    } 
    console.log(`
        DB 초기화가 완료되었습니다.
    `)
}


start()