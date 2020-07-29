import React from "react";
import render from "react-test-renderer";
import HomeScreen from "../src/screens/HomeScreen";
import SurveyScreen from "../src/screens/SurveyScreen";

// render() renders the component to an in-memory representation that doesn't require an iOS or Android environment.
//queryByText() finds a child component that contains the passed-in text.
//

test("HomeScreen snapShot", () => {
  jest.useFakeTimers();
  const snap = render.create(<HomeScreen />).toJSON();
  expect(snap).toMatchSnapshot();
});

/* test("SurveyScreen snapShot", () => {
  const snap = render.create(<SurveyScreen />).toJSON();
  expect(snap).toMatchSnapshot(); 
});
*/
