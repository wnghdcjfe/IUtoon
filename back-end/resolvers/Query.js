const { ObjectID } = require('mongodb');
const { BreakingChangeType } = require('graphql');

module.exports = {
    popularSong: async (parent,args,{ db }) => db.collection('Song').find().sort({"Seecount":-1}).limit(10).toArray(),
    titleSong: async (parent,args,{ db } ) => db.collection('Song').findOne({title:args.title}),
    idSong: async (parent,args,{ db } ) => db.collection('Song').findOne({id:args.id}),
    allSong: async (parent,args,{ db }) => db.collection('Song').find().toArray(),
    allAlbumList: async (parent,args,{ db }) => {
        const db_1 = await db.collection('Song').find().toArray();
        const s = new Set(); 
        let ret = []
        for(let i=0; i < db_1.length; i++){ 
            const reg = /\d+\집/g
            const nameData = db_1[i].albumInfo
            if(db_1[i].id >= 100){
                let names="";
                var strArray = db_1[i].albumInfo.split("");
                for(let j=0; j<strArray.length; j++){
                    if(strArray[j] == '글'){
                        for(let k=j+2; k<strArray.length; k++){
                            names += strArray[k]
                        }
                    }
                }
                if(!s.has(names)){
                    s.add(names)
                    ret.push({
                        name:names,
                        desc:db_1[i].albumInfo,
                        date:db_1[i].date
                    })
                }
            }
            const b = reg.exec(nameData)
            if(b === null) continue;     
            if(!s.has(b[0])){
                s.add(b[0])
                ret.push({
                    name:b[0],
                    desc:db_1[i].albumInfo,
                    date:db_1[i].date
                }) 
            }
        }
        return ret
    }
}