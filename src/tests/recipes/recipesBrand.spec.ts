import { test, expect } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import {SidebarModel} from '../../pom/sidebarModel';
import {TopBarModel} from '../../pom/topBarModel';
import {validateEnvironment} from '../../utils/urlHandler';
import {validateUsers} from '../../utils/userHandler';
import { CommonModel } from '../../pom/commonModel';
import { Recipesmodel } from '../../pom/recipesModel';
import { RolesEnum as rolesData } from '../../enums/roles.enum';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { brandsData } from '../../data/brandsData';
import {v4 as uuidv4} from 'uuid';
import { contentData } from '../../data/contentData';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const url: string = validateEnvironment();

test.afterAll(async () => {
  test.setTimeout(2500);
});

users.forEach(user =>{

    test(`Verify the creation of a new recipe with image media type resource at brand level for a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:2000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:2000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();
    
        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
    
        await recipesModel.verifyTheNewRecipeIsCreated(title);
    
        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        expect(await recipesModel.nameField.inputValue()).toEqual(title);
        expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Image");
        await recipesModel.verifyImageIspresent();
    
        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify the creation of a new recipe with all the fields at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);

        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();

        const uniqueId = uuidv4();

        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await commonModel.inputTextInLocator(recipesModel.cookTimeField, "one hours");
        await commonModel.inputTextInLocator(recipesModel.prepTimeField, "two hours");
        await commonModel.inputTextInLocator(recipesModel.servesfield, "1");
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:2000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:2000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");

        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        expect(await recipesModel.cookTimeField.inputValue()).toEqual("one hour");
        expect(await recipesModel.prepTimeField.inputValue()).toEqual("two hours");
        expect(await recipesModel.servesfield.inputValue()).toEqual("1");
        expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Image");
        await recipesModel.verifyImageIspresent();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify the creation of a new recipe with a valid expire date at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();

        let startDateData: string;
        let expireDateData: string;
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click({delay:1000});
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click({delay:1000});
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.expiresDateSwith.click();
        [startDateData, expireDateData] = await recipesModel.getStartDateAndExpiresDate();
        await recipesModel.saveRecipeButton.click();
    
        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
    
        await recipesModel.verifyTheNewRecipeIsCreated(title);
    
        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        expect(await recipesModel.nameField.inputValue()).toEqual(title);
        expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Image");
        await recipesModel.verifyImageIspresent();
    
        expect(await recipesModel.expiresDateSwith.locator('button').getAttribute("aria-checked")).toEqual("true");
        expect(await recipesModel.startsOnField.innerText()).toEqual(startDateData);
        expect(await recipesModel.expiresField.innerText()).toEqual(expireDateData);

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });


    test(`Verify that a new recipe is not created when the title field is empty and the Name is required message is displayed at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
    
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click({delay:1000});
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click({delay:1000});
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();
        await recipesModel.verifyErrorMessage("Name is required.");
    });


    test.skip(`Verify the creation of a new recipe with youtube video media resource at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("Video");
        await recipesModel.videoIdField.click();
        await commonModel.inputTextInLocator(recipesModel.videoIdField, "video Id");
        await recipesModel.selectImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.videoTypeMenu.click();
        await recipesModel.youTubeType.click();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
    
        await recipesModel.verifyTheNewRecipeIsCreated(title);
    
        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyNameFieldIsVisible();
        expect(await recipesModel.nameField.inputValue()).toEqual(title);
        await recipesModel.verifyImageIspresent();

        expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Video");
        expect(await recipesModel.videoTypeMenu.innerText()).toEqual("Youtube");

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });


    test.skip(`Verify the creation of a new recipe with vimeo video media resource at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("Video");
        await recipesModel.videoIdField.click();
        await commonModel.inputTextInLocator(recipesModel.videoIdField, "video Id");
        await recipesModel.selectImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.videoTypeMenu.click();
        await recipesModel.vimeoType.click();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
    
        await recipesModel.verifyTheNewRecipeIsCreated(title);
    
        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyNameFieldIsVisible();
        expect(await recipesModel.nameField.inputValue()).toEqual(title);
        await recipesModel.verifyImageIspresent();

        expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Video");
        expect(await recipesModel.videoTypeMenu.innerText()).toEqual("Vimeo");

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });


    test(`Verify that a new recipe is not created when the media field empty and the Media mediahref is required message is displayed at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();
        await recipesModel.verifyErrorMessage("Media mediahref is required.");
    });


    test(`Verify the creation of a recipe containing instructions at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:2000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:2000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.addNewInstructionButton.click();
        await commonModel.inputTextInLocator(recipesModel.textAreaInstruction, "This is an instruction");
        await recipesModel.checkInstructionButton.click();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
    
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        expect(await recipesModel.nameField.inputValue()).toEqual(title);
        expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Image");
        await recipesModel.verifyImageIspresent();
        let instructionsText = await recipesModel.instructionsList.locator('div > span').innerText();
        expect(instructionsText).toContain('This is an instruction');

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if the add action of a instruction can be canceled while creating a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.addNewInstructionButton.click();
        await commonModel.inputTextInLocator(recipesModel.textAreaInstruction, "This is an instruction");
        await recipesModel.cancelInstructionButton.click();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
    
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        expect(await recipesModel.nameField.inputValue()).toEqual(title);
        expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Image");
        await recipesModel.verifyImageIspresent();
        expect(await recipesModel.textAreaInstruction.isVisible()).toBeFalsy();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify that an empty instruction can not be added to a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.addNewInstructionButton.click();
        await recipesModel.checkInstructionButton.click();
        await recipesModel.verifyCreatedAlertMessage("Empty value not allowed");
    });

    test(`Verify if an instruction can be removed while creating a new recipe at brand level with single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.addNewInstructionButton.click( {delay:1000} );
        await commonModel.inputTextInLocator(recipesModel.textAreaInstruction, "This is an instruction");
        await recipesModel.cancelInstructionButton.click();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
    
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        expect(await recipesModel.nameField.inputValue()).toEqual(title);
        expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Image");
        await recipesModel.verifyImageIspresent();
        expect(await recipesModel.textAreaInstruction.isVisible()).toBeFalsy();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if an instruction can be update once is created while creating a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.addNewInstructionButton.click();
        await commonModel.inputTextInLocator(recipesModel.textAreaInstruction, "This is an instruction");
        await recipesModel.checkInstructionButton.click();
        await recipesModel.instructionsList.dblclick();
        await recipesModel.textAreaInstruction.clear();
        await commonModel.inputTextInLocator(recipesModel.textAreaInstruction, "This is an edited instruction");
        await recipesModel.checkInstructionButton.click();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
    
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        expect(await recipesModel.nameField.inputValue()).toEqual(title);
        expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Image");
        await recipesModel.verifyImageIspresent();
        let instructionsText = await recipesModel.instructionsList.locator('div > span').innerText();
        expect(instructionsText).toContain('This is an edited instruction');

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });


    test(`Verify if is possible to add a note in a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.notesHeader.click();
        await recipesModel.addNoteButton.click();
        await recipesModel.noteTextArea.click();
        await commonModel.inputTextInLocator(recipesModel.noteTextArea, "This is a new note");
        await recipesModel.checkNoteButton.click();
        await recipesModel.saveRecipeButton.click();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");

        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        expect(await recipesModel.nameField.inputValue()).toEqual(title);
        expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Image");
        await recipesModel.verifyImageIspresent();
        await recipesModel.notesHeader.click();
        await recipesModel.doubleClickNote('This is a new note');
        let areaText = await recipesModel.noteTextArea.inputValue();
        expect(areaText).toEqual('This is a new note');

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if is possible to add an empty note in a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.notesHeader.click();
        await recipesModel.addNoteButton.click();
        await recipesModel.noteTextArea.click();
        await recipesModel.checkNoteButton.click();
        
        await recipesModel.verifyCreatedAlertMessage("Empty value not allowed.");
    });


    test(`Verify if is possible to cancel the add action of a note while creating a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.notesHeader.click();
        await recipesModel.addNoteButton.click();
        await recipesModel.noteTextArea.click();
        await commonModel.inputTextInLocator(recipesModel.noteTextArea, "This is a new note");
        await recipesModel.cancelNoteButton.click();
        await recipesModel.saveRecipeButton.click();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");

        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        expect(await recipesModel.nameField.inputValue()).toEqual(title);
        expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Image");
        await recipesModel.verifyImageIspresent();
        await recipesModel.notesHeader.click();
        await recipesModel.verifyIfNoteNoExist("This is a new note");

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });


    test(`Verify if is possible to modify a created note while creating a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.notesHeader.click();
        await recipesModel.addNoteButton.click();
        await recipesModel.noteTextArea.click();
        await commonModel.inputTextInLocator(recipesModel.noteTextArea, "This is a new note");
        await recipesModel.checkNoteButton.click();
        await recipesModel.doubleClickNote("This is a new note");
        await recipesModel.noteTextArea.clear();
        await commonModel.inputTextInLocator(recipesModel.noteTextArea, "This is an edited note");
        await recipesModel.checkNoteButton.click();
        await recipesModel.saveRecipeButton.click();
        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");

        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        expect(await recipesModel.nameField.inputValue()).toEqual(title);
        expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Image");
        await recipesModel.verifyImageIspresent();
        await recipesModel.notesHeader.click();
        await recipesModel.doubleClickNote('This is an edited note');
        let areaText = await recipesModel.noteTextArea.inputValue();
        expect(areaText).toEqual('This is an edited note');

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if is possible to remove a note once is created while creating a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click({delay:1000});
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.notesHeader.click();
        await recipesModel.addNoteButton.click();
        await recipesModel.noteTextArea.click();
        await commonModel.inputTextInLocator(recipesModel.noteTextArea, "This is a new note");
        await recipesModel.checkNoteButton.click();
        await recipesModel.clickDeleteNoteButton("this is a note");
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        expect(await recipesModel.nameField.inputValue()).toEqual(title);
        expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Image");
        await recipesModel.verifyImageIspresent();
        await recipesModel.notesHeader.click();
        await recipesModel.verifyIfNoteNoExist("This is a new note");

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });


    test(`Verify if an ingredient is added to a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.verifyThatSaveIngredientButtonIsVisible();
        await recipesModel.saveIngredientButton.click();
        await recipesModel.verifyIngredientIsAdded();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        expect(await recipesModel.nameField.inputValue()).toEqual(title);
        expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Image");
        await recipesModel.verifyImageIspresent();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.clickIngredientEditButton("ingredient name");
        await recipesModel.waitIngredientModalVisible();
        expect(await recipesModel.ingredientTitleField.inputValue()).toEqual("ingredient name");
        expect(await recipesModel.ingredientDescriptionField.inputValue()).toEqual("ingredient description");
        expect(await recipesModel.ingredientQuantityField.inputValue()).toEqual("1");
        await recipesModel.verifyThatSaveIngredientButtonIsVisible();
        await recipesModel.cancelIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });


    test(`Verify if the add ingredient action can be canceled while creating a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.cancelIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        expect(await recipesModel.nameField.inputValue()).toEqual(title);
        expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Image");
        await recipesModel.verifyImageIspresent();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.verifyIngredientNotCreated("ingredient name");

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if an ingredient with the empty title field can not be created while creating a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.saveIngredientButton.click();

        await recipesModel.verifyTitleRequiredErrorMessageIsDisplayed();
    });


    test(`Verify if an ingredient with the description field empty can be created while creating a new recipe at brand level '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.saveIngredientButton.click();
        await recipesModel.verifyIngredientIsAdded();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        expect(await recipesModel.nameField.inputValue()).toEqual(title);
        expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Image");
        await recipesModel.verifyImageIspresent();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.verifyIngredientCreated("ingredient name");

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });


    test(`Verify if an ingredient with an invalid value on the quantity field can not be created while creating a new recipe at brand level '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "0");
        await recipesModel.saveIngredientButton.click();

        await recipesModel.verifyQuantityErrorMessageIsDisplayed();
    });


    test(`Verify if an ingredient can be mapped to a card coupon type while creating a new recipe at brand level '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.verifyThatMapToCardToogleIsActiveOrInactive("true");

        await recipesModel.verifyDealTypeDropdownIsVisible();
        await recipesModel.verifyPriceFieldIsVisible();
        await recipesModel.verifyUnitsFieldIsVisible();
        await recipesModel.verifyLocationFieldIsVisible();
        await recipesModel.verifyClickLinkFieldIsVisible();
        await recipesModel.verifymediaSizeDropdownMenuIsVisible();
        await recipesModel.verifycardStyleDropdownMenuIsVisible();
        await recipesModel.cancelIngredientButton.hover();
    });


    test(`Verify if an ingredient can be removed once was created while creating a new recipe at brand level '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.saveIngredientButton.click();

        await recipesModel.clickIngredientDeleteButton('ingredient name');
        await recipesModel.clickConfirmDeleteActionButton();
        await recipesModel.verifyIngredientDeleted('ingredient name');
    });


    test(`Verify if a created recipe can be deleted at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickDeleteButtonRecipe(title);
        await recipesModel.clickConfirmDeleteActionButton();
        await recipesModel.verifyDeleteMessage(title);
    });


    test(`Verify if the delete action can be canceled at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickDeleteButtonRecipe(title);
        await recipesModel.cancelDeleteActionbutton.click();
        await recipesModel.verifyTheCancelActionButtonButtonNotVisible();
        await recipesModel.verifyTheNewRecipeIsCreated(title);
       
        await recipesModel.deleteRecipe(title);
        await recipesModel.verifyDeleteMessage(title);
    });

    test(`Verify if a new ingredient can be created with Coupon deal type Standard Media size and Standard card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click({delay:1000});
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('No Price');
        await recipesModel.priceField.click();
        await commonModel.inputTextInLocator(recipesModel.priceField, "5");
        await recipesModel.unitsField.click();
        await commonModel.inputTextInLocator(recipesModel.unitsField, "2");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Standard');
        await recipesModel.clickCardStyleDropdownOption('Standard');
        await recipesModel.saveIngredientButton.click();
        await recipesModel.verifyIngredientIsAdded();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.nameField.isVisible();
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('coupon');
        let priceText = await recipesModel.priceField.inputValue();
        expect(priceText).toEqual('5');
        let unitsText = await recipesModel.unitsField.inputValue();
        expect(unitsText).toEqual('2');
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1,imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Standard");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("Standard");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });


    test(`Verify if is possible to add a note a previously created recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.notesHeader.click();
        await recipesModel.addNoteButton.click();
        await recipesModel.noteTextArea.click();
        await commonModel.inputTextInLocator(recipesModel.noteTextArea, "this is a note");
        await recipesModel.checkNoteButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.notesHeader.click();
        await recipesModel.addNoteButton.click();
        await recipesModel.noteTextArea.click();
        await commonModel.inputTextInLocator(recipesModel.noteTextArea, "this is a second note");
        await recipesModel.checkNoteButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIfNoteExist("this is a second note");
        await recipesModel.saveRecipeButton.click();

        await recipesModel.verifyCreatedAlertMessage("Recipe updated successfully.");
        await commonModel.waitForSnackbarDissapear();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with Fixed Price deal type, Standard Media size and Standard card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Fixed Price');
        await recipesModel.priceField.click();
        await commonModel.inputTextInLocator(recipesModel.priceField, "5");
        await recipesModel.unitsField.click();
        await commonModel.inputTextInLocator(recipesModel.unitsField, "2");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Standard');
        await recipesModel.clickCardStyleDropdownOption('Standard');
        await recipesModel.saveIngredientButton.click();
        await recipesModel.verifyIngredientIsAdded();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('fixed');
        let priceText = await recipesModel.priceField.inputValue();
        expect(priceText).toEqual('5');
        let unitsText = await recipesModel.unitsField.inputValue();
        expect(unitsText).toEqual('2');
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1,imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Standard");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("Standard");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with Buy X Get Y For Z deal type, Standard Media size and Standard card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Buy X Get Y For Z');
        await recipesModel.buyQuantityField.click();
        await commonModel.inputTextInLocator(recipesModel.buyQuantityField, "5");
        await recipesModel.getQuantityField.click();
        await commonModel.inputTextInLocator(recipesModel.getQuantityField, "2");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Standard');
        await recipesModel.clickCardStyleDropdownOption('Standard');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('bogo');
        let priceText = await recipesModel.buyQuantityField.inputValue();
        expect(priceText).toEqual('5');
        let unitsText = await recipesModel.getQuantityField.inputValue();
        expect(unitsText).toEqual('2');
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1,imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Standard");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("Standard");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with # for Price deal type, Standard Media size and Standard card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('# for Price');
        await recipesModel.forQuantityField.click();
        await commonModel.inputTextInLocator(recipesModel.forQuantityField, "3");
        await recipesModel.forPriceField.click();
        await commonModel.inputTextInLocator(recipesModel.forPriceField, "5");
        await recipesModel.forUnitsField.click();
        await commonModel.inputTextInLocator(recipesModel.forUnitsField, "5");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Standard');
        await recipesModel.clickCardStyleDropdownOption('Standard');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('numfor');
        let quantityText = await recipesModel.forQuantityField.inputValue();
        expect(quantityText).toEqual('3');
        let priceText = await recipesModel.forPriceField.inputValue();
        expect(priceText).toEqual('5');
        let unitsText = await recipesModel.forUnitsField.inputValue();
        expect(unitsText).toEqual('5');
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1,imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Standard");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("Standard");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });


    test(`Verify if a new ingredient can be created with Amount Off Monetary deal type, Standard Media size and Standard card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000});
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Amount Off');
        await recipesModel.monetaryRadioButton.click();
        await recipesModel.amountOffInputField.click();
        await commonModel.inputTextInLocator(recipesModel.amountOffInputField, "5");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Standard');
        await recipesModel.clickCardStyleDropdownOption('Standard');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('x_off');
        let amountOffText = await recipesModel.amountOffInputField.inputValue();
        expect(amountOffText).toEqual('5');
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1,imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Standard");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("Standard");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });


    test(`Verify if a new ingredient can be created with Amount Off Percent deal type, Standard Media size and Standard card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Amount Off');
        await recipesModel.porcentRadioButton.click();
        await recipesModel.amountOffInputField.click();
        await commonModel.inputTextInLocator(recipesModel.amountOffInputField, "50");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Standard');
        await recipesModel.clickCardStyleDropdownOption('Standard');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('x_off');
        let amountOffText = await recipesModel.amountOffInputField.inputValue();
        expect(amountOffText).toEqual('50');
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1,imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Standard");
        await page.waitForTimeout(1500);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("Standard");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if is not possible create a new recipe with the expire date in the past from the start date while creating a new recipe at brand level default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.expiresDateSwith.click();
        let date = await recipesModel.selectPastDate(15);
        await recipesModel.expiresDateField.fill(date);
        await recipesModel.saveRecipeButton.click();
        await recipesModel.verifyErrorMessage('Validto: invalid time frame');
    });

    test(`Verify if the expiration date can be set to today using the today button below the expires field while creating a new recipe at brand level default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();

        await recipesModel.createRecipebutton.click();
        await recipesModel.expiresDateSwith.click();
        await recipesModel.todayButton.click();
        await recipesModel.compareExpireDateToday();

    });

    test(`Verify if the expiration date can be set one week later using the next week button below the expires field while creating a new recipe at brand level default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();

        await recipesModel.createRecipebutton.click();
        await recipesModel.expiresDateSwith.click();
        await recipesModel.todayButton.click();
        await recipesModel.nextWeekButton.click();
        await recipesModel.compareExpireDateOneWeekLater();

    });

    test(`Verify if the expiration date can be reseted using the reset button below the expires field while creating a new recipe at brand level default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();

        await recipesModel.createRecipebutton.click();
        await recipesModel.expiresDateSwith.click()
        await recipesModel.resetButton.click();
        await recipesModel.compareExpireDateReset();

    });

    test(`Verify if an ingredient can be edited once is created in a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "tacos");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "these are tacos");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyIngredientCreated("tacos");

        await recipesModel.clickEditButtonFromAnIngredient("tacos");
        await recipesModel.ingredientTitleField.isVisible();
        await recipesModel.ingredientTitleField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "other tacos");
        await recipesModel.ingredientDescriptionField.click();
        await recipesModel.ingredientDescriptionField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "these are other tacos");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "5");
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyIngredientCreated("other tacos");

        await recipesModel.clickEditButtonFromAnIngredient("other tacos");
        let ingredientFieldValue = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientFieldValue).toEqual("other tacos");
        let descriptionFieldValue = await recipesModel.ingredientDescriptionField.inputValue();
        expect(descriptionFieldValue).toEqual("these are other tacos");
        let quantityFieldValue = await recipesModel.ingredientQuantityField.inputValue();
        expect(quantityFieldValue).toEqual("5");
    });

    test(`Verify if the edition of a ingredient can be canceled while creating a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "tacos");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "these are tacos");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyIngredientCreated("tacos");

        await recipesModel.clickEditButtonFromAnIngredient("tacos");
        await recipesModel.cancelIngredientButton.click();
        await recipesModel.clickEditButtonFromAnIngredient("tacos");
        let ingredientFieldValue = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientFieldValue).toEqual("tacos");
        let descriptionFieldValue = await recipesModel.ingredientDescriptionField.inputValue();
        expect(descriptionFieldValue).toEqual("these are tacos");
        let quantityFieldValue = await recipesModel.ingredientQuantityField.inputValue();
        expect(quantityFieldValue).toEqual("1");
    });

    test(`Verify if a created ingredient can be deleted while creating a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "tacos");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "these are tacos");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.saveIngredientButton.click();
        await recipesModel.clickDeleteButtonFromIngredient("tacos");
        await recipesModel.confirmDeleteIngredientButton.click();
        await recipesModel.verifyTheNewIngredientIsDeleted("tacos");
    });

    test(`Verify if the name from a recipe can be edited once it has been created at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        const title2 = ("Recipe" + uniqueId).slice(0, 30);

        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.nameField.click();
        await recipesModel.nameField.clear();
        await commonModel.inputTextInLocator(recipesModel.nameField, title2);
        await recipesModel.saveRecipeButton.click();

        await recipesModel.verifyCreatedAlertMessage("Recipe updated successfully.");
        await recipesModel.clickTheEditRecipe(title2);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title2);
        let recipeNameValue = await recipesModel.nameField.inputValue();
        expect(title2).toEqual(recipeNameValue);
        
        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title2);
    });

    test(`Verify if the media image from a recipe can be edited once it has been created at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click({delay:1000});
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.verifyThatTheImageIsVisibleInPreviewRecipe();
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/Costco-Logo.png"]);
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatTheImageIsVisibleInPreviewRecipe();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        let imageText = await recipesModel.getTheTextFromImageField();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        
        await recipesModel.verifyCreatedAlertMessage("Recipe updated successfully.");

        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        expect(await recipesModel.nameField.inputValue()).toEqual(title);
        expect(await recipesModel.mediaTypeMenu.locator('span:nth-child(2)').innerText()).toEqual("Image");
        let imageText2 = await recipesModel.getTheTextFromImageField();
        await recipesModel.verifyIfTheImageIsEqual(imageText, imageText2);
        
        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify that a recipe can be mapped to a store at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickStoreGroupsButtonFromaRecipe(title);
        await recipesModel.storeToogleButton.nth(0).click();
        await recipesModel.verifyTheToogleButtonIsActive();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });


    test(`Verify if a new ingredient can be created with Fixed Price deal type, Full Media size and Standard card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Fixed Price');
        await recipesModel.priceField.click();
        await commonModel.inputTextInLocator(recipesModel.priceField, "20");
        await recipesModel.unitsField.click();
        await commonModel.inputTextInLocator(recipesModel.unitsField, "3");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.clickMediasizeDropdownOption('Full');
        await recipesModel.clickCardStyleDropdownOption('Standard');
        await recipesModel.saveIngredientButton.click({delay:500});
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click({delay:500});
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('fixed');
        let priceFieldText = await recipesModel.priceField.inputValue();
        expect(priceFieldText).toEqual('20');
        let unitsFieldText = await recipesModel.unitsField.inputValue();
        expect(unitsFieldText).toEqual('3');
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1,imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Full");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("Standard");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with Vendor Coupon deal type, Full Media size and Standard card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click( {delay:1000} );
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Vendor Coupon');
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Full');
        await recipesModel.clickCardStyleDropdownOption('Standard');
        await recipesModel.upcFieldIngredient.click();
        await commonModel.inputTextInLocator(recipesModel.upcFieldIngredient, contentData.upc);
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('coupon-v2');
        let upcText = await recipesModel.upcFieldIngredient.inputValue();
        expect(upcText).toEqual(contentData.upc);
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1,imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Full");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("Standard");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with Amount Off Monetary deal type, Full Media size and Standard card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Amount Off');
        await recipesModel.monetaryRadioButton.click();
        await recipesModel.amountOffInputField.click();
        await commonModel.inputTextInLocator(recipesModel.amountOffInputField, "50");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Full');
        await recipesModel.clickCardStyleDropdownOption('Standard');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('x_off');
        let amountOffText = await recipesModel.amountOffInputField.inputValue();
        expect(amountOffText).toEqual("50");
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Full");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("Standard");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });


    test(`Verify if a new ingredient can be created with # for Price deal type, Full Media size and Standard card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('# for Price');
        await recipesModel.forQuantityField.click();
        await commonModel.inputTextInLocator(recipesModel.forQuantityField, "5");
        await recipesModel.priceField.click();
        await commonModel.inputTextInLocator(recipesModel.priceField, "10");
        await recipesModel.unitsField.click();
        await commonModel.inputTextInLocator(recipesModel.unitsField, "2");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Full');
        await recipesModel.clickCardStyleDropdownOption('Standard');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('numfor');
        let forQuantityFieldText = await recipesModel.forQuantityField.inputValue();
        expect(forQuantityFieldText).toEqual("5");
        let priceFieldText = await recipesModel.priceField.inputValue();
        expect(priceFieldText).toEqual("10");
        let unitsFieldText = await recipesModel.unitsField.inputValue();
        expect(unitsFieldText).toEqual("2");
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Full");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("Standard");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with Buy X Get Y For Z deal type, Full Media size and Standard card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Buy X Get Y For Z');
        await recipesModel.buyQuantityField.click();
        await commonModel.inputTextInLocator(recipesModel.buyQuantityField, "2");
        await recipesModel.getQuantityField.click();
        await commonModel.inputTextInLocator(recipesModel.getQuantityField, "3");
        await commonModel.inputTextInLocator(recipesModel.getQuantityField, "3");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Full');
        await recipesModel.clickCardStyleDropdownOption('Standard');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.nameField.isVisible();
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('bogo');
        let forQuantityFieldText = await recipesModel.buyQuantityField.inputValue();
        expect(forQuantityFieldText).toEqual("2");
        let priceFieldText = await recipesModel.getQuantityField.inputValue();
        expect(priceFieldText).toEqual("3");
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Full");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("Standard");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with Amount Off Percent deal type, Full Media size and Standard card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Amount Off');
        await recipesModel.porcentRadioButton.click();
        await recipesModel.amountOffInputField.click();
        await commonModel.inputTextInLocator(recipesModel.amountOffInputField, "50");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Full');
        await recipesModel.clickCardStyleDropdownOption('Standard');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('x_off');
        let amountOffText = await recipesModel.amountOffInputField.inputValue();
        expect(amountOffText).toEqual("50");
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Full");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("Standard");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`The user performs a search on the search field with valid recipe name at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickSearchBar();
        await recipesModel.searchBar.pressSequentially(title);

        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.deleteRecipe(title);
    });

    test(`The user performs a search on the search field with an invalid recipe name at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickSearchBar();
        await recipesModel.searchBar.pressSequentially("asasdasdasdasdasd");

        await recipesModel.verifyTheNewIngredientIsDeleted(title);

        await recipesModel.searchBar.clear();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if an instruction can be canceled while creating a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        await recipesModel.createRecipebutton.click();
        await recipesModel.addNewInstructionButton.click();
        await recipesModel.textAreaInstruction.click();
        
        await recipesModel.cancelInstructionButton.click();
        await recipesModel.verifyThatInstructionFieldIsNotVisible();
    });

    test(`Verify if the creation of a new ingredient can be canceled while creating a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        await recipesModel.createRecipebutton.click();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.cancelIngredientButton.click();
        await recipesModel.verifyIngredientNotCreated("ingredient name");
    });

    test(`Verify if an ingredient can not be created with the title field empty in a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        await recipesModel.createRecipebutton.click( {delay:1000} );
        await recipesModel.ingredientsHeader.click( {delay:1000} );
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.saveIngredientButton.click( {delay:1000} );
        await recipesModel.verifyTheTitleIsRequiredMessageIsDisplayed();
    });

    test(`Verify if an ingredient can be created with the description field empty while creating a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        await recipesModel.verifyRecipeButtonIsVisible();
        await recipesModel.createRecipebutton.click();
        await recipesModel.ingredientsHeader.click( {delay:2000} );
        await recipesModel.addNewIngredientButton.click(  {delay:2000} );
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
    });

    test(`Verify if an ingredient can be created with an invalid value in the quantity field while creating a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        await recipesModel.verifyRecipeButtonIsVisible();
        await recipesModel.createRecipebutton.click();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.forQuantityField, "0");
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyQuantityErrorMessageIsDisplayed();
    });

    test(`Verify if a created ingredient could be deleted while creating a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        await recipesModel.verifyRecipeButtonIsVisible();
        await recipesModel.createRecipebutton.click( {delay:2000} );
        await recipesModel.ingredientsHeader.click( {delay:2000} );
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.clickIngredientDeleteButton("ingredient name");
        await recipesModel.confirmDeleteActionButton.click();
        await recipesModel.verifyTheNewIngredientIsDeleted("ingredient name");
    });

    test(`Verify if you can cancel remove action of a created ingredient while creating a new recipe at brand level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        await recipesModel.verifyRecipeButtonIsVisible();
        await recipesModel.createRecipebutton.click( {delay:1000} );
        await recipesModel.ingredientsHeader.click( {delay:1000} );
        await recipesModel.addNewIngredientButton.click( {delay:1000} );
        await recipesModel.ingredientTitleField.click( {delay:1000} );
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.saveIngredientButton.click();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.clickIngredientDeleteButton("ingredient name");
        await recipesModel.cancelDeleteActionbutton.click( {delay:1000} );
        await recipesModel.verifyIngredientCreated("ingredient name");
    });

    test(`Verify if a new ingredient can be created with no price deal type, Standard Media size and created card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('No Price');
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Standard');
        await recipesModel.clickCardStyleDropdownOption('New Card Style');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('coupon');
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Standard");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("New Card Style");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with Fixed Price deal type, Standard Media size and created card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Fixed Price');
        await recipesModel.priceField.click();
        await commonModel.inputTextInLocator(recipesModel.priceField, "20");
        await recipesModel.unitsField.click();
        await commonModel.inputTextInLocator(recipesModel.unitsField, "3");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Standard');
        await recipesModel.clickCardStyleDropdownOption('New Card Style');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('fixed');
        let priceFieldText = await recipesModel.priceField.inputValue();
        expect(priceFieldText).toEqual("20");
        let unitsFieldText = await recipesModel.unitsField.inputValue();
        expect(unitsFieldText).toEqual("3");
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Standard");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("New Card Style");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with Buy X Get Y For Z deal type, Standard Media size and created card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Buy X Get Y For Z');
        await recipesModel.buyQuantityField.click();
        await commonModel.inputTextInLocator(recipesModel.buyQuantityField, "2");
        await recipesModel.getQuantityField.click();
        await commonModel.inputTextInLocator(recipesModel.getQuantityField, "3");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Standard');
        await recipesModel.clickCardStyleDropdownOption('New Card Style');
        await recipesModel.saveIngredientButton.click();
        await recipesModel.verifyIngredientIsAdded();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('bogo');
        let buyQuantityFieldText = await recipesModel.buyQuantityField.inputValue();
        expect(buyQuantityFieldText).toEqual("2");
        let getQuantityFieldText = await recipesModel.getQuantityField.inputValue();
        expect(getQuantityFieldText).toEqual("3");
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Standard");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("New Card Style");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with # for Price deal type, Standard Media size and created card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click(  {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('# for Price');
        await recipesModel.forQuantityField.click();
        await commonModel.inputTextInLocator(recipesModel.forQuantityField, "3");
        await recipesModel.forPriceField.click();
        await commonModel.inputTextInLocator(recipesModel.forPriceField, "5");
        await commonModel.inputTextInLocator(recipesModel.forPriceField, "5");
        await recipesModel.forUnitsField.click();
        await commonModel.inputTextInLocator(recipesModel.forUnitsField, "5");
        await commonModel.inputTextInLocator(recipesModel.forUnitsField, "5");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Standard');
        await recipesModel.clickCardStyleDropdownOption('New Card Style');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('numfor');
        let forQuantityFieldText = await recipesModel.forQuantityField.inputValue();
        expect(forQuantityFieldText).toEqual("3");
        let forPriceFieldText = await recipesModel.forPriceField.inputValue();
        expect(forPriceFieldText).toEqual("5");
        let forUnitsFieldText = await recipesModel.forUnitsField.inputValue();
        expect(forUnitsFieldText).toEqual("5");
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Standard");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("New Card Style");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with Amount Off Monetary deal type, Standard Media size and created card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click(  {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Amount Off');
        await recipesModel.monetaryRadioButton.click();
        await recipesModel.priceField.click();
        await commonModel.inputTextInLocator(recipesModel.priceField, "50");
        await commonModel.inputTextInLocator(recipesModel.priceField, "50");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Standard');
        await recipesModel.clickCardStyleDropdownOption('New Card Style');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('x_off');
        let amountOffInputFieldText = await recipesModel.amountOffInputField.inputValue();
        expect(amountOffInputFieldText).toEqual("50");
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Standard");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("New Card Style");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with Amount Off Percent deal type, Standard Media size and created card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Amount Off');
        await recipesModel.porcentRadioButton.click();
        await recipesModel.priceField.click();
        await commonModel.inputTextInLocator(recipesModel.priceField, "50");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Standard');
        await recipesModel.clickCardStyleDropdownOption('New Card Style');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('x_off');
        let amountOffInputFieldText = await recipesModel.amountOffInputField.inputValue();
        expect(amountOffInputFieldText).toEqual("50");
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Standard");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("New Card Style");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with Coupon deal type, Standard Media size and created card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Vendor Coupon');
        await recipesModel.upcFieldIngredient.click();
        await commonModel.inputTextInLocator(recipesModel.upcFieldIngredient, contentData.upc);
        await commonModel.inputTextInLocator(recipesModel.upcFieldIngredient, contentData.upc);
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Standard');
        await recipesModel.clickCardStyleDropdownOption('New Card Style');
        await recipesModel.saveIngredientButton.click();
        await recipesModel.verifyIngredientIsAdded();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('coupon-v2');
        let upcFieldText = await recipesModel.upcFieldIngredient.inputValue();
        expect(upcFieldText).toEqual(contentData.upc);
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Standard");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("New Card Style");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with No Price deal type, Full Media size and created card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('No Price');
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Full');
        await recipesModel.clickCardStyleDropdownOption('New Card Style');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('coupon');
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Full");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("New Card Style");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with Fixed Price deal type, Full Media size and created card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Fixed Price');
        await recipesModel.priceField.click()
        await commonModel.inputTextInLocator(recipesModel.priceField, "5");
        await commonModel.inputTextInLocator(recipesModel.priceField, "5");
        await recipesModel.unitsField.click();
        await commonModel.inputTextInLocator(recipesModel.unitsField, "2");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Full');
        await recipesModel.clickCardStyleDropdownOption('New Card Style');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('fixed');
        let priceFieldText = await recipesModel.priceField.inputValue();
        expect(priceFieldText).toEqual("5");
        let unitsFieldText = await recipesModel.unitsField.inputValue();
        expect(unitsFieldText).toEqual("2");
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Full");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("New Card Style");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with Buy X Get Y For Z deal type, Full Media size and created card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Buy X Get Y For Z');
        await recipesModel.buyQuantityField.click();
        await commonModel.inputTextInLocator(recipesModel.buyQuantityField, "5");
        await recipesModel.getQuantityField.click();
        await commonModel.inputTextInLocator(recipesModel.getQuantityField, "2");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Full');
        await recipesModel.clickCardStyleDropdownOption('New Card Style');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('bogo');
        let buyQuantityFieldText = await recipesModel.buyQuantityField.inputValue();
        expect(buyQuantityFieldText).toEqual("5");
        let getQuantityFieldText = await recipesModel.getQuantityField.inputValue();
        expect(getQuantityFieldText).toEqual("2");
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Full");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("New Card Style");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with # for Price deal type, Full Media size and created card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('# for Price');
        await recipesModel.forQuantityField.click();
        await commonModel.inputTextInLocator(recipesModel.forQuantityField, "3");
        await recipesModel.forPriceField.click();
        await commonModel.inputTextInLocator(recipesModel.forPriceField, "5");
        await recipesModel.forUnitsField.click();
        await commonModel.inputTextInLocator(recipesModel.forUnitsField, "5");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Full');
        await recipesModel.clickCardStyleDropdownOption('New Card Style');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('numfor');
        let quantityText = await recipesModel.forQuantityField.inputValue();
        expect(quantityText).toEqual('3');
        let priceText = await recipesModel.forPriceField.inputValue();
        expect(priceText).toEqual('5');
        let unitsText = await recipesModel.forUnitsField.inputValue();
        expect(unitsText).toEqual('5');
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Full");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("New Card Style");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with Amount Off Monetary deal type, Full Media size and created card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Amount Off');
        await recipesModel.monetaryRadioButton.click();
        await recipesModel.amountOffInputField.click();
        await commonModel.inputTextInLocator(recipesModel.amountOffInputField, "50");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Full');
        await recipesModel.clickCardStyleDropdownOption('New Card Style');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('x_off');
        let amountOffInputFieldText = await recipesModel.amountOffInputField.inputValue();
        expect(amountOffInputFieldText).toEqual('50');
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Full");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("New Card Style");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a new ingredient can be created with Amount Off Porcent deal type, Full Media size and created card style while creating a new recipe at brand level with a single language default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.mapToCard.click();
        await recipesModel.clickDealTypeDropdownOption('Amount Off');
        await recipesModel.porcentRadioButton.click();
        await recipesModel.amountOffInputField.click();
        await commonModel.inputTextInLocator(recipesModel.amountOffInputField, "50");
        await recipesModel.imageLocationField.click();
        await recipesModel.imageLocationField.clear();
        await recipesModel.uploadImageButton.click();
        await recipesModel.chooseImageButton.click();
        await recipesModel.uploadRecipeImage(["src/images/A93.png"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton2.click();
        let imageText1 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.linkField.click();
        await commonModel.inputTextInLocator(recipesModel.linkField, "click");
        await recipesModel.mediaSizeDropdownMenu.click();
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        await recipesModel.clickMediasizeDropdownOption('Full');
        await recipesModel.clickCardStyleDropdownOption('New Card Style');
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        let ingredientTitle = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitle).toEqual('ingredient name');
        let ingredientDescription = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescription).toEqual('ingredient description');
        let ingredientQuantityText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientQuantityText).toEqual('1');
        let CouponTypeText = await recipesModel.dealTypeDropdown.inputValue();
        expect(CouponTypeText).toEqual('x_off');
        let amountOffInputFieldText = await recipesModel.amountOffInputField.inputValue();
        expect(amountOffInputFieldText).toEqual('50');
        let imageText2 = await recipesModel.imageLocationField.inputValue();
        await recipesModel.validateImageField(imageText1, imageText2);
        let clickLinkText = await recipesModel.linkField.inputValue();
        expect(clickLinkText).toEqual("click");
        await recipesModel.mediaSizeDropdownMenu.scrollIntoViewIfNeeded();
        let mediaSizeText = (await recipesModel.mediaSizeDropdownMenu.innerText()).trim();
        expect(mediaSizeText).toEqual("Full");
        await page.waitForTimeout(1000);
        let cardStyleText = await recipesModel.cardStyleDropdownMenu.innerText();
        expect(cardStyleText).toContain("New Card Style");
        await recipesModel.saveIngredientButton.click();

        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`The user performs a search with a valid ingredient name in the list of ingredients while creating a new recipe at brand level default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        await recipesModel.createRecipebutton.click();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "tacos");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "These are tacos");
        await recipesModel.verifyThatSaveIngredientButtonIsVisible();
        await recipesModel.saveIngredientButton.click({delay:500});
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.ingredientSearchBar.click();
        await recipesModel.ingredientSearchBar.pressSequentially("tacos");
        await recipesModel.verifyIngredientCreated("tacos");
    });

    test(`The user performs a search with an invalid ingredient name in the list of ingredients while creating a new recipe at brand level default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        await recipesModel.createRecipebutton.click();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "tacos");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "These are tacos");
        await recipesModel.verifyThatSaveIngredientButtonIsVisible();
        await recipesModel.saveIngredientButton.click( {delay:500});
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.ingredientSearchBar.click();
        await recipesModel.ingredientSearchBar.pressSequentially("aaaaaaaaaaa");
        await recipesModel.verifyIngredientNotCreated("tacos");
    });

    test(`Verify if the values of a created ingredient can be update with new values at brand level default language english '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.ingredientsHeader.click();
        await recipesModel.addNewIngredientButton.click();
        await recipesModel.ingredientTitleField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.verifyIngredientCreated("ingredient name");
        await recipesModel.clickEditButtonFromAnIngredient("ingredient name");
        await recipesModel.ingredientTitleField.click();
        await recipesModel.ingredientTitleField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "new ingredient name");
        await recipesModel.ingredientDescriptionField.click();
        await recipesModel.ingredientDescriptionField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "new ingredient description");
        await recipesModel.ingredientQuantityField.click();
        await recipesModel.ingredientQuantityField.clear();
        await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "2");
        await recipesModel.saveIngredientButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyIngredientIsAdded();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Ingredient updated successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickTheEditRecipe(title);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.verifyThatTheFieldNameIsVisible(title);
        await recipesModel.ingredientsHeader.click();

        await recipesModel.clickIngredientEditButton("new ingredient name");
        let ingredientTitleText = await recipesModel.ingredientTitleField.inputValue();
        expect(ingredientTitleText).toEqual("new ingredient name");
        let ingredientDescriptionText = await recipesModel.ingredientDescriptionField.inputValue();
        expect(ingredientDescriptionText).toEqual("new ingredient description");
        let ingredientValueText = await recipesModel.ingredientQuantityField.inputValue();
        expect(ingredientValueText).toEqual("2");

        await recipesModel.cancelIngredientButton.click();
        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

    test(`Verify if a recipe can be preview at brand node level with a single language '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);
        const recipesModel = new Recipesmodel(page);
    
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickRecipesOptionMenu();
    
        const uniqueId = uuidv4();
    
        const title = ("Recipe" + uniqueId).slice(0, 30);
        await recipesModel.createRecipebutton.click();
        await recipesModel.nameField.isVisible();
        await commonModel.inputTextInLocator(recipesModel.nameField, title);
        await recipesModel.mediaTypeMenu.click();
        await recipesModel.selectMediaType("image");
        await recipesModel.selectImageButton.click( {delay:1000} );
        await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveImageButton.click( {delay:1000} );
        await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
        await commonModel.waitUntilSpinnerDisappears();
        await recipesModel.saveRecipeButton.click();
        await commonModel.waitUntilSpinnerDisappears();

        await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");
        await commonModel.waitForSnackbarDissapear();
        await recipesModel.verifyTheNewRecipeIsCreated(title);

        await recipesModel.clickPreviewButtonRecipe(title);

        await recipesModel.verifyRecipePreviewContainerIsVisible();

        let recipeImageVisible = recipesModel.recipePreviewImage.isVisible();
        expect(recipeImageVisible).toBeTruthy();

        let recipeNameVisible = recipesModel.recipePreviewName.isVisible();
        expect(recipeNameVisible).toBeTruthy();

        await recipesModel.closePreviewIcon.click();
        await sideBarModel.onClickRecipesOptionMenu();
        await recipesModel.deleteRecipe(title);
    });

});