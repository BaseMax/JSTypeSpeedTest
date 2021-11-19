const textArea = "#textarea";
const accuracyText = "#accuracy";
const errorsText = "#errors";
const timeText = "#time";
const wpmText = "#wpm";
const typeText = "#type-text";

const initialText =
  "سعی نکنید همه چیز را بدانید. شما ممکن است خیلی چیزها را دیده و انجام داده باشید، اما لزوما به این معنی نیست که شما می دانید بهترین است. سعی نکنید به مردم بگویید که چگونه می توانند کارها را به شیوه ای بهتر انجام دهند یا اینکه بهتر می توانند کاری انجام دهند.";

describe("Typing test application tests:", () => {
  beforeEach(() => {
    cy.visit("index.html");
    cy.window().then((win) => {
      win.initializeTest({ timeLimit: 60, text: initialText });
    });
  });
  it("test render each characters", () => {
    const text = "سعی نکنید همه چیز را بدانید.";
    cy.window().then((win) => {
      win.initializeTest({
        timeLimit: 10,
        text,
      });
    });
    cy.get(typeText)
      .children()
      .should("have.length", text.length)
      .each(($el, index) => {
        cy.wrap($el)
          .should("have.text", text[index])
          .should("have.prop", "tagName")
          .should("eq", "SPAN");
      });
  });
});
