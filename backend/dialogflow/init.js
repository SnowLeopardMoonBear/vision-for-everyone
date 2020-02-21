// dialogflow 인증과 세션 시작을 다루는 파일. 엔트리 js 파일인 index.js에서 require.

const dialogflow = require('dialogflow');
const uuid = require('uuid');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */

module.exports = async function runSample(textQuery) { //async await 함수 사용 모듈. 
  //프로젝트,세션 ID
  const projectId = 'vision-for-everyone-rnddgb'
  const sessionId = '234234234'
  // 새로운 세션 열기. 인증 정보 포함하는 DF 객체 생성, DF 객체 메서드로 통신 시작
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: './vision-for-everyone-rnddgb-55a2640e90e8.json'
  });
  // 빈 쿼리는 받지 않는닷!!
  if (!textQuery || !textQuery.length) {
    return;
  }
  // sessionClient의 Path 정보를 sessionPath에 넣는다
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  // 이런 형식의 JSON으로 df단에 메시지 전송!
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: textQuery, // 모듈에서 입력받은 textQuery를 request.queryInput.text.text에 넣어 전송한다.
        languageCode: 'en-US',
      },
    },
  };
  
  // Send request and log result
  const responses = await sessionClient.detectIntent(request); //DF에서 request 받아오길 기다렸다 response에 저장
  // console.log('Detected intent');
  const result = responses[0].queryResult; // 결과메시지 반환. 메시지 포맷 확인 필요!
  // console.log(`  Query: ${result.queryText}`);
  // console.log(`  Response: ${result.fulfillmentText}`);
  // if (result.intent) {
  //   console.log(`  Intent: ${result.intent.displayName}`);
  // } else {
  //   console.log(`  No intent matched.`);
  // }

  var response = result.fulfillmentText
  return response //response를 리턴. 이게 모듈 전체에서 반환하는 값. 이 모듈 require하는 index.js로 돌아가 해석 마저하기.
}



