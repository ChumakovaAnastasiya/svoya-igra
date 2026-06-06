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
        category("Народный автопром", [
          question(100, "Как съедобно называется эта машина?", "Буханка", { image: "src/question-media/round1/folk-cars/100.png" }),
          question(200, "Эта получила название из прославившего ее фильма, какое?", "Бумер", { image: "src/question-media/round1/folk-cars/200.png" }),
          question(300, "Как в народе называли эту машину?", "Баржа", { image: "src/question-media/round1/folk-cars/300.png" }),
          question(400, "В восточнославянской мифологии это нечисть, живущая за печкой, на болоте или в лесу, а в советской - грузовик", "Шишига"),
          question(500, "Тем же словом, как этот женский «аксессуар», который видите на экране, прозвали советский пикап ИЖ", "Шиньон", { image: "src/question-media/round1/folk-cars/500.png" }),
        ]),
        category("Алкоголь", [
          question(100, "Что измеряет IBU и ABV?", "Горечь и алкоголь"),
          question(200, "Как называется пророщенное и высушенное зерно?", "Солод"),
          question(300, "Главное отличие виски от бурбона", "Кукуруза (или более полный ответ: бурбон - это виски с кукурузной основой более 51%)"),
          question(400, "Ареометр - это измерительный прибор чего?", "Плотность жидкости"),
          question(500, "Naranja Liqueur - это ликер с каким вкусом?", "Апельсин"),
        ]),
        category("Города-призраки", [
          question(100, "Определите страну по фото.", "Украина", { image: "src/question-media/round1/ghost-cities/100.png" }),
          question(200, "Определите страну по фото.", "Абхазия", { image: "src/question-media/round1/ghost-cities/200.png" }),
          question(300, "Определите страну по фото.", "Япония", { image: "src/question-media/round1/ghost-cities/300.png" }),
          question(400, "Определите страну по фото.", "Италия", { image: "src/question-media/round1/ghost-cities/400.png" }),
          question(500, "Определите страну по фото.", "Россия", { image: "src/question-media/round1/ghost-cities/500.png" }),
        ]),
        category("Империи", [
          question(100, "Какая империя была восточным продолжением Римской империи?", "Византия"),
          question(200, "Какая империя взяла Константинополь в 1453 году?", "Османская империя"),
          question(300, "Какая империя была крупнейшей по непрерывной территории в истории?", "Монгольская империя"),
          question(400, "Какая империя управлялась династией Габсбургов и распалась после Первой мировой войны?", "Австро-Венгрия"),
          question(500, "Какая империя называла Индию «жемчужиной короны»?", "Британская империя"),
        ]),
        category("Я знаю этого шляхтича", [
          question(100, "Кто на фото?", "Ян Птачек", { image: "src/question-media/round1/shlyahtich/100.png" }),
          question(200, "Кто на фото?", "Комар", { image: "src/question-media/round1/shlyahtich/200.png" }),
          question(300, "Кто на фото?", "Стас и Михайло или Джордж и Майкл", { image: "src/question-media/round1/shlyahtich/300.png" }),
          question(400, "Кто на фото?", "Мельник Пешек", { image: "src/question-media/round1/shlyahtich/400.png" }),
          question(500, "Кто на фото?", "Фрицек", { image: "src/question-media/round1/shlyahtich/500.png" }),
        ]),
        category("Геральдика и локации Вестероса", [
          question(100, "Как называется этот замок и одноименный остров, на котором он расположен?", "Драконий камень", { image: "src/question-media/round1/westeros/100.png" }),
          question(200, "Какому дому принадлежит герб?", "Талли", { image: "src/question-media/round1/westeros/200.png" }),
          question(300, "Кто стал последним главой дома, чей герб вы видите на экране?", "Оленна Тирелл", { image: "src/question-media/round1/westeros/300.png" }),
          question(400, "«Первые в битве» гласит девиз дома, чей герб вы видите на экране. Назовите дом", "Тарли", { image: "src/question-media/round1/westeros/400.png" }),
          question(500, "Назовите имя и фамилию его брата, который неоднократно встречался вам в «Игре престолов»", "Эймон Таргариен", { image: "src/question-media/round1/westeros/500.png" }),
        ]),
      ],
    },
    {
      title: "Раунд 2",
      values: [200, 400, 600, 800, 1000],
      categories: [
        category("Токсичная тема", [
          question(200, "Хедлайнер среди всех ядов, прославленный детективами и нацистской верхушкой", "Цианид"),
          question(400, "В Европе эпохи Возрождения любовь к отравлениям ИМ принесла печальную известность семейству Борджиа", "Мышьяк"),
          question(600, "Вы знаете, чем отравили «Упомянутого гражданина, Иного политика и различного активиста». А как этот яд действовал на супергероя Солдатика в сериале «Пацаны»?", "Усыплял (усыпляюще)"),
          question(800, "Самое горькое вещество, ставшее образцом, по которому ранжируют другие горькие вещества, упоминаемое в «Психо» Хичкока и книгах о Шерлоке Холмсе", "Стрихнин"),
          question(1000, "Этот яд рассылали в письмах, адресатом которых неоднократно становились хозяева Белого Дома", "Рицин"),
        ]),
        category("Римская мифология", [
          question(200, "В римской мифологии он был богом дверей, входа и выхода, затем всякого начала. Всем известно его двуличие.", "Янус"),
          question(400, "Британская писательница назвала персонажа своей серии книг этим именем богини мудрости. Назовите ЭТО ИМЯ", "Минерва"),
          question(600, "За несколько дней до некой торжественной церемонии, состоявшейся в 1903 году, молодому государю Николаю II представили список из 11 наименований, среди которых были: «Наяда», «Психея», «Богатырь», «Нептун»... и даже «Полкан». Однако Его Величество остановил свой выбор на имени богини из римской мифологии. Назовите его", "Аврора"),
          question(800, "Марсу в Древнем Риме были посвящены именно это грозное млекопитающее и эта негрозная птица, которую можно встретить на столбах", "Волк и дятел"),
          question(1000, "В римской мифологии это был бог подземного царства, владыка мертвых, а также обозначение самого подземного царства по аналогии с греческим Аидом. А в одной известнейшей книге, написанной в XX веке, этим словом были названы существа также злобные и отвратительные, но, напротив, сами подвластные чужой злой воле. Другое название этих существ было взято из английской мифологии. Назовите его.", "Гоблины"),
        ]),
        category("Толковый кмет", [
          question(200, "Определите навык по картинке.", "Настоящий славянин - Пьянство", { image: "src/question-media/round2/kmet/200.png" }),
          question(400, "Определите навык по картинке.", "Садист - Ведение боя", { image: "src/question-media/round2/kmet/400.png" }),
          question(600, "Определите навык по картинке.", "Сопротивление - Травничество", { image: "src/question-media/round2/kmet/600.png" }),
          question(800, "Определите навык по картинке.", "Дружелюбный сосед - Карманная кража", { image: "src/question-media/round2/kmet/800.png" }),
          question(1000, "Определите навык по картинке.", "Ухоженный - Починка", { image: "src/question-media/round2/kmet/1000.png" }),
        ]),
        category("Интернет-культура", [
          question(300, "Назовите год по картинке.", "2017", { image: "src/question-media/round2/internet-culture/100.png" }),
          question(300, "Назовите год по картинке.", "2015", { image: "src/question-media/round2/internet-culture/200.png" }),
          question(300, "Назовите год по картинке.", "2008", { image: "src/question-media/round2/internet-culture/300.png" }),
          question(300, "Назовите год по картинке.", "2019", { image: "src/question-media/round2/internet-culture/400.png" }),
          question(300, "Назовите год по картинке.", "2013", { image: "src/question-media/round2/internet-culture/500.png" }),
        ]),
        category("География Средиземья", [
          question(200, "Вопрос на скорость реакции. В какой стране снимали трилогию «Властелин колец»?", "Новая Зеландия", { image: "src/question-media/round2/middle-earth/200.png" }),
          question(400, "Назовите столицу этого государства", "Барад-дур", { image: "src/question-media/round2/middle-earth/400.png" }),
          question(600, "Назовите столицу города-государства, перед входом в который стоит братство", "Кхазад-дум", { image: "src/question-media/round2/middle-earth/600.png" }),
          question(800, "Нет сомнений, что эту локацию вы угадали. Назовите древнюю и самую первую столицу этого королевства", "Осгилиат", { image: "src/question-media/round2/middle-earth/800.png" }),
          question(1000, "Частью какого государства изначально была эта построенная нуменорцами крепость?", "Гондор", { image: "src/question-media/round2/middle-earth/1000.png" }),
        ]),
        category("Бестиарий Ведьмака", [
          question(200, "Упырица не по рождению, а по проклятию, на снятии которых ведьмаки не специализируются", "Стрыга"),
          question(400, "Вампир из португальского фольклора, который неоднократно встречается и в литературной саге, и в игре о Ведьмаке", "Брукса"),
          question(600, "Существует много видов ИХ, все они клептоманки, но некоторые вместо блестяшек крадут сны", "Гарпия"),
          question(800, "Падальщик из арабской, персидской и тюркской мифологий", "Гуль"),
          question(1000, "Летающий ящер, легко поддающийся приручению друидами", "Виверна"),
        ]),
      ],
    },
    {
      title: "Раунд 3",
      values: [300, 600, 900, 1200, 1500],
      categories: [
        category("Жуков", [
          question(600, "Посмотрите видео и дайте ответ.", "Путали с флагом Боливии, когда вывешивали на международных мероприятиях.", { video: "src/question-media/round3/zhukov/01.mp4" }),
          question(600, "Посмотрите видео и дайте ответ.", "Res communis omnium - общее достояние для всех. Никто не может владеть Луной", { video: "src/question-media/round3/zhukov/02.mp4" }),
          question(600, "Посмотрите видео и дайте ответ.", "Произойдет зацветание высолы. Белые разводы соли выступают на поверхности, можно грубо говоря сказать «ржаветь»", { video: "src/question-media/round3/zhukov/03.mp4" }),
          question(300, "Посмотрите видео и дайте ответ.", "Псилоцибин", { video: "src/question-media/round3/zhukov/04.mp4" }),
          question(1500, "Посмотрите видео и дайте ответ.", "Полное описание событий", { video: "src/question-media/round3/zhukov/05.mp4" }),
        ]),
        category("Фото с тус", [
          question(300, "Кто или что замазано на фото?", "Фото без замазки", { image: "src/question-media/round3/party-photos/300-question.png", answerImage: "src/question-media/round3/party-photos/300-answer.png" }),
          question(600, "Кто или что замазано на фото?", "Фото без замазки", { image: "src/question-media/round3/party-photos/600-question.png", answerImage: "src/question-media/round3/party-photos/600-answer.png" }),
          question(900, "Кто или что замазано на фото?", "Фото без замазки", { image: "src/question-media/round3/party-photos/900-question.png", answerImage: "src/question-media/round3/party-photos/900-answer.png" }),
          question(1200, "Кто или что замазано на фото?", "Фото без замазки", { image: "src/question-media/round3/party-photos/1200-question.png", answerImage: "src/question-media/round3/party-photos/1200-answer.png" }),
          question(1500, "Кто или что замазано на фото?", "Фото без замазки", { image: "src/question-media/round3/party-photos/1500-question.png", answerImage: "src/question-media/round3/party-photos/1500-answer.png" }),
        ]),
        category("Славянская мифология", [
          question(300, "Так называли мифическую райскую птицу, о которой есть присказка, что ОНА - птица вещая", "Гамаюн"),
          question(600, "Богиня смерти и зимы", "Мара"),
          question(900, "ТАК древние славяне называли повелителя ветра, ураганов и метелей, а современные назвали дрон", "Стрибог"),
          question(1200, "Так называют крылатого змея с двумя хоботами и птичьим клювом, сына Чернобога", "Аспид"),
          question(1500, "На Смоленщине верили, что ОНИ качаются на ногах тех, кто болтает ими под столом, а с принятием христианства ИХ стали называть бесами", "Анчутки"),
        ]),
        category("Автократы и тираны", [
          question(300, "Какое короткое прозвище получил тренер Андрей Кобелев, известный диктаторскими методами работы", "Коба"),
          question(600, "Комментируя упреки министра иностранных дел Германии Штайнмайера в нарушении прав человека в Белоруссии, президент Александр Лукашенко заявил, что лучше быть ИМ, чем геем. Несмотря на это, в 2012 году в Беларуси «ЕГО» запретили. Назовите ЕГО.", "Диктатор (фильм)"),
          question(900, "Старший сын этого тирана перестал быть наследником из-за того, что попытался с поддельным паспортом выехать из страны, чтобы увидеть Диснейленд", "Ким Чен Ир"),
          question(1200, "Будучи еще маленьким мальчиком, этот диктатор послал президенту Рузвельту письмо с поздравлениями по случаю его переизбрания и попросил у него $ 10.", "Фидель Кастро"),
          question(1500, "В 1960-х годах в Ереване был установлен монумент «Мать-Армения» в виде женской фигуры высотой более пятидесяти метров. Некоторые ереванцы рассказывают, что строители торопились и что под подолом Матери-Армении скрываются они. На карикатуре неизвестного автора, распространявшейся в конце 1920-х, под ними видна надпись «внутрипартийная демократия». Назовите ИХ двумя словами.", "Ноги Сталина (сапоги Сталина, ботинки Сталина)"),
        ]),
        category("Древний Рим", [
          question(300, "На берегах этой реки расположен Рим", "Тибр"),
          question(
            600,
            "В фильме о приключениях Астерикса и Обеликса галлы грабят римскую казну. Говоря о том, что нужно сделать во избежание возмездия, один из персонажей употребляет устойчивое выражение. Какое?",
            "Цезарю Цезарево (кесарю кесарево)"
          ),
          question(900, "В римском календаре так назывался день в середине месяца, а американский писатель Торнтон Уайлдер назвал свою книгу о Цезаре «Мартовские ОНИ»", "Иды"),
          question(
            1200,
            "Герой фильма «Орел Девятого легиона» отличал врагов по характерному шраму от НЕГО. Герой фильма «Астерикс и Обеликс против Цезаря» получил необычный именинный торт со свечками, закрепленными на НЕМ. Назовите ЕГО максимально точно.",
            "Шлем римского легионера (римский шлем, шлем легионера)"
          ),
          question(
            1500,
            "Этот акроним и аббревиатуру латинской фразы изображали на штандартах римских легионов, а сейчас используют в гербе города Рима, на многих городских зданиях и люках",
            "SPQR (Senatus Populus Quiritium Romanus)"
          ),
        ]),
        category("Друзья, которых мы заслужили", [
          question(900, "Посмотрите видео и дайте ответ.", "Киндом Кам", { video: "src/question-media/round3/friends/01.mp4" }),
          question(900, "Посмотрите видео и дайте ответ.", "Миллиарды/Миллионы", { video: "src/question-media/round3/friends/02.mp4" }),
          question(900, "Посмотрите видео и дайте ответ.", "За то что Жук покрасил усы в зеленый на спор", { video: "src/question-media/round3/friends/03.mp4" }),
          question(900, "Посмотрите видео и дайте ответ.", "Старикам тут не место", { video: "src/question-media/round3/friends/04.mp4" }),
          question(900, "Посмотрите видео и дайте ответ.", "Красная площадь", { video: "src/question-media/round3/friends/05.mp4" }),
        ]),
      ],
    },
  ],
  finalRound: {
    availableCategories: [
      {
        title: "Алексеи",
        question: "В детстве будущий гроссмейстер Александр АлЕхин часто сидел в своей комнате, всецело поглощенный шахматами. По этой причине он получил прозвище, которое объединяло его с русским царем. Каким именно царем? Назовите имя и фамилию, отчество или прозвище",
        answer: "Алексей Романов (Алексей Михайлович, Алексей Тишайший)",
      },
      {
        title: "Максимы",
        question: "«ЕГО» режиссёр, работая в семидесятые в скорой помощи, повидал много пострадавших в авариях лихачей. Сыгравший ЕГО актёр позже снял фильм, который доцент Мезоамериканского центра имени Кнорозова назвал «ИМ» по-майянски. Назовите ЕГО.",
        answer: "Безумный Макс",
      },
      {
        title: "Вторая мировая",
        question: "В 1943 году прошла первая за годы Второй мировой войны конференция лидеров трёх стран: СССР, США и Великобритании, где обсуждался вопрос открытия второго фронта. Назовите город, в котором она проходила",
        answer: "Тегеран",
      },
      {
        title: "Нацисты",
        question: "Эти спецподразделения были созданы и использованы в 1938 г. в Австрии, затем в 1939 г. в Чехословакии и Польше для «умиротворения гражданского населения» и борьбы с политическими противниками.",
        answer: "Айнзацгруппы",
      },
      {
        title: "Оружие",
        question: "Африканцы из племени матабЕле впервые столкнулись с НИМ в конце XIX века и назвали ЕГО «скокакОка». Рассказывая о НЕМ, африканцы вспоминали, как небеса иногда плюются градом. Назовите ЕГО максимально точно.",
        answer: "Пулемет Максим",
      },
      {
        title: "Физика",
        question: "Над какой гипотетической концепцией работает герой американского сериала «Теория большого взрыва» Шелдон Купер?",
        answer: "Теория струн",
      },
      {
        title: "Сериалы",
        question: "В начале сериала «Ходячие мертвецы» герои держат путь до города, являющегося столицей штата. Назовите город и штат",
        answer: "Атланта, Джорджия",
      },
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
  finalEliminatedCategories: [],
  finalBets: {},
  finalBetsAccepted: false,
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
  const [showWelcome, setShowWelcome] = useState(true);

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

  useEffect(() => {
    if (!showWelcome) return;

    const dismissWelcome = () => setShowWelcome(false);
    window.addEventListener("keydown", dismissWelcome, { once: true });
    return () => window.removeEventListener("keydown", dismissWelcome);
  }, [showWelcome]);

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
      finalEliminatedCategories: [],
      finalBets: {},
      finalBetsAccepted: false,
      finalResults: {},
      finalAnswerShown: false,
    }));
  };

  const saveBet = (playerId, rawValue) => {
    if (state.finalBetsAccepted) return;

    if (rawValue === "") {
      setState((current) => {
        const finalBets = { ...current.finalBets };
        delete finalBets[playerId];
        return { ...current, finalBets };
      });
      return;
    }

    const player = state.players.find((item) => item.id === playerId);
    let value = Math.max(0, Number(rawValue) || 0);

    if (player && player.score > 0) value = Math.min(value, player.score);
    if (player && player.score <= 0) value = 0;

    setState((current) => ({ ...current, finalBets: { ...current.finalBets, [playerId]: value } }));
  };

  const acceptFinalBets = () => {
    setState((current) => withHistory(current, {
      finalBetsAccepted: true,
      finalAnswerShown: false,
      finalResults: {},
    }));
  };

  const editFinalBets = () => {
    setState((current) => withHistory(current, {
      finalBetsAccepted: false,
      finalAnswerShown: false,
      finalResults: {},
    }));
  };

  const applyFinalResult = (playerId, result) => {
    setState((current) => withHistory(current, { finalResults: { ...current.finalResults, [playerId]: result } }));
  };

  const finishFinal = () => {
    setState((current) => {
      if (!current.players.every((player) => current.finalResults[player.id] !== undefined)) return current;

      return withHistory(current, {
        players: current.players.map((player) => {
          const bet = Number(current.finalBets[player.id] || 0);
          const result = current.finalResults[player.id];

          if (result === "correct") return { ...player, score: player.score + bet };
          if (result === "wrong") return { ...player, score: player.score - bet };
          return player;
        }),
        screen: "results",
      });
    });
  };

  const startGame = () => {
    if (state.players.length < 2) return;
    setState((current) => withHistory(current, { screen: "game" }));
  };

  const goHome = () => {
    setState((current) => withHistory(current, { screen: "start", selectedQuestion: null, showAnswer: false }));
  };

  const eliminateFinalCategory = (categoryTitle) => {
    setState((current) => {
      if (current.finalCategory) return current;

      const eliminated = new Set(current.finalEliminatedCategories || []);
      eliminated.add(categoryTitle);

      const remainingCategories = gameData.finalRound.availableCategories.filter((item) => !eliminated.has(item.title));

      return withHistory(current, {
        finalEliminatedCategories: [...eliminated],
        finalCategory: remainingCategories.length === 1 ? remainingCategories[0] : null,
        finalBets: {},
        finalBetsAccepted: false,
        finalResults: {},
        finalAnswerShown: false,
      });
    });
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
            acceptFinalBets={acceptFinalBets}
            editFinalBets={editFinalBets}
            applyFinalResult={applyFinalResult}
            finishFinal={finishFinal}
            returnFromFinal={returnFromFinal}
            eliminateFinalCategory={eliminateFinalCategory}
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
      {showWelcome && <WelcomeOverlay onDismiss={() => setShowWelcome(false)} />}
    </div>
  );
}

