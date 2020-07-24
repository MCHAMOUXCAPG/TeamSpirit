import { ISurveyQuestion, questionType } from "./interfaces";

const questions: ISurveyQuestion[] = [
  {
    number: 1,
    question: "Currently, I feel like…",
    type: questionType.fiveIcons,
    images: [
      require("../assets/emoji1_1x.png"),
      require("../assets/emoji2_1x.png"),
      require("../assets/emoji3_1x.png"),
      require("../assets/emoji4_1x.png"),
      require("../assets/emoji5_1x.png"),
    ],
  },
  {
    number: 2,
    question: "My enthusiasm regarding the work I do for my team now is…",
    type: questionType.fiveIcons,
    images: [
      require("../assets/cat1_1x.png"),
      require("../assets/cat2_1x.png"),
      require("../assets/cat3_1x.png"),
      require("../assets/cat4_1x.png"),
      require("../assets/cat5_1x.png"),
    ],
  },
  {
    number: 3,
    question:
      "The teamwork atmosphere and communication during the last Sprint was…",
    type: questionType.slider,
    images: [
      require("../assets/sos_1x.png"),
      require("../assets/hands_raised_1x.png"),
    ],
  },
  {
    number: 4,
    question: "To what extent the tasks were challenging for me…",
    type: questionType.slider,
    images: [
      require("../assets/sleeping_1x.png"),
      require("../assets/strong_1x.png"),
    ],
  },
  {
    number: 5,
    question: "I would rate my value contributed to the team as follows…",
    type: questionType.stars,
    images: [],
  },
  {
    number: 6,
    question:
      "I feel inspired and excited to work in this team for the coming sprints…",
    type: questionType.twoIcons,
    images: [
      require("../assets/heartbroken_1x.png"),
      require("../assets/victory_1x.png"),
    ],
  },
];

export default questions;
