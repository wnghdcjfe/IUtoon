import React from 'react'; 

const 가사 = "        Everything's alright\nIf you hold me tight\n나는 괜찮아 너만 있으면\nLike a sunny day\nSuch a wonderful day\n내가 아는 넌 그런 사람인 걸\n\n좋은 날씨잖아\n약속도 없이 외로운 Holiday\n시간도 멈춰 있어\n괜히 짜증만 나\n이런 날 보고 어쩌란 말인지\n네가 없인 아무것도 안되잖아\n\nEverything's alright\nIf you hold me tight\n나는 괜찮아 너만 있으면\nLike a sunny day\nSuch a wonderful day\n내가 아는 넌 그런 사람인 걸\n\n여자 자존심에\n먼저 전화하긴 좀 그렇잖아\n지금도 난 기다려\n나를 잘 알잖아\n못 이기는 척 전화해주면 돼\n알면서 괜히 그래\n\nEverything's alright\nIf you hold me tight\n나는 괜찮아 너만 있으면\nLike a sunny day\nSuch a wonderful day\n내가 아는 넌 그런 사람인 걸\n\n우리가 지금까지 나눈 말\n뻔한 거짓말이 아니야\nEverything's alright\nIf you hold me tight\n나는 괜찮아 너만 있으면\n완전 보고 싶어 미치도록 말이야\n\nEverything's alright\nIf you hold me tight\n나는 괜찮아 너만 있으면\nLike a sunny day\nSuch a wonderful day\n\nEverything's alright\nIf you hold me tight\n나는 괜찮아 너만 있으면\nAfter day by day\nSoon a smiley day"
const line = data => data.split('\n').map( line => (<span>{line}<br/></span>)); 
const SongPage = () => {
  return (
      <>  
      <iframe width="100%" height="345" src="https://www.youtube.com/embed/V3fDY5zH9_g">
</iframe>
 
        <h1>A Dreamer</h1>
        <p>2009. 4. 23.</p>
        <p>정규 1집 Growing Up</p>
        <p>조회수 : 238233</p>
        <p><span>#아름다운</span></p>
        <p>
          {line(가사)}
        </p>
      </> 
  );
};

export default SongPage;
