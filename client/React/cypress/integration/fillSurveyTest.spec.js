describe("Fill Survey Test", () => {
  it("Enter with invalid code", () => {
    cy.visit("/");
    cy.get("#outlined-required").type("GORN-AAAA");
    cy.get("#ButtonStart").click();
    cy.get(".MuiFormHelperText-root.Mui-error").should(($error) => {
      expect($error).to.contain("Invalid code");
    });
  });

  it("Enter with out of date code", () => {
    cy.visit("/");
    cy.get("#outlined-required").type("PRUEBA-ABCDE");
    cy.get("#ButtonStart").click();
    cy.get(".MuiFormHelperText-root.Mui-error").should(($error) => {
      expect($error).to.contain(
        "The deadline to complete the survey has passed"
      );
    });
  });

  it("Enter with all participants survey filled code", () => {
    cy.visit("/");
    cy.get("#outlined-required").type("SNCF-ABCDE");
    cy.get("#ButtonStart").click();
    cy.get(".MuiFormHelperText-root.Mui-error").should(($error) => {
      expect($error).to.contain("The maximum number of notes has been reached");
    });
  });

  it("Enter with valid code", () => {
    cy.visit("/");
    cy.get("#outlined-required").type("GORN-ABCDE");
    cy.get("#ButtonStart").click();
    cy.url().should("include", "/survey");
    cy.get("#pop-up-dialog").should(($dialog) => {
      expect($dialog).to.contain("Please answer the 6 following questions.");
    });
    cy.get("#alert-dialog-button").click();

    cy.get("#root > div > div > div").should(($items) => {
      expect($items).to.have.length(8);
      expect($items.eq(0)).to.contain("GORN");
      expect($items.eq(1)).to.contain("1");
      expect($items.eq(2)).to.contain("2");
      expect($items.eq(3)).to.contain("3");
      expect($items.eq(4)).to.contain("4");
      expect($items.eq(5)).to.contain("5");
      expect($items.eq(6)).to.contain("6");
      expect($items.eq(7)).to.contain("SUBMIT");
    });
    cy.get("#submit-btn").should("be.disabled");
    cy.get("#root img").should(($images) => {
      expect($images).to.have.length(17);
      $images.eq(5).click();
      $images.eq(10).click();
      $images.eq(12).click();
      $images.eq(14).click();
      $images.eq(16).click();
    });
    cy.get("label[for=simple-5]").click();
    cy.get("#submit-btn").should("not.be.disabled");
    cy.get("#submit-btn").click();
    cy.get("#pop-up-dialog").should(($dialog) => {
      expect($dialog).to.contain("Form successfully submitted.");
    });
    cy.get("#alert-dialog-button").click();
    cy.url().should("include", "/success");
    cy.get(".sentence").should(($message) => {
      expect($message).to.contain("Your opinion matters!");
    });
  });
});
