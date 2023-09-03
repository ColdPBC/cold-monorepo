import * as React from "react";
import { composeStories } from "@storybook/testing-react";
import { mount } from "@cypress/react";
import * as stories from "./button.stories";

// compile the "Primary" story with the library
const { Default, DefaultDisabled, DefaultIcon, Warning, Secondary, Link } = composeStories(stories);

it("Should empty the field when clicking the cross", () => {
    // and mount the story using @cypress/react library
    mount(<Default />);

    // then run our tests
    cy.get("button").click();
    cy.get("input").then((i: any) => expect(i.val()).to.be.empty);
});

it("Should empty the field when clicking the cross", () => {
    // and mount the story using @cypress/react library
    mount(<Default />);

    // then run our tests
    cy.get("button").click();
    cy.get("input").then((i: any) => expect(i.val()).to.be.empty);
});
