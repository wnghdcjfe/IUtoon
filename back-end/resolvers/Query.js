const { ObjectID } = require('mongodb');
const { BreakingChangeType } = require('graphql');

module.exports = {
    popularSong: async (parent,args,{ db }) => {
        let jbRandom = Math.random();
        const db_1 = await db.collection('Song').find().sort({"Seecount":-1}).limit(10).toArray();
        let ret = [];
        console.log(db_1)
        for(let i=0; i<db_1.length; i++){
            ret.push({
                title:db_1[i].title,
                url:db_1[i].url,
                seeCount:db_1[i].seeCount,
                lyrics:db_1[i].lyrics,
                album:db_1[i].album,
                date:db_1[i].date,
                id:args.id,
                albumInfo:db_1[i].albumInfo,
                img:"back-end/IU-Image/" + (Math.floor( jbRandom * 10)+10) + ".png"
            })
        }
        return ret
    },
    titleSong: async (parent,args,{ db } ) => db.collection('Song').findOne({title:args.title}),
    song: async (parent,args,{ db } ) => {
        let ret =  {}
        let jbRandom = Math.random();
        const db_1 = await db.collection('Song').findOne({title:args.name})
        ret = {
            title:db_1.title,
            url:db_1.url,
            seeCount:db_1.seeCount,
            lyrics:db_1.lyrics,
            album:db_1.album,
            date:db_1.date,
            id:args.id,
            albumInfo:db_1.albumInfo,
            img:"back-end/IU-Image/" + (Math.floor( jbRandom * 10)+10) + ".png"
        }
        return ret
    },
    allSong: async (parent,args,{ db }) => db.collection('Song').find().toArray(),
    allAlbumSongList: async(parent,args,{ db }) => {
        const db_1 = await db.collection('Song').find().toArray()
        let ret = []
        let jbRandom = Math.random();
        for(let i=0; i<db_1.length; i++){
            const reg = /\d+\집/g
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
                        img:"back-end/IU-Image/" + args.name + ".jpeg"
                    },
                    date:db_1[i].date,
                    id: db_1[i].id,
                    img:"back-end/IU-Image/" + (Math.floor( jbRandom * 10)+10) + ".png"
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
                        img:"back-end/IU-Image/" + args.name + ".jpeg"
                    },
                    date:db_1[i].date,
                    id:db_1[i].id,
                    img:"back-end/IU-Image"/ + (Math.floor( jbRandom * 10)+10) + ".png"
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
                        img:"back-end/IU-Image/" + names + ".jpeg"
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
                    img:"back-end/IU-Image/" + b[0] + ".jpg"  
                }) 
            }
        }
        return ret
    }
}