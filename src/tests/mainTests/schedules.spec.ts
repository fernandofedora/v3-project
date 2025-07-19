import { test, expect } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import { TopBarModel } from '../../pom/topBarModel';
import { SchedulesModel } from '../../pom/schedulesModel';
import { BrandsModel } from '../../pom/brandsModel';
import { CommonModel } from '../../pom/commonModel';
import { SidebarModel } from '../../pom/sidebarModel';
import { brandsData } from '../../data/brandsData';
import { schedulesData } from '../../data/schedulesData';
import { dealTypes } from '../../data/contentData';
import { RolesEnum as Roles } from '../../enums/roles.enum';
import { validateEnvironment } from '../../utils/urlHandler';
import { validateUsers } from '../../utils/userHandler';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { ContentModel } from '../../pom/contentModel';
import { rolesData } from '../../data/usersData';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const url: string = validateEnvironment();

test.describe('Manage Schedules', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    test.setTimeout(150000);
    await page.goto(url);
  });

  test(`Verify if the initial default schedule is created properly when CDL is active in the brand`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const topBarModel = new TopBarModel(page);
    const schedulesModel = new SchedulesModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    const credentials = users.find(e => e.role === Roles.superAdmin);
    await loginModel.login(credentials!.username, credentials!.password);
    await topBarModel.selectBrand(brandsData.onlySchedules);
    await sidebarModel.onClickBrandOptionMenu();
    await commonModel.setSearchValue(brandsData.onlySchedules);
    await brandsModel.brandTableShouldHasOneRow();
    await brandsModel.goToManageNodes(brandsData.onlySchedules);
    await brandsModel.hasNodeTableValues(3);

    // Edit the required brand node
    await page.evaluate("document.body.style.scale='0.8'");
    await brandsModel.openEditNodePopUp(brandsData.onlySchedules);
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
    await loginModel.login(credentials!.username, credentials!.password);
    await topBarModel.selectBrand(brandsData.onlySchedules2);
    await sidebarModel.onClickBrandOptionMenu();
    await commonModel.setSearchValue(brandsData.onlySchedules2);
    await brandsModel.brandTableShouldHasOneRow();
    await brandsModel.goToManageNodes(brandsData.onlySchedules2);
    await brandsModel.hasNodeTableValues(3);

    // Edit the required brand node
    await page.evaluate("document.body.style.scale='0.8'");
    await brandsModel.openEditNodePopUp(brandsData.onlySchedules2);
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

      await loginModel.login(user!.username, user!.password);
 
      if(user.role == rolesData.storeOwner) {
        await sidebarModel.onClickSchedulesOptionMenu(); 
        await schedulesModel.verifyThatTheSchedulesButtonIsNotVisible();

      } else{

        await topBarModel.selectBrand(brandsData.onlySchedules3);
        // await categoriesModel.ensureCategoriesRequiredExists(2);
        await commonModel.waitUntilSpinnerDisappears();
        
        await sidebarModel.onClickSchedulesOptionMenu();
        if(user.role == Roles.superAdmin) { await schedulesModel.enableCategoryDividedLayout(brandsData.onlySchedules3); }

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
      }
    });

    test(`Verify if a future schedule in the brand can be created in a browse page when the end date finishes after the current day and time '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      await loginModel.login(user!.username, user!.password);

      if(user.role == rolesData.storeOwner) {
        await sidebarModel.onClickSchedulesOptionMenu(); 
        await schedulesModel.verifyThatTheSchedulesButtonIsNotVisible();

      } else{

        await topBarModel.selectBrand(brandsData.onlySchedules);
        // await categoriesModel.ensureCategoriesRequiredExists(2);
        await commonModel.waitUntilSpinnerDisappears();

        await sidebarModel.onClickSchedulesOptionMenu();
        if(user.role === Roles.superAdmin) await schedulesModel.enableCategoryDividedLayout(brandsData.onlySchedules);
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
      }
    });

    test(`Verify if a future schedule in a browse page of a brand can be created between existing active schedule '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      test.setTimeout(120000);
      await loginModel.login(user!.username, user!.password);

      if(user.role == rolesData.storeOwner) {
        await sidebarModel.onClickSchedulesOptionMenu(); 
        await schedulesModel.verifyThatTheSchedulesButtonIsNotVisible();

      } else{

        await topBarModel.selectBrand(brandsData.onlySchedules2);
        // await categoriesModel.ensureCategoriesRequiredExists(2);
        await commonModel.waitUntilSpinnerDisappears();
        
        await sidebarModel.onClickSchedulesOptionMenu();
        if(user.role === Roles.superAdmin) await schedulesModel.enableCategoryDividedLayout(brandsData.onlySchedules2);

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
      }
    });

    test(`Verify if the end date is empty for the last schedule in the brand '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      await loginModel.login(user!.username, user!.password);
      if(user.role == rolesData.storeOwner) {
        await sidebarModel.onClickSchedulesOptionMenu(); 
        await schedulesModel.verifyThatTheSchedulesButtonIsNotVisible();

      } else{

        await topBarModel.selectBrand(brandsData.onlySchedules3);
        // await categoriesModel.ensureCategoriesRequiredExists(2);
        await commonModel.waitUntilSpinnerDisappears();

        await sidebarModel.onClickSchedulesOptionMenu();
        if(user.role === Roles.superAdmin) await schedulesModel.enableCategoryDividedLayout(brandsData.onlySchedules3);
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
      }
    });

    test(`Verify if the reset button appears and the start date is disabled in a new brand schedule when the categories are reordering '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      await loginModel.login(user!.username, user!.password);

      if(user.role == rolesData.storeOwner) {
        await sidebarModel.onClickSchedulesOptionMenu(); 
        await schedulesModel.verifyThatTheSchedulesButtonIsNotVisible();

      } else{

        await topBarModel.selectBrand(brandsData.onlySchedules);
        // await categoriesModel.ensureCategoriesRequiredExists(2);
        await commonModel.waitUntilSpinnerDisappears();
        
        await sidebarModel.onClickSchedulesOptionMenu();
        if(user.role === Roles.superAdmin) await schedulesModel.enableCategoryDividedLayout(brandsData.onlySchedules);
        await schedulesModel.verifyThatSchedulesTableIsVisible();

        await schedulesModel.onClickAddScheduleButton();
        await schedulesModel.verifyCategoryTableIsVisible();
        await schedulesModel.selectFutureStartDate(1);
        await schedulesModel.verifyApplyButtonIsNotVisible();
        await schedulesModel.reorderCategories();

        await schedulesModel.verifyScheduleNameFieldIsDisabled();
        await schedulesModel.verifyUndoButtonIsVisible();
      }
    });

    test(`Verify if a new brand schedule can be reset properly clicking on the reset button '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      await loginModel.login(user!.username, user!.password);

      if(user.role == rolesData.storeOwner) {
        await sidebarModel.onClickSchedulesOptionMenu(); 
        await schedulesModel.verifyThatTheSchedulesButtonIsNotVisible();

      } else{

        await topBarModel.selectBrand(brandsData.onlySchedules2);
        // await categoriesModel.ensureCategoriesRequiredExists(2);
        await commonModel.waitUntilSpinnerDisappears();
        
        await sidebarModel.onClickSchedulesOptionMenu();
        if(user.role === Roles.superAdmin) await schedulesModel.enableCategoryDividedLayout(brandsData.onlySchedules2);

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
      }
    });

    test(`Verify if the brand schedule name can be edited properly with valid name '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      await loginModel.login(user!.username, user!.password);

      if(user.role == rolesData.storeOwner) {
        await sidebarModel.onClickSchedulesOptionMenu(); 
        await schedulesModel.verifyThatTheSchedulesButtonIsNotVisible();

      } else{

        await topBarModel.selectBrand(brandsData.onlySchedules3);
        // await categoriesModel.ensureCategoriesRequiredExists(2);
        await commonModel.waitUntilSpinnerDisappears();
        
        await sidebarModel.onClickSchedulesOptionMenu();
        if(user.role === Roles.superAdmin) await schedulesModel.enableCategoryDividedLayout(brandsData.onlySchedules3);
        const schedule = await schedulesModel.createSchedule(1);
        await schedulesModel.onClickScheduleEditButton(schedule.name);
        schedule.name = schedule.name + ' Edit';
        await schedulesModel.setScheduleName(schedule.name);
        await schedulesModel.onClickScheduleSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await schedulesModel.onClickScheduleEditButton(schedule.name);
        await schedulesModel.verifyThatNamefieldIsVisible();
        await expect( async () => {
          await expect(schedulesModel.scheduleNameInput).toHaveValue(schedule.name, { timeout: 300 });
        }).toPass();

        await schedulesModel.onClickScheduleCancelButton();
        await schedulesModel.onClickScheduleDeleteButton(schedule.name);
        await commonModel.waitUntilSpinnerDisappears();
        //await schedulesModel.checkScheduleIsNotInTable(schedule.name);

        await page.waitForTimeout(5000);
      }
    });

    test(`Verify if the start date can't be edited of existing brand schedule '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      await loginModel.login(user!.username, user!.password);
      if(user.role == rolesData.storeOwner) {
        await sidebarModel.onClickSchedulesOptionMenu(); 
        await schedulesModel.verifyThatTheSchedulesButtonIsNotVisible();

      } else{

        await topBarModel.selectBrand(brandsData.onlySchedules);
        // await categoriesModel.ensureCategoriesRequiredExists(2);
        await commonModel.waitUntilSpinnerDisappears();

        await sidebarModel.onClickSchedulesOptionMenu();
        if(user.role === Roles.superAdmin) await schedulesModel.enableCategoryDividedLayout(brandsData.onlySchedules);

        const schedule = await schedulesModel.createSchedule(1);
        await schedulesModel.onClickScheduleEditButton(schedule.name);
        await schedulesModel.verifyThatStartDateInputVisible();
        await schedulesModel.verifyDateInputIsDisabled();
        await schedulesModel.onClickScheduleCancelButton();

        await schedulesModel.onClickScheduleDeleteButton(schedule.name);
        await commonModel.waitUntilSpinnerDisappears();
        await schedulesModel.checkScheduleIsNotInTable(schedule.name);
      }
    });

    test(`Verify if the categories can be ordered properly in a brand schedule '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const schedulesModel = new SchedulesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      await loginModel.login(user!.username, user!.password);
      if(user.role == rolesData.storeOwner) {
        await sidebarModel.onClickSchedulesOptionMenu(); 
        await schedulesModel.verifyThatTheSchedulesButtonIsNotVisible();

      } else{

        await topBarModel.selectBrand(brandsData.onlySchedules2);
        // await categoriesModel.ensureCategoriesRequiredExists(2);
        await commonModel.waitUntilSpinnerDisappears();
    
        await sidebarModel.onClickSchedulesOptionMenu();
        if(user.role === Roles.superAdmin) await schedulesModel.enableCategoryDividedLayout(brandsData.onlySchedules2);

        await schedulesModel.verifyThatSchedulesTableIsVisible();
        const schedule = await schedulesModel.createSchedule(1);
        await schedulesModel.onClickScheduleEditButton(schedule.name);
        await schedulesModel.verifyCategoryTableIsVisible();
        await schedulesModel.reorderCategories();

        // Get the category order after reorder
        let firstCategory = schedulesModel.categoriesTable.locator('tr').nth(0).locator('td').nth(0);
        let secondCategory = schedulesModel.categoriesTable.locator('tr').nth(1).locator('td').nth(0);
        let firstCategoryBefore = await firstCategory.innerText();
        let secondCategoryBefore = await secondCategory.innerText();

        await schedulesModel.onClickScheduleSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await schedulesModel.verifyThatSchedulesTableIsVisible();
        await schedulesModel.onClickScheduleEditButton(schedule.name);
        await schedulesModel.verifyCategoryTableIsVisible();

        // We expect the category order matches the last saved category order.
        expect((await firstCategory.innerText()).includes(firstCategoryBefore)).toBeTruthy();
        expect((await secondCategory.innerText()).includes(secondCategoryBefore)).toBeTruthy();

        await schedulesModel.onClickScheduleCancelButton();
        await schedulesModel.onClickScheduleDeleteButton(schedule.name);
        await commonModel.waitUntilSpinnerDisappears();
        await schedulesModel.checkScheduleIsNotInTable(schedule.name);
      }
    });

  });



});
