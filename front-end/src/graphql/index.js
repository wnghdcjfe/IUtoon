import { gql } from 'apollo-boost';  
export const GET_POPULAR_SONG = gql`
query{
  popularSong{
    id 
    title
    seeCount
    albumInfo
    img 
    thumbImg
  }
}
`  

export const GET_ALL_ALBUMLIST = gql`
query {
  allAlbumList{
    name
    desc  
  } 
}
`   

export const GET_ALBUM_SONG = gql` 
query allAlbumSongList($name : String!){
  allAlbumSongList(name : $name){
    name
    img
    album{
      name
      desc
      img
    }
    date 
  } 
} 
` 

export const GET_SONG_BY_NAME = gql`
query song ($name : String!){
  song(name : $name){ 
    title
    url
    seeCount
    lyrics
    album
    date
    id
    albumInfo
    img 
    tags
  } 
}
`  
export const GET_SONGS_BY_TAGS = gql`
query songbyTag ($tags : [String!]){
  songbyTag(tags : $tags){ 
    title
    album
    url
    seeCount 
    date 
    albumInfo
    tags
  } 
}
`  

