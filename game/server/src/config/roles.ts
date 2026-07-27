import { GameRole } from "src/types/types";

export const roles: GameRole[] = [
  {
    roleId: 1,
    roleName: "Доктор Шарп\nтерапевт",
    roleNumber: "+7 (111) 111-11-11",
    rolePassword: "Doctor",
    roleProfile: "",
    roleTask: "",
    roleDescription:
      "Хирург с невероятной точностью. Диагностирует болезни по малейшим симптомам.",
    roleImg: "/images/therapist.png",
    roleButtons: [],
    isSelected: false,
  },

  {
    roleId: 2,
    roleName: "Сергей Талончиков\nсотрудник",
    roleNumber: "+7 (222) 222-22-22",
    rolePassword: "Talon",
    roleProfile:
      "Сергей Талончиков, 42 года\nОпытный сотрудник регистратуры городской поликлиники.",
    roleTask:
      "Ваша цель — обеспечить бесперебойную работу регистратуры в условиях многозадачности. Вы должны выполнить плановую работу, параллельно реагируя на срочные входящие события: телефонные звонки и живое общение с посетителями.",
    roleDescription: "Ваш рабочий день — это гибрид старых и новых технологий.",
    roleImg: "/images/receptionist.png",
    roleButtons: [
      {
        buttonEmit: "get-patients",
        buttonTitle: "Обработать лист ожидания к узким специалистам",
        buttonDesc:
          "Вам необходимо записать пациентов из списка ожидания на приём к нужным им врачам. Ваша задача: для каждого пациента найти свободный слот в расписании его врача и занести туда данные.",
        // buttonData: [
        //   {
        //     dataTitle: "Анна Ветрова,\nк кардиологу",
        //     dataText: "«Беспокоит шум в ушах при виде спиралей в метро»",
        //     dataImg: "/images/event-icon 2.png",
        //     isActive: false,
        //   },
        //   {
        //     dataTitle: "Борис Громов,\nк неврологу",
        //     dataText:
        //       "«Жалуется, что забывает пароли ещё до того, как их придумал»",
        //     dataImg: "/images/event-icon 5.png",
        //     isActive: false,
        //   },
        //   {
        //     dataTitle: "Василиса Цветкова,\nк дерматологу",
        //     dataText:
        //       "«Обнаружила, что кожа на локтях не совпадает по тону с новым айфоном»",
        //     dataImg: "/images/event-icon 3.png",
        //     isActive: false,
        //   },
        //   {
        //     dataTitle: "Геннадий Стулов,\nк ортопеду",
        //     dataText:
        //       "«Уверен, что левая нога стала короче после обновления iOS»",
        //     dataImg: "/images/event-icon 6.png",
        //     isActive: false,
        //   },
        //   {
        //     dataTitle: "Дарья Лучина,\nк офтальмологу",
        //     dataText: "«Видятся рекламные баннеры на стенах в реальной жизни»",
        //     dataImg: "/images/event-icon 7.png",
        //     isActive: false,
        //   },
        //   {
        //     dataTitle: "Егор Каменских,\nк гастроэнтерологу",
        //     dataText:
        //       "«Организм отказывается переваривать пищу без эмодзи в описании»",
        //     dataImg: "/images/event-icon 1.png",
        //     isActive: false,
        //   },
        //   {
        //     dataTitle: "Злата Родникова,\nк эндокринологу",
        //     dataText:
        //       "«Подозревает, что уровень сахара падает при отрицательных лайках»",
        //     dataImg: "/images/event-icon 10.png",
        //     isActive: false,
        //   },
        //   {
        //     dataTitle: "Игорь Белов,\nк отоларингологу",
        //     dataText: "«Слышит уведомления от выключенных устройств»",
        //     dataImg: "/images/event-icon 4.png",
        //     isActive: false,
        //   },
        //   {
        //     dataTitle: "Кира Солнечная,\nк психотерапевту",
        //     dataText:
        //       "«Требует выписать справку о несовместимости с офлайн-общением»",
        //     dataImg: "/images/event-icon 8.png",
        //     isActive: false,
        //   },
        //   {
        //     dataTitle: "Леонид Онегин,\nк урологу",
        //     dataText:
        //       "«Жалуется на зависание процесса в самый неподходящий момент»",
        //     dataImg: "/images/event-icon 9.png",
        //     isActive: false,
        //   },
        // ],
        isActive: true,
        buttonImage: "/images/list.png",
      },
      {
        buttonEmit: "get-results",
        buttonTitle: "Подшить результаты анализов в карты пациентов",
        buttonDesc:
          "Вам нужно корректно распределить результаты анализов по картам пациентов. Для этого перетащите каждый анализ в соответствующую папку.",
        // buttonData: Array.from({ length: 8 }),
        isActive: true,
        buttonImage: "/images/clip.png",
      },
    ],

    isSelected: false,
  },

  {
    roleId: 3,
    roleName: "Отоларинголог Рефлекторова\nспециалист",
    roleNumber: "+7 (444) 444-44-44",
    rolePassword: "Reflect",
    roleProfile: "",
    roleTask: "",
    roleDescription:
      "Гений медицинских технологий. Создает инновационные методы лечения.",
    roleImg: "/images/specialist.png",
    roleButtons: [],
    isSelected: false,
  },

  {
    roleId: 4,
    roleName: "Маргарита Фильтрова\nпациент",
    roleNumber: "+7 (333) 333-33-33",
    rolePassword: "Margo",
    roleProfile:
      "Маргарита Фильтрова, 29 лет\nУспешный инстаграм-блогер с миллионной аудиторией.",
    roleTask:
      "Ваша цель — пройти диагностику и получить лечение, а именно льготный препарат Плацебо-Фильтр.",
    roleDescription:
      "Ваша жизнь — это идеальные кадры, безупречные ракурсы и тонны фильтров. Но однажды вы осознаете, что больше не можете видеть реальность без цифровой обработки.",
    roleCondition: '"Не вижу себя в зеркале без фотошоп-фильтров"',
    roleImg: "/images/patient.png",
    roleButtons: [
      {
        buttonEmit: "chat-bot",
        buttonTitle: "Записаться на прием к терапевту через чат-бот",
        isActive: true,
      },
      {
        buttonEmit: "cite-registratura",
        buttonTitle: "Записаться на прием к врачу на сайте «Регистратура»",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Посетить терапевта для получения направления к узкому специалисту",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Обратиться в регистратуру для записи к узкому специалисту",
        isActive: true,
        buttonData: {
          eventRecepient: 2,
          eventData: {
            dataText: "Пациент ждет у окна регистратуры",
            dataButtons: [
              {
                buttonText: "Обслужить сейчас",
                buttonEmit: "emit-dialog",
                buttonDesc:
                  "При нажатии на экране начнётся диалог. Ваша задача — «прослушать» диалог. После окончания разговора вернитесь к прерванной задаче.",
              },
              {
                buttonText: "Поставить в очередь",
                buttonEmit: "emit-queue",
                buttonDesc:
                  "Правила работы с очередью:\n• Вы можете ставить посетителей в очередь, чтобы закончить текущую задачу.\n• Максимальная длина очереди — 3 человека.\n• Максимальное время ожидания в очереди — 1 минута.\n• При нарушении любого из этих условий (очередь >3 или время >1 мин) Вам начнут поступать всплывающие сообщения с жалобами от пациентов.",
              },
            ],
          },
        },
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Посетить узкого специалиста для подтверждения диагноза / необходимость льготного лекарства",
        isActive: true,
      },
      {
        buttonEmit: "emit-call",
        buttonTitle:
          "Обратиться в службу 666 чтобы выписали рецепт на льготное лекарство",
        isActive: true,
      },
      {
        buttonEmit: "visit-pharmacy",
        buttonTitle: "Обратиться в аптеку для получения льготного лекарства",
        isActive: true,
      },
    ],

    isSelected: false,
  },

  {
    roleId: 5,
    roleName: "Тестов Тестик\nпациент",
    roleNumber: "+7 (333) 333-33-33",
    rolePassword: "Margo",
    roleProfile: "Никакой",
    roleTask: "Никакой",
    roleDescription: "Никакой",
    roleCondition: '"Никакой"',
    roleImg: "/images/patient.png",
    roleButtons: [
      {
        buttonEmit: "chat-bot",
        buttonTitle: "Записаться на прием к терапевту через чат-бот",
        isActive: true,
      },
      {
        buttonEmit: "cite-registratura",
        buttonTitle: "Записаться на прием к врачу на сайте «Регистратура»",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Посетить терапевта для получения направления к узкому специалисту",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Обратиться в регистратуру для записи к узкому специалисту",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Посетить узкого специалиста для подтверждения диагноза / необходимость льготного лекарства",
        isActive: true,
      },
      {
        buttonEmit: "emit-call",
        buttonTitle:
          "Обратиться в службу 666 чтобы выписали рецепт на льготное лекарство",
        isActive: true,
      },
      {
        buttonEmit: "visit-pharmacy",
        buttonTitle: "Обратиться в аптеку для получения льготного лекарства",
        isActive: true,
      },
    ],

    isSelected: false,
  },

  {
    roleId: 6,
    roleName: "Пробнов Пробник\nпациент",
    roleNumber: "+7 (333) 333-33-33",
    rolePassword: "Margo",
    roleProfile: "Никакой",
    roleTask: "Никакой",
    roleDescription: "Никакой",
    roleCondition: '"Никакой"',
    roleImg: "/images/patient.png",
    roleButtons: [
      {
        buttonEmit: "chat-bot",
        buttonTitle: "Записаться на прием к терапевту через чат-бот",
        isActive: true,
      },
      {
        buttonEmit: "cite-registratura",
        buttonTitle: "Записаться на прием к врачу на сайте «Регистратура»",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Посетить терапевта для получения направления к узкому специалисту",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Обратиться в регистратуру для записи к узкому специалисту",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Посетить узкого специалиста для подтверждения диагноза / необходимость льготного лекарства",
        isActive: true,
      },
      {
        buttonEmit: "emit-call",
        buttonTitle:
          "Обратиться в службу 666 чтобы выписали рецепт на льготное лекарство",
        isActive: true,
      },
      {
        buttonEmit: "visit-pharmacy",
        buttonTitle: "Обратиться в аптеку для получения льготного лекарства",
        isActive: true,
      },
    ],

    isSelected: false,
  },

  {
    roleId: 7,
    roleName: "Никаков Никак\nпациент",
    roleNumber: "+7 (333) 333-33-33",
    rolePassword: "Margo",
    roleProfile: "Никакой",
    roleTask: "Никакой",
    roleDescription: "Никакой",
    roleCondition: '"Никакой"',
    roleImg: "/images/patient.png",
    roleButtons: [
      {
        buttonEmit: "chat-bot",
        buttonTitle: "Записаться на прием к терапевту через чат-бот",
        isActive: true,
      },
      {
        buttonEmit: "cite-registratura",
        buttonTitle: "Записаться на прием к врачу на сайте «Регистратура»",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Посетить терапевта для получения направления к узкому специалисту",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Обратиться в регистратуру для записи к узкому специалисту",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Посетить узкого специалиста для подтверждения диагноза / необходимость льготного лекарства",
        isActive: true,
      },
      {
        buttonEmit: "emit-call",
        buttonTitle:
          "Обратиться в службу 666 чтобы выписали рецепт на льготное лекарство",
        isActive: true,
      },
      {
        buttonEmit: "visit-pharmacy",
        buttonTitle: "Обратиться в аптеку для получения льготного лекарства",
        isActive: true,
      },
    ],

    isSelected: false,
  },

  {
    roleId: 8,
    roleName: "Безименов Безимен\nпациент",
    roleNumber: "+7 (333) 333-33-33",
    rolePassword: "Margo",
    roleProfile: "Никакой",
    roleTask: "Никакой",
    roleDescription: "Никакой",
    roleCondition: '"Никакой"',
    roleImg: "/images/patient.png",
    roleButtons: [
      {
        buttonEmit: "chat-bot",
        buttonTitle: "Записаться на прием к терапевту через чат-бот",
        isActive: true,
      },
      {
        buttonEmit: "cite-registratura",
        buttonTitle: "Записаться на прием к врачу на сайте «Регистратура»",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Посетить терапевта для получения направления к узкому специалисту",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Обратиться в регистратуру для записи к узкому специалисту",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Посетить узкого специалиста для подтверждения диагноза / необходимость льготного лекарства",
        isActive: true,
      },
      {
        buttonEmit: "emit-call",
        buttonTitle:
          "Обратиться в службу 666 чтобы выписали рецепт на льготное лекарство",
        isActive: true,
      },
      {
        buttonEmit: "visit-pharmacy",
        buttonTitle: "Обратиться в аптеку для получения льготного лекарства",
        isActive: true,
      },
    ],

    isSelected: false,
  },

  {
    roleId: 9,
    roleName: "Неизвестов Неизвест\nпациент",
    roleNumber: "+7 (333) 333-33-33",
    rolePassword: "Margo",
    roleProfile: "Никакой",
    roleTask: "Никакой",
    roleDescription: "Никакой",
    roleCondition: '"Никакой"',
    roleImg: "/images/patient.png",
    roleButtons: [
      {
        buttonEmit: "chat-bot",
        buttonTitle: "Записаться на прием к терапевту через чат-бот",
        isActive: true,
      },
      {
        buttonEmit: "cite-registratura",
        buttonTitle: "Записаться на прием к врачу на сайте «Регистратура»",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Посетить терапевта для получения направления к узкому специалисту",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Обратиться в регистратуру для записи к узкому специалисту",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Посетить узкого специалиста для подтверждения диагноза / необходимость льготного лекарства",
        isActive: true,
      },
      {
        buttonEmit: "emit-call",
        buttonTitle:
          "Обратиться в службу 666 чтобы выписали рецепт на льготное лекарство",
        isActive: true,
      },
      {
        buttonEmit: "visit-pharmacy",
        buttonTitle: "Обратиться в аптеку для получения льготного лекарства",
        isActive: true,
      },
    ],

    isSelected: false,
  },

  {
    roleId: 10,
    roleName: "Ноунеймов Ноунейм\nпациент",
    roleNumber: "+7 (333) 333-33-33",
    rolePassword: "Margo",
    roleProfile: "Никакой",
    roleTask: "Никакой",
    roleDescription: "Никакой",
    roleCondition: '"Никакой"',
    roleImg: "/images/patient.png",
    roleButtons: [
      {
        buttonEmit: "chat-bot",
        buttonTitle: "Записаться на прием к терапевту через чат-бот",
        isActive: true,
      },
      {
        buttonEmit: "cite-registratura",
        buttonTitle: "Записаться на прием к врачу на сайте «Регистратура»",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Посетить терапевта для получения направления к узкому специалисту",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Обратиться в регистратуру для записи к узкому специалисту",
        isActive: true,
      },
      {
        buttonEmit: "createMessage",
        buttonTitle:
          "Посетить узкого специалиста для подтверждения диагноза / необходимость льготного лекарства",
        isActive: true,
      },
      {
        buttonEmit: "emit-call",
        buttonTitle:
          "Обратиться в службу 666 чтобы выписали рецепт на льготное лекарство",
        isActive: true,
      },
      {
        buttonEmit: "visit-pharmacy",
        buttonTitle: "Обратиться в аптеку для получения льготного лекарства",
        isActive: true,
      },
    ],

    isSelected: false,
  },
];
