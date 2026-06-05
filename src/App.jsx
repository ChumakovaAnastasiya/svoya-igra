const { useEffect, useMemo, useState } = React;

function Icon({ name, className = "" }) {
  const icons = {
    trophy: "🏆",
    reset: "↻",
    users: "👥",
    eye: "👁",
    check: "✓",
    x: "×",
    skip: "↷",
    crown: "♛",
    next: "›",
    prev: "‹",
    home: "⌂",
    settings: "⚙",
    undo: "↶",
  };
  return (
    <span className={`inline-flex items-center justify-center leading-none ${className}`} aria-hidden="true">
      {icons[name] || "•"}
    </span>
  );
}

function Button({ children, onClick, disabled = false, className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 transition disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function makeId() {
  return `player-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cls(...classes) {
  return classes.filter(Boolean).join(" ");
}

function question(value, text, answer, extra = {}) {
  return { value, question: text, answer, ...extra };
}

function category(title, questions) {
  return { title, questions };
}

const gameData = {
  title: "Своя игра: Party Edition",
  rounds: [
    {
      title: "Раунд 1",
      values: [100, 200, 300, 400, 500],
      categories: [
        category("Древний Рим", [
          question(100, "На берегах этой реки расположен Рим", "Тибр"),
          question(
            200,
            "В фильме о приключениях Астерикса и Обеликса галлы грабят римскую казну. Говоря о том, что нужно сделать во избежание возмездия, один из персонажей употребляет устойчивое выражение. Какое?",
            "Цезарю Цезарево (кесарю кесарево)"
          ),
          question(
            300,
            "В римском календаре так назывался день в середине месяца, а американский писатель Торнтон Уайлдер назвал свою книгу о Цезаре мартовские ОНИ",
            "Иды"
          ),
          question(
            400,
            "Герой фильма «Орел Девятого легиона» отличал врагов по характерному шраму от ИКСА. Герой фильма «Астерикс и Обеликс против Цезаря» получил необычный именинный торт со свечками, закрепленными на ИКСАХ. Назовите ИКС максимально точно.",
            "Шлем римского легионера (римский шлем, шлем легионера)"
          ),
          question(
            500,
            "Этот акроним и аббревиатуру латинской фразы изображали на штандартах римских легионов, а сейчас используют в гербе города Рима, на многих городских зданиях и люках",
            "SPQR (Senatus Populus Quiritium Romanus)"
          ),
        ]),
        category("Алкоголь", [
          question(100, "Что измеряет IBU и ABV?", "Горечь и алкоголь"),
          question(200, "Как называется пророщенное и высушенное зерно?", "Солод"),
          question(300, "Главное отличие виски от бурбона", "Кукуруза (или более полный ответ: бурбон - это виски с кукурузной основой более 51%)"),
          question(400, "Ареометр - это измерительный прибор чего?", "Плотность жидкости"),
          question(500, "Naranja Liqueur - это ликер с каким вкусом?", "Апельсин"),
        ]),
        category("Города-призраки", [
          question(200, "Определите страну по фото.", "Украина", { image: "src/question-media/round1/ghost-cities/100.png" }),
          question(200, "Определите страну по фото.", "Абхазия", { image: "src/question-media/round1/ghost-cities/200.png" }),
          question(200, "Определите страну по фото.", "Япония", { image: "src/question-media/round1/ghost-cities/300.png" }),
          question(200, "Определите страну по фото.", "Италия", { image: "src/question-media/round1/ghost-cities/400.png" }),
          question(200, "Определите страну по фото.", "Россия", { image: "src/question-media/round1/ghost-cities/500.png" }),
        ]),
        category("Алексеи", [
          question(100, "Деятель Интернета и поэт Леха Андреев как-то раз написал трехстишие, в котором сказал, что ОНА протягивает вертолету стаканчик мороженого. Как мы называем ЕЕ?", "Статуя Свободы"),
          question(200, "В каком городе находится аэропорт имени Леха Валенсы?", "Гданьск"),
          question(300, "В детстве будущий гроссмейстер Александр АлЕхин часто сидел в своей комнате, всецело поглощенный шахматами. По этой причине он получил прозвище, которое объединяло его с русским царем. Каким именно царем?", "Алексей Михайлович Романов (Тишайший)"),
          question(400, "Если верить старому компьютерному переводчику «Сократ 97», любого Алексея по-английски можно назвать «Wooden goblin» (что, в свою очередь, на русский переводится этой программой как «Деревянный гном»). За название какого русского фольклорного персонажа программа принимает имя «Леша»?", "Леший"),
          question(500, "Вернувшись на родину, опальный царевич Алексей Петрович узнает, что у его любовницы случился выкидыш. Алексей предполагает, что его ребенок может попасть в АЛЬФУ, а спустя некоторое время и сам попадает в БЕТУ. Слово «АЛЬФА» получится добавлением к слову «БЕТА» пяти букв. Назовите оба этих слова.", "Кунсткамера, камера"),
        ]),
        category("Я знаю этого шляхтича", [
          question(100, "Кто на фото?", "Ян Птачек", { image: "src/question-media/round1/shlyahtich/100.png" }),
          question(200, "Кто на фото?", "Комар", { image: "src/question-media/round1/shlyahtich/200.png" }),
          question(300, "Кто на фото?", "Стас и Михайло или Джордж и Майкл", { image: "src/question-media/round1/shlyahtich/300.png" }),
          question(400, "Кто на фото?", "Мельник Пешек", { image: "src/question-media/round1/shlyahtich/400.png" }),
          question(500, "Кто на фото?", "Фрицек", { image: "src/question-media/round1/shlyahtich/500.png" }),
        ]),
        category("Максимы", [
          question(100, "Африканцы из племени матабЕле впервые столкнулись с НИМ в конце XIX века и назвали ЕГО «скокакОка». Рассказывая о НЕМ, африканцы вспоминали, как небеса иногда плюются градом. Назовите ЕГО максимально точно.", "Пулемет Максим (Максим)"),
          question(200, "Под известные следствию приметы ангарского маньяка подходило очень много людей. Саша Сулим считает, что, если бы не ОНА, то маньяка Михаила Попкова арестовали бы гораздо раньше. Максим Горький не стал обращаться в госорганы и носил ЕЕ до конца жизни. Что такое ОНА?", "Фамилия на букву П"),
          question(300, "Журнал «Максим» в каждом номере публикует придуманный в редакции «Десктоп интересного человека». На десктопе ЭТОГО человека открыта программа MyHeritage, которая ищет похожих на пользователей знаменитостей по фото. Среди похожих оказались Алексей Венедиктов, Хагрид, Лев Толстой, гном Гимли. Лидером же стал Чубакка, похожий на ЭТОГО человека на 110%. Назовите фамилию ЭТОГО человека.", "Вассерман"),
          question(400, "На состоявшийся в 1933 году поединок с Максом Шмелингом смелый боксер Макс Бэр вышел в трусах, на которых красовалась ОНА. Изобразите ЕЕ в своем ответе.", "Звезда Давида"),
          question(500, "«ЕГО» режиссёр, работая в семидесятые в скорой помощи, повидал много пострадавших в авариях лихачей. Сыгравший ЕГО актёр позже снял фильм, который доцент Мезоамериканского центра имени Кнорозова назвал «ИМ» по-майянски. Назовите ЕГО.", "Безумный Макс"),
        ]),
      ],
    },
    {
      title: "Раунд 2",
      values: [200, 400, 600, 800, 1000],
      categories: [
        category("Империи", [
          question(200, "Какая империя была восточным продолжением Римской империи?", "Византия"),
          question(400, "Какая империя взяла Константинополь в 1453 году?", "Османская империя"),
          question(600, "Какая империя была крупнейшей по непрерывной территории в истории?", "Монгольская империя"),
          question(800, "Какая империя управлялась династией Габсбургов и распалась после Первой мировой войны?", "Австро-Венгрия"),
          question(1000, "Какая империя называла Индию «жемчужиной короны»?", "Британская империя"),
        ]),
        category("Государство и хаос", [
          question(200, "Как называется отсутствие работающей центральной власти?", "Анархия"),
          question(400, "Как называется насильственный или незаконный захват власти?", "Переворот"),
          question(600, "Как называется государство, которое формально существует, но плохо контролирует территорию и институты?", "Несостоявшееся государство"),
          question(800, "Как называется период после падения старой власти, когда новая ещё не контролирует ситуацию?", "Вакуум власти"),
          question(1000, "Как называется ситуация, когда в стране одновременно претендуют на власть два центра силы?", "Двоевластие"),
        ]),
        category("История, которую придумал пьяный сценарист", [
          question(200, "Какая птица стала противником армии Австралии в 1932 году?", "Эму"),
          question(400, "Какое животное Калигула, по слухам, хотел возвысить до политического статуса?", "Конь"),
          question(600, "Какой фрукт в Европе когда-то был настолько дорогим, что его арендовали для вечеринок?", "Ананас"),
          question(800, "В какой стране людей массово мобилизовали против воробьёв как врагов урожая?", "Китай"),
          question(1000, "Кого в Средневековой Европе иногда могли судить почти как людей?", "Животных"),
        ]),
        category("Интернет-культура", [
          question(200, "Как называется человек, который провоцирует конфликт ради реакции?", "Тролль"),
          question(400, "Как называется быстро распространяющаяся картинка, фраза или видео?", "Мем"),
          question(600, "Как называется массовое публичное осуждение человека или бренда в интернете?", "Кэнселинг"),
          question(800, "Как называется эффект, когда попытка скрыть информацию только делает её популярнее?", "Эффект Стрейзанд"),
          question(1000, "Как называется информационный пузырь, где человек видит в основном мнения, похожие на свои?", "Эхо-камера"),
        ]),
        category("Взрослые решения", [
          question(200, "Как называется денежный запас на случай увольнения, болезни или внезапного «жизнь решила иначе»?", "Подушка безопасности"),
          question(400, "Как называется регулярный платёж за жильё, который каждый месяц напоминает, что ты взрослый?", "Коммуналка"),
          question(600, "Как называется официальный возврат части уплаченного налога?", "Налоговый вычет"),
          question(800, "Как называется ситуация, когда человек берёт новый кредит, чтобы закрыть старый на других условиях?", "Рефинансирование"),
          question(1000, "Как называется ситуация, когда доходы растут, расходы тоже растут, а денег всё равно не становится больше?", "Инфляция образа жизни"),
        ]),
        category("Закон, абсурд и человеческая глупость", [
          question(200, "Как называется принцип: человек невиновен, пока его вина не доказана?", "Презумпция невиновности"),
          question(400, "Кого в Средневековой Европе могли судить в настоящем суде за вред людям или урожаю?", "Животных"),
          question(600, "Как называется противоречие между двумя правовыми нормами?", "Правовая коллизия"),
          question(800, "Как называется использование закона не ради справедливости, а как оружия против человека?", "Правовой произвол"),
          question(1000, "Как называется злоупотребление правом, когда человек формально действует законно, но по сути вредительски?", "Шикана"),
        ]),
      ],
    },
    {
      title: "Раунд 3",
      values: [300, 600, 900, 1200, 1500],
      categories: [
        category("Холодная война", [
          question(300, "Как называлась гонка между СССР и США за первенство в космосе?", "Космическая гонка"),
          question(600, "Как назывался страх перед проникновением коммунистов в США в 1950-е годы?", "Маккартизм"),
          question(900, "Как назывался кризис 1962 года, когда мир оказался близко к ядерной войне?", "Карибский кризис"),
          question(1200, "Как называлась символическая граница между Восточной и Западной Европой?", "Железный занавес"),
          question(1500, "Как называлась политика снижения напряжённости между СССР и США в 1970-е годы?", "Разрядка"),
        ]),
        category("Тёмные страницы истории", [
          question(300, "Как называлась система лагерей принудительного труда в СССР?", "ГУЛАГ"),
          question(600, "Как называлась политика расовой сегрегации в ЮАР?", "Апартеид"),
          question(900, "Как называлась массовая кампания политических репрессий в СССР 1937–1938 годов?", "Большой террор"),
          question(1200, "Как назывались публичные судебные процессы, где итог часто был известен заранее?", "Показательные процессы"),
          question(1500, "Как называлась кампания в Китае 1966–1976 годов, сопровождавшаяся массовыми чистками и борьбой со «старым»?", "Культурная революция"),
        ]),
        category("Стратегия и власть", [
          question(300, "Как звучит принцип «разделяй и властвуй» на латыни?", "Divide et impera"),
          question(600, "Как называется союз не из дружбы, а против общего противника?", "Временный союз"),
          question(900, "Как называется постепенное расширение влияния без открытого конфликта?", "Ползучая экспансия"),
          question(1200, "Как называется политика лавирования между несколькими центрами силы?", "Многовекторность"),
          question(1500, "Как называется ситуация, когда слабый игрок выживает, сталкивая между собой сильных?", "Баланс сил"),
        ]),
        category("Моральный выбор", [
          question(300, "Как называется выбор между двумя плохими вариантами?", "Дилемма"),
          question(600, "Как называется подход: лучше спасти больше людей, даже если решение неприятное?", "Утилитаризм"),
          question(900, "Как называется подход: нельзя нарушать принцип, даже ради хорошего результата?", "Деонтология"),
          question(1200, "Как называется внутренний конфликт между выгодой и правильным поступком?", "Моральный конфликт"),
          question(1500, "Как называется ситуация, когда человек «ничего не сделал», но именно это и стало выбором?", "Бездействие"),
        ]),
        category("Поп-культура и культовые штуки", [
          question(300, "Из какого фильма фраза «I’ll be back» стала культовой?", "Терминатор"),
          question(600, "Какой сериал сделал фразу «Winter is coming» массово узнаваемой?", "Игра престолов"),
          question(900, "Какой фильм популяризировал красную и синюю таблетки как символ выбора реальности?", "Матрица"),
          question(1200, "Как называется корпорация из «Чужого», которая стабильно доказывает, что прибыль для неё важнее людей?", "Weyland-Yutani"),
          question(1500, "В каком фильме герой живёт в идеальном телешоу, не зная, что вся его жизнь — декорация?", "Шоу Трумана"),
        ]),
        category("Друзья, которых мы заслужили", [
          question(300, "Кто из компании первым станет лидером группы, даже если никто его не назначал?", "Имя игрока"),
          question(600, "Кто в споре будет звучать уверенно, даже если вообще не понял тему?", "Имя игрока"),
          question(900, "Кто из компании был бы самым опасным владельцем маленького медиа-холдинга?", "Имя игрока"),
          question(1200, "Кто в кризисе скажет «спокойно», но уже мысленно всех распределил по ролям?", "Имя игрока"),
          question(1500, "Кто из компании стал бы серым кардиналом, потому что открыто править слишком утомительно?", "Имя игрока"),
        ]),
      ],
    },
  ],
  finalRound: {
    availableCategories: [
      { title: "Империя", question: "Финальный тестовый вопрос по теме «Империя»", answer: "Финальный тестовый ответ" },
      { title: "Власть", question: "Финальный тестовый вопрос по теме «Власть»", answer: "Финальный тестовый ответ" },
      { title: "Катастрофа", question: "Финальный тестовый вопрос по теме «Катастрофа»", answer: "Финальный тестовый ответ" },
      { title: "Логика", question: "Финальный тестовый вопрос по теме «Логика»", answer: "Финальный тестовый ответ" },
      { title: "Личный вопрос", question: "Финальный тестовый личный вопрос", answer: "Финальный тестовый ответ" },
    ],
  },
};

const initialState = {
  screen: "start",
  players: [],
  currentRoundIndex: 0,
  usedQuestions: {},
  selectedQuestion: null,
  showAnswer: false,
  lastClosedQuestion: null,
  finalCategory: null,
  finalBets: {},
  finalResults: {},
  finalAnswerShown: false,
  history: [],
};

const partyPhotoFlags = [
  { src: "src/photos/photo-07.png", rotate: -8, objectPosition: "50% 42%" },
  { src: "src/photos/photo-02.png", rotate: 5, objectPosition: "50% 32%" },
  { src: "src/photos/photo-11.png", rotate: -3, objectPosition: "50% 38%" },
  { src: "src/photos/photo-04.png", rotate: 7, objectPosition: "50% 34%" },
  { src: "src/photos/photo-09.png", rotate: -6, objectPosition: "50% 36%" },
  { src: "src/photos/photo-01.png", rotate: 4, objectPosition: "50% 46%" },
  { src: "src/photos/photo-13.png", rotate: -5, objectPosition: "58% 36%" },
  { src: "src/photos/photo-06.png", rotate: 6, objectPosition: "58% 38%" },
  { src: "src/photos/photo-03.png", rotate: -4, objectPosition: "50% 34%" },
  { src: "src/photos/photo-10.png", rotate: 8, objectPosition: "56% 36%" },
  { src: "src/photos/photo-05.png", rotate: -7, objectPosition: "50% 34%" },
  { src: "src/photos/photo-12.png", rotate: 3, objectPosition: "50% 32%" },
  { src: "src/photos/photo-08.png", rotate: -2, objectPosition: "50% 38%" },
];

const STORAGE_KEY = "svoya-igra-party-state-v1";
const HISTORY_LIMIT = 30;

function makeHistorySnapshot(state) {
  const { history, selectedQuestion, showAnswer, ...rest } = state;
  return { ...rest, selectedQuestion: null, showAnswer: false };
}

function withHistory(current, changes) {
  const next = typeof changes === "function" ? changes(current) : changes;
  return {
    ...current,
    ...next,
    history: [...(current.history || []), makeHistorySnapshot(current)].slice(-HISTORY_LIMIT),
  };
}

function loadSavedState() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialState;

    const parsed = JSON.parse(saved);
    return {
      ...initialState,
      ...parsed,
      selectedQuestion: null,
      showAnswer: false,
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch (error) {
    console.warn("Не удалось загрузить сохранение:", error);
    return initialState;
  }
}

function runSelfTests() {
  try {
    console.assert(gameData.rounds.length === 3, "Должно быть 3 обычных раунда");
    console.assert(gameData.rounds.every((round) => round.categories.length === 6), "В каждом раунде должно быть 6 тем");
    console.assert(
      gameData.rounds.every((round) => round.categories.every((category) => category.questions.length === 5)),
      "В каждой теме должно быть 5 вопросов"
    );
    console.assert(gameData.finalRound.availableCategories.length >= 3, "В финале должно быть несколько тем на выбор");
    const firstId = makeId();
    const secondId = makeId();
    console.assert(firstId !== secondId, "ID игроков должны быть уникальными");
  } catch (error) {
    console.warn("Self-test warning:", error);
  }
}

runSelfTests();

function App() {
  const [state, setState] = useState(loadSavedState);
  const [newPlayer, setNewPlayer] = useState("");
  const [scoreEdit, setScoreEdit] = useState({});
  const [message, setMessage] = useState("");

  const sortedPlayers = useMemo(() => [...state.players].sort((a, b) => b.score - a.score), [state.players]);
  const leaderId = sortedPlayers[0]?.id;
  const canUndo = (state.history || []).length > 0;

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn("Не удалось сохранить игру:", error);
    }
  }, [state]);

  const resetGame = () => {
    if (!window.confirm("Сбросить всю игру? Очки, сыгранные вопросы и финал будут очищены.")) return;
    window.localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
    setNewPlayer("");
    setScoreEdit({});
    setMessage("");
  };

  const undoLastAction = () => {
    setState((current) => {
      const history = current.history || [];
      const previous = history[history.length - 1];
      if (!previous) return current;

      return {
        ...initialState,
        ...previous,
        selectedQuestion: null,
        showAnswer: false,
        history: history.slice(0, -1),
      };
    });
    setMessage("");
  };

  const removePlayer = (playerId) => {
    setState((current) => withHistory(current, {
      players: current.players.filter((player) => player.id !== playerId),
    }));
    setScoreEdit((current) => {
      const next = { ...current };
      delete next[playerId];
      return next;
    });
    setMessage("");
  };

  const addPlayer = () => {
    const name = newPlayer.trim();
    if (!name) {
      setMessage("Введите имя игрока.");
      return;
    }
    if (state.players.some((player) => player.name.toLowerCase() === name.toLowerCase())) {
      setMessage("Игрок с таким именем уже есть.");
      return;
    }
    setState((current) => withHistory(current, { players: [...current.players, { id: makeId(), name, score: 0 }] }));
    setNewPlayer("");
    setMessage("");
  };

  const updateScore = (playerId, delta) => {
    setState((current) => ({
      ...current,
      players: current.players.map((player) =>
        player.id === playerId ? { ...player, score: player.score + delta } : player
      ),
    }));
  };

  const setManualScore = (playerId, value) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return;
    setState((current) => withHistory(current, {
      players: current.players.map((player) =>
        player.id === playerId ? { ...player, score: parsed } : player
      ),
    }));
    setScoreEdit((current) => ({ ...current, [playerId]: "" }));
  };

  const markQuestionUsed = (roundIndex, categoryIndex, questionIndex) => {
    const key = `${roundIndex}-${categoryIndex}-${questionIndex}`;
    setState((current) => ({ ...current, usedQuestions: { ...current.usedQuestions, [key]: true } }));
  };

  const openQuestion = (category, question, categoryIndex, questionIndex) => {
    setState((current) => ({
      ...current,
      selectedQuestion: { category, question, categoryIndex, questionIndex },
      showAnswer: false,
    }));
  };

  const closeQuestion = (mode, playerId) => {
    setState((current) => {
      const selected = current.selectedQuestion;
      if (!selected) return current;

      const delta = mode === "correct" && playerId ? selected.question.value : mode === "wrong" && playerId ? -selected.question.value : 0;
      const key = `${current.currentRoundIndex}-${selected.categoryIndex}-${selected.questionIndex}`;

      return withHistory(current, {
        players: current.players.map((player) =>
          player.id === playerId ? { ...player, score: player.score + delta } : player
        ),
        usedQuestions: { ...current.usedQuestions, [key]: true },
        selectedQuestion: null,
        showAnswer: false,
        lastClosedQuestion: {
          key,
          roundIndex: current.currentRoundIndex,
          category: selected.category,
          value: selected.question.value,
        },
      });
    });
  };

  const restoreLastClosedQuestion = () => {
    setState((current) => {
      if (!current.lastClosedQuestion) return current;

      const usedQuestions = { ...current.usedQuestions };
      delete usedQuestions[current.lastClosedQuestion.key];

      return withHistory(current, {
        usedQuestions,
        lastClosedQuestion: null,
      });
    });
  };

  const round = gameData.rounds[state.currentRoundIndex];
  const totalQuestions = round?.categories.reduce((sum, category) => sum + category.questions.length, 0) ?? 0;
  const usedInRound = Object.keys(state.usedQuestions).filter((key) => key.startsWith(`${state.currentRoundIndex}-`)).length;
  const roundComplete = totalQuestions > 0 && usedInRound >= totalQuestions;

  const goNextRound = () => {
    if (state.currentRoundIndex < gameData.rounds.length - 1) {
      setState((current) => withHistory(current, { currentRoundIndex: current.currentRoundIndex + 1 }));
    } else {
      setState((current) => withHistory(current, { screen: "final" }));
    }
  };

  const goPreviousRound = () => {
    setState((current) => withHistory(current, {
      currentRoundIndex: Math.max(0, current.currentRoundIndex - 1),
    }));
  };

  const returnFromFinal = () => {
    setState((current) => withHistory(current, {
      screen: "game",
      currentRoundIndex: gameData.rounds.length - 1,
      finalCategory: null,
      finalBets: {},
      finalResults: {},
      finalAnswerShown: false,
    }));
  };

  const saveBet = (playerId, rawValue) => {
    const player = state.players.find((item) => item.id === playerId);
    let value = Math.max(0, Number(rawValue) || 0);

    if (player && player.score > 0) value = Math.min(value, player.score);
    if (player && player.score <= 0) value = 0;

    setState((current) => ({ ...current, finalBets: { ...current.finalBets, [playerId]: value } }));
  };

  const applyFinalResult = (playerId, result) => {
    setState((current) => withHistory(current, { finalResults: { ...current.finalResults, [playerId]: result } }));
  };

  const finishFinal = () => {
    setState((current) => withHistory(current, {
      players: current.players.map((player) => {
        const bet = Number(current.finalBets[player.id] || 0);
        const result = current.finalResults[player.id];

        if (result === "correct") return { ...player, score: player.score + bet };
        if (result === "wrong") return { ...player, score: player.score - bet };
        return player;
      }),
      screen: "results",
    }));
  };

  const startGame = () => {
    if (state.players.length < 2) return;
    setState((current) => withHistory(current, { screen: "game" }));
  };

  const goHome = () => {
    setState((current) => withHistory(current, { screen: "start", selectedQuestion: null, showAnswer: false }));
  };

  const selectFinalCategory = (category) => {
    setState((current) => withHistory(current, { finalCategory: category }));
  };

  const showFinalAnswer = () => {
    setState((current) => withHistory(current, { finalAnswerShown: true }));
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#070912] text-white">
      <TopBrandMark />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_rgba(108,92,231,0.22),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(0,184,255,0.14),_transparent_30%),linear-gradient(180deg,_rgba(7,9,18,0.7),_rgba(7,9,18,0.88)_28%,_#070912_100%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-6 pt-24 md:pt-28 xl:px-28 2xl:px-4">
        {state.screen === "start" && (
          <StartScreen
            newPlayer={newPlayer}
            setNewPlayer={setNewPlayer}
            players={state.players}
            addPlayer={addPlayer}
            removePlayer={removePlayer}
            start={startGame}
            resetGame={resetGame}
            undoLastAction={undoLastAction}
            canUndo={canUndo}
            message={message}
          />
        )}

        {state.screen === "game" && round && (
          <div className="grid gap-5 lg:grid-cols-[1fr_290px]">
            <main>
              <TopBar
                title={gameData.title}
                subtitle={round.title}
                resetGame={resetGame}
                goHome={goHome}
                undoLastAction={undoLastAction}
                canUndo={canUndo}
              />
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-white/50">Сыграно в раунде</div>
                  <div className="text-2xl font-semibold">
                    {usedInRound} / {totalQuestions}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    disabled={state.currentRoundIndex === 0}
                    onClick={goPreviousRound}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white hover:bg-white/10"
                  >
                    <Icon name="prev" className="text-xl" />
                    Предыдущий раунд
                  </Button>
                  <Button onClick={goNextRound} className="rounded-2xl bg-white px-5 py-3 text-slate-950 hover:bg-white/90">
                    {state.currentRoundIndex < gameData.rounds.length - 1 ? "Следующий раунд" : "К финалу"}
                    <Icon name="next" className="text-xl" />
                  </Button>
                  <Button
                    disabled={!state.lastClosedQuestion}
                    onClick={restoreLastClosedQuestion}
                    className="rounded-2xl border border-amber-200/20 bg-amber-300/10 px-5 py-3 text-amber-50 hover:bg-amber-300/20"
                  >
                    Вернуть вопрос
                  </Button>
                </div>
              </div>

              {roundComplete && (
                <div className="mb-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-emerald-100">
                  Раунд завершён. Можно переходить дальше.
                </div>
              )}

              <GameBoard
                round={round}
                currentRoundIndex={state.currentRoundIndex}
                usedQuestions={state.usedQuestions}
                openQuestion={openQuestion}
              />
            </main>
            <PlayersPanel
              players={state.players}
              leaderId={leaderId}
              scoreEdit={scoreEdit}
              setScoreEdit={setScoreEdit}
              setManualScore={setManualScore}
            />
          </div>
        )}

        {state.screen === "final" && (
          <FinalRound
            state={state}
            players={state.players}
            saveBet={saveBet}
            applyFinalResult={applyFinalResult}
            finishFinal={finishFinal}
            returnFromFinal={returnFromFinal}
            selectFinalCategory={selectFinalCategory}
            showFinalAnswer={showFinalAnswer}
            undoLastAction={undoLastAction}
            canUndo={canUndo}
          />
        )}

        {state.screen === "results" && (
          <ResultsScreen players={sortedPlayers} resetGame={resetGame} undoLastAction={undoLastAction} canUndo={canUndo} />
        )}
      </div>

      <QuestionModal
        selectedQuestion={state.selectedQuestion}
        showAnswer={state.showAnswer}
        setShowAnswer={() => setState((current) => ({ ...current, showAnswer: true }))}
        players={state.players}
        closeQuestion={closeQuestion}
        onClose={() => setState((current) => ({ ...current, selectedQuestion: null }))}
      />
    </div>
  );
}

function StartScreen({ newPlayer, setNewPlayer, players, addPlayer, removePlayer, start, resetGame, undoLastAction, canUndo, message }) {
  return (
    <div className="flex min-h-[88vh] items-center justify-center">
      <div className="w-full max-w-4xl">
        <Card className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] text-white shadow-2xl backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/70">
              <Icon name="trophy" /> Party quiz show
            </div>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">Своя игра</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/65">
              Три раунда, 90 вопросов, финал со ставками и автоматический подсчёт очков. Заглушки уже внутри — меняй вопросы под друзей.
            </p>

            <div className="mt-9 grid gap-6 md:grid-cols-[1fr_330px]">
              <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
                <div className="mb-3 flex items-center gap-2 text-lg font-semibold">
                  <Icon name="users" /> Игроки
                </div>
                <div className="flex gap-2">
                  <input
                    value={newPlayer}
                    onChange={(event) => setNewPlayer(event.target.value)}
                    onKeyDown={(event) => event.key === "Enter" && addPlayer()}
                    placeholder="Имя игрока"
                    className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none placeholder:text-white/35"
                  />
                  <Button onClick={addPlayer} className="rounded-2xl bg-indigo-500 px-4 py-3 hover:bg-indigo-400">
                    Добавить
                  </Button>
                </div>
                {message && <div className="mt-3 rounded-2xl bg-red-500/15 px-4 py-3 text-sm text-red-100">{message}</div>}
                <div className="mt-4 space-y-2">
                  {players.length === 0 && <div className="text-sm text-white/45">Добавь минимум двух игроков.</div>}
                  {players.map((player) => (
                    <div key={player.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-4 py-3">
                      <span className="min-w-0 truncate">{player.name}</span>
                      <button
                        type="button"
                        onClick={() => removePlayer(player.id)}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-xl leading-none text-white/70 transition hover:bg-red-500/25 hover:text-red-100"
                        aria-label={`Удалить игрока ${player.name}`}
                        title="Удалить игрока"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-indigo-300/20 bg-indigo-500/10 p-5">
                <div className="text-sm uppercase tracking-[0.25em] text-indigo-200/70">Формат</div>
                <div className="mt-4 space-y-3 text-white/75">
                  <div>Раунд 1: 6 тем × 5 вопросов</div>
                  <div>Раунд 2: 6 тем × 5 вопросов</div>
                  <div>Раунд 3: 6 тем × 5 вопросов</div>
                  <div>Финал: тема + ставки</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                disabled={players.length < 2}
                onClick={start}
                className="rounded-2xl bg-white px-8 py-6 text-base font-bold text-slate-950 hover:bg-white/90 disabled:opacity-40"
              >
                Начать игру
              </Button>
              <Button onClick={resetGame} className="rounded-2xl border border-white/15 bg-transparent px-6 py-6 text-white hover:bg-white/10">
                <Icon name="reset" /> Сбросить
              </Button>
              <Button
                disabled={!canUndo}
                onClick={undoLastAction}
                className="rounded-2xl border border-white/15 bg-transparent px-6 py-6 text-white hover:bg-white/10"
              >
                <Icon name="undo" /> Отменить
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PhotoGarlands({ photos }) {
  const leftColumn = photos.filter((_, index) => index % 2 === 0);
  const rightColumn = photos.filter((_, index) => index % 2 === 1);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] hidden overflow-hidden xl:block" aria-hidden="true">
      <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-black/70 via-black/35 to-transparent" />
      <SideGarland side="left" photos={leftColumn} />
      <SideGarland side="right" photos={rightColumn} />
    </div>
  );
}

function TopBrandMark() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[2] flex h-20 items-center justify-center md:h-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#070912] via-[#070912]/82 to-transparent" />
      <div className="relative text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.42em] text-cyan-100/45">party edition</div>
        <div className="mt-1 text-2xl font-black tracking-[0.28em] text-white/90 md:text-3xl">своя игра</div>
      </div>
    </div>
  );
}

function SideGarland({ side, photos }) {
  const isLeft = side === "left";

  return (
    <div className={cls("absolute top-20 h-[calc(100vh-5rem)] w-56", isLeft ? "left-1" : "right-1")}>
      <GarlandLine side={side} />
      <div className="relative flex h-full flex-col items-center justify-around py-4">
        <PartyLights side={side} />
        {photos.map((photo, index) => (
          <PhotoFlag key={photo.src} photo={photo} index={index} align={side} compact={index > 4} />
        ))}
      </div>
    </div>
  );
}

function GarlandLine({ side }) {
  const isLeft = side === "left";

  return (
    <svg
      className={cls("absolute inset-y-0 text-amber-100/60", isLeft ? "left-24" : "right-24")}
      width="54"
      height="100%"
      viewBox="0 0 54 900"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d={isLeft ? "M30 0 C-2 120 58 218 24 340 C-12 470 64 590 28 900" : "M24 0 C56 120 -4 218 30 340 C66 470 -10 590 26 900"}
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d={isLeft ? "M38 0 C6 128 66 226 32 348 C-4 478 72 598 36 900" : "M16 0 C48 128 -12 226 22 348 C58 478 -18 598 18 900"}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PartyLights({ side }) {
  const lights = [
    { top: "4%", shift: -18, color: "bg-pink-300" },
    { top: "17%", shift: 22, color: "bg-cyan-300" },
    { top: "31%", shift: -8, color: "bg-amber-200" },
    { top: "46%", shift: 30, color: "bg-emerald-300" },
    { top: "63%", shift: -24, color: "bg-fuchsia-300" },
    { top: "80%", shift: 18, color: "bg-sky-300" },
  ];
  const base = side === "left" ? "left-24" : "right-24";

  return (
    <div className="absolute inset-0">
      {lights.map((light) => (
        <span
          key={`${light.top}-${light.shift}`}
          className={cls("absolute h-3 w-3 rounded-full shadow-[0_0_18px_currentColor]", light.color, base)}
          style={{ top: light.top, transform: `translateX(${light.shift}px)` }}
        />
      ))}
    </div>
  );
}

function PhotoFlag({ photo, index, align, compact = false }) {
  const shifts = align === "left" ? [-42, 26, -12, 44, -30, 14, -48] : [42, -26, 12, -44, 30, -14];
  const yOffsets = [-10, 14, -4, 20, -16, 8, -8];
  const colorBands = ["bg-pink-400", "bg-cyan-300", "bg-amber-300", "bg-emerald-300", "bg-fuchsia-300", "bg-sky-300"];
  const sideShift = shifts[index % shifts.length];
  const verticalShift = yOffsets[index % yOffsets.length];
  const rotation = (align === "left" ? photo.rotate : -photo.rotate) * 1.45;
  const sizeClass = compact ? "h-32 w-24" : "h-40 w-28";
  const bandColor = colorBands[index % colorBands.length];

  return (
    <div
      data-photo-flag
      className={cls(
        "relative shrink-0 opacity-95 drop-shadow-[0_22px_28px_rgba(0,0,0,0.52)]",
        sizeClass
      )}
      style={{
        transform: `translate(${sideShift}px, ${verticalShift}px) rotate(${rotation}deg)`,
      }}
    >
      <div className="absolute left-1/2 top-[-25px] h-10 w-px -translate-x-1/2 bg-amber-100/55" />
      <div className={cls("absolute left-1/2 top-[-13px] h-5 w-10 -translate-x-1/2 rounded-sm shadow-md", bandColor)} />
      <div className={cls("absolute -inset-2 rotate-3 rounded-[4px] opacity-85 blur-[1px]", bandColor)} />
      <div
        className="relative h-full w-full overflow-hidden rounded-[4px] border-[7px] border-white bg-white shadow-2xl"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 84%, 50% 100%, 0 84%)" }}
      >
        <img
          src={photo.src}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: photo.objectPosition }}
          onError={(event) => {
            event.currentTarget.closest("[data-photo-flag]")?.classList.add("hidden");
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/22" />
      </div>
      <div className="absolute inset-x-4 bottom-7 h-px bg-white/55" />
      <div className="absolute -right-3 bottom-8 h-8 w-8 rounded-full border border-white/25 bg-white/10" />
    </div>
  );
}

function TopBar({ title, subtitle, resetGame, goHome, undoLastAction, canUndo }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <div className="text-sm text-white/45">{title}</div>
        <h2 className="text-4xl font-black tracking-tight">{subtitle}</h2>
      </div>
      <div className="flex gap-2">
        <Button onClick={goHome} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-white/10">
          <Icon name="home" /> Старт
        </Button>
        <Button onClick={resetGame} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-white/10">
          <Icon name="reset" /> Сброс
        </Button>
        <Button
          disabled={!canUndo}
          onClick={undoLastAction}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-white/10"
        >
          <Icon name="undo" /> Отменить
        </Button>
      </div>
    </div>
  );
}

function GameBoard({ round, currentRoundIndex, usedQuestions, openQuestion }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      {round.categories.map((category, categoryIndex) => (
        <div key={category.title} className="space-y-3">
          <div className="flex h-24 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.08] p-3 text-center text-sm font-bold leading-tight shadow-lg md:text-base">
            {category.title}
          </div>
          {category.questions.map((question, questionIndex) => {
            const used = usedQuestions[`${currentRoundIndex}-${categoryIndex}-${questionIndex}`];
            return (
              <button
                key={`${question.value}-${questionIndex}`}
                disabled={used}
                onClick={() => openQuestion(category.title, question, categoryIndex, questionIndex)}
                className={cls(
                  "h-20 w-full rounded-3xl border text-2xl font-black transition md:h-24 md:text-3xl",
                  used
                    ? "border-white/5 bg-white/[0.03] text-white/10"
                    : "border-cyan-300/20 bg-gradient-to-br from-blue-600/80 to-indigo-700/80 text-cyan-100 shadow-lg shadow-blue-950/30 hover:scale-[1.03] hover:from-blue-500 hover:to-indigo-600"
                )}
              >
                {used ? "—" : question.value}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function PlayersPanel({ players, leaderId, scoreEdit, setScoreEdit, setManualScore }) {
  return (
    <aside className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur lg:sticky lg:top-6 lg:h-fit">
      <div className="mb-4 flex items-center gap-2 text-xl font-bold">
        <Icon name="crown" /> Игроки
      </div>
      <div className="space-y-3">
        {players.map((player) => (
          <div
            key={player.id}
            className={cls(
              "rounded-3xl border p-4",
              player.id === leaderId ? "border-yellow-300/40 bg-yellow-300/10" : "border-white/10 bg-black/20"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="font-semibold">{player.name}</div>
              {player.id === leaderId && <Icon name="crown" className="text-yellow-200" />}
            </div>
            <div className="mt-1 text-3xl font-black">{player.score}</div>
            <div className="mt-3 flex gap-2">
              <input
                value={scoreEdit[player.id] || ""}
                onChange={(event) => setScoreEdit((current) => ({ ...current, [player.id]: event.target.value }))}
                placeholder="очки"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm outline-none placeholder:text-white/30"
              />
              <Button onClick={() => setManualScore(player.id, scoreEdit[player.id])} className="rounded-xl bg-white px-3 py-2 text-slate-950 hover:bg-white/90">
                <Icon name="settings" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function QuestionModal({ selectedQuestion, showAnswer, setShowAnswer, players, closeQuestion, onClose }) {
  const [chosenPlayer, setChosenPlayer] = useState("");

  React.useEffect(() => {
    setChosenPlayer("");
  }, [selectedQuestion]);

  if (!selectedQuestion) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-[#101426] p-7 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-cyan-200/70">{selectedQuestion.category}</div>
            <div className="text-3xl font-black">{selectedQuestion.question.value}</div>
          </div>
          <button onClick={onClose} className="rounded-full bg-white/10 px-3 py-2 text-2xl leading-none hover:bg-white/20">
            ×
          </button>
        </div>

        <div className="min-h-44 rounded-3xl border border-white/10 bg-black/25 p-8 text-center text-3xl font-bold leading-snug md:text-4xl">
          {selectedQuestion.question.image && (
            <img
              src={selectedQuestion.question.image}
              alt=""
              className="mx-auto mb-6 max-h-[48vh] w-full rounded-2xl object-contain"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          )}
          {selectedQuestion.question.question}
        </div>

        {showAnswer && (
          <div className="mt-4 rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-6 text-center text-2xl text-emerald-100">
            {selectedQuestion.question.answer}
          </div>
        )}

        {!showAnswer ? (
          <div className="mt-6 flex justify-center">
            <Button onClick={setShowAnswer} className="rounded-2xl bg-white px-7 py-6 text-slate-950 hover:bg-white/90">
              <Icon name="eye" /> Показать ответ
            </Button>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <select
              value={chosenPlayer}
              onChange={(event) => setChosenPlayer(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#161b31] px-4 py-3 text-white outline-none"
            >
              <option value="">Кто отвечал?</option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </select>
            <div className="grid gap-3 md:grid-cols-3">
              <Button disabled={!chosenPlayer} onClick={() => closeQuestion("correct", chosenPlayer)} className="rounded-2xl bg-emerald-500 py-6 hover:bg-emerald-400">
                <Icon name="check" /> Верно
              </Button>
              <Button disabled={!chosenPlayer} onClick={() => closeQuestion("wrong", chosenPlayer)} className="rounded-2xl bg-red-500 py-6 hover:bg-red-400">
                <Icon name="x" /> Неверно
              </Button>
              <Button onClick={() => closeQuestion("skip")} className="rounded-2xl bg-white/10 py-6 hover:bg-white/20">
                <Icon name="skip" /> Пропустить
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FinalRound({
  state,
  players,
  saveBet,
  applyFinalResult,
  finishFinal,
  returnFromFinal,
  selectFinalCategory,
  showFinalAnswer,
  undoLastAction,
  canUndo,
}) {
  const category = state.finalCategory;
  const allBetsEntered = players.every((player) => state.finalBets[player.id] !== undefined);

  return (
    <div className="mx-auto max-w-5xl py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-5xl font-black">Финальный раунд</h2>
          <p className="mt-2 text-white/55">Выберите тему, сделайте ставки и отметьте результаты.</p>
        </div>
        <Button onClick={returnFromFinal} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white hover:bg-white/10">
          <Icon name="prev" className="text-xl" />
          К раунду 3
        </Button>
        <Button
          disabled={!canUndo}
          onClick={undoLastAction}
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white hover:bg-white/10"
        >
          <Icon name="undo" />
          Отменить
        </Button>
      </div>

      {!category && (
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {gameData.finalRound.availableCategories.map((item) => (
            <button
              key={item.title}
              onClick={() => selectFinalCategory(item)}
              className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 text-xl font-bold transition hover:scale-[1.03] hover:bg-indigo-500/30"
            >
              {item.title}
            </button>
          ))}
        </div>
      )}

      {category && (
        <div className="mt-8 space-y-6">
          <Card className="rounded-[2rem] border border-white/10 bg-white/[0.06] text-white">
            <CardContent className="p-6">
              <div className="text-sm text-white/45">Финальная тема</div>
              <div className="text-3xl font-black">{category.title}</div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {players.map((player) => (
              <div key={player.id} className="rounded-3xl border border-white/10 bg-black/25 p-5">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-bold">{player.name}</span>
                  <span className="text-white/55">{player.score} очков</span>
                </div>
                <input
                  type="number"
                  min="0"
                  max={Math.max(0, player.score)}
                  value={state.finalBets[player.id] ?? ""}
                  onChange={(event) => saveBet(player.id, event.target.value)}
                  placeholder="Ставка"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none"
                />
              </div>
            ))}
          </div>

          {allBetsEntered && (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7">
              <div className="mb-4 text-center text-3xl font-black">{category.question}</div>
              {!state.finalAnswerShown ? (
                <div className="flex justify-center">
                  <Button
                    onClick={showFinalAnswer}
                    className="rounded-2xl bg-white px-6 py-6 text-slate-950 hover:bg-white/90"
                  >
                    Показать ответ
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-5 rounded-3xl bg-emerald-400/10 p-5 text-center text-2xl text-emerald-100">
                    {category.answer}
                  </div>
                  <div className="space-y-3">
                    {players.map((player) => (
                      <div key={player.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-black/25 p-3">
                        <div>
                          <b>{player.name}</b> · ставка {state.finalBets[player.id] || 0}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => applyFinalResult(player.id, "correct")}
                            className={cls(
                              "rounded-xl px-4 py-2",
                              state.finalResults[player.id] === "correct" ? "bg-emerald-500" : "bg-white/10 hover:bg-white/20"
                            )}
                          >
                            Верно
                          </Button>
                          <Button
                            onClick={() => applyFinalResult(player.id, "wrong")}
                            className={cls(
                              "rounded-xl px-4 py-2",
                              state.finalResults[player.id] === "wrong" ? "bg-red-500" : "bg-white/10 hover:bg-white/20"
                            )}
                          >
                            Неверно
                          </Button>
                          <Button
                            onClick={() => applyFinalResult(player.id, "skip")}
                            className={cls(
                              "rounded-xl px-4 py-2",
                              state.finalResults[player.id] === "skip" ? "bg-slate-500" : "bg-white/10 hover:bg-white/20"
                            )}
                          >
                            Не отвечал
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button onClick={finishFinal} className="mt-6 w-full rounded-2xl bg-white py-6 text-lg font-bold text-slate-950 hover:bg-white/90">
                    Показать результаты
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ResultsScreen({ players, resetGame, undoLastAction, canUndo }) {
  return (
    <div className="flex min-h-[88vh] items-center justify-center">
      <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center backdrop-blur">
        <div className="mx-auto mb-4 text-6xl">🏆</div>
        <h2 className="text-5xl font-black">Итоги игры</h2>
        <div className="mt-8 space-y-3 text-left">
          {players.map((player, index) => (
            <div
              key={player.id}
              className={cls(
                "flex items-center justify-between rounded-3xl p-5",
                index === 0 ? "border border-yellow-300/30 bg-yellow-300/15" : "border border-white/10 bg-black/25"
              )}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-black">#{index + 1}</span>
                <span className="text-xl font-bold">{player.name}</span>
              </div>
              <div className="text-2xl font-black">{player.score}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={resetGame} className="rounded-2xl bg-white px-8 py-6 text-slate-950 hover:bg-white/90">
            <Icon name="reset" /> Начать заново
          </Button>
          <Button
            disabled={!canUndo}
            onClick={undoLastAction}
            className="rounded-2xl border border-white/15 bg-transparent px-8 py-6 text-white hover:bg-white/10"
          >
            <Icon name="undo" /> Отменить
          </Button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
