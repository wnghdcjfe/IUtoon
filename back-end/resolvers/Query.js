const { ObjectID } = require('mongodb');

const set = new Set(),set2 = new Set();
let getName = "" 
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
    let ret = "https://youtube.com/embed/" + a[1]; 
    return ret
}

const songDefault = async( db,collection ) => {
    const arr = [],brr = []
    for(let i = 0; i < collection.tags.length; i++){
        let info = await db.collection('Tags').findOne({tag:collection.tags[i]})

        arr.push({
            tag : info.tag,
            cnt : info.count
        })
    }
    arr.sort(function(a,b){
        return b['cnt'] - a['cnt'] 
    })
    for(let i=0; i<arr.length; i++){
        if(i == 10) break
        brr.push(arr[i].tag)
    }
    let ret = {
        title:collection.title,
        url:enbed(collection.url),
        seeCount:change(collection.seeCount),
        lyrics:collection.lyrics,  
        album:collection.album,
        date:collection.date,
        id:collection.id,
        albumInfo:collection.albumInfo,
        img:setImgPath(11, 20, "png"),
        thumbImg:setImgPath2(1,10,"png","p"),
        tags:brr
    }
    return ret
}

const albumDefault = ( collection ) => {
    let names = "",reg = /\d+\집/g,b = []
    if(collection.id >= 100){
        const strArray = collection.albumInfo.split("")
        let index = strArray.findIndex((item,idx) => {return item === "글"})
        for(let i=index+2; i<strArray.length; i++) names+=strArray[i]
    }
    else b = reg.exec(collection.albumInfo)
    if(b[0] === null) return null
    let col_name = collection.id >= 100 ? names : b[0]
    if(set.has(col_name)) return null
    let imgLink = collection.id >= 100 ? (`http://localhost:12010/${col_name}.jpeg`) : (`http://localhost:12010/${col_name}.jpg`)
    set.add(col_name)
    let ret = {
        name:col_name,
        desc:collection.albumInfo,
        date:collection.date,
        img:imgLink
    }
    return ret
}

const albumSong = ( collection ) => {
    let names = "",b = [], reg = /\d+\집/g,c="jpg"
    if(collection.id > 99){
        c="jepg"
        const strArray = collection.albumInfo.split("")
        let index = strArray.findIndex((item,idx) => {return item === "글"});
        for(let k=index+2; k<strArray.length; k++) names += strArray[k];
    }
    else b = reg.exec(collection.albumInfo)
    if(b[0] === null) return null
    names = collection.id > 99 ? names : b[0]
    if(names != getName) return null
    names = collection.id > 99 ? names : b[0][0]
    let ret = {
        name:collection.title,
        album:{
            names:names,
            desc:collection.albumInfo,
            date:collection.date,
            img:`http://localhost:12010/${names}.${c}`
        },
        date:collection.date,
        id:collection.id,
        img:setImgPath(11,20,"png")
    }
    return ret
}

const checkTags = ( collection,item ) => {
    let ret = []
    for(let i = 0; i<collection.length; i++){
        if(!collection[i].tags) continue
        for(let j = 0; j < collection[i].tags.length; j++){
            if(collection[i].tags[j] == item && !set2.has(collection[i].title)){
                set2.add(collection[i].title)
                ret.push(collection[i])
            }
        }
    }
    return ret
}

const setImgPath = (from, to, type) => `http://localhost:12010/${(~~( Math.random() * (to - from + 1) + from)) }.${type}`
const setImgPath2 = (from, to, type, p) => `http://localhost:12010/${p}${(~~( Math.random() * (to - from + 1) + from)) }.${type}`


module.exports = {
    popularSong: async (parent,args,{ db }) => {
        const db_1 = await db.collection('Song').find().sort({"seeCount":-1}).limit(10).toArray(); 
        return db_1.map(x => songDefault(x))    
    },
    titleSong: async (parent,args,{ db } ) => db.collection('Song').findOne({title:args.title}),
    song: async (parent,args,{ db } ) => songDefault(db,await db.collection('Song').findOne({title:args.name})),
    allSong: async (parent,args,{ db }) => db.collection('Song').find().toArray(),
    allAlbumSongList: async(parent,args,{ db }) => {
        const db_1 = await db.collection('Song').find().toArray()
        getName = args.name
        return db_1.map(x => albumSong(x)).filter(e => e)
    },
    allAlbumList: async (parent,args,{ db }) => {
        const db_1 = await db.collection('Song').find().toArray()
        set.clear()
        return db_1.map(x => albumDefault(x)).filter(e => e)
    },
    getSongTags: async(parent,args,{ db }) => {
        const db_1 = await db.collection('Song').find().toArray()
        set2.clear()
        let ret = []
        args.tags.forEach(item => {
            let k  = checkTags(db_1,item)
            for(let i=0; i<k.length; i++) ret.push(k[i])
        });
        return ret;
    },

}