class Stat {
  constructor(stat) {
    this.stat = stat;
    this.result = {};
    this.questions = new Map();
    this.students = [];
    this.resultGeneralEl = document.getElementById('result-general');
    this.resultHtmlEl = document.getElementById('result-html');
    this.resultCssEl = document.getElementById('result-css');
    this.resultStudentEl = document.getElementById('result-student');

    this.init();
    this.stat.students.forEach((student, studentId) => this.updateResult(student, studentId));
    this.doGraph();
    this.doStudents();
  }

  init() {
    window.survey.questions.forEach((q, key) => {
      this.questions.set(`q${key + 1}`, q);
    });

    for (let i = 1; i <= 35; i++) {
      let key = `q${i}`;
      this.result[key] = {correct: 0, incorrect: 0, topic: this.questions.get(key).topic};
    }
  }

  updateResult(answers, studentId) {
    let correct;
    let incorrect;
    let studentTotal = {
      correct: 0,
      incorrect: 0
    };
    for (let key in answers) {
      correct = [...this.intersection(answers[key], this.questions.get(key).correct)];
      incorrect = [...this.difference(answers[key], this.questions.get(key).correct)].length;
      if (this.questions.get(key).correct.length > 1) {
        incorrect += this.normaliseIncorrect(correct, this.questions.get(key).correct);
      }
      this.result[key].correct += correct.length;
      this.result[key].incorrect += incorrect;
      studentTotal.correct += correct.length;
      studentTotal.incorrect += incorrect;
    }
    this.students.push(studentTotal);
  }

  intersection(a, b) {
    const aa = new Set(a);
    const bb = new Set(b);

    return new Set([...aa].filter(x => bb.has(x)));
  }

  difference(a, b) {
    const aa = new Set(a);
    const bb = new Set(b);

    return new Set([...aa].filter(x => !bb.has(x)));
  }

  normaliseIncorrect(correct, question) {
    return (question.length > correct.length) ? question.length - correct.length : 0;
  }

  doGraph() {
    let correctTd;
    let incorrectTd;
    let row;
    let total, correct, incorrect;

    for (let key in this.result) {
      total = this.result[key].correct + this.result[key].incorrect;
      correct = Math.round((this.result[key].correct / total) * 100);
      incorrect = Math.round((this.result[key].incorrect / total) * 100);
      row = document.createElement('div');
      row.setAttribute('class', 'wrapper');
      row.innerHTML = `<div class="label">${key}.</div><div class="graph">
          <span class="correct" style="width: ${correct}%"> ${correct}%</span><span class="incorrect" style="width: ${incorrect}%;">${incorrect}% </span>
        </div>`;

      switch (this.questions.get(key).topic) {
        case 'general':
          this.resultGeneralEl.appendChild(row);
          break;
        case 'html':
          this.resultHtmlEl.appendChild(row);
          break;
        case 'css':
          this.resultCssEl.appendChild(row);
          break;
      }
    }
  }

  doStudents() {
    let correctTd;
    let incorrectTd;
    let row;
    let total, correct, incorrect;
    let key = 1;

    this.students.forEach((student) => {
      total = student.correct + student.incorrect;
      correct = Math.round((student.correct / total) * 100);
      incorrect = Math.round((student.incorrect / total) * 100);
      row = document.createElement('div');
      row.setAttribute('class', 'wrapper');
      row.innerHTML = `<div class="label">s${key}.</div><div class="graph">
          <span class="correct" style="width: ${correct}%"> ${correct}%</span><span class="incorrect" style="width: ${incorrect}%;">${incorrect}% </span>
        </div>`;

      this.resultStudentEl.appendChild(row);
      key++;
    });
  }

}