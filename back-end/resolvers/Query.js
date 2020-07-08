const { ObjectID } = require('mongodb');
const { BreakingChangeType } = require('graphql');
const resizeImage = require('resize-image')
const change = (x) => {
    let see = String(x),a = "",b = "",cnt = 0
    for(let j=see.length-1; j>=0; j--){
        a+= see[j]
        cnt++;
        if(cnt%3 == 0 && j) a+=","
    } 
    for(let j=a.length-1; j>=0; j--) b += a[j]
    return b
}

const enbed = (x) => {
    let url = x
    let a = url.split("https://youtu.be/")
    let ret = "https://youtube.com/" + 'embed/' + a[1]; 
    return ret
}

const songDefault = ( db ) => {
    let ret = {
        title:db.title,
        url:enbed(db.url),
        seeCount:change(db.seeCount),
        lyrics:db.lyrics,  
        album:db.album,
        date:db.date,
        id:db.id,
        albumInfo:db.albumInfo,
        img:setImgPath(10, 10, "png")
    }
    return ret
}

const setImgPath = (from, to, type) => `http://localhost:12010/${(Math.floor( Math.random() * from)+to)}.${type}`

module.exports = {
    popularSong: async (parent,args,{ db }) => {
        const db_1 = await db.collection('Song').find().sort({"seeCount":-1}).limit(10).toArray();
        let ret = [];
        for(let i=0; i<db_1.length; i++) ret.push(songDefault(db_1[i]))
        return ret
    },
    titleSong: async (parent,args,{ db } ) => db.collection('Song').findOne({title:args.title}),
    song: async (parent,args,{ db } ) => {
        const db_1 = await db.collection('Song').findOne({title:args.name})
        let ret = songDefault(db_1);
        return ret
    },
    allSong: async (parent,args,{ db }) => db.collection('Song').find().toArray(),
    allAlbumSongList: async(parent,args,{ db }) => {
        const db_1 = await db.collection('Song').find().toArray()
        let ret = []
        for(let i=0; i<db_1.length; i++){
            let arrname = ""
            if(db_1[i].id>=100){
                const strArray = db_1[i].albumInfo.split("");
                let index = strArray.findIndex((item,idx) => {return item == "글"});
                for(let k=index+2; k<strArray.length; k++) arrname += strArray[k];
            }
            let b = [],reg=""
            if(i<99){
                reg = /\d+\집/g
                b = reg.exec(db_1[i].albumInfo)
            }
            if(b === null && db_1[i].id <= 99) continue;
            if(b[0] == args.name || arrname == args.name) ret.push({
                name:db_1[i].title,
                album:{
                    name:db_1[i].id >= 100 ? arrname : b[0],
                    desc:db_1[i].albumInfo,
                    date:db_1[i].date,
                    img:"http://localhost:12010/" + args.name + ".jpeg"
                },
                date:db_1[i].date,
                id:db_1[i].id,
                img:setImgPath(10, 10, "png")
            })
        }
        return ret
    },
    allAlbumList: async (parent,args,{ db }) => {
        const db_1 = await db.collection('Song').find().toArray();
        const s = new Set(); 
        let ret = []
        for(let i=0; i < db_1.length; i++){ 
            const reg = /\d+\집/g
            const nameData = db_1[i].albumInfo
            if(db_1[i].id >= 100){
                let names="";
                const strArray = nameData.split("");
                let index = strArray.findIndex((item,idx) => {return item == "글"});
                for(let i=index+2; i<strArray.length; i++) names+=strArray[i];
                if(!s.has(names)){
                    s.add(names)
                    ret.push({
                        name:names,
                        desc:nameData,
                        date:db_1[i].date,
                        img:"http://localhost:12010/" + names + ".jpeg"
                    })
                }
            } 
            const b = reg.exec(nameData)
            if(b === null) continue;    
            if(!s.has(b[0])){
                s.add(b[0])
                ret.push({
                    name:b[0],
                    desc:nameData,
                    date:db_1[i].date,
                    img:"http://localhost:12010/" + b[0] + ".jpg"  
                }) 
            }
        }
        return ret
    }
}