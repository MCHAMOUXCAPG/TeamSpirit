describe("Login Test", () => {
  it("Login a user with 1 team", () => {
    cy.visit("/Login");
    cy.get("#outlined-required").type("user@mail.com");
    cy.get("#outlined-required-2").type("123456");
    cy.get("#ButtonStart").click();
    cy.url().should("include", "/teamleader");
    cy.get(".navBarButtons > button").should(($buttons) => {
      expect($buttons).to.have.length(1);
      expect($buttons.eq(0)).to.contain("Sign Out");
    });
    cy.get("#exit-app-button").click();
    cy.get(".headerSurvey").should(($header) => {
      expect($header).to.contain("Team Spirit Survey");
    });
  });

  it("Login a user with more than 1 team", () => {
    cy.visit("/Login");
    cy.get("#outlined-required").type("nabil@capgemini.com");
    cy.get("#outlined-required-2").type("Nabil");
    cy.get("#ButtonStart").click();
    cy.url().should("include", "/myTeams");
    cy.get(".navBarButtons > button").should(($buttons) => {
      expect($buttons).to.have.length(2);
      expect($buttons.eq(0)).to.contain("Sign Out");
      expect($buttons.eq(1)).to.contain("My Teams");
    });
  });

  it("Login a user without team", () => {
    cy.visit("/Login");
    cy.get("#outlined-required").type("user2@mail.com");
    cy.get("#outlined-required-2").type("123456");
    cy.get("#ButtonStart").click();
    cy.url().should("include", "/noTeam");
    cy.get(".navBarButtons > button").should(($buttons) => {
      expect($buttons).to.have.length(1);
      expect($buttons.eq(0)).to.contain("Sign Out");
    });
    cy.get(".team-name").should(($h1) => {
      expect($h1).to.contain("Error");
    });
    cy.get("#exit-app-button").click();
    cy.get(".headerSurvey").should(($header) => {
      expect($header).to.contain("Team Spirit Survey");
    });
  });
});
