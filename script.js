const questions = {
    general: {
      easy: [
        { q: "What color is the sky?", options: ["Blue", "Green", "Red", "Yellow"], answer: "Blue" },
        { q: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
        { q: "What is the capital of India?", options: ["Delhi", "Mumbai", "Kolkata", "Chennai"], answer: "Delhi" },
        { q: "Which animal is known as the 'King of the Jungle'?", options: ["Lion", "Elephant", "Tiger", "Leopard"], answer: "Lion" },
        { q: "What gas do plants breathe in?", options: ["Carbon Dioxide", "Oxygen", "Hydrogen", "Nitrogen"], answer: "Carbon Dioxide" },
        { q: "How many days in a leap year?", options: ["365", "366", "364", "367"], answer: "366" },
        { q: "Which ocean is the largest?", options: ["Pacific", "Atlantic", "Indian", "Arctic"], answer: "Pacific" },
        { q: "How many players in a cricket team?", options: ["11", "10", "9", "12"], answer: "11" },
        { q: "Which fruit is known for having its seeds on the outside?", options: ["Strawberry", "Apple", "Banana", "Mango"], answer: "Strawberry" },
        { q: "Which month has 28 or 29 days?", options: ["February", "April", "June", "September"], answer: "February" }
      ],
      hard: [
        { q: "Which country has the most pyramids?", options: ["Egypt", "Mexico", "Sudan", "Peru"], answer: "Sudan" },
        { q: "Which planet has the most moons?", options: ["Earth", "Jupiter", "Saturn", "Mars"], answer: "Saturn" },
        { q: "Which is the smallest bone in the human body?", options: ["Stapes", "Ulna", "Femur", "Tibia"], answer: "Stapes" },
        { q: "What is the currency of Japan?", options: ["Yuan", "Yen", "Won", "Dollar"], answer: "Yen" },
        { q: "Which gas is most abundant in the Earth’s atmosphere?", options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon Dioxide"], answer: "Nitrogen" },
        { q: "How many bones are in the adult human body?", options: ["206", "208", "210", "212"], answer: "206" },
        { q: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: "Ottawa" },
        { q: "Who painted the Mona Lisa?", options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Picasso"], answer: "Leonardo da Vinci" },
        { q: "Which continent has the most countries?", options: ["Asia", "Africa", "Europe", "South America"], answer: "Africa" },
        { q: "Which organ purifies our blood?", options: ["Liver", "Kidney", "Heart", "Lungs"], answer: "Kidney" }
      ]
    },
    tech: {
      easy: [
        { q: "What does HTML stand for?", options: ["HyperText Markup Language", "Hot Mail", "How To Make Links", "None"], answer: "HyperText Markup Language" },
        { q: "What does CSS stand for?", options: ["Color Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "None"], answer: "Cascading Style Sheets" },
        { q: "What is the use of JS?", options: ["Scripting", "Styling", "Markup", "Storage"], answer: "Scripting" },
        { q: "What tag is used for an image in HTML?", options: ["<img>", "<image>", "<pic>", "<src>"], answer: "<img>" },
        { q: "What symbol starts a class in CSS?", options: [".", "#", "@", "%"], answer: "." },
        { q: "Which extension is used for CSS files?", options: [".css", ".js", ".html", ".scss"], answer: ".css" },
        { q: "What is console.log used for?", options: ["Debugging", "Styling", "Designing", "Networking"], answer: "Debugging" },
        { q: "Which keyword is used to declare a variable in JS?", options: ["var", "val", "int", "let"], answer: "var" },
        { q: "HTML is considered as?", options: ["Markup Language", "Programming", "Styling", "Framework"], answer: "Markup Language" },
        { q: "What does API stand for?", options: ["Application Programming Interface", "Apple Program Instruction", "Abstract Processing Interface", "None"], answer: "Application Programming Interface" }
      ],
      hard: [
        { q: "What is the time complexity of quicksort?", options: ["O(n^2)", "O(n log n)", "O(n)", "O(log n)"], answer: "O(n log n)" },
        { q: "Which JavaScript method is used to parse JSON?", options: ["JSON.parse()", "JSON.stringify()", "parse.JSON()", "stringify.JSON()"], answer: "JSON.parse()" },
        { q: "What does DOM stand for?", options: ["Document Object Model", "Data Object Management", "Display Object Manager", "None"], answer: "Document Object Model" },
        { q: "What is closure in JS?", options: ["Function inside function", "Loop", "Conditional", "Scope leak"], answer: "Function inside function" },
        { q: "Which HTML5 element is used for video?", options: ["<video>", "<media>", "<vid>", "<movie>"], answer: "<video>" },
        { q: "Which operator is used for strict equality in JS?", options: ["===", "==", "=", "!=="], answer: "===" },
        { q: "Which function converts string to integer in JS?", options: ["parseInt()", "parseFloat()", "toString()", "Number()"], answer: "parseInt()" },
        { q: "Which method adds new items to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], answer: "push()" },
        { q: "Which tag is used for table rows?", options: ["<tr>", "<td>", "<th>", "<table>"], answer: "<tr>" },
        { q: "Which attribute specifies where to open a linked document?", options: ["target", "href", "src", "action"], answer: "target" }
      ]
    }
  };

  let currentQuiz = [];
  let currentIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 30;

  function startQuiz() {
    const category = document.getElementById("category").value;
    const difficulty = document.getElementById("difficulty").value;
    currentQuiz = questions[category][difficulty];
    currentIndex = 0;
    score = 0;
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    loadQuestion();
    startTimer();
  }

  function loadQuestion() {
    const q = currentQuiz[currentIndex];
    document.getElementById("question").textContent = q.q;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.classList.add("option");
      btn.onclick = () => {
        if (option === q.answer) score++;
        nextQuestion();
      };
      optionsDiv.appendChild(btn);
    });
  }

  function nextQuestion() {
    currentIndex++;
    if (currentIndex < currentQuiz.length) {
      loadQuestion();
      resetTimer();
    } else {
      showResults();
    }
  }

  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").textContent = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timer);
        nextQuestion();
      }
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById("timer").textContent = timeLeft;
    startTimer();
  }

  function showResults() {
    clearInterval(timer);
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    document.getElementById("summary").textContent = `You scored ${score} out of ${currentQuiz.length}`;
  }