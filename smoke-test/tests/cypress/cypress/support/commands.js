// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

import dayjs from "dayjs";

function selectorWithtestId (id) {
  return '[data-testid="' + id +'"]';
}

export function getTimestampMillisNumDaysAgo (numDays) {
  return dayjs().subtract(numDays, 'day').valueOf();
}


Cypress.Commands.add('login', () => {
    cy.request({
      method: 'POST',
      url: '/logIn',
      body: {
         username: Cypress.env('ADMIN_USERNAME'),
         password: Cypress.env('ADMIN_PASSWORD'),
      },
      retryOnStatusCodeFailure: true,
    });
})

Cypress.Commands.add("loginWithCredentials", (username, password) => {
  cy.visit('/');
  if (username,password) {
    cy.get('input[data-testid=username]').type(username);
    cy.get('input[data-testid=password]').type(password);
  } else {
    cy.get('input[data-testid=username]').type(Cypress.env('ADMIN_USERNAME'));
    cy.get('input[data-testid=password]').type(Cypress.env('ADMIN_PASSWORD'));
  }
  cy.contains('Sign In').click();
  cy.contains('Welcome back');
});

Cypress.Commands.add('deleteUrn', (urn) => {
    cy.request({ method: 'POST', url: 'http://localhost:8080/entities?action=delete', body: {
        urn
    }, headers: {
        "X-RestLi-Protocol-Version": "2.0.0",
        "Content-Type": "application/json",
    }})
})

Cypress.Commands.add("logout", () => {
  cy.get(selectorWithtestId("manage-account-menu")).click();
  cy.get(selectorWithtestId("log-out-menu-item")).click({ force: true });
  cy.waitTextVisible("Username");
  cy.waitTextVisible("Password");
});

Cypress.Commands.add("goToGlossaryList", () => {
  cy.visit("/glossary");
  cy.waitTextVisible("Glossary");
  cy.wait(3000);
});

Cypress.Commands.add("goToDomainList", () => {
  cy.visit("/domains");
  cy.waitTextVisible("Domains");
  cy.waitTextVisible("New Domain");
});

Cypress.Commands.add("goToViewsSettings", () => {
  cy.visit("/settings/views");
  cy.waitTextVisible("Manage Views");
});

Cypress.Commands.add("goToOwnershipTypesSettings", () => {
  cy.visit("/settings/ownership");
  cy.waitTextVisible("Manage Ownership");
});

Cypress.Commands.add("goToAccessTokenSettings", () => {
  cy.visit("/settings/tokens");
  cy.waitTextVisible("Manage Access Tokens");
  cy.wait(3000);
});

Cypress.Commands.add("goToIngestionPage", () => {
  cy.visit("/ingestion");
  cy.waitTextVisible("Manage Ingestion");
});

Cypress.Commands.add("goToDataset", (urn, dataset_name) => {
  cy.visit(
    "/dataset/" + urn
  );
  cy.waitTextVisible(dataset_name);
});

Cypress.Commands.add("goToEntityLineageGraph", (entity_type, urn) => {
  cy.visit(
    `/${entity_type}/${urn}?is_lineage_mode=true`
  );
})

Cypress.Commands.add("goToEntityLineageGraph", (entity_type, urn, start_time_millis, end_time_millis) => {
  cy.visit(
    `/${entity_type}/${urn}?is_lineage_mode=true&start_time_millis=${start_time_millis}&end_time_millis=${end_time_millis}`
  );
})

Cypress.Commands.add("lineageTabClickOnUpstream", () => {
  cy.get('[data-testid="lineage-tab-direction-select-option-downstream"] > b').click();
  cy.get('[data-testid="lineage-tab-direction-select-option-upstream"] > b').click();
})


Cypress.Commands.add("goToChart", (urn) => {
  cy.visit(
    "/chart/" + urn
  );
})

Cypress.Commands.add("goToContainer", (urn) => {
  cy.visit(
    "/container/" + urn
  );
})

Cypress.Commands.add("goToDomain", (urn) => {
  cy.visit(
    "/domain/" + urn
  );
})

Cypress.Commands.add("goToAnalytics", () => {
  cy.visit("/analytics");
  cy.contains("Data Landscape Summary", {timeout: 10000});
});

Cypress.Commands.add("goToUserList", () => {
  cy.visit("/settings/identities/users");
  cy.waitTextVisible("Manage Users & Groups");
})

Cypress.Commands.add("goToStarSearchList", () => {
  cy.visit("/search?query=%2A")
  cy.waitTextVisible("Showing")
  cy.waitTextVisible("results")
})

Cypress.Commands.add("openThreeDotDropdown", () => {
  cy.clickOptionWithTestId("entity-header-dropdown")
});

Cypress.Commands.add("clickOptionWithText", (text) => {
  cy.contains(text).click();
});

Cypress.Commands.add("deleteFromDropdown", () => {
  cy.openThreeDotDropdown();
  cy.clickOptionWithText("Delete");
  cy.clickOptionWithText("Yes");
});

Cypress.Commands.add("addViaFormModal", (text, modelHeader) => {
  cy.waitTextVisible(modelHeader);
  cy.get(".ant-form-item-control-input-content > input[type='text']").first().type(text);
  cy.get(".ant-modal-footer > button:nth-child(2)").click();
});

Cypress.Commands.add("addViaModal", (text, modelHeader) => {
  cy.waitTextVisible(modelHeader);
  cy.get(".ant-input-affix-wrapper > input[type='text']").first().type(text);
  cy.get(".ant-modal-footer > button:nth-child(2)").click();
});

