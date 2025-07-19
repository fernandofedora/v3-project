import { test, expect } from '@playwright/test';
import { LoginModel } from '../pom/loginModel';
import { TopBarModel } from '../pom/topBarModel';
import { SchedulesModel } from '../pom/schedulesModel';
import { BrandsModel } from '../pom/brandsModel';
import { CommonModel } from '../pom/commonModel';
import { SidebarModel } from '../pom/sidebarModel';
import { brandsData } from '../data/brandsData';
import { schedulesData } from '../data/schedulesData';
import { dealTypes } from '../data/contentData';
import { RolesEnum as Roles } from '../enums/roles.enum';
import { validateEnvironment } from '../utils/urlHandler';
import { validateUsers } from '../utils/userHandler';
import { storeOwnerRoleValidation } from '../utils/rolesHandler';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { ContentModel } from '../pom/contentModel';
import { rolesData } from '../data/usersData';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const url: string = validateEnvironment();

test.describe.configure({ mode: 'serial' });
test.describe('Manage Schedules', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(url);
  });

  test.afterAll(async () => {
    test.setTimeout(2500);
  });

  test(`Verify if the initial default schedule is created properly when CDL is active in the brand`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const topBarModel = new TopBarModel(page);
    const schedulesModel = new SchedulesModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    const credentials = users.find(e => e.role === Roles.superAdmin);
    await loginModel.login(credentials?.username, credentials?.password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await sidebarModel.onClickBrandOptionMenu();
    await commonModel.setSearchValue(brandsData.brandNodeContentName);
    await brandsModel.brandTableShouldHasOneRow();
    await brandsModel.goToManageNodes(brandsData.brandNodeContentName);
    await brandsModel.hasNodeTableValues(3);

    // Edit the required brand node
    await page.evaluate("document.body.style.scale='0.8'");
    await brandsModel.openEditNodePopUp(brandsData.brandNodeContentName);
    await commonModel.checkContentPopupVisible();
    await brandsModel.hasNodeRequiredValues();

    await brandsModel.onClickCategoryDividedLayout(true);
    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();
    await page.reload();

    await sidebarModel.onClickSchedulesOptionMenu();

    let isNameExists = schedulesModel.schedulesTable.locator('tr').nth(0).locator('td').nth(0).getByText(schedulesData.initialDefaultName);
    let isEndDateExists = schedulesModel.schedulesTable.locator('tr').nth(0).locator('td').nth(2).getByText('');
    expect(isNameExists).toBeTruthy();
    expect(isEndDateExists).toBeTruthy();
  });

  test(`Verify if any schedules don't appear when CDL is deactivated in the brand`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const topBarModel = new TopBarModel(page);
    const schedulesModel = new SchedulesModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    const credentials = users.find(e => e.role === Roles.superAdmin);
    await loginModel.login(credentials?.username, credentials?.password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await sidebarModel.onClickBrandOptionMenu();
    await commonModel.setSearchValue(brandsData.brandNodeContentName);
    await brandsModel.brandTableShouldHasOneRow();
    await brandsModel.goToManageNodes(brandsData.brandNodeContentName);
    await brandsModel.hasNodeTableValues(3);

    // Edit the required brand node
    await page.evaluate("document.body.style.scale='0.8'");
    await brandsModel.openEditNodePopUp(brandsData.brandNodeContentName);
    await commonModel.checkContentPopupVisible();
    await brandsModel.hasNodeRequiredValues();

    await brandsModel.onClickBrandCategoryDividedLayout(false);
    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();
    await page.reload();

    await sidebarModel.onClickSchedulesOptionMenu();
    await schedulesModel.verifyThatCDLMessageisDisplayed();
    
  });

  users.forEach(user => {

    test(`Verify if a new schedule in the brand can be created for the current date in a browse page '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.onClickAddScheduleButton();

      const scheduleName = (schedulesData.initialDefaultName + uuidv4()).slice(0, 32);
      await schedulesModel.setScheduleName(scheduleName);
      const startDate = await schedulesModel.startDateInput.inputValue();

      // We get the datetime of the timezone from the date of the client.
      // And expect the start date of the new schedule matches the selected current date and time
      const dateTime = await schedulesModel.getDatetimeFromClientHour('America/New_York');
      //expect((await schedulesModel.startDateInput.inputValue()).includes(dateTime)).toBeTruthy();

      await schedulesModel.reorderCategories();
      await schedulesModel.onClickScheduleSaveButton();
      await commonModel.waitUntilSpinnerDisappears();

      await schedulesModel.verifyThatSchedulesTableIsVisible();
      const schedule = await schedulesModel.checkScheduleInTable(scheduleName);
      expect(schedule.exists).toBeTruthy();

      const startDateFormat = moment(startDate, ["YYYY-MM-DD, hh:mm A"]).format("YYYY/MM/DD, hh:mm A");

      const startDateNewSchedule = schedulesModel.schedulesTable.locator('tr').nth(schedule.position).locator('td').nth(1).innerText();
      const endDateNewSchedule = schedulesModel.schedulesTable.locator('tr').nth(schedule.position + 1).locator('td').nth(2).innerText();

      // We expect the end date of the previous schedule matches the start date of the new schedule
      expect((await startDateNewSchedule).includes(startDateFormat)).toBeTruthy();
      expect((await endDateNewSchedule).includes(startDateFormat)).toBeTruthy();

      await schedulesModel.onClickScheduleDeleteButton(scheduleName);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(scheduleName);
    });

    test(`Verify if a future schedule in the brand can be created in a browse page when the end date finishes after the current day and time '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role === Roles.superAdmin) await schedulesModel.enableCategoryDividedLayout();
      const schedule = await schedulesModel.createSchedule(1);

      // We expect the new schedule for the current date appears in the list
      const scheduleInTable = await schedulesModel.checkScheduleInTable(schedule.name);
      expect(scheduleInTable.exists).toBeTruthy();

      const startDateNewSchedule = schedulesModel.schedulesTable.locator('tr').nth(scheduleInTable.position).locator('td').nth(1).innerText();
      const endDateNewSchedule = schedulesModel.schedulesTable.locator('tr').nth(scheduleInTable.position + 1).locator('td').nth(2).innerText();

      // We expect the end date of the previous schedule matches the start date of the new schedule
      expect((await startDateNewSchedule).includes(schedule.startDate)).toBeTruthy();
      expect((await endDateNewSchedule).includes(schedule.startDate)).toBeTruthy();

      await schedulesModel.onClickScheduleDeleteButton(schedule.name);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(schedule.name);
    });

    test(`Verify if a future schedule in a browse page of a brand can be created between existing active schedule '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      test.setTimeout(120000);
      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role === Roles.superAdmin) await schedulesModel.enableCategoryDividedLayout();

      await schedulesModel.verifyThatSchedulesTableIsVisible();
      const initialScheduleName = await schedulesModel.schedulesTable.locator('tr').nth(0).locator('td').nth(0).innerText();
      const schedule1 = await schedulesModel.createSchedule(2);
      await schedulesModel.waitForScheduleRecordsToLoad();
      const schedule2 = await schedulesModel.createSchedule(1);

      // We expect that the last added schedule is between the default schedule and the first future schedule in the list
      let date1 = schedule1.name;
      let date2 = schedule2.name;

      await schedulesModel.verifyDates(initialScheduleName, date1, date2);

      // We expect that the end date of the first future schedule is empty
      const schedule = await schedulesModel.checkScheduleInTable(schedule1.name);
      expect(schedule.exists).toBeTruthy();

      // We expect that the end date of the second future schedule matches the start date of the first future schedule
      const startDateNewSchedule1 = schedulesModel.schedulesTable.locator('tr').nth(0).locator('td').nth(1).innerText();
      const endDateNewSchedule1 = schedulesModel.schedulesTable.locator('tr').nth(1).locator('td').nth(2).innerText();
      expect((await startDateNewSchedule1).includes(schedule1.startDate)).toBeTruthy();
      expect((await endDateNewSchedule1).includes(schedule1.startDate)).toBeTruthy();

      // We expect that the end date of the initial default schedule matches the start date of the second future schedule
      const startDateNewSchedule2 = schedulesModel.schedulesTable.locator('tr').nth(1).locator('td').nth(1).innerText();
      const endDateNewSchedule2 = schedulesModel.schedulesTable.locator('tr').nth(2).locator('td').nth(2).innerText();
      expect((await startDateNewSchedule2).includes(schedule2.startDate)).toBeTruthy();
      expect((await endDateNewSchedule2).includes(schedule2.startDate)).toBeTruthy();

      await schedulesModel.onClickScheduleDeleteButton(schedule1.name);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(schedule1.name);
      await schedulesModel.onClickScheduleDeleteButton(schedule2.name);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(schedule2.name);
    });

    test(`Verify if the end date is empty for the last schedule in the brand '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role === Roles.superAdmin) await schedulesModel.enableCategoryDividedLayout();
      await schedulesModel.verifyThatSchedulesTableIsVisible();
      const schedule = await schedulesModel.createSchedule(1);

      // We expect that the end date of the first future schedule is empty
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.verifyThatSchedulesTableIsVisible();
      const scheduleInTable = await schedulesModel.checkScheduleInTable(schedule.name);
      expect(scheduleInTable.exists).toBeTruthy();
      const endDate = await schedulesModel.schedulesTable.locator('tr').nth(0).locator('td').nth(2).innerText() == '';
      expect(endDate).toBeTruthy();

      await schedulesModel.onClickScheduleDeleteButton(schedule.name);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(schedule.name);
    });

    test(`Verify if the reset button appears and the start date is disabled in a new brand schedule when the categories are reordering '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role === Roles.superAdmin) await schedulesModel.enableCategoryDividedLayout();

      await schedulesModel.onClickAddScheduleButton();
      await schedulesModel.selectFutureStartDate(1);
      await schedulesModel.reorderCategories();

      await expect(schedulesModel.startDateInput).toBeDisabled({ timeout: 5000 });
      await expect(schedulesModel.undoBtn).toBeVisible({ timeout: 5000 });
    });

    test(`Verify if a new brand schedule can be reset properly clicking on the reset button '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role === Roles.superAdmin) await schedulesModel.enableCategoryDividedLayout();

      await schedulesModel.verifyThatSchedulesTableIsVisible();
      await schedulesModel.onClickAddScheduleButton();
      await schedulesModel.selectFutureStartDate(1);

      let firstCategory = schedulesModel.categoriesTable.locator('tr').nth(0).locator('td').nth(0);
      let secondCategory = schedulesModel.categoriesTable.locator('tr').nth(1).locator('td').nth(0);
      let firstCategoryBefore: string;
      let secondCategoryBefore: string;

      for(let i = 0; i < 60; i++){
        firstCategoryBefore = await firstCategory.innerText();
        secondCategoryBefore = await secondCategory.innerText();
        if(firstCategoryBefore.includes("Fruits")){
          break;
        }
        await page.waitForTimeout(300);
      }

      await schedulesModel.reorderCategories();
      await schedulesModel.undoBtn.click();

      let firstCategoryAfter = await firstCategory.innerText();
      let secondCategoryAfter = await secondCategory.innerText();

      // We expect that the categories return to its original order
      for(let i = 0; i < 60; i++){
        firstCategoryAfter = await firstCategory.innerText();
        if(firstCategoryAfter.includes(firstCategoryBefore!)){
          break;
        }
        await page.waitForTimeout(300);
      }
      expect((firstCategoryAfter).includes(firstCategoryBefore!)).toBeTruthy();
      expect((secondCategoryAfter).includes(secondCategoryBefore!)).toBeTruthy();

      // We expect that the reset button disappear
      await expect(schedulesModel.startDateInput).not.toBeDisabled({ timeout: 5000 });
      await expect(schedulesModel.undoBtn).not.toBeVisible({ timeout: 5000 });
    });

    test(`Verify if the brand schedule name can be edited properly with valid name '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      test.setTimeout(120000);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role === Roles.superAdmin) await schedulesModel.enableCategoryDividedLayout();
      const schedule = await schedulesModel.createSchedule(1);
      await schedulesModel.onClickScheduleEditButton(schedule.name);
      schedule.name = schedule.name + ' Edit';
      await schedulesModel.setScheduleName(schedule.name);
      await schedulesModel.onClickScheduleSaveButton();
      await commonModel.waitUntilSpinnerDisappears();

      await schedulesModel.onClickScheduleEditButton(schedule.name);
      await schedulesModel.verifyThatNamefieldIsVisible();
      await expect(schedulesModel.scheduleNameInput).toHaveValue(schedule.name, { timeout: 5000 });
      await schedulesModel.onClickScheduleCancelButton();
      await schedulesModel.onClickScheduleDeleteButton(schedule.name);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(schedule.name);
    });

    test(`Verify if the start date can't be edited of existing brand schedule '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role === Roles.superAdmin) await schedulesModel.enableCategoryDividedLayout();

      const schedule = await schedulesModel.createSchedule(1);
      await schedulesModel.onClickScheduleEditButton(schedule.name);
      await schedulesModel.verifyThatStartDateInputVisible();
      await schedulesModel.verifyDateInputIsDisabled();
      await schedulesModel.onClickScheduleCancelButton();

      await schedulesModel.onClickScheduleDeleteButton(schedule.name);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(schedule.name);
    });

    test(`Verify if the categories can be ordered properly in a brand schedule '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role === Roles.superAdmin) await schedulesModel.enableCategoryDividedLayout();

      const schedule = await schedulesModel.createSchedule(1);
      await schedulesModel.onClickScheduleEditButton(schedule.name);
      await schedulesModel.reorderCategories();

      // Get the category order after reorder
      let firstCategory = schedulesModel.categoriesTable.locator('tr').nth(0).locator('td').nth(0);
      let secondCategory = schedulesModel.categoriesTable.locator('tr').nth(1).locator('td').nth(0);
      let firstCategoryBefore = await firstCategory.innerText();
      let secondCategoryBefore = await secondCategory.innerText();

      await schedulesModel.onClickScheduleSaveButton();
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.onClickScheduleEditButton(schedule.name);

      // We expect the category order matches the last saved category order.
      expect((await firstCategory.innerText()).includes(firstCategoryBefore)).toBeTruthy();
      expect((await secondCategory.innerText()).includes(secondCategoryBefore)).toBeTruthy();

      await schedulesModel.onClickScheduleCancelButton();
      await schedulesModel.onClickScheduleDeleteButton(schedule.name);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(schedule.name);
    });


    test(`Verify that the search bar filters the results of the table when a valid schedule name is used at brand level '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.onClickAddScheduleButton();

      const scheduleName = (schedulesData.initialDefaultName + uuidv4()).slice(0, 32);
      await schedulesModel.setScheduleName(scheduleName);
      const startDate = await schedulesModel.startDateInput.inputValue();

      await schedulesModel.onClickScheduleSaveButton();
      await commonModel.waitUntilSpinnerDisappears();

      await schedulesModel.verifyThatSchedulesTableIsVisible();
      const schedule = await schedulesModel.checkScheduleInTable(scheduleName);
      expect(schedule.exists).toBeTruthy();

      await schedulesModel.fillSearchBar(scheduleName);

      await schedulesModel.verifyQuantityOfRows(1);

      await schedulesModel.checkScheduleIsInTable(scheduleName);

      await schedulesModel.onClickScheduleDeleteButton(scheduleName);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(scheduleName);
    });

    test(`Verify that the search bar filters the results when an invalid name is used at brand level '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.onClickAddScheduleButton();

      const scheduleName = (schedulesData.initialDefaultName + uuidv4()).slice(0, 32);
      await schedulesModel.setScheduleName(scheduleName);
      const startDate = await schedulesModel.startDateInput.inputValue();

      await schedulesModel.onClickScheduleSaveButton();
      await commonModel.waitUntilSpinnerDisappears();

      await schedulesModel.verifyThatSchedulesTableIsVisible();
      const schedule = await schedulesModel.checkScheduleInTable(scheduleName);
      expect(schedule.exists).toBeTruthy();

      await schedulesModel.fillSearchBar("aaaaaaaaaaaa");

      await schedulesModel.verifyQuantityOfRows(0);

      await schedulesModel.searchBar.clear();
      await schedulesModel.onClickScheduleDeleteButton(scheduleName);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(scheduleName);
    });

    test(`Verify that when the super admin user clicks the Move to Top button the category is moved to the top in the category list '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.moveLastCategoryInTheListToTheTop();
    });

    test(`Verify that when the super admin user clicks the Move to Bottom button the category is moved to the bottom in the category list '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.moveFirstCategoryInTheListToTheBottom();
    });


    test(`Verify that a category is hidden when the List Hide button is clicked '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.hideFirstCategoryInTheList();
    });

    test(`Verify that a hidden category is shown when the List Show button is clicked '${user.role}'`, async ({ page }) => {
      test.setTimeout(180000);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      const schedule = await schedulesModel.createSchedule(1);
      await schedulesModel.onClickScheduleEditButton(schedule.name);

      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.hideFirstCategoryInTheList();
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.saveBtn.click({delay:3000});

      await schedulesModel.onClickScheduleEditButton(schedule.name);

      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.unhideFirstCategoryInTheList();
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.saveBtn.click({delay:3000});

      await schedulesModel.onClickScheduleDeleteButton(schedule.name);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(schedule.name);
    });

    test(`Verify that when the user clicks the visibility button the category and its content should be hidden '${user.role}'`, async ({ page }) => {
      test.setTimeout(180000);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      const schedule = await schedulesModel.createSchedule(1);
      await schedulesModel.onClickScheduleEditButton(schedule.name);

      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.clickVisibilityButton();

      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.saveBtn.click({delay:3000});
      const scheduleInTable = await schedulesModel.checkScheduleInTable(schedule.name);
      expect(scheduleInTable.exists).toBeTruthy();

      await schedulesModel.onClickScheduleDeleteButton(schedule.name);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(schedule.name);
    });

    test(`Verify that when the super admin user clicks the visibility button from a category with no visibility '${user.role}'`, async ({ page }) => {
      test.setTimeout(180000);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      const schedule = await schedulesModel.createSchedule(1);
      await schedulesModel.onClickScheduleEditButton(schedule.name);

      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.clickVisibilityButton();
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.saveBtn.click({delay:3000});
      const scheduleInTable = await schedulesModel.checkScheduleInTable(schedule.name);
      expect(scheduleInTable.exists).toBeTruthy();

      await schedulesModel.onClickScheduleEditButton(schedule.name);
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.clickNoVisibilityButton();
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.saveBtn.click({delay:3000});
      const scheduleInTable2 = await schedulesModel.checkScheduleInTable(schedule.name);
      expect(scheduleInTable2.exists).toBeTruthy();

      await schedulesModel.onClickScheduleDeleteButton(schedule.name);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(schedule.name);
    });

    test(`Verify that when the bookmark button is clicked the green bookmark button is displayed '${user.role}'`, async ({ page }) => {
      test.setTimeout(180000);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      const schedule = await schedulesModel.createSchedule(1);
      await schedulesModel.onClickScheduleEditButton(schedule.name);

      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.clickBookmarksButton();
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.saveBtn.click({delay:3000});
      await commonModel.waitUntilSpinnerDisappears();
      const scheduleInTable = await schedulesModel.checkScheduleInTable(schedule.name);
      expect(scheduleInTable.exists).toBeTruthy();

      await schedulesModel.onClickScheduleDeleteButton(schedule.name);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(schedule.name);
    });

    test(`Verify that when the super Admin user clicks the green bookmark button the category header is not displayed '${user.role}'`, async ({ page }) => {
      test.setTimeout(180000);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      const schedule = await schedulesModel.createSchedule(1);
      await schedulesModel.onClickScheduleEditButton(schedule.name);

      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.clickBookmarksButton();
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.saveBtn.click({delay:3000});
      await commonModel.waitUntilSpinnerDisappears();
      const scheduleInTable = await schedulesModel.checkScheduleInTable(schedule.name);
      expect(scheduleInTable.exists).toBeTruthy();

      await schedulesModel.onClickScheduleEditButton(schedule.name);
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.clickUnBookmarksButton();
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.saveBtn.click({delay:3000});
      await commonModel.waitUntilSpinnerDisappears();
      const scheduleInTable2 = await schedulesModel.checkScheduleInTable(schedule.name);
      expect(scheduleInTable2.exists).toBeTruthy();

      await schedulesModel.onClickScheduleDeleteButton(schedule.name);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(schedule.name);
    });

    test(`Verify that when the Super Admin user clicks the Delete button from a created schedule, the schedule is delete '${user.role}'`, async ({ page }) => {
      test.setTimeout(180000);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      const schedule = await schedulesModel.createSchedule(1);
      const scheduleInTable = await schedulesModel.checkScheduleInTable(schedule.name);
      expect(scheduleInTable.exists).toBeTruthy();

      await schedulesModel.onClickScheduleDeleteButton(schedule.name);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(schedule.name);
    });


    test(`Verify that when the end date from schedule is meet the schedule expires '${user.role}'`, async ({ page }) => {
      test.setTimeout(180000);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      let activeScheduleName = await schedulesModel.getNameActiveSchedule();
      await schedulesModel.onClickAddScheduleButton();
      await schedulesModel.selectFutureStartDateAndHours(1, "minutes");
      const scheduleName = (schedulesData.initialDefaultName + uuidv4()).slice(0, 32);
      await schedulesModel.setScheduleName(scheduleName);
      let startDateSchedule1 = await schedulesModel.startDateInput.inputValue();
      await schedulesModel.onClickScheduleSaveButton();
      await commonModel.waitUntilSpinnerDisappears();
      const scheduleInTable = await schedulesModel.checkScheduleInTable(scheduleName);
      expect(scheduleInTable.exists).toBeTruthy();

      await page.waitForTimeout(70000);

      await page.reload();

      await schedulesModel.verifyScheduleIsInactive(activeScheduleName);
    });

    test(`Verify that when the super admin clicks the delete button from the only active schedule, the active schedule is not delete '${user.role}'`, async ({ page }) => {
      test.setTimeout(180000);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickDeleteButtonFromActiveSchedule();
      await schedulesModel.verifyErrorMessage();
    });


    test(`Verify that Add Schedule button is not displayed at the store level '${user.role}'`, async ({ page }) => {
      test.setTimeout(180000);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
  
      const credentials = users.find(e => e.role === Roles.superAdmin);

      if(user.role == Roles.superAdmin || user.role == Roles.admin){
        await loginModel.login(credentials?.username, credentials?.password);
        await topBarModel.selectBrand(brandsData.brandNodeContentName);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeStoreGroupChild(brandsData.storeBrandName);
        await commonModel.waitUntilSpinnerDisappears();
        // await categoriesModel.ensureCategoriesRequiredExists(2);
        await sidebarModel.onClickSchedulesOptionMenu();
        await schedulesModel.verifyThatTheSchedulesButtonIsNotVisible();
        if(user.role == Roles.superAdmin){
          await schedulesModel.enableCategoryDividedLayout();
        }
      }
      if(user.role == Roles.storeOwner){
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickSchedulesOptionMenu();
        await schedulesModel.verifyThatTheSchedulesButtonIsNotVisible();
      }

    });

    test(`Verify that a hidden category row can be dragged and dropped to a new position '${user.role}'`, async ({ page }) => {
      test.setTimeout(180000);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      const schedule = await schedulesModel.createSchedule(1);
      await schedulesModel.onClickScheduleEditButton(schedule.name);
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.hideFirstCategoryInTheList();

      let firstCategory = schedulesModel.categoriesTable.locator('tr').nth(0).locator('td').nth(0);
      let secondCategory = schedulesModel.categoriesTable.locator('tr').nth(1).locator('td').nth(0);
      let firstCategoryBefore: string;
      let secondCategoryBefore: string;

      for(let i = 0; i < 60; i++){
        firstCategoryBefore = await firstCategory.innerText();
        secondCategoryBefore = await secondCategory.innerText();
        if(firstCategoryBefore.includes("Fruits")){
          break;
        }
        await page.waitForTimeout(300);
      }
      
      await schedulesModel.reorderCategories();

      let firstCategoryAfter = await firstCategory.innerText();
      let secondCategoryAfter = await secondCategory.innerText();
      // We expect that the categories return to its original order
      for(let i = 0; i < 60; i++){
        firstCategoryAfter = await firstCategory.innerText();
        if(!firstCategoryAfter.includes(firstCategoryBefore!)){
          break;
        }
        await page.waitForTimeout(300);
      }
      expect((firstCategoryAfter == firstCategoryBefore!)).toBeFalsy();
      expect((secondCategoryAfter == secondCategoryBefore!)).toBeFalsy();

      await schedulesModel.cancelBtn.click({delay: 2000});
      await schedulesModel.onClickScheduleDeleteButton(schedule.name);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(schedule.name);
    });

    test(`Verify that The Move To Top, Move To Bottom and List Hide options are displayed when the options button is clicked '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      const schedule = await schedulesModel.createSchedule(1);
      await schedulesModel.onClickScheduleEditButton(schedule.name);
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.verifyOptionsAreDisplayedInTheOptionsModal();


      await schedulesModel.cancelBtn.click({delay: 1000});
      await schedulesModel.onClickScheduleDeleteButton(schedule.name);
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.checkScheduleIsNotInTable(schedule.name);

    });

    test(`Verify that when the super admin clicks the Move To Top from a category in the page section, the category should move to the top in the page section '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.moveLastCategoryInTheListToTheTopPageSection();
    });

    test(`Verify that when the super admin clicks the Move To Top from a category in the subpage section, the category should move to the top in the subpage section '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.moveLastCategoryInTheListToTheTopSubPageSection();
    });

    test(`Verify that when the super admin clicks the Move To Bottom from a category in a page, the category should move to the bottom of that page '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.moveFirstCategoryInTheListToTheBottomPageSection();
    });

    test(`Verify that when the super admin clicks the Move To Bottom from a category in a subpage the category should move to the bottom of the subpage section '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.moveFirstCategoryInTheListToTheBottomSubPageSection();
    });

    test(`Verify that when the super admin clicks the Move to Bottom button from a category at brand level the category should be displayed at the bottom in the circular builder '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const contentModel = new ContentModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);

      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sidebarModel.onClickContentOptionMenu(); }
      await commonModel.waitUntilSpinnerDisappears();
  
      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
  
      const title = (dealTypes.fixedPrice + uniqueId).slice(0, 40);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.singleItemButton.click();
      await contentModel.hoverHeaders();
      //await contentModel.clickGeneralMenu();
      await contentModel.clickDateRangeMenu();
      await contentModel.clickDealMenu();
      await contentModel.clickMediaIconsMenu();
      await contentModel.clickHeadlinesMenu();
      await contentModel.titleInput.click();
      await contentModel.titleInput.type(title);
      await contentModel.verifyTitleIsComplete(title);
      await contentModel.descriptionInput.type("This is a description");
      await contentModel.dealDropdown.click();
      await contentModel.selectDealType(dealTypes.fixedPrice);
      await contentModel.priceField.type('1');
      await contentModel.unitsField.type('pcs');
      await contentModel.categoryDropdown.click();
      await contentModel.selectCategoryByName("(Browse) (Browse");
      await contentModel.cardDetailLabel.click();
      await contentModel.cardDetailLabel.click();
      //await contentModel.singleItemButton.click();
      await contentModel.waitUntilContentSpinnerDisappears();
      await commonModel.setSearchValue(title);
      await page.waitForTimeout(500);
      await contentModel.newContentIsCreated(title, dealTypes.fixedPrice, brandsData.brandNodeContentName, user.role);
      await commonModel.searchInput.clear();

      const title2 = (dealTypes.fixedPrice + uniqueId2).slice(0, 40);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.singleItemButton.click();
      await contentModel.hoverHeaders();
      //await contentModel.clickGeneralMenu();
      //await contentModel.clickDateRangeMenu();
      //await contentModel.clickDealMenu();
      //await contentModel.clickMediaIconsMenu();
      //await contentModel.clickHeadlinesMenu();
      await contentModel.titleInput.click();
      await contentModel.titleInput.type(title2);
      await contentModel.verifyTitleIsComplete(title2);
      await contentModel.descriptionInput.type("This is a description");
      await contentModel.dealDropdown.click();
      await contentModel.selectDealType(dealTypes.fixedPrice);
      await contentModel.priceField.type('1');
      await contentModel.unitsField.type('pcs');
      await contentModel.categoryDropdown.click();
      await contentModel.selectCategoryByName("(Browse) test");
      await contentModel.cardDetailLabel.click();
      await contentModel.cardDetailLabel.click();
      await contentModel.singleItemButton.click();
      await contentModel.waitUntilContentSpinnerDisappears();
      await commonModel.setSearchValue(title2);
      await page.waitForTimeout(500);
      await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.brandNodeContentName, user.role);
      await commonModel.searchInput.clear();

      await sidebarModel.onClickSchedulesOptionMenu();
      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();

      await schedulesModel.moveFirstCategoryInTheListToTheBottom();
      await schedulesModel.saveBtn.click({delay:2000});
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.waitSaveButtonIsNotVisible();

      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sidebarModel.onClickContentOptionMenu(); }
      await commonModel.waitUntilSpinnerDisappears();

      await schedulesModel.verifyThatTheCategoryIsMovedAtTheBottomInTheCircularBuilder("(Browse");

      await contentModel.deleteCategoriesHeaders();

      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.moveLastCategoryInTheListToTheTop();
      await schedulesModel.saveBtn.click();
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.waitSaveButtonIsNotVisible();
    });


    test(`Verify that when the super admin clicks the Move to Top button from a category at brand level the categories should be displayed at the top in the circular builder '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const contentModel = new ContentModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);

      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sidebarModel.onClickContentOptionMenu(); }
      await commonModel.waitUntilSpinnerDisappears();
  
      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
  
      const title = (dealTypes.fixedPrice + uniqueId).slice(0, 40);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.singleItemButton.click();
      await contentModel.hoverHeaders();
      //await contentModel.clickGeneralMenu();
      await contentModel.clickDateRangeMenu();
      await contentModel.clickDealMenu();
      await contentModel.clickMediaIconsMenu();
      await contentModel.clickHeadlinesMenu();
      await contentModel.titleInput.click();
      await contentModel.titleInput.type(title);
      await contentModel.verifyTitleIsComplete(title);
      await contentModel.descriptionInput.type("This is a description");
      await contentModel.dealDropdown.click();
      await contentModel.selectDealType(dealTypes.fixedPrice);
      await contentModel.priceField.type('1');
      await contentModel.unitsField.type('pcs');
      await contentModel.categoryDropdown.click();
      await contentModel.selectCategoryByName("(Browse) (Browse");
      await contentModel.cardDetailLabel.click();
      await contentModel.cardDetailLabel.click();
      //await contentModel.singleItemButton.click();
      await contentModel.waitUntilContentSpinnerDisappears();
      await commonModel.setSearchValue(title);
      await page.waitForTimeout(500);
      await contentModel.newContentIsCreated(title, dealTypes.fixedPrice, brandsData.brandNodeContentName, user.role);
      await commonModel.searchInput.clear();

      const title2 = (dealTypes.fixedPrice + uniqueId2).slice(0, 40);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.singleItemButton.click();
      await contentModel.hoverHeaders();
      //await contentModel.clickGeneralMenu();
      //await contentModel.clickDateRangeMenu();
      //await contentModel.clickDealMenu();
      //await contentModel.clickMediaIconsMenu();
      //await contentModel.clickHeadlinesMenu();
      await contentModel.titleInput.click();
      await contentModel.titleInput.type(title2);
      await contentModel.verifyTitleIsComplete(title2);
      await contentModel.descriptionInput.type("This is a description");
      await contentModel.dealDropdown.click();
      await contentModel.selectDealType(dealTypes.fixedPrice);
      await contentModel.priceField.type('1');
      await contentModel.unitsField.type('pcs');
      await contentModel.categoryDropdown.click();
      await contentModel.selectCategoryByName("(Browse) test");
      await contentModel.cardDetailLabel.click();
      await contentModel.cardDetailLabel.click();
      await contentModel.singleItemButton.click();
      await contentModel.waitUntilContentSpinnerDisappears();
      await commonModel.setSearchValue(title2);
      await page.waitForTimeout(500);
      await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.brandNodeContentName, user.role);
      await commonModel.searchInput.clear();

      await sidebarModel.onClickSchedulesOptionMenu();
      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();

      await schedulesModel.moveLastCategoryInTheListToTheTop();
      await schedulesModel.saveBtn.click({delay:2000});
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.waitSaveButtonIsNotVisible();

      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sidebarModel.onClickContentOptionMenu(); }
      await commonModel.waitUntilSpinnerDisappears();

      await page.waitForTimeout(2000);
      await schedulesModel.verifyThatTheCategoryIsMovedAtTheTopInTheCircularBuilder("test");

      await contentModel.deleteCategoriesHeaders();

      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.moveFirstCategoryInTheListToTheBottom();
      await schedulesModel.saveBtn.click();
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.waitSaveButtonIsNotVisible();
    });

    test(`Verify that when the super admin clicks the List Hide button from a category at brand level the categories should display the hidden icon '${user.role}'`, async ({ page }) => {
      test.setTimeout(180000);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const contentModel = new ContentModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);

      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sidebarModel.onClickContentOptionMenu(); }
      await commonModel.waitUntilSpinnerDisappears();
  
      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
  
      const title = (dealTypes.fixedPrice + uniqueId).slice(0, 40);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.singleItemButton.click();
      await contentModel.hoverHeaders();
      //await contentModel.clickGeneralMenu();
      await contentModel.clickDateRangeMenu();
      await contentModel.clickDealMenu();
      await contentModel.clickMediaIconsMenu();
      await contentModel.clickHeadlinesMenu();
      await contentModel.titleInput.click();
      await contentModel.titleInput.type(title);
      await contentModel.verifyTitleIsComplete(title);
      await contentModel.descriptionInput.type("This is a description");
      await contentModel.dealDropdown.click();
      await contentModel.selectDealType(dealTypes.fixedPrice);
      await contentModel.priceField.type('1');
      await contentModel.unitsField.type('pcs');
      await contentModel.categoryDropdown.click();
      await contentModel.selectCategoryByName("(Browse) (Browse");
      await contentModel.cardDetailLabel.click();
      await contentModel.cardDetailLabel.click();
      //await contentModel.singleItemButton.click();
      await contentModel.waitUntilContentSpinnerDisappears();
      await commonModel.setSearchValue(title);
      await page.waitForTimeout(500);
      await contentModel.newContentIsCreated(title, dealTypes.fixedPrice, brandsData.brandNodeContentName, user.role);
      await commonModel.searchInput.clear();

      const title2 = (dealTypes.fixedPrice + uniqueId2).slice(0, 40);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.singleItemButton.click();
      await contentModel.hoverHeaders();
      //await contentModel.clickGeneralMenu();
      //await contentModel.clickDateRangeMenu();
      //await contentModel.clickDealMenu();
      //await contentModel.clickMediaIconsMenu();
      //await contentModel.clickHeadlinesMenu();
      await contentModel.titleInput.click();
      await contentModel.titleInput.type(title2);
      await contentModel.verifyTitleIsComplete(title2);
      await contentModel.descriptionInput.type("This is a description");
      await contentModel.dealDropdown.click();
      await contentModel.selectDealType(dealTypes.fixedPrice);
      await contentModel.priceField.type('1');
      await contentModel.unitsField.type('pcs');
      await contentModel.categoryDropdown.click();
      await contentModel.selectCategoryByName("(Browse) test");
      await contentModel.cardDetailLabel.click();
      await contentModel.cardDetailLabel.click();
      await contentModel.singleItemButton.click();
      await contentModel.waitUntilContentSpinnerDisappears();
      await commonModel.setSearchValue(title2);
      await page.waitForTimeout(500);
      await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.brandNodeContentName, user.role);
      await commonModel.searchInput.clear();

      await sidebarModel.onClickSchedulesOptionMenu();
      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();

      await schedulesModel.hideFirstCategoryInTheList();
      await schedulesModel.saveBtn.click({delay:2000});
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.waitSaveButtonIsNotVisible();

      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sidebarModel.onClickContentOptionMenu(); }
      await commonModel.waitUntilSpinnerDisappears();

      await page.waitForTimeout(2000);
      await schedulesModel.verifyThatTheCategoryHasHiddenIcon("test");

      await contentModel.deleteCategoriesHeaders();

      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.unhideFirstCategoryInTheList();
      await schedulesModel.saveBtn.click({delay:3000});
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.waitSaveButtonIsNotVisible();
    });

    test(`Verify that when the super admin clicks the List Hide button from a category page the category header should display the hidden icon at the circular builder module '${user.role}'`, async ({ page }) => {
      test.setTimeout(180000);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const contentModel = new ContentModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);

      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sidebarModel.onClickContentOptionMenu(); }
      await commonModel.waitUntilSpinnerDisappears();
  
      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
  
      const title = (dealTypes.fixedPrice + uniqueId).slice(0, 40);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.navigateToPageCircularModule("NewPage");
      await contentModel.singleItemButton.click();
      await contentModel.hoverHeaders();
      //await contentModel.clickGeneralMenu();
      await contentModel.clickDateRangeMenu();
      await contentModel.clickDealMenu();
      await contentModel.clickMediaIconsMenu();
      await contentModel.clickHeadlinesMenu();
      await contentModel.titleInput.click();
      await contentModel.titleInput.type(title);
      await contentModel.verifyTitleIsComplete(title);
      await contentModel.descriptionInput.type("This is a description");
      await contentModel.dealDropdown.click();
      await contentModel.selectDealType(dealTypes.fixedPrice);
      await contentModel.priceField.type('1');
      await contentModel.unitsField.type('pcs');
      await contentModel.categoryDropdown.click();
      await contentModel.selectCategoryByName("(NewPage) Fruits0d144ed5-");
      await contentModel.cardDetailLabel.click();
      await contentModel.cardDetailLabel.click();
      //await contentModel.singleItemButton.click();
      await contentModel.waitUntilContentSpinnerDisappears();
      await commonModel.setSearchValue(title);
      await page.waitForTimeout(500);
      await contentModel.newContentIsCreated(title, dealTypes.fixedPrice, brandsData.brandNodeContentName, user.role);
      await commonModel.searchInput.clear();

      const title2 = (dealTypes.fixedPrice + uniqueId2).slice(0, 40);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.singleItemButton.click();
      await contentModel.hoverHeaders();
      //await contentModel.clickGeneralMenu();
      //await contentModel.clickDateRangeMenu();
      //await contentModel.clickDealMenu();
      //await contentModel.clickMediaIconsMenu();
      //await contentModel.clickHeadlinesMenu();
      await contentModel.titleInput.click();
      await contentModel.titleInput.type(title2);
      await contentModel.verifyTitleIsComplete(title2);
      await contentModel.descriptionInput.type("This is a description");
      await contentModel.dealDropdown.click();
      await contentModel.selectDealType(dealTypes.fixedPrice);
      await contentModel.priceField.type('1');
      await contentModel.unitsField.type('pcs');
      await contentModel.categoryDropdown.click();
      await contentModel.selectCategoryByName("(NewPage) Alcohol");
      await contentModel.cardDetailLabel.click();
      await contentModel.cardDetailLabel.click();
      await contentModel.singleItemButton.click();
      await contentModel.waitUntilContentSpinnerDisappears();
      await commonModel.setSearchValue(title2);
      await page.waitForTimeout(500);
      await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.brandNodeContentName, user.role);
      await commonModel.searchInput.clear();

      await sidebarModel.onClickSchedulesOptionMenu();
      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();

      await schedulesModel.hideFirstPageCategoryInTheList();
      await schedulesModel.saveBtn.click({delay:2000});
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.waitSaveButtonIsNotVisible();

      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sidebarModel.onClickContentOptionMenu(); }
      await commonModel.waitUntilSpinnerDisappears();

      await page.waitForTimeout(2000);
      await contentModel.navigateToPageCircularModule("NewPage");
      await schedulesModel.verifyThatTheCategoryHasHiddenIcon("Fruits0d144ed5-");

      await contentModel.deleteCategoriesHeaders();

      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }
      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.unhideFirstPageCategoryInTheList();
      await schedulesModel.saveBtn.click({delay:3000});
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.waitSaveButtonIsNotVisible();
    });

    test(`Verify that when the super admin clicks the List Hide button from a subpage category the category header should display the hidden icon at the circular builder module '${user.role}'`, async ({ page }) => {
      test.setTimeout(180000);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const contentModel = new ContentModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);

      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sidebarModel.onClickContentOptionMenu(); }
      await commonModel.waitUntilSpinnerDisappears();
  
      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
  
      const title = (dealTypes.fixedPrice + uniqueId).slice(0, 40);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.navigateToSubPageCircularModule("SubPage450f62dc-fb0b-494b-ae84");
      await contentModel.singleItemButton.click();
      await contentModel.hoverHeaders();
      //await contentModel.clickGeneralMenu();
      await contentModel.clickDateRangeMenu();
      await contentModel.clickDealMenu();
      await contentModel.clickMediaIconsMenu();
      await contentModel.clickHeadlinesMenu();
      await contentModel.titleInput.click();
      await contentModel.titleInput.type(title);
      await contentModel.verifyTitleIsComplete(title);
      await contentModel.descriptionInput.type("This is a description");
      await contentModel.dealDropdown.click();
      await contentModel.selectDealType(dealTypes.fixedPrice);
      await contentModel.priceField.type('1');
      await contentModel.unitsField.type('pcs');
      await contentModel.categoryDropdown.click();
      await contentModel.selectCategoryByName("(SubPage450f62dc-fb0b-494b-ae84) test");
      await contentModel.cardDetailLabel.click();
      await contentModel.cardDetailLabel.click();
      await contentModel.singleItemButton.click();
      await contentModel.waitUntilContentSpinnerDisappears();
      await commonModel.setSearchValue(title);
      await page.waitForTimeout(500);
      await contentModel.newContentIsCreated(title, dealTypes.fixedPrice, brandsData.brandNodeContentName, user.role);
      await commonModel.searchInput.clear();

      const title2 = (dealTypes.fixedPrice + uniqueId2).slice(0, 40);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.singleItemButton.click();
      await contentModel.hoverHeaders();
      //await contentModel.clickGeneralMenu();
      //await contentModel.clickDateRangeMenu();
      //await contentModel.clickDealMenu();
      //await contentModel.clickMediaIconsMenu();
      //await contentModel.clickHeadlinesMenu();
      await contentModel.titleInput.click();
      await contentModel.titleInput.type(title2);
      await contentModel.verifyTitleIsComplete(title2);
      await contentModel.descriptionInput.type("This is a description");
      await contentModel.dealDropdown.click();
      await contentModel.selectDealType(dealTypes.fixedPrice);
      await contentModel.priceField.type('1');
      await contentModel.unitsField.type('pcs');
      await contentModel.categoryDropdown.click();
      await contentModel.selectCategoryByName("(SubPage450f62dc-fb0b-494b-ae84) Alcohol");
      await contentModel.cardDetailLabel.click();
      await contentModel.cardDetailLabel.click();
      await contentModel.singleItemButton.click();
      await contentModel.waitUntilContentSpinnerDisappears();
      await commonModel.setSearchValue(title2);
      await page.waitForTimeout(500);
      await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.brandNodeContentName, user.role);
      await commonModel.searchInput.clear();

      await sidebarModel.onClickSchedulesOptionMenu();
      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();

      await schedulesModel.hideFirstSubPageCategoryInTheList();
      await schedulesModel.saveBtn.click({delay:2000});
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.waitSaveButtonIsNotVisible();

      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sidebarModel.onClickContentOptionMenu(); }
      await commonModel.waitUntilSpinnerDisappears();

      await page.waitForTimeout(2000);
      await contentModel.navigateToSubPageCircularModule("SubPage450f62dc-fb0b-494b-ae84");
      await contentModel.verifyThatTheSubPageCategoryIsHidden("test");

      await contentModel.deleteCategoriesHeaders();

      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }
      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.unhideFirstSubPageCategoryInTheList();
      await schedulesModel.saveBtn.click({delay:3000});
      await commonModel.waitUntilSpinnerDisappears();
      await schedulesModel.waitSaveButtonIsNotVisible();
    });

    test(`Verify that when the super admin clicks the Move To Top option in a category with banner activated the category should move to top in the category list '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.clickLastCategoryBookmarksButton();
      await schedulesModel.moveLastCategoryInTheListToTheTop();
    });

    test(`Verify that when the super admin clicks the Move To Top option in a category with banner activated the page category should move to top in the category list '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.clickLastPageCategoryPageBookmarksButton();
      await schedulesModel.moveLastCategoryInTheListToTheTopPageSection();
    });

    test(`Verify that when the super admin clicks the Move To Top option in a subpage category with banner activated the category should move to top in the category list '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.clickLastSubPageCategoryPageBookmarksButton();
      await schedulesModel.moveLastCategoryInTheListToTheTopSubPageSection();
    });

    test(`Verify that when the super admin clicks the Move To Bottom option in a category with banner activated the category should move to bottom in the category list '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.clickBookmarksButton();
      await schedulesModel.moveFirstCategoryInTheListToTheBottom();
    });


    test(`Verify that when the super admin clicks the Move To Bottom option in a page category with banner activated the category should move to bottom in the category list '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.clickFirstPageCategoryBookmarksButton();
      await schedulesModel.moveFirstCategoryInTheListToTheBottomPageSection();
    });

    test(`Verify that when the super admin clicks the Move To Bottom option in a subpage category with banner activated the category should move to bottom in the category list '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      await schedulesModel.clickFirstSubPageCategoryBookmarksButton();
      await schedulesModel.moveFirstCategoryInTheListToTheBottomSubPageSection();
    });

    test(`Verify that when the super admin clicks the Move To Top button and the changes are not saved the category remains in its position '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      let categoryName1 = await schedulesModel.getLastCategoryName();
      await schedulesModel.moveLastCategoryInTheListToTheTop();

      await schedulesModel.cancelBtn.click({delay:3000});

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      let categoryName2 = await schedulesModel.getLastCategoryName();
      expect(categoryName1).toEqual(categoryName2);
    });

    test(`Verify that when the super admin clicks the Move To Bottom button and the changes are not saved the category remains in its position '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      const credentials = users.find(e => e.role === Roles.superAdmin);
      await loginModel.login(credentials?.username, credentials?.password);
      await topBarModel.selectBrand(brandsData.brandNodeContentName);
      // await categoriesModel.ensureCategoriesRequiredExists(2);
      await sidebarModel.onClickSchedulesOptionMenu();
      if(user.role == Roles.superAdmin){
        await schedulesModel.enableCategoryDividedLayout();
      }

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      let categoryName1 = await schedulesModel.getFirstCategoryName();
      await schedulesModel.moveLastCategoryInTheListToTheTop();

      await schedulesModel.cancelBtn.click({delay:3000});

      await schedulesModel.clickEditButton();
      await schedulesModel.verifyThatEditScheduleModalIsVisible();
      let categoryName2 = await schedulesModel.getFirstCategoryName();
      expect(categoryName1).toEqual(categoryName2);
      
    });

  });

});
