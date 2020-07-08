// describe("Login Test", () => {
//   it("Login a user with 1 team", () => {
//     cy.visit("/Login");
//     cy.get("#outlined-required").type("user@mail.com");
//     cy.get("#outlined-required-2").type("123456");
//     cy.get("#ButtonStart").click();
//     cy.url().should("include", "/teamleader");
//     cy.get(".navBarButtons > button").should(($buttons) => {
//       expect($buttons).to.have.length(1);
//       expect($buttons.eq(0)).to.contain("Sign Out");
//     });
//     cy.get("#exit-app-button").click();
//     cy.get(".headerSurvey").should(($header) => {
//       expect($header).to.contain("Team Spirit Survey");
//     });
//   });

//   it("Login a user with more than 1 team", () => {
//     cy.visit("/Login");
//     cy.get("#outlined-required").type("nabil@capgemini.com");
//     cy.get("#outlined-required-2").type("Nabil");
//     cy.get("#ButtonStart").click();
//     cy.url().should("include", "/myTeams");
//     cy.get(".navBarButtons > button").should(($buttons) => {
//       expect($buttons).to.have.length(2);
//       expect($buttons.eq(0)).to.contain("Sign Out");
//       expect($buttons.eq(1)).to.contain("My Teams");
//     });
//   });

//   it("Login a user without team", () => {
//     cy.visit("/Login");
//     cy.get("#outlined-required").type("user2@mail.com");
//     cy.get("#outlined-required-2").type("123456");
//     cy.get("#ButtonStart").click();
//     cy.url().should("include", "/noTeam");
//     cy.get(".navBarButtons > button").should(($buttons) => {
//       expect($buttons).to.have.length(1);
//       expect($buttons.eq(0)).to.contain("Sign Out");
//     });
//     cy.get(".team-name").should(($h1) => {
//       expect($h1).to.contain("Error");
//     });
//     cy.get("#exit-app-button").click();
//     cy.get(".headerSurvey").should(($header) => {
//       expect($header).to.contain("Team Spirit Survey");
//     });
//   });
// });

// describe("Fill Survey Test", () => {
//   it("Enter with invalid code", () => {
//     cy.visit("/");
//     cy.get("#outlined-required").type("PRUEBA-PKRLT");
//     cy.get("#ButtonStart").click();
//     cy.get(".MuiFormHelperText-root.Mui-error").should(($error) => {
//       expect($error).to.contain("Invalid survey code");
//     });
//   });

//   it("Enter with iout of date code", () => {
//     cy.visit("/");
//     cy.get("#outlined-required").type("SNCF-abcde");
//     cy.get("#ButtonStart").click();
//     cy.get(".MuiFormHelperText-root.Mui-error").should(($error) => {
//       expect($error).to.contain(
//         "The deadline to complete the survey has passed"
//       );
//     });
//   });

//   it("Enter with all participants survey filled code", () => {
//     cy.visit("/");
//     cy.get("#outlined-required").type("SNCF-klmnp");
//     cy.get("#ButtonStart").click();
//     cy.get(".MuiFormHelperText-root.Mui-error").should(($error) => {
//       expect($error).to.contain("The maximum number of notes has been reached");
//     });
//   });

//   it("Enter with valid code", () => {
//     cy.visit("/");
//     cy.get("#outlined-required").type("PRUEBA-ABCDE");
//     cy.get("#ButtonStart").click();
//     cy.url().should("include", "/survey");
//     cy.get("#pop-up-dialog").should(($dialog) => {
//       expect($dialog).to.contain("Please answer the 6 following questions.");
//     });
//     cy.get("#alert-dialog-button").click();

//     cy.get("#root > div > div > div").should(($items) => {
//       expect($items).to.have.length(8);
//       expect($items.eq(0)).to.contain("PRUEBA");
//       expect($items.eq(1)).to.contain("1");
//       expect($items.eq(2)).to.contain("2");
//       expect($items.eq(3)).to.contain("3");
//       expect($items.eq(4)).to.contain("4");
//       expect($items.eq(5)).to.contain("5");
//       expect($items.eq(6)).to.contain("6");
//       expect($items.eq(7)).to.contain("SUBMIT");
//     });
//     cy.get("#submit-btn").should("be.disabled");
//     cy.get("#root img").should(($images) => {
//       expect($images).to.have.length(17);
//       $images.eq(5).click();
//       $images.eq(10).click();
//       $images.eq(12).click();
//       $images.eq(14).click();
//       $images.eq(16).click();
//     });
//     cy.get("label[for=simple-5]").click();
//     cy.get("#submit-btn").should("not.be.disabled");
//     cy.get("#submit-btn").click();
//     cy.get("#pop-up-dialog").should(($dialog) => {
//       expect($dialog).to.contain("Form successfully submitted.");
//     });
//     cy.get("#alert-dialog-button").click();
//     cy.url().should("include", "/success");
//     cy.get(".sentence").should(($message) => {
//       expect($message).to.contain("Your opinion counts!");
//     });
//   });
// });

describe("Navigate beetwen screens", () => {
  // it("MyTeams checkout", () => {
  //   cy.visit("/Login");
  //   cy.get("#outlined-required").type("nabil@capgemini.com");
  //   cy.get("#outlined-required-2").type("Nabil");
  //   cy.get("#ButtonStart").click();
  //   cy.url().should("include", "/myTeams");
  //   cy.get(".navBarButtons > button").should(($buttons) => {
  //     expect($buttons).to.have.length(2);
  //     expect($buttons.eq(0)).to.contain("Sign Out");
  //     expect($buttons.eq(1)).to.contain("My Teams");
  //   });
  //   cy.get("#root > div > div > div").should(($items) => {
  //     expect($items.eq(0)).to.contain("My Teams");
  //     expect($items.eq(1)).to.contain("Historic result:");
  //   });
  // });

  // it("Navigate from myTeams to teamLeader", () => {
  //   cy.visit("/Login");
  //   cy.get("#outlined-required").type("nabil@capgemini.com");
  //   cy.get("#outlined-required-2").type("Nabil");
  //   cy.get("#ButtonStart").click();
  //   cy.url().should("include", "/myTeams");
  //   cy.get("#root > div > div > div > div").eq(1).click();
  // });

  it("myTeams page checkout", () => {
    cy.visit("/Login");
    cy.get("#outlined-required").type("nabil@capgemini.com");
    cy.get("#outlined-required-2").type("Nabil");
    cy.get("#ButtonStart").click();
    cy.url().should("include", "/myTeams");
    cy.get("#root > div > div > div > div").eq(1).click();
  });

  // it("Navigate from teamLeader to myTeams", () => {
  //   cy.visit("/Login");
  //   cy.get("#outlined-required").type("nabil@capgemini.com");
  //   cy.get("#outlined-required-2").type("Nabil");
  //   cy.get("#ButtonStart").click();
  //   cy.url().should("include", "/myTeams");
  //   cy.get("#root > div > div > div > div").eq(1).click();
  //   cy.url().should("include", "/teamleader");
  //   cy.get(".navBarButtons > button").eq(1).click();
  //   cy.url().should("include", "/myTeams");
  // });
});
