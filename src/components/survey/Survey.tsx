import React, { useState } from "react";
import "./Survey.css";
import { Container, Paper, Grid, Slider } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import AlertDialog from "../alertDialog/AlertDialog";
import colors from "../../config/colors";
import questions from "../../models/questions";
import { questionType } from "../../models/interfaces";

const Survey = () => {
  const [starsSelected, setStarsSelected] = useState<number | null>(0);
  const [sliderStep, setSliderStep] = useState<number | number[]>(5);

  return (
    <Container maxWidth="lg" className="content">
      <Grid
        container
        spacing={3}
        style={{
          padding: 30,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {questions.map((question) => {
          return (
            <Grid
              container
              item
              xs={6}
              spacing={3}
              style={{
                width: "100%",
                height: 200,
                margin: "20px 0px",
                justifyContent: "center",
              }}
              key={question.number}
            >
              <Paper
                style={{
                  width: "70%",
                  padding: 20,
                  boxShadow: "2px 3px 3px 3px #79C0C6",
                  borderRadius: 20,
                }}
              >
                <p style={{ fontWeight: "bold" }}>
                  {question.number}. {question.question}
                </p>
                <Grid container spacing={3} style={{ width: "100%" }}>
                  {question.type === questionType.fiveIcons ? (
                    <>
                      <Grid item xs={1}></Grid>
                      {question.images.map((image, index) => {
                        return (
                          <Grid item xs={2}>
                            <img
                              src={image}
                              style={{ height: 40, width: 40, padding: 10 }}
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
                            setStarsSelected(newValue);
                          }}
                        />
                      </Grid>
                    </>
                  ) : null}
                  {question.type === questionType.slider ? (
                    <>
                      <Grid item xs={2}>
                        <img
                          src={question.images[0]}
                          style={{ height: 40, width: 40, padding: 10 }}
                          alt=""
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Slider
                          value={sliderStep}
                          onChange={(event, newValue) => {
                            setSliderStep(newValue);
                          }}
                          step={2.5}
                          min={0}
                          max={10}
                          style={{ color: colors.primary, top: "25%" }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <img
                          src={question.images[1]}
                          style={{ height: 40, width: 40, padding: 10 }}
                          alt=""
                        />
                      </Grid>
                    </>
                  ) : null}
                  {question.type === questionType.twoIcons ? (
                    <>
                      <Grid item xs={3} />
                      <Grid item xs={2}>
                        <img
                          src={question.images[0]}
                          style={{ height: 40, width: 40, padding: 10 }}
                          alt=""
                        />
                      </Grid>
                      <Grid item xs={2} />
                      <Grid item xs={2}>
                        <img
                          src={question.images[1]}
                          style={{ height: 40, width: 30, padding: 10 }}
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
      <AlertDialog />
    </Container>
  );
};

export default Survey;
