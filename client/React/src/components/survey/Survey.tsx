import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Survey.css';
import {
  Container,
  Paper,
  Grid,
  Slider,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import colors from '../../config/colors';
import NavBar from '../navBar/NavBar';
import AlertDialog from '../alertDialog/AlertDialog';
import questions from '../../models/questions';
import { SurveyService } from '../../services/Services';
import { useAuth, AuthContext } from '../../context/auth';
import {
  questionType,
  IQuestionStatus,
  IQuestionResponse,
} from '../../models/interfaces';

const Survey = (props: any) => {
  const surveyCode = useAuth().surveyCode;
  const context = useContext(AuthContext);

  const surveyService: SurveyService = new SurveyService();
  const [starsSelected, setStarsSelected] = useState<number | any>(0);
  const [slider3, setSlider3] = useState<number | number[]>(5);
  const [slider4, setSlider4] = useState<number | number[]>(5);
  const [slider6, setSlider6] = useState<number | number[]>(5);
  const [slider7, setSlider7] = useState<number | number[]>(5);
  const [slider8, setSlider8] = useState<number | number[]>(5);
  const [slider9, setSlider9] = useState<number | number[]>(5);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [questionsState, setQuestionsState] = useState<IQuestionStatus[]>([
    { valid: false, status: 'active', touched: true },
    { valid: false, status: '', touched: false },
    { valid: true, status: '', touched: false },
    { valid: true, status: '', touched: false },
    { valid: false, status: '', touched: false },
    { valid: true, status: '', touched: false },
    { valid: true, status: '', touched: false },
    { valid: true, status: '', touched: false },
    { valid: true, status: '', touched: false },
  ]);

  // Get the uniqueId from localStorage
  let uniqueId: any = undefined;
  if (localStorage.getItem('uniqueIdTS')) {
    uniqueId = localStorage.getItem('uniqueIdTS');
  }

  const [questionsResponse, setQuestionsResponse] = useState<
    IQuestionResponse[]
  >([
    { number: 1, note: 0, surveyCode: surveyCode, User: uniqueId },
    { number: 2, note: 0, surveyCode: surveyCode, User: uniqueId },
    { number: 3, note: 5, surveyCode: surveyCode, User: uniqueId },
    { number: 4, note: 5, surveyCode: surveyCode, User: uniqueId },
    { number: 5, note: 0, surveyCode: surveyCode, User: uniqueId },
    { number: 6, note: 5, surveyCode: surveyCode, User: uniqueId },
    { number: 7, note: 5, surveyCode: surveyCode, User: uniqueId },
    { number: 8, note: 5, surveyCode: surveyCode, User: uniqueId },
    { number: 9, note: 5, surveyCode: surveyCode, User: uniqueId },
  ]);

  const [activeIcon, setActiveIcon] = useState([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  function useForceUpdate() {
    // eslint-disable-next-line
    const [value, setValue] = useState(0);
    return () => setValue((value) => ++value); // update the state to force render and see the clicked option
  }

  const forceUpdate = useForceUpdate();

  const navigate = useNavigate();

  // Fuction that call the service to send the survey
  async function sendSurvey(surveyCode: string, body: IQuestionResponse[]) {
    await surveyService
      .sendSurvey(surveyCode, body)
      .then((res) => {
        if ((res.status = 200)) {
          setSuccess(true); // This opens the alertDialog.tsx
        }
      })
      .catch((err) => {
        if (err.request.status === 0) {
          alert('Please verify you have internet access!');
        } else {
          alert(err.Error);
        }
      });
    setLoading(false);
  }

  // Hook that updates the questions state each time the user change the values
  useEffect(() => {
    let count = 0;
    const currentQuestionStatus = questionsState;
    currentQuestionStatus.forEach((question: IQuestionStatus) => {
      question.status = '';
      if (question.valid) {
        count++;
      }
    });
    currentQuestionStatus[currentQuestion].status = 'active';
    currentQuestionStatus[currentQuestion].touched = true;
    setQuestionsState(currentQuestionStatus);
    const response = questionsResponse;
    setQuestionsResponse(response);
    if (count === questionsState.length) {
      setDisabled(false);
      forceUpdate();
    }
    forceUpdate();
    // eslint-disable-next-line
  }, [questionsState, activeIcon, currentQuestion]);

  // Function that enables the submit button if all questions answered
  const checkDisabled = () => {
    let count = 0;
    const currentQuestionStatus = questionsState;
    currentQuestionStatus.forEach((question: IQuestionStatus) => {
      question.status = '';
      if (question.valid) {
        count++;
      }
    });
    if (count === questionsState.length) {
      setDisabled(false);
      forceUpdate();
    }
  };

  // Function that updates the mark for a 5 icons question
  const handleClick5Icons = (questionNum: number, index: number) => {
    const currentQuestionstate = questionsState;
    const currentQuestionsResponse = questionsResponse;
    currentQuestionstate[questions[questionNum].number - 1] = {
      valid: true,
      touched: true,
    };
    currentQuestionsResponse[questions[questionNum].number - 1].note =
      index * 2.5;
    setQuestionsState(currentQuestionstate);
    setQuestionsResponse(currentQuestionsResponse);
    const active = activeIcon;
    active[questions[questionNum].number - 1] = [
      false,
      false,
      false,
      false,
      false,
    ];
    active[questions[questionNum].number - 1][index] = true;
    setActiveIcon(active);
    checkDisabled();
    forceUpdate();
  };

  // Function that updates the mark for a slider question
  const handleClickSlider = (index: number, value: number | any) => {
    const currentQuestionstate = questionsState;
    const currentQuestionsResponse = questionsResponse;
    currentQuestionstate[questions[index].number - 1] = {
      valid: true,
      touched: true,
    };
    currentQuestionsResponse[questions[index].number - 1].note = value;
    setQuestionsState(currentQuestionstate);
    setQuestionsResponse(currentQuestionsResponse);
    checkDisabled();
    forceUpdate();
  };

  // Function that updates the mark for a rating question
  const handleClickStars = (value: number | any) => {
    const currentQuestionstate = questionsState;
    const currentQuestionsResponse = questionsResponse;
    currentQuestionstate[questions[4].number - 1] = {
      valid: true,
      touched: true,
    };
    currentQuestionsResponse[questions[4].number - 1].note = (value - 1) * 2.5;
    setQuestionsState(currentQuestionstate);
    setQuestionsResponse(currentQuestionsResponse);
    setStarsSelected(value);
    checkDisabled();
    forceUpdate();
  };

  // Function that updates the mark for a 2 icons question
  const handleClick2Icons = (index: number, mark: number) => {
    const currentQuestionstate = questionsState;
    const currentQuestionsResponse = questionsResponse;
    currentQuestionstate[questions[5].number - 1] = {
      valid: true,
      touched: true,
    };
    currentQuestionsResponse[questions[5].number - 1].note = mark;
    setQuestionsState(currentQuestionstate);
    setQuestionsResponse(currentQuestionsResponse);
    const active = activeIcon;
    active[questions[5].number - 1] = [false, false];
    active[questions[5].number - 1][index] = true;
    setActiveIcon(active);
    checkDisabled();
    forceUpdate();
  };

  // Function that hables the submit button click
  const handleSurveyCompletion = () => {
    setLoading(true);
    sendSurvey(surveyCode, questionsResponse);
  };

  const setSliderValue = (questionNumber: number, value: number | number[])=>{
    handleClickSlider(questionNumber-1, value);
    switch (questionNumber) {
      case 3:
        setSlider3(value);
        break;

      case 4:
        setSlider4(value);
        break;

      case 6:
        setSlider6(value);
        break;

      case 7:
        setSlider7(value);
        break;

      case 8:
        setSlider8(value);
        break;

      case 9:
        setSlider9(value);
        break;

      default:
        break;
    }
  }

  const getSliderValue = (questionNumber: number) => {
    switch (questionNumber) {
      case 3:
        return slider3;

      case 4:
        return slider4;

      case 6:
        return slider6;

      case 7:
        return slider7;

      case 8:
        return slider8;

      case 9:
        return slider9;

      default:
        break;
    }
  }

  return (
    <>
      <NavBar user={false} />
      <Container maxWidth="lg" className="content">
        <Grid
          container
          spacing={3}
          style={{
            padding: 30,
            width: '100%',
            justifyContent: 'center',
            paddingTop: 0,
          }}
        >
          <Grid item xs={12}>
            <div className="team-name">{context.currentTeam}</div>
          </Grid>
          {questions.map((question, index) => {
            return (
              <Grid
                container
                item
                xs={6}
                spacing={3}
                style={{
                  width: '100%',
                  height: 200,
                  margin: '5px 0px',
                  justifyContent: 'center',
                }}
                key={question.number}
              >
                <Paper
                  style={{
                    width: '70%',
                    padding: 20,
                    boxShadow: '2px 3px 3px 3px ' + colors.primary,
                    borderRadius: 20,
                  }}
                >
                  <p style={{ fontWeight: 'bold' }}>
                    {question.number}. {question.question}
                  </p>
                  <Grid container spacing={3} style={{ width: '100%' }}>
                    {question.type === questionType.fiveIcons ? (
                      <>
                        <Grid item xs={1}></Grid>
                        {question.images.map((image, index) => {
                          return (
                            <Grid item xs={2} key={index}>
                              <img
                                className="icon-image"
                                onClick={() => {
                                  if (question.number === 1) {
                                    handleClick5Icons(0, index);
                                  } else {
                                    handleClick5Icons(1, index);
                                  }
                                }}
                                src={image}
                                style={
                                  question.number === 1
                                    ? activeIcon[questions[0].number - 1][index]
                                      ? {
                                          height: 40,
                                          width: 40,
                                          padding: 10,
                                          backgroundColor: colors.primary,
                                          borderRadius: 30,
                                        }
                                      : { height: 40, width: 40, padding: 10 }
                                    : activeIcon[questions[1].number - 1][index]
                                    ? {
                                        height: 40,
                                        width: 40,
                                        padding: 10,
                                        backgroundColor: colors.primary,
                                        borderRadius: 30,
                                      }
                                    : { height: 40, width: 40, padding: 10 }
                                }
                                alt=""
                              />
                            </Grid>
                          );
                        })}
                      </>
                    ) : null}
                    {question.type === questionType.stars ? (
                      <>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={10}>
                          <Rating
                            name="simple"
                            value={starsSelected}
                            size="large"
                            style={{ fontSize: 50 }}
                            onChange={(event, newValue) => {
                              handleClickStars(newValue);
                            }}
                          />
                        </Grid>
                      </>
                    ) : null}
                    {question.type === questionType.slider ? (
                      <>
                        <Grid item xs={2}>
                          <img
                            className="icon-image"
                            src={question.images[0]}
                            style={{ height: 40, width: 40, padding: 10 }}
                            alt=""
                            onClick={() => {
                              setSliderValue(question.number, 0)
                            }}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <Slider
                            value={getSliderValue(question.number)}
                            onChange={(event, newValue) => {
                              setSliderValue(question.number, newValue)
                            }}
                            step={2.5}
                            min={0}
                            max={10}
                            style={{
                              color: colors.primary,
                              top: '25%',
                            }}
                            marks={true}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <img
                            className="icon-image"
                            src={question.images[1]}
                            style={{ height: 40, width: 40, padding: 10 }}
                            alt=""
                            onClick={() => {
                              setSliderValue(question.number, 10)
                            }}
                          />
                        </Grid>
                      </>
                    ) : null}
                    {question.type === questionType.twoIcons ? (
                      <>
                        <Grid item xs={3} />
                        <Grid item xs={2}>
                          <img
                            className="icon-image"
                            onClick={() => {
                              handleClick2Icons(0, 5);
                            }}
                            src={question.images[0]}
                            style={
                              activeIcon[questions[5].number - 1][0]
                                ? {
                                    height: 40,
                                    width: 40,
                                    padding: 10,
                                    backgroundColor: colors.primary,
                                    borderRadius: 30,
                                  }
                                : { height: 40, width: 40, padding: 10 }
                            }
                            alt=""
                          />
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item xs={2}>
                          <img
                            className="icon-image"
                            onClick={() => {
                              handleClick2Icons(1, 7.5);
                            }}
                            src={question.images[1]}
                            style={
                              activeIcon[questions[5].number - 1][1]
                                ? {
                                    height: 40,
                                    width: 30,
                                    padding: 10,
                                    backgroundColor: colors.primary,
                                    borderRadius: 30,
                                  }
                                : { height: 40, width: 30, padding: 10 }
                            }
                            alt=""
                          />
                        </Grid>
                        <Grid item xs={3} />
                      </>
                    ) : null}
                  </Grid>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          container
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            marginTop: 20,
            marginBottom: 100,
          }}
        >
          <Button
            id="submit-btn"
            variant="contained"
            size="large"
            disabled={disabled}
            onClick={handleSurveyCompletion}
            style={
              disabled
                ? {
                    justifyContent: 'center',
                    alignContent: 'center',
                    color: 'white',
                    backgroundColor: colors.secondary,
                    borderRadius: 20,
                    width: 280,
                    height: 40,
                    fontSize: 20,
                  }
                : {
                    justifyContent: 'center',
                    alignContent: 'center',
                    color: 'white',
                    backgroundColor: colors.primary,
                    borderRadius: 20,
                    width: 280,
                    height: 40,
                    fontSize: 20,
                  }
            }
          >
            {loading ? (
              <CircularProgress
                size={24}
                style={{
                  color: colors.white,
                }}
              />
            ) : (
              'SUBMIT'
            )}
          </Button>
        </Grid>
      </Container>
      <AlertDialog
        text1="Please answer the 9 following questions."
        text2="It will only take you a couple of minutes."
        clicked=""
      />
      {success && (
        <AlertDialog
          text1="Form successfully submitted."
          text2="Thank you for sending us your feedback."
          clicked={() => {
            context.setValid(false);
            navigate('/success');
          }}
        />
      )}
    </>
  );
};

export default Survey;
