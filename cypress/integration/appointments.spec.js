describe("should book an interview", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
  });

  it("should book an interview", () => {
    cy.contains("Monday");
    cy.get("[alt=Add]").first().click();
    cy.get("input[placeholder]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt=Edit]").first().click({ force: true });
    cy.get("input[placeholder]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should delete an interview", () => {
    cy.get("[alt=Delete]").first().click({ force: true });
    cy.contains("Confirm").click();
  });
});
