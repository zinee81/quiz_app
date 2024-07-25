// 1. getElementByid로 보기, 문제, 버튼 태그 가져오기
// 2. querySelectorAll로 라디오버튼 가져오기
// 3. 화면에 첫번째 문제의 보기와 제목을 보여주기 - 문제를 보여주는 코드를 함수로 묶어서 만들기
// 4. 버튼을 클릭했을 때 다음문제로 넘어가기 문제가 다음으로 바뀐다는 것 = quiz 배열의 인덱스값 증가
// 5. 선택된 input의 id값과 문제객체의 정답이 일치하는지 비교
// 6. 문제를 다 풀고나면 맞춘문제/전체문제 알려주기
// 7. 재시작버튼을 누르면 처음으로 돌아가기

const question = document.getElementById("question");
const label_a = document.getElementById("a_text");
const label_b = document.getElementById("b_text");
const label_c = document.getElementById("c_text");
const label_d = document.getElementById("d_text");
const submit = document.getElementById("submit");

const quizData = [
  { question: "뉴진스 멤버가 아닌것은?", a: "하니", b: "민지", c: "원영", d: "혜인", correct: "c" },
  { question: "투바투 멤버가 아닌것은?", a: "연준", b: "용복", c: "범규", d: "태현", correct: "b" },
  { question: "1 + 1은?", a: "1", b: "2", c: "3", d: "4", correct: "b" },
  { question: "2 + 2는?", a: "1", b: "2", c: "3", d: "4", correct: "d" },
];

let num = Number(localStorage.getItem("num") ?? 0);
localStorage.setItem("num", num);
let correctNum = Number(localStorage.getItem("correctNum") ?? 0);
localStorage.setItem("correctNum", correctNum);

const quizDiv = document.getElementById("quiz");

if (num < quizData.length) {
  quiz();
  submit.addEventListener("click", () => {
    const answer = document.querySelectorAll(".answer");
    // 변수 생성
    let selectedAnswer = {};
    answer.forEach((tag) => {
      // radio 버튼이 체크됐을 때 checked 속성 활성화
      if (tag.checked) {
        selectedAnswer = tag;
      }
    });
    // 선택된 라디오 버튼의 id 값과 quizData 배열 안 요소의 이름이 같은 객체 찾기
    let isTrue = quizData[num].correct === selectedAnswer.id;
    if (isTrue) {
      localStorage.setItem("correctNum", correctNum + 1);
    }
    localStorage.setItem("num", num + 1);
    location.reload();
  });
} else {
  quizDiv.innerHTML = "";
  const div = document.createElement("div");
  div.setAttribute("class", "quiz-header");
  const h2 = document.createElement("h2");
  h2.innerHTML = `You answered correctly at ${correctNum}/${quizData.length} questions`;
  div.appendChild(h2);
  quizDiv.appendChild(div);
  const button = document.createElement("button");
  button.id = "reload";
  button.addEventListener("click", () => {
    localStorage.setItem("num", 0);
    localStorage.setItem("correctNum", 0);
    location.reload();
  });
  button.innerHTML = "Reload";
  quizDiv.appendChild(button);
}

function quiz() {
  question.innerHTML = quizData[num].question;
  label_a.innerHTML = quizData[num].a;
  label_b.innerHTML = quizData[num].b;
  label_c.innerHTML = quizData[num].c;
  label_d.innerHTML = quizData[num].d;
}