Cypress.Commands.add("ensureTextNotPresent", (text) => {
  cy.contains(text).should("not.exist");
});

Cypress.Commands.add("waitTextPresent", (text) => {
  cy.contains(text).should('exist');
  cy.contains(text).should('have.length.above', 0);
  return cy.contains(text);
})

Cypress.Commands.add("waitTextVisible", (text) => {
  cy.contains(text).should('exist');
  cy.contains(text).should('be.visible');
  cy.contains(text).should('have.length.above', 0);
  return cy.contains(text);
})

Cypress.Commands.add("openMultiSelect", (data_id) => {
  let selector = `${selectorWithtestId(data_id)}`
  cy.get(`.ant-select${selector} > .ant-select-selector > .ant-select-selection-search`).click();
})

Cypress.Commands.add( 'multiSelect', (within_data_id , text) => {
  cy.openMultiSelect(within_data_id);
  cy.waitTextVisible(text);
  cy.clickOptionWithText(text);
});

Cypress.Commands.add("enterTextInTestId", (id, text) => {
  cy.get(selectorWithtestId(id)).type(text);
})

Cypress.Commands.add("clickOptionWithTestId", (id) => {
  cy.get(selectorWithtestId(id)).first().click({
    force: true,
  });
})

Cypress.Commands.add("clickFirstOptionWithTestId", (id) => {
  cy.get(selectorWithtestId(id)).first().click({
    force: true,
  });
})

Cypress.Commands.add("hideOnboardingTour", () => {
  cy.get('body').type("{ctrl} {meta} h");
});

Cypress.Commands.add("clearView", (viewName) => {
  cy.clickOptionWithTestId("view-select");
  cy.clickOptionWithTestId("view-select-clear");
  cy.get("input[data-testid='search-input']").click();
  cy.contains(viewName).should("not.be.visible");
})

Cypress.Commands.add('addTermToDataset', (urn, dataset_name, term) => {
  cy.goToDataset(urn, dataset_name);
  cy.clickOptionWithText("Add Term");
  cy.selectOptionInTagTermModal(term);
  cy.contains(term);
});

Cypress.Commands.add('selectOptionInTagTermModal', (text) => {
  cy.enterTextInTestId("tag-term-modal-input", text);
  cy.clickOptionWithTestId("tag-term-option");
  let btn_id = "add-tag-term-from-modal-btn";
  cy.clickOptionWithTestId(btn_id);
  cy.get(selectorWithtestId(btn_id)).should("not.exist");
});

Cypress.Commands.add("removeDomainFromDataset", (urn, dataset_name, domain_urn) => {
  cy.goToDataset(urn, dataset_name);
  cy.get('.sidebar-domain-section [href="/domain/' + domain_urn + '"] .anticon-close').click();
  cy.clickOptionWithText("Yes");
})

Cypress.Commands.add("openEntityTab", (tab) => {
  const selector = 'div[id$="' + tab + '"]:nth-child(1)'
  cy.highlighElement(selector);
  cy.get(selector).click()
});

Cypress.Commands.add("highlighElement", (selector) => {
  cy.wait(3000);
  cy.get(selector).then($button => {
    $button.css('border', '1px solid magenta')
  })
  cy.wait(3000);
})

Cypress.Commands.add("mouseover", (selector) => {
  return cy.get(selector).trigger(
    "mouseover",
    { force: true }
  );
})

Cypress.Commands.add("createUser", (name, password, email) => {
  cy.visit("/settings/identities/users");
  cy.clickOptionWithText("Invite Users");
  cy.waitTextVisible(/signup\?invite_token=\w{32}/).then(($elem) => {
    const inviteLink = $elem.text();
    cy.visit("/settings/identities/users");
    cy.logout();
    cy.visit(inviteLink);
    cy.enterTextInTestId("email", email);
    cy.enterTextInTestId("name", name);
    cy.enterTextInTestId("password", password);
    cy.enterTextInTestId("confirmPassword", password);
    cy.mouseover("#title").click();
    cy.waitTextVisible("Other").click();
    cy.get("[type=submit]").click();
    cy.waitTextVisible("Welcome to DataHub");
    cy.hideOnboardingTour();
    cy.waitTextVisible(name);
    cy.logout()
    cy.loginWithCredentials();
  })
})

Cypress.Commands.add("createGroup", (name, description, group_id) => {
  cy.visit("/settings/identities/groups")
  cy.clickOptionWithText("Create group");
  cy.waitTextVisible("Create new group");
  cy.get("#name").type(name);
  cy.get("#description").type(description);
  cy.contains("Advanced").click();
  cy.waitTextVisible("Group Id");
  cy.get("#groupId").type(group_id);
  cy.get("#createGroupButton").click();
  cy.waitTextVisible("Created group!");
  cy.waitTextVisible(name);
})

Cypress.Commands.add("addGroupMember", (group_name, group_urn, member_name) => {
  cy.visit(group_urn)
  cy.clickOptionWithText(group_name);
  cy.contains(group_name).should("be.visible");
  cy.get('[role="tab"]').contains("Members").click();
  cy.clickOptionWithText("Add Member");
  cy.contains("Search for users...").click({ force: true });
  cy.focused().type(member_name);
  cy.contains(member_name).click();
  cy.focused().blur();
  cy.contains(member_name).should("have.length", 1);
  cy.get('[role="dialog"] button').contains("Add").click({ force: true });
  cy.waitTextVisible("Group members added!");
  cy.contains(member_name, {timeout: 10000}).should("be.visible");
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
