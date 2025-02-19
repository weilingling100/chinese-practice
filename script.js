document.addEventListener("DOMContentLoaded", function () {
  // 显示复习内容
  function startReview() {
    document.getElementById("review-section").style.display = "block";
  }
  window.startReview = startReview; // 让 HTML 按钮调用这个函数

  // 实现拖拽匹配功能
  const draggables = document.querySelectorAll(".draggable");
  const droppables = document.querySelectorAll(".droppable");

  draggables.forEach((item) => {
    item.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text", event.target.id);
    });
  });

  droppables.forEach((item) => {
    item.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    item.addEventListener("drop", (event) => {
      event.preventDefault();
      const draggedId = event.dataTransfer.getData("text");
      const draggedElement = document.getElementById(draggedId);

      if (item.getAttribute("data-match") === draggedId) {
        item.innerHTML = draggedElement.innerHTML; // 正确匹配
        item.style.backgroundColor = "lightgreen";
        draggedElement.style.display = "none"; // 隐藏已匹配项
      } else {
        item.style.backgroundColor = "red"; // 错误匹配
        setTimeout(() => {
          item.style.backgroundColor = ""; // 恢复原样
        }, 1000);
      }
    });
  });

  // 数字理解部分——检查答案
  function submitReview() {
    let correct = 0;

    const answers = {
      "number-q1": "五",
      "number-q2": "9",
      "number-q3": "七",
      "number-q4": "6",
      "number-q5": "二",
    };

    Object.keys(answers).forEach((id) => {
      const select = document.getElementById(id);
      if (select.value === answers[id]) {
        select.style.backgroundColor = "lightgreen";
        correct++;
      } else {
        select.style.backgroundColor = "red";
      }
    });

    alert(`You got ${correct} out of 5 correct!`);
  }
  window.submitReview = submitReview;
});
function submitReview() {
  let score = 0;
  let total = 0;

  // **匹配汉字和拼音**
  document.querySelectorAll("#pinyin .droppable").forEach((item) => {
    const matchWord = item.getAttribute("data-match");
    const draggedWord = item.dataset.dropped; // 获取拖进去的单词
    if (matchWord === draggedWord) {
      score++;
    }
    total++;
  });

  // **匹配汉字和英文**
  document.querySelectorAll("#meanings .droppable").forEach((item) => {
    const matchWord = item.getAttribute("data-match");
    const draggedWord = item.dataset.dropped;
    if (matchWord === draggedWord) {
      score++;
    }
    total++;
  });

  // **匹配对话**
  document.querySelectorAll("#answers .droppable").forEach((item) => {
    const matchWord = item.getAttribute("data-match");
    const draggedWord = item.dataset.dropped;
    if (matchWord === draggedWord) {
      score++;
    }
    total++;
  });

  // **匹配数字**
  document.querySelectorAll("#pinyin-numbers li").forEach((item) => {
    const correct = {
      "一": "yī",
      "二": "èr",
      "三": "sān",
      "四": "sì",
      "五": "wǔ"
    };
    if (correct[item.textContent] === item.dataset.dropped) {
      score++;
    }
    total++;
  });

  // **选择题**
  const correctAnswers = {
    "number-q1": "五",
    "number-q2": "9",
    "number-q3": "七",
    "number-q4": "6",
    "number-q5": "二"
  };
  for (let id in correctAnswers) {
    let userAnswer = document.getElementById(id).value;
    if (userAnswer === correctAnswers[id]) {
      score++;
    }
    total++;
  }

  // **显示得分**
  let resultMessage = `🎉 你的得分：${score} / ${total} 🎉`;
  document.body.innerHTML += `<h2 style="text-align:center;">${resultMessage}</h2>`;

  // **存储到 Google 表单（可选）**
  let studentName = prompt("请输入你的姓名（用于提交成绩）：");
  if (studentName) {
    let formURL = "https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/formResponse";
    let data = new FormData();
    data.append("entry.YOUR_NAME_FIELD", studentName);
    data.append("entry.YOUR_SCORE_FIELD", score);

    fetch(formURL, {
      method: "POST",
      body: data,
      mode: "no-cors"
    }).then(() => {
      alert("成绩已提交！");
    }).catch(() => {
      alert("提交失败，请手动报告分数！");
    });
  }
}
