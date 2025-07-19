import { test, expect } from '@playwright/test';
import { LoginModel } from '../pom/loginModel';
import {SidebarModel} from '../pom/sidebarModel';
import {TopBarModel} from '../pom/topBarModel';
import {validateEnvironment} from '../utils/urlHandler';
import {validateUsers} from '../utils/userHandler';
import { CommonModel } from '../pom/commonModel';
import { storeOwnerRoleValidation } from '../utils/rolesHandler';
import { brandsData } from '../data/brandsData';
import { Usersmodel } from '../pom/usersModel';
import { usersData } from '../data/usersData';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const url: string = validateEnvironment();

test.afterAll(async () => {
    test.setTimeout(2500);
});

test(`Validate that the user invitation is deleted when you click the Delete User Invitation button`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const usersModel = new Usersmodel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickUsersOptionMenu();

    let email = await usersModel.createEmail();
    
    await usersModel.sendInvitationWithAllPermissions(email);
    await commonModel.waitUntilSnackBarDisappears();

    await usersModel.manageInvitationsBtn.click();

    await usersModel.deleteInvitation(email);

    await usersModel.verifyDeletedInvitationMessageIsDisplayed(email);
});


/**
 * Before running this test, make sure you create the user with the required email
 * Is not possible create the user to be deleted
 */
test.skip('Select a user account and delete a user account', async ({ page }) => {
    const commonModel = new CommonModel(page);
    const usersModel = new Usersmodel(page);
    await usersModel.deleteUserAccount(usersData.emailUser);

    expect(await commonModel.snackbar.textContent()).toContain(usersData.accountDeletedSuccessfully);

});

test(`Send user invitation type superadmin account`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const usersModel = new Usersmodel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickUsersOptionMenu();

    let email = await usersModel.createEmail();
    
    await usersModel.sendInvitationAsSuperAdmin(email);
    await commonModel.waitUntilSnackBarDisappears();

    await usersModel.verifyInvitationSentMessageIsDisplayed();

    await usersModel.manageInvitationsBtn.click();

    await usersModel.deleteInvitation(email);

    await usersModel.verifyDeletedInvitationMessageIsDisplayed(email);

});

test(`Send an invitation to an existing user`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const usersModel = new Usersmodel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickUsersOptionMenu();

    let email = await usersModel.createEmail();
    
    await usersModel.sendInvitationAsSuperAdmin(email);
    await commonModel.waitUntilSnackBarDisappears();
    await usersModel.verifyInvitationSentMessageIsDisplayed();

    await usersModel.sendInvitationAsSuperAdmin(email);
    await commonModel.waitUntilSnackBarDisappears();
    await usersModel.verifyErrorMessageIsDisplayed();

    await usersModel.cancelButton.click();
    await usersModel.manageInvitationsBtn.click();
    await usersModel.deleteInvitation(email);
});

test(`Verify that typing a valid Cognito Username displays a search result in the user table`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const usersModel = new Usersmodel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickUsersOptionMenu();

    await usersModel.verifyThatTheUsersTableIsVisible();
    const cognitoUsername = await usersModel.usersTable.locator('tr').nth(0).locator('td').nth(0).innerText();
    await commonModel.setSearchValue(cognitoUsername);
    await usersModel.verifyThatTableHasRows(1);
    await usersModel.checkUserSearchValue(cognitoUsername, 0);
});

test(`Verify that typing a valid Email displays a search result in the user table`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const usersModel = new Usersmodel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickUsersOptionMenu();

    await usersModel.verifyThatTheUsersTableIsVisible();
    const email = await usersModel.usersTable.locator('tr').nth(0).locator('td').nth(2).innerText();
    await commonModel.setSearchValue(email);
    await usersModel.verifyThatTableHasRows(1);
    await usersModel.checkUserSearchValue(email, 2);
});

test(`Verify that typing an invalid name does not show results in the search`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const usersModel = new Usersmodel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickUsersOptionMenu();

    await usersModel.verifyThatTheUsersTableIsVisible();
    const name = await usersModel.usersTable.locator('tr').nth(0).locator('td').nth(1).innerText();
    await commonModel.setSearchValue(name+'-test');
    await usersModel.verifyThatTableIsNotDisplayed();
});

test(`Verify that typing an invalid email does not show results in the search`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const usersModel = new Usersmodel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickUsersOptionMenu();

    await usersModel.verifyThatTheUsersTableIsVisible();
    const email = await usersModel.usersTable.locator('tr').nth(0).locator('td').nth(2).innerText();
    await commonModel.setSearchValue(email+'.com');
    await usersModel.verifyThatTableIsNotDisplayed();
});

