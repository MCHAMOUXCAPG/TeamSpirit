import { ISurveyQuestion, questionType } from './interfaces';

//variable to keep all the questions (can add or modify here and will be shown in the application)
const questions: ISurveyQuestion[] = [
  {
    number: 1,
    question: 'Currently I feel like...',
    type: questionType.fiveIcons,
    images: [
      require('../assets/emoji1_1x.png'),
      require('../assets/emoji2_1x.png'),
      require('../assets/emoji3_1x.png'),
      require('../assets/emoji4_1x.png'),
      require('../assets/emoji5_1x.png'),
    ],
  },
  {
    number: 2,
    question: 'My enthusiasm regarding the work I do...',
    type: questionType.fiveIcons,
    images: [
      require('../assets/cat1_1x.png'),
      require('../assets/cat2_1x.png'),
      require('../assets/cat3_1x.png'),
      require('../assets/cat4_1x.png'),
      require('../assets/cat5_1x.png'),
    ],
  },
  {
    number: 3,
    question:
      'The teamwork atmosphere and communication during the last sprint was...',
    type: questionType.slider,
    images: [
      require('../assets/sos_1x.png'),
      require('../assets/hands_raised_1x.png'),
    ],
  },
  {
    number: 4,
    question: 'To what extend the tasks were challenging enough for me...',
    type: questionType.slider,
    images: [
      require('../assets/sleeping_1x.png'),
      require('../assets/strong_1x.png'),
    ],
  },
  {
    number: 5,
    question: 'I would rate my value contributed to team as follows...',
    type: questionType.stars,
    images: [],
  },
  {
    number: 6,
    question: 'The workload of the last sprint was...',
    type: questionType.slider,
    images: [require('../assets/6.1.png'), require('../assets/6.2.png')],
  },
  {
    number: 7,
    question: 'I feel supported by the client and stakeholders',
    type: questionType.slider,
    images: [require('../assets/7.1.png'), require('../assets/7.2.png')],
  },
  {
    number: 8,
    question: 'I feel recognized and praised by the team',
    type: questionType.slider,
    images: [require('../assets/8.1.png'), require('../assets/8.2.png')],
  },
  {
    number: 9,
    question:
      'I feel inspired and excited to work in this team for the coming sprints',
    type: questionType.slider,
    images: [
      require('../assets/heartbroken_1x.png'),
      require('../assets/9.2.png'),
    ],
  },
];

export default questions;
