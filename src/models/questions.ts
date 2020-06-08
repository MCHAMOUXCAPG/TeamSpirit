import { ISurveyQuestion, questionType } from "./interfaces";

export const questions: ISurveyQuestion[] = [
  {
    number: 1,
    question: "Currently, I feel like…",
    type: questionType.fiveIcons,
    images: [
      "../assets/emoji1_1x.png",
      "../assets/emoji2_1x.png",
      "../assets/emoji3_1x.png",
      "../assets/emoji4_1x.png",
      "../assets/emoji5_1x.png",
    ],
  },
  {
    number: 2,
    question: "My enthusiasm regarding the work I do for my team now is…",
    type: questionType.fiveIcons,
    images: [
      "../assets/cat1_1x.png",
      "../assets/cat2_1x.png",
      "../assets/cat3_1x.png",
      "../assets/cat4_1x.png",
      "../assets/cat5_1x.png",
    ],
  },
  {
    number: 3,
    question:
      "The teamwork atmosphere and communication during the last Sprint was…",
    type: questionType.slider,
    images: ["../assets/sos_1x.png", "../assets/hands_raised_1x.png"],
  },
  {
    number: 4,
    question: "To what extent the tasks were challenging for me…",
    type: questionType.slider,
    images: ["../assets/sleeping_1x.png", "../assets/strong_1x.png"],
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
    images: ["../assets/heartbroken_1x.png", "../assets/victory_1x.png"],
  },
];
