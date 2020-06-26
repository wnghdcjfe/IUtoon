const​ mongoose = ​require​(​'mongoose')​ ; 
const​ Schema = mongoose.Schema; 
const​ sensorSchema = ​new​ Schema({ 
    id: ​Number​,
    Url: String,
    Seecount: Number, 
    Lyrics: String, 
    Album : String,
    Date: String,
    Album_info:String
    });
    module​.exports = mongoose.model(​'Sensor'​, sensorSchema);