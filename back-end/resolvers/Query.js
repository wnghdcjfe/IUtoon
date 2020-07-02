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

const setImgPath = (from, to, type) => `http://localhost:12010/${(Math.floor( Math.random() * from)+to)}.${type}`


module.exports = {
    popularSong: async (parent,args,{ db }) => {
        const db_1 = await db.collection('Song').find().sort({"seeCount":-1}).limit(10).toArray();
        let ret = [];
        for(let i=0; i<db_1.length; i++){
            let jbRandom = Math.random();
            
            ret.push({
                title:db_1[i].title,
                url:enbed(db_1[i].url),
                seeCount:change(db_1[i].seeCount),
                lyrics:db_1[i].lyrics,
                album:db_1[i].album,
                date:db_1[i].date,
                id:db_1[i].id,
                albumInfo:db_1[i].albumInfo,
                img:"http://localhost:12010/" + (Math.floor( jbRandom * 10)+10) + ".png"
            })
        }
        return ret
    },
    titleSong: async (parent,args,{ db } ) => db.collection('Song').findOne({title:args.title}),
    song: async (parent,args,{ db } ) => {
        let ret =  {}
        const db_1 = await db.collection('Song').findOne({title:args.name})
        let jbRandom = Math.random();
        ret = {
            title:db_1.title,
            url:enbed(db_1.url),
            seeCount:change(db_1.seeCount),
            lyrics:db_1.lyrics,
            album:db_1.album,
            date:db_1.date,
            id:args.id,
            albumInfo:db_1.albumInfo,
            img:setImgPath(10, 20, "png")
         }
        return ret
    },
    allSong: async (parent,args,{ db }) => db.collection('Song').find().toArray(),
    allAlbumSongList: async(parent,args,{ db }) => {
        const db_1 = await db.collection('Song').find().toArray()
        let ret = []
        for(let i=0; i<db_1.length; i++){
            const reg = /\d+\집/g
            let jbRandom = Math.random();
            const titleName = db_1[i].albumInfo
            if(db_1[i].id>=100){
                let arrname = ""
                const strArray = titleName.split("");
                for(let j=0; j<strArray.length; j++){
                    if(strArray[j] == '글') {
                        for(let k=j+2; k<strArray.length; k++) arrname += strArray[k]
                        break;
                    }
                }
                if(arrname == args.name) ret.push({
                    name:db_1[i].title,
                    album:{
                        name:arrname,
                        desc:titleName,
                        date:db_1[i].date,
                        img:"http://localhost:12010/" + args.name + ".jpeg"
                    },
                    date:db_1[i].date,
                    id: db_1[i].id,
                    img:setImgPath(10, 20, "png")
                })
            }
            else{
                const b  = reg.exec(titleName)
                if(b === null) continue;
                if(b[0] == args.name) ret.push({
                    name:db_1[i].title,
                    album:{
                        name:b[0],
                        desc:titleName,
                        date:db_1[i].date,
                        img:"http://localhost:12010/" + args.name + ".jpeg"
                    },
                    date:db_1[i].date,
                    id:db_1[i].id,
                    img:setImgPath(10, 20, "png")
                })
             }
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
                for(let j=0; j<strArray.length; j++){
                    if(strArray[j] == '글'){
                        for(let k=j+2; k<strArray.length; k++) names += strArray[k];
                        break;
                    }
                }
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