function WelcomeOverlay({ onDismiss }) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Закрыть приветствие"
      onPointerDown={onDismiss}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/65 p-4 backdrop-blur-md"
    >
      <div className="flex min-h-64 w-full max-w-3xl items-center justify-center rounded-[2rem] border border-white/15 bg-[#101426]/95 px-8 py-12 text-center shadow-2xl">
        <div className="max-w-xl text-base font-medium leading-relaxed text-white/90 md:text-lg">
          Автор игры — Владимир Хиль
        </div>
      </div>
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
  const [mediaRevealed, setMediaRevealed] = useState(false);

  React.useEffect(() => {
    setChosenPlayer("");
    setMediaRevealed(false);
  }, [selectedQuestion]);

  if (!selectedQuestion) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm md:items-center">
      <div className="my-4 w-full max-w-5xl rounded-[2rem] border border-white/10 bg-[#101426] p-5 shadow-2xl md:p-7">
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
          <div>{selectedQuestion.question.question}</div>
          {selectedQuestion.question.video && (
            <video
              src={selectedQuestion.question.video}
              controls
              playsInline
              className="mx-auto mt-6 max-h-[48vh] w-full rounded-2xl bg-black object-contain"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          )}
          {selectedQuestion.question.image && (
            <button
              type="button"
              onClick={() => setMediaRevealed(true)}
              className="group relative mx-auto mt-6 block w-full overflow-hidden rounded-2xl bg-black/30 outline-none"
              aria-label="Открыть фото"
            >
              <img
                src={selectedQuestion.question.image}
                alt=""
                className={cls(
                  "mx-auto max-h-[48vh] w-full object-contain transition duration-500",
                  mediaRevealed ? "blur-0 brightness-100" : "scale-[1.02] blur-xl brightness-50"
                )}
                onError={(event) => {
                  event.currentTarget.parentElement.style.display = "none";
                }}
              />
              {!mediaRevealed && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/10 text-5xl text-white/70 transition group-hover:bg-black/0">
                  <Icon name="eye" />
                </span>
              )}
            </button>
          )}
        </div>

        {showAnswer && (
          <div className="mt-4 rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-5 text-center text-2xl text-emerald-100 md:p-6">
            {selectedQuestion.question.answerImage && (
              <img
                src={selectedQuestion.question.answerImage}
                alt=""
                className="mx-auto mb-5 max-h-[48vh] w-full rounded-2xl object-contain"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            )}
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

function FinalProgress({ currentStep }) {
  const steps = [
    { id: "topics", label: "Тема" },
    { id: "bets", label: "Ставки" },
    { id: "question", label: "Вопрос" },
    { id: "answer", label: "Ответ" },
    { id: "results", label: "Итоги" },
  ];
  const activeIndex = Math.max(0, steps.findIndex((step) => step.id === currentStep));

  return (
    <div className="mt-7 grid grid-cols-2 gap-2 rounded-[2rem] border border-white/10 bg-white/[0.05] p-2 sm:grid-cols-5">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={cls(
            "rounded-2xl px-3 py-3 text-center text-sm font-semibold",
            index <= activeIndex ? "bg-white text-slate-950" : "bg-white/5 text-white/45"
          )}
        >
          {step.label}
        </div>
      ))}
    </div>
  );
}

