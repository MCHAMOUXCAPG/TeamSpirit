import React, { useState } from "react";
import "./HomePage.css";
// import Background from "../../assets/homePageBackground.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid, Paper, Container } from "@material-ui/core";
function HomePage() {
  const [search, setSearch] = useState("");
  const [Err, setErr] = useState(false);
  const [HelperTxt, setHelperTxt] = useState("");
  return (
    <Container
      id="bgImg"
      // style={sectionStyle}
      // maxWidth="lg"
      disableGutters={true}
    >
      <Grid
        container
        justify="center"
        alignItems="flex-end"
        direction="column"
        wrap="nowrap"
        spacing={0}
        id="GridContainer"
      >
        <Grid item>
          <Grid container spacing={0}>
            <Grid item xs={12} id="espacio"></Grid>
            <Grid item xs={2} sm={1} md={3} lg={1}></Grid>
            <Grid item xs={8} sm={10} md={8} lg={10} id="header">
              <div className="headerSurvey">
                Welcome to <br /> Team Spirit Survey
              </div>
            </Grid>
            <Grid item xs={2} sm={2} md={1} lg={1}></Grid>
            <Grid item xs={12} id="espacio2"></Grid>
            <Grid item xs={2} sm={6} md={6} lg={6}></Grid>
            <Grid item xs={5} sm={5} md={5} lg={5}>
              <form noValidate autoComplete="off">
                <Paper id="Card" variant="elevation" elevation={3}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <Grid item xs={12} id="espacio3"></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={8} sm={8} md={8} lg={8}>
                        <TextField
                          required
                          error={Err}
                          id="outlined-required"
                          variant="outlined"
                          placeholder="Enter your code in captial letters..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          helperText={HelperTxt}
                        />
                      </Grid>
                      <Grid item xs={3}></Grid>
                    </Grid>
                  </Grid>
                  <Button
                    id="ButtonStart"
                    // type="submit"
                    onClick={() => {
                      // alert(search.toString());
                      if (search !== "Test") {
                        setErr(true);
                        setHelperTxt("Incorrect entry.");
                      } else {
                        setErr(false);
                        alert(search.toString());
                        setHelperTxt("");
                      }
                    }}
                    size="small"
                  >
                    Start
                  </Button>
                </Paper>
              </form>
            </Grid>
            <Grid item xs={5} sm={1} md={1} lg={1}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
