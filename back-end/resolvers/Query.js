const { ObjectID } = require('mongodb')

module.exports = {
    test: () => "test!",
    popularSong: async (parent,args,{ db }) =>  db.collection('Song').find().sort({"seecount":1}).limit(10).toArray()
}