function FinalRound({
  state,
  players,
  saveBet,
  acceptFinalBets,
  editFinalBets,
  applyFinalResult,
  finishFinal,
  returnFromFinal,
  eliminateFinalCategory,
  showFinalAnswer,
  undoLastAction,
  canUndo,
}) {
  const category = state.finalCategory;
  const eliminatedCategories = state.finalEliminatedCategories || [];
  const remainingCategories = gameData.finalRound.availableCategories.filter((item) => !eliminatedCategories.includes(item.title));
  const allBetsEntered = players.length > 0 && players.every((player) => state.finalBets[player.id] !== undefined);
  const betsAccepted = Boolean(state.finalBetsAccepted);
  const allFinalResultsEntered = players.length > 0 && players.every((player) => state.finalResults[player.id] !== undefined);
  const currentStep = !category ? "topics" : !betsAccepted ? "bets" : !state.finalAnswerShown ? "question" : "answer";

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
      <FinalProgress currentStep={currentStep} />

      {!category && (
        <div className="mt-8 space-y-5">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 text-center">
            <div className="text-sm text-white/45">Исключение тем</div>
            <div className="mt-1 text-2xl font-black">{remainingCategories.length} из {gameData.finalRound.availableCategories.length}</div>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
          {gameData.finalRound.availableCategories.map((item) => (
            <button
              key={item.title}
              disabled={eliminatedCategories.includes(item.title)}
              onClick={() => eliminateFinalCategory(item.title)}
              className={cls(
                "min-h-28 rounded-3xl border p-6 text-xl font-bold transition",
                eliminatedCategories.includes(item.title)
                  ? "border-white/5 bg-white/[0.03] text-white/20"
                  : "border-white/10 bg-white/[0.07] hover:scale-[1.03] hover:bg-indigo-500/30"
              )}
            >
              <span>{item.title}</span>
              {eliminatedCategories.includes(item.title) && <span className="mt-2 block text-sm font-medium">убрана</span>}
            </button>
          ))}
          </div>
          <div className="text-center text-sm text-white/50">Кликайте по темам, которые убираете. Финальная тема останется последней.</div>
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
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={state.finalBets[player.id] ?? ""}
                  disabled={betsAccepted}
                  onChange={(event) => saveBet(player.id, event.target.value)}
                  placeholder="Ставка"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            ))}
          </div>

          {!betsAccepted && (
            <Button
              disabled={!allBetsEntered}
              onClick={acceptFinalBets}
              className="w-full rounded-2xl bg-white py-5 text-lg font-bold text-slate-950 hover:bg-white/90"
            >
              Принять ставки
            </Button>
          )}

          {betsAccepted && (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7">
              <div className="mb-4 text-center text-3xl font-black">{category.question}</div>
              {!state.finalAnswerShown ? (
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    onClick={editFinalBets}
                    className="rounded-2xl border border-white/10 bg-white/5 px-6 py-6 text-white hover:bg-white/10"
                  >
                    Изменить ставки
                  </Button>
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
                  <Button
                    disabled={!allFinalResultsEntered}
                    onClick={finishFinal}
                    className="mt-6 w-full rounded-2xl bg-white py-6 text-lg font-bold text-slate-950 hover:bg-white/90"
                  >
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
