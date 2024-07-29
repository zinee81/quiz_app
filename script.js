const quizData = [
  { question: "뉴진스 멤버가 아닌것은?", a: "하니", b: "민지", c: "원영", d: "혜인", correct: "c" },
  { question: "투바투 멤버가 아닌것은?", a: "연준", b: "용복", c: "범규", d: "태현", correct: "b" },
  { question: "이번 휴가는?", a: "집", b: "삼척", c: "부산", d: "전주", correct: "d" },
  { question: "심심할땐?", a: "자바스크립트", b: "html", c: "xd", d: "잠", correct: "d" },
];

// 라디오 버튼
const ansewerEls = document.querySelectorAll(".answer");
// 문제
const questionEl = document.getElementById("question");
// 보기
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
// 제출버튼
const submitBtn = document.getElementById("submit");
// 모든 요소를 자식으로 가지고 있는 부모 div
const div = document.getElementById("quiz");

let currentQuiz = 0;
// 점수
let score = 0;

// 첫번째 문제 출력
loadQuiz();

function loadQuiz() {
  dselectAnswer();
  const currentQuizDate = quizData[currentQuiz];
  // 태그에 질문값 넣기
  questionEl.textContent = currentQuizDate.question;
  // 보기 값 넣기
  a_text.textContent = currentQuizDate.a;
  b_text.textContent = currentQuizDate.b;
  c_text.textContent = currentQuizDate.c;
  d_text.textContent = currentQuizDate.d;
}

// input 태그의 체크 속성 초기화
function dselectAnswer() {
  ansewerEls.forEach((ansewerEls) => {
    ansewerEls.checked = false;
  });
}
// 선택된 라디오태그의 id값 가져오기
function getSelected() {
  let answer;

  ansewerEls.forEach((el) => {
    // el -> <input>
    // input태그에 checked속성이 ture라면 태그의 id값을 answer에 넣기
    if (el.checked) {
      answer = el.id;
    }
  });
  // answer 변수 반환
  return answer;
}

submitBtn.addEventListener("click", () => {
  // 선택된 보기 값
  const answer = getSelected();
  // 선택된 id값이 존재한다면 실행
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      // 선택한 값이 정답과 일치한다면
      // 점수 1점 추가
      score++;
    }
    // 문제 인덱스 1추가
    currentQuiz++;
    // 문제 개수가 index값보다 크다면
    if (currentQuiz < quizData.length) {
      // 퀴즈 불러오기 함수 호출
      loadQuiz();
    }
    // 문제를 다 풀었을때
    else {
      div.innerHTML = `<h2>총 ${score}/${quizData.length}개 맞추셨습니다.</h2>
      <button onclick='location.reload();'>다시하기</button>`;
    }
  }
});
