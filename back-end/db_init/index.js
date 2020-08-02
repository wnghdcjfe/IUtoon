const path = require('path')
const fs = require('fs');
const csv2json = require('../models/csv2json') 
const { MongoClient } = require('mongodb');
require('dotenv').config()
let songs = fs.readFileSync(path.resolve(__dirname, '..', 'models/song_meta.json'),'utf8');
let melon_test = fs.readFileSync(path.resolve(__dirname, '..', 'models/test.json'),'utf-8')
const csv = fs.readFileSync(path.resolve(__dirname, '..', 'models/IU.csv'), {encoding: 'utf-8'})


const iu_json = csv2json(csv, {parseNumbers: true})
const song_meta = JSON.parse(songs)
const test = JSON.parse(melon_test)

const song2id = () =>{
    const unique = new Set()
    for(let i=0; i<song_meta.length; i++){
        for(let j=0; j<iu_json.length; j++){
            if(iu_json[j].title == song_meta[i].song_name && song_meta[i].artist_name_basket == "아이유" && !unique.has(iu_json[j].title)){
                unique.add(iu_json[j].title) 
                iu_json[j].pk = song_meta[i].id
            }
        }
    }
}

const id2tags = () => { 
    iu_json.forEach(e =>{
        if(!e.pk) return;
        test.forEach(t =>{
            if(t.songs.some(song => song === e.pk)){
                if(!e.tags) e.tags = new Set(); 
                t.tags.forEach(tag => e.tags.add(tag)); 
            } 
        })
    })
    iu_json.forEach(e =>{
        if(e.tags)e.tags = [...e.tags];
    }) 
}

const tag2count = (db) => {
    const map = new Map(),set = new Set()
    for(let i=0; i<iu_json.length; i++){
        if(iu_json[i].tags == undefined) continue
        for(let j=0; j<iu_json[i].tags.length; j++){
            map[iu_json[i].tags[j]] = map[iu_json[i].tags[j]] ? map[iu_json[i].tags[j]] + 1 : 1
            if(!set.has(iu_json[i].tags[j])) set.add(iu_json[i].tags[j])
        }
    }

    for(let it of set){
        const arr = [{
            tag : it,
            count : map[it]
        }]
        db.collection('Tags').insertMany(arr)
    }
}

const start  = async() => {

    const client = await MongoClient.connect(
        process.env.DB_HOST,
        {
            useUnifiedTopology: true,
            useNewUrlParser : true,
        }
    ) 
    const db = client.db()
    song2id()
    id2tags()
    tag2count(db)
    db.collection('Song').insertMany(iu_json)
    console.log("db reset!")
}


start()