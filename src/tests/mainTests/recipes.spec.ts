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

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const url: string = validateEnvironment();


users.forEach(user =>{
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
    await recipesModel.verifyRecipeButtonIsVisible();
    await recipesModel.createRecipebutton.click();
    await commonModel.inputTextInLocator(recipesModel.nameField, title);
    await commonModel.inputTextInLocator(recipesModel.cookTimeField, "one hour");
    await commonModel.inputTextInLocator(recipesModel.prepTimeField, "two hours");
    await recipesModel.servesfield.pressSequentially("1");
    await recipesModel.mediaTypeMenu.click();
    await recipesModel.selectMediaType("image");
    await recipesModel.selectImageButton.click({delay: 2000});
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
    await recipesModel.verifyRecipeButtonIsVisible();
    await recipesModel.createRecipebutton.click();
    await commonModel.inputTextInLocator(recipesModel.nameField, title);
    await commonModel.inputTextInLocator(recipesModel.cookTimeField, "one hour");
    await commonModel.inputTextInLocator(recipesModel.prepTimeField, "two hours");
    await recipesModel.servesfield.pressSequentially("1");
    await recipesModel.mediaTypeMenu.click();
    await recipesModel.selectMediaType("image");
    await recipesModel.selectImageButton.click();
    await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.saveImageButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
    await recipesModel.addNewInstructionButton.click();
    await commonModel.inputTextInLocator(recipesModel.textAreaInstruction, "This is an instruction");
    await recipesModel.checkInstructionButton.click();
    await recipesModel.saveRecipeButton.click();

    await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");

    await recipesModel.verifyTheNewRecipeIsCreated(title);

    await recipesModel.clickTheEditRecipe(title);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.verifyThatTheFieldNameIsVisible(title);
    expect(await recipesModel.mediaTypeMenu.innerText()).toEqual("Image");
    await recipesModel.verifyImageIspresent();
    let instructionsText = await recipesModel.instructionsList.locator('div > span').innerText();
    expect(instructionsText).toContain('This is an instruction');

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
    await recipesModel.verifyRecipeButtonIsVisible();
    await recipesModel.createRecipebutton.click();
    await commonModel.inputTextInLocator(recipesModel.nameField, title);
    await commonModel.inputTextInLocator(recipesModel.cookTimeField, "one hour");
    await commonModel.inputTextInLocator(recipesModel.prepTimeField, "two hours");
    await recipesModel.servesfield.pressSequentially("1");
    await recipesModel.mediaTypeMenu.click();
    await recipesModel.selectMediaType("image");
    await recipesModel.selectImageButton.click();
    await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.saveImageButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await recipesModel.notesHeader.click();
    await expect(recipesModel.addNoteButton).toBeVisible();
    await recipesModel.addNoteButton.click();
    await commonModel.inputTextInLocator(recipesModel.noteTextArea, "this is a note");
    await recipesModel.checkNoteButton.click();
    await recipesModel.noteField.dblclick();
    await recipesModel.noteTextArea.clear();
    await commonModel.inputTextInLocator(recipesModel.noteTextArea, "this is a new note");
    await recipesModel.checkNoteButton.click();

    await recipesModel.saveRecipeButton.click();

    await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");

    await recipesModel.verifyTheNewRecipeIsCreated(title);

    await recipesModel.clickTheEditRecipe(title);
    await recipesModel.verifyThatTheFieldNameIsVisible(title);
    await recipesModel.notesHeader.click();
    await recipesModel.noteField.dblclick();
    let noteText = await recipesModel.noteTextArea.inputValue();
    expect(noteText).toContain('this is a new note');

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
    await recipesModel.verifyRecipeButtonIsVisible();
    await recipesModel.createRecipebutton.click();
    await commonModel.inputTextInLocator(recipesModel.nameField, title);
    await commonModel.inputTextInLocator(recipesModel.cookTimeField, "one hour");
    await commonModel.inputTextInLocator(recipesModel.prepTimeField, "two hours");
    await commonModel.inputTextInLocator(recipesModel.servesfield, "1");
    await recipesModel.mediaTypeMenu.click();
    await recipesModel.selectMediaType("image");
    await recipesModel.selectImageButton.click();
    await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.saveImageButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await recipesModel.notesHeader.click();
    await expect(recipesModel.addNoteButton).toBeVisible();
    await recipesModel.addNoteButton.click();
    await commonModel.inputTextInLocator(recipesModel.noteTextArea, "this is a note");
    await recipesModel.checkNoteButton.click();

    await recipesModel.saveRecipeButton.click();

    await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");

    await recipesModel.verifyTheNewRecipeIsCreated(title);

    await recipesModel.clickTheEditRecipe(title);
    await recipesModel.verifyThatTheFieldNameIsVisible(title);
    await recipesModel.notesHeader.click();
    await recipesModel.deleteNotebutton.click();

    expect(recipesModel.noteField).not.toBeVisible();

    await sideBarModel.onClickRecipesOptionMenu();
    await recipesModel.deleteRecipe(title);
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
    await recipesModel.verifyRecipeButtonIsVisible();
    await recipesModel.createRecipebutton.click();
    await commonModel.inputTextInLocator(recipesModel.nameField, title);
    await commonModel.inputTextInLocator(recipesModel.cookTimeField, "one hour");
    await commonModel.inputTextInLocator(recipesModel.prepTimeField, "two hours");
    await recipesModel.servesfield.pressSequentially("1");
    await recipesModel.mediaTypeMenu.click();
    await recipesModel.selectMediaType("image");
    await recipesModel.selectImageButton.click();
    await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.saveImageButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await recipesModel.ingredientsHeader.click();
    await recipesModel.addNewIngredientButton.click();
    await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, 'ingredient name');
    await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, 'ingredient description');
    await recipesModel.ingredientQuantityField.clear();
    await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, '1');
    await commonModel.waitUntilSpinnerDisappears();
    await expect(async () => {
      await recipesModel.saveIngredientButton.click();
      await expect(recipesModel.ingredientsTable.first()).toBeVisible({timeout:300});
    }).toPass();
    await recipesModel.saveRecipeButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");

    await recipesModel.verifyTheNewRecipeIsCreated(title);

    await recipesModel.clickTheEditRecipe(title);
    await recipesModel.verifyThatTheFieldNameIsVisible(title);
    await recipesModel.ingredientsHeader.click();

    await recipesModel.clickDeleteIngredientButton('ingredient name');

    await sideBarModel.onClickRecipesOptionMenu();
    await recipesModel.deleteRecipe(title);
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
    await recipesModel.verifyRecipeButtonIsVisible();
    await recipesModel.createRecipebutton.click();
    await commonModel.inputTextInLocator(recipesModel.nameField, title);
    await commonModel.inputTextInLocator(recipesModel.cookTimeField, "one hour");
    await commonModel.inputTextInLocator(recipesModel.prepTimeField, "two hours");
    await recipesModel.servesfield.pressSequentially("1");
    await recipesModel.mediaTypeMenu.click();
    await recipesModel.selectMediaType("image");
    await recipesModel.selectImageButton.click();
    await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.saveImageButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
    await recipesModel.saveRecipeButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");

    await recipesModel.verifyTheNewRecipeIsCreated(title);

    await recipesModel.deleteRecipe(title);
    //await recipesModel.verifyDeletedAlertMessage(title);
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
    const title2 = ("RecipeEdited" + uniqueId).slice(0, 30);
    await recipesModel.verifyRecipeButtonIsVisible();
    await recipesModel.createRecipebutton.click();
    await commonModel.inputTextInLocator(recipesModel.nameField, title);
    await commonModel.inputTextInLocator(recipesModel.cookTimeField, "one hour");
    await commonModel.inputTextInLocator(recipesModel.prepTimeField, "two hours");
    await recipesModel.servesfield.pressSequentially("1");
    await recipesModel.mediaTypeMenu.click();
    await recipesModel.selectMediaType("image");
    await recipesModel.selectImageButton.click();
    await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.saveImageButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
    await recipesModel.saveRecipeButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");

    await recipesModel.verifyTheNewRecipeIsCreated(title);

    await recipesModel.clickTheEditRecipe(title);
    await recipesModel.verifyThatTheFieldNameIsVisible(title);
    await recipesModel.nameField.clear();
    await commonModel.inputTextInLocator(recipesModel.nameField, title2);
    await recipesModel.saveRecipeButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.verifyCreatedAlertMessage("Recipe updated successfully.");
    await recipesModel.verifyTheNewRecipeIsCreated(title2);
    await recipesModel.clickTheEditRecipe(title2);
    await recipesModel.verifyThatTheFieldNameIsVisible(title2);
    let recipeName = await recipesModel.nameField.inputValue();
    expect(recipeName).toEqual(title2);

    await sideBarModel.onClickRecipesOptionMenu();
    await recipesModel.deleteRecipe(title2);
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
    await recipesModel.verifyRecipeButtonIsVisible();
    await recipesModel.createRecipebutton.click();
    await commonModel.inputTextInLocator(recipesModel.nameField, title);
    await commonModel.inputTextInLocator(recipesModel.cookTimeField, "one hour");
    await commonModel.inputTextInLocator(recipesModel.prepTimeField, "two hours");
    await recipesModel.servesfield.pressSequentially("1");
    await recipesModel.mediaTypeMenu.click();
    await recipesModel.selectMediaType("image");
    await recipesModel.selectImageButton.click();
    await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.saveImageButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.verifyThatManageMediaImageModalIsNotVisible();
    await recipesModel.saveRecipeButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");

    await recipesModel.verifyTheNewRecipeIsCreated(title);

    await recipesModel.clickStoreGroupsButtonFromaRecipe(title);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.clickFirstToogleMapButton();
    await recipesModel.verifyTheFirstToogleIsActive();

    await sideBarModel.onClickRecipesOptionMenu();

    await recipesModel.deleteRecipe(title);
  });


  test(`Verify if an ingredient can be mapped to a card while creating a new recipe at brand level '${user.role}'`, async ({ page }) => {
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
    await recipesModel.verifyRecipeButtonIsVisible();
    await recipesModel.createRecipebutton.click();
    await commonModel.inputTextInLocator(recipesModel.nameField, title);
    await commonModel.inputTextInLocator(recipesModel.cookTimeField, "one hour");
    await commonModel.inputTextInLocator(recipesModel.prepTimeField, "two hours");
    await commonModel.inputTextInLocator(recipesModel.servesfield, "1");
    await recipesModel.mediaTypeMenu.click();
    await recipesModel.selectMediaType("image");
    await recipesModel.selectImageButton.click();
    await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.saveImageButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.ingredientsHeader.click();
    await recipesModel.addNewIngredientButton.click();
    await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
    await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
    await recipesModel.ingredientQuantityField.clear();
    await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, '1');
    await recipesModel.mapToCardButtonOnIngredient.click();
    await recipesModel.verifyMapToCardIngredientIsActive();
    await expect(recipesModel.dropdownDealTypeIngredient).toBeVisible();
    await expect(recipesModel.priceField).toBeVisible();
    await expect(recipesModel.unitsField).toBeVisible();
    await expect(recipesModel.imageLocationField).toBeVisible();
    await expect(recipesModel.linkField).toBeVisible();
    await expect(recipesModel.mediaSizeDropdownMenu).toBeVisible();
    await expect(recipesModel.upcFieldIngredient).toBeVisible();
    await expect(recipesModel.cancelIngredientButton).toBeVisible();

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
    await recipesModel.verifyRecipeButtonIsVisible();
    await recipesModel.createRecipebutton.click();
    await commonModel.inputTextInLocator(recipesModel.nameField, title);
    await commonModel.inputTextInLocator(recipesModel.cookTimeField, "one hour");
    await commonModel.inputTextInLocator(recipesModel.prepTimeField, "two hours");
    await commonModel.inputTextInLocator(recipesModel.servesfield, "1");
    await recipesModel.mediaTypeMenu.click();
    await recipesModel.selectMediaType("image");
    await recipesModel.selectImageButton.click();
    await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.saveImageButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.ingredientsHeader.click();
    await recipesModel.addNewIngredientButton.click();
    await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
    await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
    await recipesModel.ingredientQuantityField.clear();
    await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
    await recipesModel.mapToCardButtonOnIngredient.click();
    await recipesModel.verifyMapToCardIngredientIsActive();
    await recipesModel.dropdownDealTypeIngredient.selectOption({label: 'Fixed Price'});
    await commonModel.inputTextInLocator(recipesModel.priceField, "5");
    await commonModel.inputTextInLocator(recipesModel.unitsField, "2");
    await recipesModel.imageLocationField.click();
    await recipesModel.imageLocationField.clear();
    await recipesModel.uploadImageButton.click();
    await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.saveImageButton2.click();
    await commonModel.inputTextInLocator(recipesModel.linkField, "this is a link");
    await recipesModel.mediaSizeDropdownMenu.click();
    await recipesModel.selectMediaSize('Standard');
    await recipesModel.cardStyleDropdownMenu.selectOption({label: 'Standard'});
    await recipesModel.saveIngredientButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.ingredientsTable.first().waitFor();
    await recipesModel.saveRecipeButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");

    await recipesModel.verifyTheNewRecipeIsCreated(title);

    await recipesModel.clickTheEditRecipe(title);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.nameField.isVisible();
    await recipesModel.ingredientsHeader.click();
    await recipesModel.clickEditButtonFromaRecipe("ingredient name");

    await recipesModel.ingredientTitleField.first().waitFor();
    expect(recipesModel.ingredientTitleField).toBeVisible();
    let titleValue = await recipesModel.ingredientTitleField.inputValue();
    expect(titleValue).toEqual("ingredient name");
    let descriptionValue = await recipesModel.ingredientDescriptionField.inputValue();
    expect(descriptionValue).toEqual("ingredient description");
    let quantityValue = await recipesModel.ingredientQuantityField.inputValue();
    expect(quantityValue).toEqual("1");
    let cardTypeValue = await recipesModel.dropdownDealTypeIngredient.inputValue();
    expect(cardTypeValue).toEqual('fixed');
    let priceValue = await recipesModel.priceField.inputValue();
    expect(priceValue).toEqual('5');
    let unitsValue = await recipesModel.unitsField.inputValue();
    expect(unitsValue).toEqual('2');
    let imageValue = await recipesModel.imageLocationField.inputValue();
    expect(imageValue).not.toEqual('');
    let linkValue = await recipesModel.linkField .inputValue();
    expect(linkValue).toEqual('this is a link');
    let mediaSizeValue = await recipesModel.mediaSizeDropdownMenu.innerText();
    expect(mediaSizeValue).toEqual('Standard');
    await recipesModel.cardStyleDropdownMenu.scrollIntoViewIfNeeded();
    await recipesModel.cardStyleDropdownMenu.focus();
    await expect(async () =>{
      let cardStyleValue = await recipesModel.cardStyleDropdownMenu.textContent( {timeout: 300});
      expect(cardStyleValue).toContain("Standard");
    }).toPass();
    await recipesModel.cancelIngredientButton.click();
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
    await recipesModel.verifyRecipeButtonIsVisible();
    await recipesModel.createRecipebutton.click();
    await commonModel.inputTextInLocator(recipesModel.nameField, title);
    await commonModel.inputTextInLocator(recipesModel.cookTimeField, "one hour");
    await commonModel.inputTextInLocator(recipesModel.prepTimeField, "two hours");
    await commonModel.inputTextInLocator(recipesModel.servesfield, "1");
    await recipesModel.mediaTypeMenu.click();
    await recipesModel.selectMediaType("image");
    await recipesModel.selectImageButton.click();
    await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.saveImageButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.ingredientsHeader.click();
    await recipesModel.addNewIngredientButton.click();
    await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
    await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
    await recipesModel.ingredientQuantityField.clear();
    await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, '1');
    await recipesModel.mapToCardButtonOnIngredient.click();
    await recipesModel.verifyMapToCardIngredientIsActive();
    await recipesModel.dropdownDealTypeIngredient.selectOption({label: 'Buy X Get Y For Z'});
    await commonModel.inputTextInLocator(recipesModel.buyQuantityField, "5");
    await commonModel.inputTextInLocator(recipesModel.getQuantityField, "2");
    //await commonModel.inputTextInLocator(recipesModel.getDealField, "3");
    await recipesModel.imageLocationField.click();
    await recipesModel.imageLocationField.clear();
    await recipesModel.uploadImageButton.click();
    await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.saveImageButton2.click();
    await commonModel.inputTextInLocator(recipesModel.linkField, "this is a link");
    await recipesModel.mediaSizeDropdownMenu.click();
    await recipesModel.selectMediaSize('Standard');
    await recipesModel.cardStyleDropdownMenu.selectOption({label: 'Standard'});
    await recipesModel.saveIngredientButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.ingredientsTable.first().waitFor();
    await recipesModel.saveRecipeButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");

    await recipesModel.verifyTheNewRecipeIsCreated(title);

    await recipesModel.clickTheEditRecipe(title);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.nameField.isVisible();
    await recipesModel.ingredientsHeader.click();
    await recipesModel.clickEditButtonFromaRecipe("ingredient name");
    await commonModel.waitUntilSpinnerDisappears();

    await recipesModel.ingredientTitleField.first().waitFor();
    expect(recipesModel.ingredientTitleField).toBeVisible();
    let titleValue = await recipesModel.ingredientTitleField.inputValue();
    expect(titleValue).toEqual("ingredient name");
    let descriptionValue = await recipesModel.ingredientDescriptionField.inputValue();
    expect(descriptionValue).toEqual("ingredient description");
    let quantityValue = await recipesModel.ingredientQuantityField.inputValue();
    expect(quantityValue).toEqual("1");
    let cardTypeValue = await recipesModel.dropdownDealTypeIngredient.nth(1).inputValue();
    expect(cardTypeValue).toEqual('free');
    let buyQuantityFieldValue = await recipesModel.buyQuantityField.inputValue();
    expect(buyQuantityFieldValue).toEqual('5');
    let getQuantityValue = await recipesModel.getQuantityField.inputValue();
    expect(getQuantityValue).toEqual('2');
    let getDealFieldText = await recipesModel.getDealField.inputValue();
    expect(getDealFieldText).toEqual('FREE');
    let imageValue = await recipesModel.imageLocationField.inputValue();
    expect(imageValue).not.toEqual('');
    let linkValue = await recipesModel.linkField .inputValue();
    expect(linkValue).toEqual('this is a link');
    let mediaSizeValue = await recipesModel.mediaSizeDropdownMenu.innerText();
    expect(mediaSizeValue).toEqual('Standard');
    await recipesModel.cardStyleDropdownMenu.scrollIntoViewIfNeeded();
    await recipesModel.cardStyleDropdownMenu.focus();
    await expect(async () =>{
      let cardStyleValue = await recipesModel.cardStyleDropdownMenu.textContent( {timeout: 300});
      expect(cardStyleValue).toContain("Standard");
    }).toPass();


    await recipesModel.cancelIngredientButton.click();
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
    await recipesModel.verifyRecipeButtonIsVisible();
    await recipesModel.createRecipebutton.click();
    await commonModel.inputTextInLocator(recipesModel.nameField, title);
    await commonModel.inputTextInLocator(recipesModel.cookTimeField, "one hour");
    await commonModel.inputTextInLocator(recipesModel.prepTimeField, "two hours");
    await commonModel.inputTextInLocator(recipesModel.servesfield, "1");
    await recipesModel.mediaTypeMenu.click();
    await recipesModel.selectMediaType("image");
    await recipesModel.selectImageButton.click();
    await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.saveImageButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.ingredientsHeader.click();
    await recipesModel.addNewIngredientButton.click();
    await commonModel.inputTextInLocator(recipesModel.ingredientTitleField, "ingredient name");
    await commonModel.inputTextInLocator(recipesModel.ingredientDescriptionField, "ingredient description");
    await recipesModel.ingredientQuantityField.clear();
    await commonModel.inputTextInLocator(recipesModel.ingredientQuantityField, "1");
    await recipesModel.mapToCardButtonOnIngredient.click();
    await recipesModel.verifyMapToCardIngredientIsActive();
    await recipesModel.dropdownDealTypeIngredient.selectOption({label: '# for Price'});
    await commonModel.inputTextInLocator(recipesModel.buyForQuantityField, "5");
    await commonModel.inputTextInLocator(recipesModel.priceField, "2");
    await commonModel.inputTextInLocator(recipesModel.unitsField, "6");
    await recipesModel.imageLocationField.click();
    await recipesModel.imageLocationField.clear();
    await recipesModel.uploadImageButton.click();
    await recipesModel.uploadRecipeImage(["src/images/A47.jpg"]);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.saveImageButton2.click();
    await commonModel.inputTextInLocator(recipesModel.linkField, "this is a link");
    await recipesModel.mediaSizeDropdownMenu.click();
    await recipesModel.selectMediaSize('Standard');
    await recipesModel.cardStyleDropdownMenu.selectOption({label: 'Standard'});
    await recipesModel.saveIngredientButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.ingredientsTable.first().waitFor();
    await recipesModel.saveRecipeButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await recipesModel.verifyCreatedAlertMessage("Recipe created successfully.");

    await recipesModel.verifyTheNewRecipeIsCreated(title);

    await recipesModel.clickTheEditRecipe(title);
    await commonModel.waitUntilSpinnerDisappears();
    await recipesModel.nameField.isVisible();
    await recipesModel.ingredientsHeader.click();
    await recipesModel.clickEditButtonFromaRecipe("ingredient name");

    await recipesModel.ingredientTitleField.first().waitFor();
    expect(recipesModel.ingredientTitleField).toBeVisible();
    let titleValue = await recipesModel.ingredientTitleField.inputValue();
    expect(titleValue).toEqual("ingredient name");
    let descriptionValue = await recipesModel.ingredientDescriptionField.inputValue();
    expect(descriptionValue).toEqual("ingredient description");
    let quantityValue = await recipesModel.ingredientQuantityField.inputValue();
    expect(quantityValue).toEqual("1");
    let cardTypeValue = await recipesModel.dropdownDealTypeIngredient.inputValue();
    expect(cardTypeValue).toEqual('numfor');
    let buyQuantityFieldValue = await recipesModel.buyForQuantityField.inputValue();
    expect(buyQuantityFieldValue).toEqual('5');
    let priceValue = await recipesModel.priceField.inputValue();
    expect(priceValue).toEqual('2');
    let unitsFieldValue = await recipesModel.unitsField.inputValue();
    expect(unitsFieldValue).toEqual('6');
    let imageValue = await recipesModel.imageLocationField.inputValue();
    expect(imageValue).not.toEqual('');
    let linkValue = await recipesModel.linkField .inputValue();
    expect(linkValue).toEqual('this is a link');
    let mediaSizeValue = await recipesModel.mediaSizeDropdownMenu.innerText();
    expect(mediaSizeValue).toEqual('Standard');
    await recipesModel.cardStyleDropdownMenu.scrollIntoViewIfNeeded();
    await recipesModel.cardStyleDropdownMenu.focus();
    await expect(async () =>{
      let cardStyleValue = await recipesModel.cardStyleDropdownMenu.textContent( {timeout: 300});
      expect(cardStyleValue).toContain("Standard");
    }).toPass();

    await recipesModel.cancelIngredientButton.click();
    await sideBarModel.onClickRecipesOptionMenu();
    await recipesModel.deleteRecipe(title);
  });


});
