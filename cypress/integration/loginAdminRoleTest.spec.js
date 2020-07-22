describe("Login as Admin", () => {
  it("Login a user with Admin role", () => {
    cy.visit("/Login");
    cy.get("#outlined-required").type("admin@gmail.com");
    cy.get("#outlined-required-2").type("admin123");
    cy.get("#ButtonStart").click();
    cy.url().should("include", "/admin");
    cy.get(".navBarButtons > button").should(($buttons) => {
      expect($buttons).to.have.length(1);
      expect($buttons.eq(0)).to.contain("Sign Out");
    });
    cy.get("#exit-app-button").click();
    cy.get(".headerSurvey").should(($header) => {
      expect($header).to.contain("Team Spirit Survey");
    });
  });

  it("Create new User", () => {
    cy.visit("/Login");
    cy.get("#outlined-required").type("admin@gmail.com");
    cy.get("#outlined-required-2").type("admin123");
    cy.get("#ButtonStart").click();
    cy.url().should("include", "/admin");
    cy.get("#root > div > div > div > div > button").eq(0).click(); // open "create"
    cy.get("#input-num-4").type("createUser");
    cy.get("#input-num-2").type("createUser@mail.com");
    cy.get("#input-num-3").type("123456");
    cy.get("input").eq(5).click().focus();
    cy.get(".e1qjn9k90 > span").eq(1).click(); //select role teamLeader
    cy.get("input").eq(6).click().focus();
    cy.get(".e1qjn9k90 > span").eq(0).click(); //select team
    cy.get("#save-btn").click();
    cy.get("button")
      .should(
        "have.class",
        "MuiButtonBase-root MuiButton-root MuiButton-contained"
      )
      .contains("OK")
      .click();
  });

  it("Edit user", () => {
    cy.visit("/Login");
    cy.get("#outlined-required").type("admin@gmail.com");
    cy.get("#outlined-required-2").type("admin123");
    cy.get("#ButtonStart").click();
    cy.url().should("include", "/admin");
    cy.get("#root > div > div > div > div > div > div > div > button")
      .eq(0)
      .click(); // USERS tab
    cy.get("#root > div > div > div > div > div > div > div > div > input")
      .eq(0)
      .click()
      .type("createUser"); // filter by user
    cy.contains("createUser")
      .parent("tr")
      .within(() => {
        cy.get("td > div > button").eq(0).click(); //edit table
      });
    cy.get("#input-num-1").clear().type("deleteUser");
    cy.get("#input-num-2").clear().type("deleteUser@mail.com");
    cy.get("input").eq(5).click().focus();
    cy.get(".e1qjn9k90 > span").eq(1).click(); //select team
    cy.get("#save-btn").click();
    cy.get("button")
      .should(
        "have.class",
        "MuiButtonBase-root MuiButton-root MuiButton-contained"
      )
      .contains("OK")
      .click();
    cy.get(
      "#root > div > div > div > div > div > div > div > div > div > button"
    )
      .eq(0)
      .click(); //clean search
  });

  it("Filter user and Delete", () => {
    cy.visit("/Login");
    cy.get("#outlined-required").type("admin@gmail.com");
    cy.get("#outlined-required-2").type("admin123");
    cy.get("#ButtonStart").click();
    cy.url().should("include", "/admin");
    cy.get("#root > div > div > div > div > div > div > div > button")
      .eq(0)
      .click(); // boton de USERS
    cy.get("#root > div > div > div > div > div > div > div > div > input")
      .eq(0)
      .click()
      .type("deleteUser"); // filter by user name
    cy.contains("deleteUser")
      .parent("tr")
      .within(() => {
        cy.get("td > div > button").eq(1).click(); //table delete button
      });
    cy.get("button")
      .eq(4)
      .should(
        "have.class",
        "MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
      )
      .click(); // delete confirmation button
    cy.get("button")
      .should(
        "have.class",
        "MuiButtonBase-root MuiButton-root MuiButton-contained"
      )
      .contains("OK")
      .click(); // succesfully deleted
    cy.get(
      "#root > div > div > div > div > div > div > div > div > div > button"
    )
      .eq(0)
      .click(); //clean search
  });
});
