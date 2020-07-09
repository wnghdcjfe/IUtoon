# 아이유툰
안녕하세요. 아이유를 좋아하는 펜심에서 만들었습니다. 
마치 다음웹툰처럼 아이유의 곡들을 쉽게 볼 수 있는 UI, 머신러닝을 이용한 취향에 따른 아이유 곡 추천까지 해주는 웹애플리케이션입니다. 많은 이용 부탁드립니다. 

# url : http://아이유툰.com

# 개발자 
주홍철(그날 본 꽃의 이름을), 남승원(우린 아직도 모른다.)

# 참고링크
 - https://brunch.co.kr/@kakao-it/279
 - https://twitter.com/allofiu 

## 쿼리 

```js
`
// 앨범 1집, 2집.. 이런식으로 나오게 하는 것 왼쪽 사이드바
export const GET_ALL_ALBUMLIST = gql`
  query allAlbumList {
    name
    desc
    albumInfo
  }
`
//앨범에 해당하는 곡 정보들. 예를 들어 1집에 대한 곡들이 다 나와야 함. 
export const GET_ALBUM_SONG = gql`
  query allAlbumSongList {
    name
    album
    date
    albumImg 
  }
` 

// 곡
export const GET_SONG = gql`
  query song {
    id
    url
    title
    seecount
    lyrics
    album
    date
    albumInfo 
  }
`
//인기있는 음악 limit 10 까지 줘서 seecount 내림차순 limit 10
export const GET_POPULAR_SONG = gql`
  query song {
    name
    album
    date
    albumImg
  }
`
```

테스트 수정