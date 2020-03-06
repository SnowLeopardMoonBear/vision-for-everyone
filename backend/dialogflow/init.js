// init.js는 dialogflow와 세션을 맺고 인증하는 코드. 엔트리 js 파일인 app.js가 불러옴.

const dialogflow = require('dialogflow');
const uuid = require('uuid'); //세션 열 때 필요한 uuid를 생성하는 모듈. 제대로 작동하지 않아 임시로 하나의 스트링을 사용. 지금은 사용 안 함.

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */

module.exports = async function runSample(msg) { //async await 함수 사용 모듈. export하여 상위 js파일에서 이용 가능케 함.
  //프로젝트,세션 ID. 코드에 노출하면 보안상 문제가 있으니 환경변수에 저장하도록 수정 계획.
  const projectId = 'vision-for-everyone-rnddgb';
  const sessionId = msg[1];
  console.log(sessionId);
  //DF 객체 메서드로 세션 열고 통신 시작. json으로 만든 인증정보 담김.
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: './vision-for-everyone-rnddgb-55a2640e90e8.json'
  });
  if (!msg[0] || !msg[0].length) { // 빈 쿼리는 받지 않음
    return;
  }
  
  // sessionPath 변수에 sessionClient의 Path 정보 넣는다
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  // 클라이언트단에서 메시지를 받아 아래 형식의 JSON으로 메시지 전송!
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: msg[0], // 모듈에서 입력받은 textQuery를 request.queryInput.text.text에 넣어 전송한다.
        languageCode: 'en-US',
      },
    },
  };
  
  // Send request and log result
  const responses = await sessionClient.detectIntent(request); //DF에서 request 받아오길 기다렸다 response에 저장
  // console.log('Detected intent');
  const result = responses[0].queryResult; // 결과메시지 반환. 메시지 포맷은 DF문서 참조.
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }

  var response = result.fulfillmentText
  return response //response를 리턴. 이게 모듈 전체에서 반환하는 값. 이 모듈 require하는 index.js로 돌아가 해석 마저하기.
}