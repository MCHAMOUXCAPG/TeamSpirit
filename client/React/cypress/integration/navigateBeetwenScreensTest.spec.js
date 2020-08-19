describe("Navigate beetwen screens", () => {
  it("MyTeams checkout", () => {
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
    cy.get("#root > div > div > div").should(($items) => {
      expect($items.eq(0)).to.contain("My Teams");
      expect($items.eq(1)).to.contain("Historic result:");
    });
  });

  it("Navigate from myTeams to teamLeader", () => {
    cy.visit("/Login");
    cy.get("#outlined-required").type("nabil@capgemini.com");
    cy.get("#outlined-required-2").type("Nabil");
    cy.get("#ButtonStart").click();
    cy.url().should("include", "/myTeams");
    cy.get("#root > div > div > div > div").eq(1).click();
  });

  it("myTeams page checkout", () => {
    expect(true).to.equal(true);
    cy.visit("/Login");
    cy.get("#outlined-required").type("nabil@capgemini.com");
    cy.get("#outlined-required-2").type("Nabil");
    cy.get("#ButtonStart").click();
    cy.url().should("include", "/myTeams");
    cy.get("#root > div > div > div > div").eq(2).click();
    cy.get("#chart img").should("have.class", "noteicon");
    cy.get("#chart h1").should("have.class", "grade");
    cy.get("h2.h2").should(($h2) => {
      expect($h2).to.contain("Team Status");
    });
    cy.get(".surveyStatusContainer > div").should(($divs) => {
      expect($divs).to.have.length(6);
      expect($divs.eq(0)).to.contain("Period:");
      expect($divs.eq(1)).to.contain("Completed:");
      expect($divs.eq(2)).to.contain("Current result:");
      expect($divs.eq(3)).to.contain("Historic result:");
      expect($divs.eq(4)).to.contain("Survey Code:");
      expect($divs.eq(5)).to.contain("Configure your team");
      expect($divs.eq(5)).to.contain("Reset current survey");
    });
    cy.get("#export-container").should(($button) => {
      expect($button).to.contain("PREPARE RESULTS TO EXPORT");
    });
    cy.get("#mainPanel").should(($button) => {
      expect($button).to.contain("RESULTS IN DETAIL");
    });
    cy.get("#mainPanel").click();
    cy.get("button").should(($buttons) => {
      expect($buttons).to.have.length(10);
      expect($buttons.eq(0)).to.contain("Sign Out");
      expect($buttons.eq(1)).to.contain("My Teams");
      expect($buttons.eq(2)).to.contain("Configure your team");
      expect($buttons.eq(3)).to.contain("Historic Data");
      expect($buttons.eq(4)).to.contain("Reset current survey");
      expect($buttons.eq(7)).to.contain("Export");
      expect($buttons.eq(8)).to.contain("By User");
      expect($buttons.eq(9)).to.contain("By Question");
    });
    cy.get("button")
      .eq(5)
      .should("have.class", "MuiButtonBase-root MuiIconButton-root");
    cy.get("button").eq(5).click({ force: true });
    cy.get("button")
      .eq(5)
      .should("have.class", "MuiButtonBase-root MuiIconButton-root");
    cy.get("button").eq(6).click({ force: true });
    cy.get("button")
      .eq(7)
      .should(
        "have.class",
        "MuiButtonBase-root MuiButton-root MuiButton-outlined bt btn-containe"
      );
    cy.get("button").eq(7).click({ force: true });
    cy.get("button").eq(8).should("have.class", "Mui-selected");
    cy.get("button").eq(9).should("not.have.class", "Mui-selected");
    cy.get("button").eq(9).click({ force: true });
    cy.get("button").eq(9).should("have.class", "Mui-selected");
    cy.get("button").eq(8).should("not.have.class", "Mui-selected");
  });

  it("Navigate from teamLeader to myTeams", () => {
    cy.visit("/Login");
    cy.get("#outlined-required").type("nabil@capgemini.com");
    cy.get("#outlined-required-2").type("Nabil");
    cy.get("#ButtonStart").click();
    cy.url().should("include", "/myTeams");
    cy.get("#root > div > div > div > div").eq(1).click();
    cy.url().should("include", "/teamleader");
    cy.get(".navBarButtons > button").eq(1).click();
    cy.url().should("include", "/myTeams");
  });
});
