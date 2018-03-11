class Survey {
  constructor() {
    const container = document.getElementById('form');

    this.correct = 0;
    this.incorrect = 0;
    this.stat = [];
    this.correctEl = document.getElementById('correct');
    this.incorrectEl = document.getElementById('incorrect');
    this.totalCorrectEl = document.getElementById('total-correct');
    this.totalIncorrectEl = document.getElementById('total-incorrect');
    this.totalCntEl = document.getElementById('total-cnt');
    this.total = {
      cnt: 0,
      correct: 0,
      incorrect: 0
    };

    window.survey.questions.forEach((q, key) => {
      container.appendChild(this.generateQuestion(q, key + 1));
    });

    this.addListener();
  }

  generateQuestion(q, key) {
    const question = document.createElement('div');
    const h4 = document.createElement('h4');

    question.setAttribute('class', 'question');
    h4.innerText = `${key}. ${q.question}`;
    question.appendChild(h4);
    q.answers.forEach((a, valKey) => {
      const isCorrect = q.correct.includes(valKey);
      question.appendChild(this.generateCheckbox(a, key, valKey, isCorrect));
    });

    return question;
  }

  generateCheckbox(answer, key, valKey, isCorrect) {
    const label = document.createElement('label');

    label.innerHTML = `<input type="checkbox" name="q${key}" value="${valKey}"/><span>${this.htmlEncode(answer)}</span>`;
    if (isCorrect) {
      label.setAttribute('class', 'correct');
    }

    return label;
  }

  htmlEncode(text) {
    return text.replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  addListener() {
    const labels = document.getElementsByTagName('label');
    for (let label of labels) {
      label.addEventListener('change', (e) => {
        if (e.currentTarget.className.includes('correct')) {
          if (e.srcElement.checked) {
            this.correct++;
          } else {
            this.correct--;
          }
        } else {
          if (e.srcElement.checked) {
            this.incorrect++;
          } else {
            this.incorrect--;
          }
        }
        this.redrawTable();
      });
    }

    const done = document.getElementById('done');
    done.addEventListener('click', (e) => {
      this.addStat();
      this.total.cnt++;
      this.total.correct += this.correct;
      this.total.incorrect += this.incorrect;
      this.correct = 0;
      this.incorrect = 0;
      this.redrawTable();
    });

    const dump = document.getElementById('dump');
    dump.addEventListener('click', (e) => {
      console.log(JSON.stringify(this.stat));
    });
  }

  redrawTable() {
    this.correctEl.innerText = this.correct;
    this.incorrectEl.innerText = this.incorrect;
    this.totalCorrectEl.innerText = this.total.correct;
    this.totalIncorrectEl.innerText = this.total.incorrect;
    this.totalCntEl.innerText = this.total.cnt;
  }

  addStat() {
    const checkedBoxes = document.querySelectorAll('input:checked');
    const out = {};
    checkedBoxes.forEach((cb) => {
      if (out[cb.name]) {
        out[cb.name].push(~~cb.value);
      } else {
        out[cb.name] = [~~cb.value];
      }
    });
    this.stat.push(out);
  }

}

let s = new Survey();
