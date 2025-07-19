import { test, expect } from '@playwright/test';
import { CampaignModel } from '../../pom/campaignFormModel';
import { CommonModel } from '../../pom/commonModel';

test(`Verify that when all the required fields are correctly populated you can advance to the next step`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await commonModel.inputTextInLocator(campaignModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignModel.vendorNumberField, "22222222");
    await commonModel.inputTextInLocator(campaignModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignModel.emailField, "jhon@gmail.com");
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "1112223456");
    await campaignModel.productPlacementButton.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("WHEN");
    await campaignModel.verifyTheSecondStepCircleIsSelected();
});


test(`Verify that when the vendor name field is empty The 'Name is required.' message is displayed`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await commonModel.inputTextInLocator(campaignModel.vendorNumberField, "22222222");
    await commonModel.inputTextInLocator(campaignModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignModel.emailField, "jhon@gmail.com");
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "1112223456");
    await campaignModel.productPlacementButton.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyAlertMessageIsDisplayed("Name is required.");
});


test(`Verify that when the vendor number field is empty The 'Number is required.' message is displayed.`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await commonModel.inputTextInLocator(campaignModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignModel.emailField, "jhon@gmail.com");
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "1112223456");
    await campaignModel.productPlacementButton.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyAlertMessageIsDisplayed("Number is required.");
});


test(`Verify that when the Contact Name field is empty The 'Contactname is required.' message is displayed.`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await commonModel.inputTextInLocator(campaignModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignModel.vendorNumberField, "22222222");
    await commonModel.inputTextInLocator(campaignModel.emailField, "jhon@gmail.com");
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "1112223456");
    await campaignModel.productPlacementButton.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyAlertMessageIsDisplayed("Contactname is required.");
});


test(`Verify that when the Contact Email field is empty The 'Email is required.' message is displayed.`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await commonModel.inputTextInLocator(campaignModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignModel.vendorNumberField, "22222222");
    await commonModel.inputTextInLocator(campaignModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "1112223456");
    await campaignModel.productPlacementButton.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyAlertMessageIsDisplayed("Email is required.");
});


test(`Verify that when the Contact Email field has an invalid email format the 'Email is invalid,Email is not the correct format.' message is displayed.`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await commonModel.inputTextInLocator(campaignModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignModel.vendorNumberField, "22222222");
    await commonModel.inputTextInLocator(campaignModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignModel.emailField, "jhonmail");
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "1112223456");
    await campaignModel.productPlacementButton.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyTheEmailErrorMessage("Email is invalid,Email is not the correct format.");
});


test(`Verify that when the contact phone number field has an invalid phone number the 'Phonenumber is required.' message is displayed.`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await commonModel.inputTextInLocator(campaignModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignModel.vendorNumberField, "22222222");
    await commonModel.inputTextInLocator(campaignModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignModel.emailField, "jhon@gmail.com");
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "1122");
    await campaignModel.productPlacementButton.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyAlertMessageIsDisplayed("Phonenumber is required.");
});


test(`Verify that when no level is selected the 'Level is required.' message is displayed.`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await commonModel.inputTextInLocator(campaignModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignModel.vendorNumberField, "22222222");
    await commonModel.inputTextInLocator(campaignModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignModel.emailField, "jhon@gmail.com");
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "1112223456");
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyAlertMessageIsDisplayed("Level is required.");
});


test(`Verify that when all the fields are empty the error messages are displayed`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyAllAlertMessagesAreDisplayed();
});


test(`Verify that when all the fields are correctly populated on the WHEN step the user can advance to the next step`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await commonModel.inputTextInLocator(campaignModel.campaignNameField, "campaign name");
    await commonModel.inputTextInLocator(campaignModel.campaignDescriptionField, "campaign description");
    await campaignModel.chooseDate.click();
    await campaignModel.dateOption.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("WHO");
    await campaignModel.verifyTheThirdStepCircleIsSelected();
});


test(`Verify that when the campaign name field is empty the 'Name is required.' message is displayed`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await commonModel.inputTextInLocator(campaignModel.campaignDescriptionField, "campaign description");
    await campaignModel.chooseDate.click();
    await campaignModel.dateOption.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyAlertMessageIsDisplayed("Name is required.");
});


test(`Verify that when the campaign descritption field is empty the user should be able to advance to the next step and no error message displayed`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await commonModel.inputTextInLocator(campaignModel.campaignNameField, "campaign name");
    await campaignModel.chooseDate.click();
    await campaignModel.dateOption.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("WHO");
    await campaignModel.verifyTheThirdStepCircleIsSelected();
});


test(`Verify that when the campaign name field and the campaign description field are empty the 'Name is required.' message is displayed`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.chooseDate.click();
    await campaignModel.dateOption.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyAlertMessageIsDisplayed("Name is required.");
});


test(`Verify that when the all the fields are filled properly in 'I would like your help choosing' option you can advance to the next step`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.iWouldLikeYourHelpChoosingButton.click();
    await commonModel.inputTextInLocator(campaignModel.notesTextArea, "notes");
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("WHAT");
    await campaignModel.verifyTheFourthStepCircleIsSelected();
});


test(`Verify that when the all the fields are filled properly in 'Id like to choose my audience' option you can advance to the next step`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.idLikeToChooseMyAudience.click();
    await campaignModel.allGroceryCustomersInputCustomerBase.click();
    await campaignModel.verifyOnlyAllGroceyCustomerOptionIsSelected();
    await campaignModel.verifyOnlyAllOptionIsSelectedGenerationSection();
    await campaignModel.verifyOnlyAllOptionIsSelectedGenderSection();
    await campaignModel.verifyOnlyAllOptionIsSelectedIncomesSection();
    await campaignModel.verifyOnlyAllOptionIsSelectedBehaviorsSection();
    await commonModel.inputTextInLocator(campaignModel.additionalNotesTextArea, "This is a note");
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("WHAT");
    await campaignModel.verifyTheFourthStepCircleIsSelected();
});


test(`Verify that when only the notes text field is empty in 'Id like to choose my audience' option you can advance to the next step`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.idLikeToChooseMyAudience.click();
    await campaignModel.allGroceryCustomersInputCustomerBase.click();
    await campaignModel.verifyOnlyAllGroceyCustomerOptionIsSelected();
    await campaignModel.verifyOnlyAllOptionIsSelectedGenerationSection();
    await campaignModel.verifyOnlyAllOptionIsSelectedGenderSection();
    await campaignModel.verifyOnlyAllOptionIsSelectedIncomesSection();
    await campaignModel.verifyOnlyAllOptionIsSelectedBehaviorsSection();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("WHAT");
    await campaignModel.verifyTheFourthStepCircleIsSelected();
});


test(`Verify that when the user click the next button without choose one of the two main options the user remains in the WHO step`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("WHO");
});


test(`Verify that when the textarea note field is populated the text should remain in the field in the 'I would like your help choosing' option after advance to the next step`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.iWouldLikeYourHelpChoosingButton.click();
    await commonModel.inputTextInLocator(campaignModel.notesTextArea, "notes");
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("WHAT");
    await campaignModel.verifyTheFourthStepCircleIsSelected();
    await campaignModel.bottomBackButton.click();
    await campaignModel.iWouldLikeYourHelpChoosingButton.click();
    await campaignModel.verifyTheTextInNotesfield();
});


test(`Verify that when you are in the 'I would like to choose my audience' option if you leave the generation option unselected the 'Generation is required.' error message is displayed`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.idLikeToChooseMyAudience.click();
    await campaignModel.allGroceryCustomersInputCustomerBase.click();
    await campaignModel.allOptionGeneration.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyThatTheErrorMessageIsDsiplayedOnThirdStep('Generation is required.');
});


test(`Verify that when you are in the 'I would like to choose my audience' option if you leave the gender option unselected the 'Gender is required.' error message is displayed`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.idLikeToChooseMyAudience.click();
    await campaignModel.allGroceryCustomersInputCustomerBase.click();
    await campaignModel.allOptionGender.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyThatTheErrorMessageIsDsiplayedOnThirdStep('Gender is required.');
});



test(`Verify that when you are in the 'I would like to choose my audience' option if you leave the incomes option no selected the 'Incomes is required.' error message is displayed`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.idLikeToChooseMyAudience.click();
    await campaignModel.allGroceryCustomersInputCustomerBase.click();
    await campaignModel.allOptionIncomes.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyThatTheErrorMessageIsDsiplayedOnThirdStep('Incomes is required.');
});


test(`Verify that when you are in the 'I would like to choose my audience' option if you leave the behaviors option unselected the 'Behaviors is required.' error message is displayed`, async ({ page }) => {

    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.idLikeToChooseMyAudience.click();
    await campaignModel.allGroceryCustomersInputCustomerBase.click();
    await campaignModel.allOptionBehaviors.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyThatTheErrorMessageIsDsiplayedOnThirdStep('Behaviors is required.');
});



test(`Verify that when you click another checkbox then the all checkbox in the generation section in 'I would like to choose my audience' option all the previous checkboxes prevously selected should be deselected and only the all checkbox should remain selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.idLikeToChooseMyAudience.click();
    await campaignModel.generationxOptionGeneration.click();
    await campaignModel.verifyThatGenerationxOptionGenerationIsSelected();
    await campaignModel.allOptionGeneration.click();
    await campaignModel.verifyOnlyAllOptionIsSelectedGenerationSection();
});


test(`Verify that when you click another checkbox then the all checkbox in the gender section in 'I would like to choose my audience' option all the previous checkboxes prevously selected should be deselected and only the all checkbox should remain selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.idLikeToChooseMyAudience.click();
    await campaignModel.maleOptionGender.click();
    await campaignModel.verifyThatMaleOptionGenderIsSelected();
    await campaignModel.allOptionGender.click();
    await campaignModel.verifyOnlyAllOptionIsSelectedGenderSection();
});


test(`Verify that when you click another checkbox then the all checkbox in the incomes section in 'I would like to choose my audience' option all the previous checkboxes prevously selected should be deselected and only the all checkbox should remain selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.idLikeToChooseMyAudience.click();
    await campaignModel.luxuryShoppersOptionIncomes.click();
    await campaignModel.verifyThatLuxuryShoppersOptionIsSelected();
    await campaignModel.allOptionIncomes.click();
    await campaignModel.verifyOnlyAllOptionIsSelectedIncomesSection();
});


test(`Verify that when you click another checkbox then the all checkbox in the behaviors section in 'I would like to choose my audience' option all the previous checkboxes prevously selected should be deselected and only the all checkbox should remain selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.idLikeToChooseMyAudience.click();
    await campaignModel.fitnessEnthusiastsOptionBehaviors.click();
    await campaignModel.verifyThatFitnessEnthusiastsOptionBehaviorsIsSelected();
    await campaignModel.allOptionBehaviors.click();
    await campaignModel.verifyOnlyAllOptionIsSelectedBehaviorsSection();
});


test(`Verify that when the all the fields are filled properly in the 'I would like MDI to Manage Artwork' option and the 'Graphic Static or Animated Image' radio button is selected the user should advance to the next FINISH step`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.graphicRadioButton.click();
    await page.setInputFiles('input[type="file"]', 'src/images/carrots.jpeg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("FINISH");
});


test(`Verify that when the user doesnt upload an image in the 'I would like MDI to Manage Artwork' option and the 'Graphic Static or Animated Image' radio button is selected the user should advance to the next FINISH step`, async ({ page }) => {
   
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.graphicRadioButton.click();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("FINISH");
});


test(`Verify that when an image is uploaded the user can remove the image in the 'I would like MDI to Manage Artwork' option and the 'Graphic Static or Animated Image' radio button is selected the user should advance to the next FINISH step`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.graphicRadioButton.click();
    await page.setInputFiles('input[type="file"]', 'src/images/carrots.jpeg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.clickDeletebuttonFromAnImage('carrots.jpeg');
    await campaignModel.yesBottomConfirmDialog.click();
    await campaignModel.verifyThatTheFileIsNotUploaded();
});


test(`Verify that when the user fills all the fields properly in the 'I would like MDI to Manage Artwork' option and the 'Graphic Static or Animated Image External Link' radio button is selected the user should advance to the next FINISH step`, async ({ page }) => {
   
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click({delay:300});
    await campaignModel.graphicExternalRadioButton.click({delay:300});
    await commonModel.inputTextInLocator(campaignModel.externalLinkField, "ExternalLink");
    await page.setInputFiles('input[type="file"]', 'src/images/carrots.jpeg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.bottomNextButton.click({delay:300});
    await campaignModel.verifyStepIsDisplayed("FINISH");
});


test(`Verify that the 'Some promotional cards need your attention' message is displayed when the user leaves the External Link field empty selecting the 'I would like MDI to Manage Artwork' option and the 'Graphic Static or Animated Image External Link' radio button is selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.graphicExternalRadioButton.click();
    await page.setInputFiles('input[type="file"]', 'src/images/carrots.jpeg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyAlertMessageIsDisplayed('Some promotional cards need your attention');
    await campaignModel.verifyStepIsDisplayed("WHAT");
});


test(`Verify that when the user doesn't upload an image in the 'I would like MDI to Manage Artwork' option and the 'Graphic Static or Animated Image External Link' radio button is selected should advance to the FINISH 5 step`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.graphicExternalRadioButton.click();
    await commonModel.inputTextInLocator(campaignModel.externalLinkField, "ExternalLink");
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("FINISH");
});


test(`Verify that the when the user fills all the fields properly in the 'I would like MDI to Manage Artwork' option and the 'Video URL Youtube or Vimeo' radio button is selected should advance to the FINISH 5 step`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.videoRadioButton.click();
    await commonModel.inputTextInLocator(campaignModel.externalLinkField, "ExternalLink");
    await page.setInputFiles('input[type="file"]', 'src/images/carrots.jpeg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("FINISH");
});


test(`Verify that the 'Some promotional cards need your attention' message is displayed when the 'Link to Video' field is empty selecting the 'I would like MDI to Manage Artwork' option and the 'Video URL Youtube or Vimeo' radio button is selected`, async ({ page }) => {
   
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.videoRadioButton.click();
    await page.setInputFiles('input[type="file"]', 'src/images/carrots.jpeg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyAlertMessageIsDisplayed('Some promotional cards need your attention');
    await campaignModel.verifyStepIsDisplayed("WHAT");
});


test(`Verify that when the user doesnt upload an image selecting the 'I would like MDI to Manage Artwork' option and the 'Video URL Youtube or Vimeo' radio button is selected should advance to the FINISH 5 step`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.videoRadioButton.click();
    await commonModel.inputTextInLocator(campaignModel.externalLinkField, "ExternalLink");
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("FINISH");
});



test(`Verify that when the user fills all the fields properly selecting the 'I would like MDI to Manage Artwork' option and the 'Recipe' radio button is selected should advance to the FINISH 5 step`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.recipeRadioButton.click();
    await commonModel.inputTextInLocator(campaignModel.recipeTextArea, "recipe description");
    await commonModel.inputTextInLocator(campaignModel.externalLinkField, "ExternalLink");
    await page.setInputFiles('input[type="file"]', 'src/images/carrots.jpeg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("FINISH");
});


test(`Verify that the 'Some promotional cards need your attention' message is displayed when the user leaves the 'Description' field empty selecting the 'I would like MDI to Manage Artwork' option and the 'Recipe' radio button is selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.recipeRadioButton.click();
    await commonModel.inputTextInLocator(campaignModel.externalLinkField, "ExternalLink");
    await page.setInputFiles('input[type="file"]', 'src/images/carrots.jpeg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyAlertMessageIsDisplayed('Some promotional cards need your attention');
    await campaignModel.verifyStepIsDisplayed("WHAT");
});


test(`Verify that the 'Some promotional cards need your attention' message is displayed when the user leaves the 'Link to the Video' field empty selecting the 'I would like MDI to Manage Artwork option and the 'Recipe' radio button is selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.recipeRadioButton.click();
    await commonModel.inputTextInLocator(campaignModel.recipeTextArea, "recipe description");
    await page.setInputFiles('input[type="file"]', 'src/images/carrots.jpeg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyAlertMessageIsDisplayed('Some promotional cards need your attention');
    await campaignModel.verifyStepIsDisplayed("WHAT");
});


test(`Verify that when the user doesnt upload an image selecting the 'I would like MDI to Manage Artwork' option and the 'Recipe' radio button is selected should advance to the FINISH 5 step`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.recipeRadioButton.click();
    await commonModel.inputTextInLocator(campaignModel.recipeTextArea, "recipe description");
    await commonModel.inputTextInLocator(campaignModel.externalLinkField, "ExternalLink");
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("FINISH");
});


test(`Verify that a JPG file type can be upload successfully when the 'I would like MDI Manage Artwork' option is selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await page.setInputFiles('input[type="file"]', 'src/images/lemons.jpg');
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that a PNG file type can be upload successfully when the 'I would like MDI Manage Artwork' option is selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await page.setInputFiles('input[type="file"]', 'src/images/linux.png');
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that a WEBP file type can be upload successfully when the 'I would like MDI Manage Artwork' option is selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await page.setInputFiles('input[type="file"]', 'src/images/linux2.webp');
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that a GIF file type can be upload successfully when the 'I would like MDI Manage Artwork' option is selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await page.setInputFiles('input[type="file"]', 'src/images/felix.gif');
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that a MOV file type can be upload successfully when the 'I would like MDI Manage Artwork' option is selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await page.setInputFiles('input[type="file"]', 'src/images/earth.mov');
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that a MP4 file type can be upload successfully when the 'I would like MDI Manage Artwork' option is selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await page.setInputFiles('input[type="file"]', 'src/images/earth2.mp4');
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that a AI file type can be upload successfully when the 'I would like MDI Manage Artwork' option is selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await page.setInputFiles('input[type="file"]', 'src/images/background.ai');
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that a PSD file type can be upload successfully when the 'I would like MDI Manage Artwork' option is selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await page.setInputFiles('input[type="file"]', 'src/images/text.psd');
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that a TIF file type can be upload successfully when the 'I would like MDI Manage Artwork' option is selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await page.setInputFiles('input[type="file"]', 'src/images/file.tiff');
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that an IND file type can be upload successfully when the 'I would like MDI Manage Artwork' option is selected`, async ({ page }) => {
   
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await page.setInputFiles('input[type="file"]', 'src/images/template.indd');
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that an EPS file type can be upload successfully when the 'I would like MDI Manage Artwork' option is selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await page.setInputFiles('input[type="file"]', 'src/images/hospital.eps');
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that a PDF file type can be upload successfully when the 'I would like MDI Manage Artwork' option is selected`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await page.setInputFiles('input[type="file"]', 'src/images/tomato.pdf');
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that the 'Cant upload more than 30 MB' error message should be displayed when a file with a size bigger than 30 can not be upload selecting the 'I would like MDI to Manage Artwork' option in the 4 step`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await campaignModel.fillAllFieldsFirstStep();
    await campaignModel.fillAllFieldsSecondStep();
    await campaignModel.fillAllFieldsThirdStep();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await page.setInputFiles('input[type="file"]', 'src/images/satelite.jpg');
    await campaignModel.verifyThatTheFileIsNotUploaded();
    await campaignModel.verifyNotUploadAlertMessageDisplayed();
});


test(`Verify that when the user has filled the campaign form chossing the: I would like your help choosing option, I Would like IDEAL to Manage Artwork option, Graphic Static or Animated Image option the typed and selected values should be displayed in the 5 FINISH step`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await commonModel.inputTextInLocator(campaignModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignModel.vendorNumberField, "123456");
    await commonModel.inputTextInLocator(campaignModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignModel.emailField, "user@gmail.com");
    await campaignModel.contactPhoneNumberField.click({delay:300});
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "1234567890");
    await campaignModel.productPlacementButton.click();
    await campaignModel.bottomNextButton.click();
    await commonModel.inputTextInLocator(campaignModel.campaignNameField, "Campaign name");
    await commonModel.inputTextInLocator(campaignModel.campaignDescriptionField, "This is a new campaign");
    await campaignModel.chooseDate.click();
    await campaignModel.dateOption.click();
    let date = await campaignModel.campaignChooseDate.nth(0).textContent();
    await campaignModel.bottomNextButton.click();
    await campaignModel.iWouldLikeYourHelpChoosingButton.click();
    await commonModel.inputTextInLocator(campaignModel.notesTextArea, "These are some notes");
    await campaignModel.bottomNextButton.click();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.graphicRadioButton.click();
    await page.setInputFiles('input[type="file"]', 'src/images/lemons.jpg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.bottomNextButton.scrollIntoViewIfNeeded();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("FINISH");
    await campaignModel.topNextButton.hover();
    await campaignModel.bottomNextButton.hover();
    await campaignModel.doneButton.hover();
    let vendorNameDHFormText = await campaignModel.vendorNameDHForm.textContent();
    expect(vendorNameDHFormText).toEqual("vendor name");
    let vendorNumberDHFormText = await campaignModel.vendorNumberDHForm.textContent();
    expect(vendorNumberDHFormText).toEqual("123456");
    let contactNameDHFormText = await campaignModel.contactNameDHForm.textContent();
    expect(contactNameDHFormText).toEqual("contact name");
    let contactEmailDHFormText = await campaignModel.contactEmailDHForm.textContent();
    expect(contactEmailDHFormText).toEqual("user@gmail.com");
    let contactPhoneNumberDHFormatText = await campaignModel.contactPhonenumberDHForm.textContent();
    expect(contactPhoneNumberDHFormatText).toEqual("(123) 456-7890");
    let campaignNameDHFormText = await campaignModel.campaignNameDHForm.textContent();
    expect(campaignNameDHFormText).toEqual("Campaign name");
    let campaignDescriptionDHFormText = await campaignModel.campaignDescriptionDHForm.textContent();
    expect(campaignDescriptionDHFormText).toEqual("This is a new campaign");
    let campaignStartChoosenDateDHFormText = await campaignModel.campaignStartDHForm.textContent();
    expect(campaignStartChoosenDateDHFormText).toEqual(date);
    let notesDHFormText = await campaignModel.campaignNotesDHForm.innerText();
    expect(notesDHFormText).toEqual("These are some notes");
    let promotionalCardTypeDHFormText = await campaignModel.campaignPromotionalCardTypeDHForm.textContent();
    expect(promotionalCardTypeDHFormText).toEqual("Graphic");
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that when the user has filled the campaign form chossing the: Id like to choose my audience, I Would like IDEAL to Manage Artwork option, Graphic Static or Animated Image option the typed and selected values should be displayed in the 5 FINISH step`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await commonModel.inputTextInLocator(campaignModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignModel.vendorNumberField, "123456");
    await commonModel.inputTextInLocator(campaignModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignModel.emailField, "user@gmail.com");
    await campaignModel.contactPhoneNumberField.click({delay:300});
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "1234567890");
    await campaignModel.productPlacementButton.click();
    await campaignModel.bottomNextButton.click();
    await commonModel.inputTextInLocator(campaignModel.campaignNameField, "Campaign name");
    await commonModel.inputTextInLocator(campaignModel.campaignDescriptionField, "This is a new campaign");
    await campaignModel.chooseDate.click();
    await campaignModel.dateOption.click();
    let date = await campaignModel.campaignChooseDate.nth(0).textContent();
    await campaignModel.bottomNextButton.click();
    await campaignModel.idLikeToChooseMyAudience.click();
    await campaignModel.allGroceryCustomersInputCustomerBase.click();
    await campaignModel.milleniansOptionGeneration.click();
    await campaignModel.maleOptionGender.click();
    await campaignModel.discountShoppersOptionIncomes.click();
    await campaignModel.soccerMomsOptionsBehaviors.click();
    await commonModel.inputTextInLocator(campaignModel.additionalNotesTextArea, "These are additional notes");
    await campaignModel.bottomNextButton.click();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.graphicRadioButton.click();
    await page.setInputFiles('input[type="file"]', 'src/images/lemons.jpg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.bottomNextButton.scrollIntoViewIfNeeded();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("FINISH");
    await campaignModel.topNextButton.hover();
    await campaignModel.bottomNextButton.hover();
    await campaignModel.doneButton.hover();
    let vendorNameDHFormText = await campaignModel.vendorNameDHForm.textContent();
    expect(vendorNameDHFormText).toEqual("vendor name");
    let vendorNumberDHFormText = await campaignModel.vendorNumberDHForm.textContent();
    expect(vendorNumberDHFormText).toEqual("123456");
    let contactNameDHFormText = await campaignModel.contactNameDHForm.textContent();
    expect(contactNameDHFormText).toEqual("contact name");
    let contactEmailDHFormText = await campaignModel.contactEmailDHForm.textContent();
    expect(contactEmailDHFormText).toEqual("user@gmail.com");
    let contactPhoneNumberDHFormatText = await campaignModel.contactPhonenumberDHForm.textContent();
    expect(contactPhoneNumberDHFormatText).toEqual("(123) 456-7890");
    let campaignNameDHFormText = await campaignModel.campaignNameDHForm.textContent();
    expect(campaignNameDHFormText).toEqual("Campaign name");
    let campaignDescriptionDHFormText = await campaignModel.campaignDescriptionDHForm.textContent();
    expect(campaignDescriptionDHFormText).toEqual("This is a new campaign");
    let campaignStartChoosenDateDHFormText = await campaignModel.campaignStartDHForm.textContent();
    expect(campaignStartChoosenDateDHFormText).toEqual(date);
    let coustomerBaseSectionValue = await campaignModel.campaignCoustomerBaseDHFormValue.textContent();
    expect(coustomerBaseSectionValue).toEqual("All Grocery Customer");
    let generationSectionValue = await campaignModel.campaignGenerationDHFormValue.textContent();
    expect(generationSectionValue).toEqual("Millennials");
    let genderSectionValue = await campaignModel.campaignGenderDHFormValue.textContent();
    expect(genderSectionValue).toEqual("Male");
    let incomesSectionValue = await campaignModel.campaignIncomesDHFormValue.textContent();
    expect(incomesSectionValue!.trim()).toEqual("Discount Shoppers");
    let behaviorsSectionValue = await campaignModel.campaignBehaviorsDHFormValue.textContent();
    expect(behaviorsSectionValue).toEqual("Soccer Moms");
    let notesDHFormText = await campaignModel.campaignNotesDHForm.innerText();
    expect(notesDHFormText).toEqual("These are additional notes");
    let promotionalCardTypeDHFormText = await campaignModel.campaignPromotionalCardTypeDHForm.textContent();
    expect(promotionalCardTypeDHFormText).toEqual("Graphic");
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that when the user has filled the campaign form chossing the: Id like to choose my audience, I Would like IDEAL to Manage Artwork option, iWouldLikeYourHelpChoosingButton Graphic Static or Animated Image option the typed and selected values should be displayed in the 5 FINISH step`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await commonModel.inputTextInLocator(campaignModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignModel.vendorNumberField, "123456");
    await commonModel.inputTextInLocator(campaignModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignModel.emailField, "user@gmail.com");
    await campaignModel.contactPhoneNumberField.click({delay:300});
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "1234567890");
    await campaignModel.productPlacementButton.click();
    await campaignModel.bottomNextButton.click();
    await commonModel.inputTextInLocator(campaignModel.campaignNameField, "Campaign name");
    await commonModel.inputTextInLocator(campaignModel.campaignDescriptionField, "This is a new campaign");
    await campaignModel.chooseDate.click();
    await campaignModel.dateOption.click();
    let date = await campaignModel.campaignChooseDate.nth(0).textContent();
    await campaignModel.bottomNextButton.click();
    await campaignModel.iWouldLikeYourHelpChoosingButton.click();
    await commonModel.inputTextInLocator(campaignModel.notesTextArea, "These are some notes");
    await campaignModel.bottomNextButton.click();
    await campaignModel.idLikeToAddMyOwnArtworkButton.click();
    await campaignModel.standardRadioButton.click();
    await page.setInputFiles('input[type="file"]', 'src/images/lemons.jpg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.bottomNextButton.scrollIntoViewIfNeeded();
    await campaignModel.bottomNextButton.click();
    await campaignModel.graphicRadioButton.click();
    await page.setInputFiles('input[type="file"]', 'src/images/carrots.jpeg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.bottomNextButton.scrollIntoViewIfNeeded();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyStepIsDisplayed("FINISH");
    await campaignModel.topNextButton.hover();
    await campaignModel.bottomNextButton.hover();
    await campaignModel.doneButton.hover();
    let vendorNameDHFormText = await campaignModel.vendorNameDHForm.textContent();
    expect(vendorNameDHFormText).toEqual("vendor name");
    let vendorNumberDHFormText = await campaignModel.vendorNumberDHForm.textContent();
    expect(vendorNumberDHFormText).toEqual("123456");
    let contactNameDHFormText = await campaignModel.contactNameDHForm.textContent();
    expect(contactNameDHFormText).toEqual("contact name");
    let contactEmailDHFormText = await campaignModel.contactEmailDHForm.textContent();
    expect(contactEmailDHFormText).toEqual("user@gmail.com");
    let contactPhoneNumberDHFormatText = await campaignModel.contactPhonenumberDHForm.textContent();
    expect(contactPhoneNumberDHFormatText).toEqual("(123) 456-7890");
    let campaignNameDHFormText = await campaignModel.campaignNameDHForm.textContent();
    expect(campaignNameDHFormText).toEqual("Campaign name");
    let campaignDescriptionDHFormText = await campaignModel.campaignDescriptionDHForm.textContent();
    expect(campaignDescriptionDHFormText).toEqual("This is a new campaign");
    let campaignStartChoosenDateDHFormText = await campaignModel.campaignStartDHForm.textContent();
    expect(campaignStartChoosenDateDHFormText).toEqual(date);
    let notesDHFormText = await campaignModel.campaignNotesDHForm.innerText();
    expect(notesDHFormText).toEqual("These are some notes");
    let promotionalCardTypeDHFormText = await campaignModel.campaignPromotionalCardTypeDHForm.textContent();
    expect(promotionalCardTypeDHFormText).toEqual("Graphic");
    await campaignModel.verifyTheImageIsPresentDealCard("lemons.jpg");
    await campaignModel.verifyTheImageIsPresentPromotionalCard("carrots.jpeg");
});


test(`Verify that you can edit the values for vendor information clicking the Edit button in that section in the 5 FINISH step page`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await commonModel.inputTextInLocator(campaignModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignModel.vendorNumberField, "22222222");
    await commonModel.inputTextInLocator(campaignModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignModel.emailField, "jhon@gmail.com");
    await campaignModel.contactPhoneNumberField.click({delay:300});
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "1112223456");
    await campaignModel.productPlacementButton.click();
    await campaignModel.bottomNextButton.click();
    await commonModel.inputTextInLocator(campaignModel.campaignNameField, "Campaign name");
    await commonModel.inputTextInLocator(campaignModel.campaignDescriptionField, "This is a new campaign");
    await campaignModel.chooseDate.click();
    await campaignModel.dateOption.click();
    let date = await campaignModel.campaignChooseDate.nth(0).textContent();
    await campaignModel.bottomNextButton.click();
    await campaignModel.iWouldLikeYourHelpChoosingButton.click();
    await commonModel.inputTextInLocator(campaignModel.notesTextArea, "These are some notes");
    await campaignModel.bottomNextButton.click();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.graphicRadioButton.click();
    await page.setInputFiles('input[type="file"]', 'src/images/lemons.jpg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.bottomNextButton.scrollIntoViewIfNeeded();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.bottomNextButton.click( {delay: 2000} );
    await campaignModel.vendorInformationEditButton.click( {delay: 2000} );
    await campaignModel.verifyStepIsDisplayed("START");
    await campaignModel.vendorNameField.fill("New vendor name");
    await campaignModel.vendorNumberField.fill("654321");
    await campaignModel.contactNameField.fill("New contact name");
    await campaignModel.emailField.fill("newEmail@gmail.com");
    await campaignModel.contactPhoneNumberField.click();
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "1112223334");
    await campaignModel.bottomNextButton.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.iWouldLikeYourHelpChoosingButton.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.bottomNextButton.click();
    let vendorNameDHFormText = await campaignModel.vendorNameDHForm.textContent();
    expect(vendorNameDHFormText).toEqual("New vendor name");
    let vendorNumberDHFormText = await campaignModel.vendorNumberDHForm.textContent();
    expect(vendorNumberDHFormText).toEqual("654321");
    let contactNameDHFormText = await campaignModel.contactNameDHForm.textContent();
    expect(contactNameDHFormText).toEqual("New contact name");
    let contactEmailDHFormText = await campaignModel.contactEmailDHForm.textContent();
    expect(contactEmailDHFormText).toEqual("newEmail@gmail.com");
    let contactPhoneNumberDHFormatText = await campaignModel.contactPhonenumberDHForm.textContent();
    expect(contactPhoneNumberDHFormatText).toEqual("(111) 222-3334");
    let campaignNameDHFormText = await campaignModel.campaignNameDHForm.textContent();
    expect(campaignNameDHFormText).toEqual("Campaign name");
    let campaignDescriptionDHFormText = await campaignModel.campaignDescriptionDHForm.textContent();
    expect(campaignDescriptionDHFormText).toEqual("This is a new campaign");
    let campaignStartChoosenDateDHFormText = await campaignModel.campaignStartDHForm.textContent();
    expect(campaignStartChoosenDateDHFormText).toEqual(date);
    let notesDHFormText = await campaignModel.campaignNotesDHForm.innerText();
    expect(notesDHFormText).toEqual("These are some notes");
    let promotionalCardTypeDHFormText = await campaignModel.campaignPromotionalCardTypeDHForm.textContent();
    expect(promotionalCardTypeDHFormText).toEqual("Graphic");
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that you can edit the values for Campaign Details clicking the Edit button in that section in the 5 FINISH step page`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await commonModel.inputTextInLocator(campaignModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignModel.vendorNumberField, "123456");
    await commonModel.inputTextInLocator(campaignModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignModel.emailField, "user@gmail.com");
    await campaignModel.contactPhoneNumberField.click({delay:300});
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "(123) 456-7890");
    await campaignModel.productPlacementButton.click();
    await campaignModel.bottomNextButton.click();
    await commonModel.inputTextInLocator(campaignModel.campaignNameField, "Campaign name");
    await commonModel.inputTextInLocator(campaignModel.campaignDescriptionField, "This is a new campaign");
    await campaignModel.chooseDate.click();
    await campaignModel.dateOption.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.iWouldLikeYourHelpChoosingButton.click();
    await commonModel.inputTextInLocator(campaignModel.notesTextArea, "These are some notes");
    await campaignModel.bottomNextButton.click();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.graphicRadioButton.click();
    await page.setInputFiles('input[type="file"]', 'src/images/lemons.jpg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.bottomNextButton.scrollIntoViewIfNeeded();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.campaignDetailsEditButton.click();
    await campaignModel.verifyStepIsDisplayed("WHEN");
    await campaignModel.campaignNameField.fill("New campaign name");
    await campaignModel.campaignDescriptionField.fill("This is a new description");
    await campaignModel.chooseDate.click();
    await campaignModel.newDateOption.click();
    let date = await campaignModel.campaignChooseDate.nth(0).textContent();
    await campaignModel.bottomNextButton.click();
    await campaignModel.iWouldLikeYourHelpChoosingButton.click();
    await campaignModel.bottomNextButton.click();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.bottomNextButton.click();
    let vendorNameDHFormText = await campaignModel.vendorNameDHForm.textContent();
    expect(vendorNameDHFormText).toEqual("vendor name");
    let vendorNumberDHFormText = await campaignModel.vendorNumberDHForm.textContent();
    expect(vendorNumberDHFormText).toEqual("123456");
    let contactNameDHFormText = await campaignModel.contactNameDHForm.textContent();
    expect(contactNameDHFormText).toEqual("contact name");
    let contactEmailDHFormText = await campaignModel.contactEmailDHForm.textContent();
    expect(contactEmailDHFormText).toEqual("user@gmail.com");
    let contactPhoneNumberDHFormatText = await campaignModel.contactPhonenumberDHForm.textContent();
    expect(contactPhoneNumberDHFormatText).toEqual("(123) 456-7890");
    let campaignNameDHFormText = await campaignModel.campaignNameDHForm.textContent();
    expect(campaignNameDHFormText).toEqual("New campaign name");
    let campaignDescriptionDHFormText = await campaignModel.campaignDescriptionDHForm.textContent();
    expect(campaignDescriptionDHFormText).toEqual("This is a new description");
    let campaignStartChoosenDateDHFormText = await campaignModel.campaignStartDHForm.textContent();
    expect(campaignStartChoosenDateDHFormText).toEqual(date);
    let notesDHFormText = await campaignModel.campaignNotesDHForm.innerText();
    expect(notesDHFormText).toEqual("These are some notes");
    let promotionalCardTypeDHFormText = await campaignModel.campaignPromotionalCardTypeDHForm.textContent();
    expect(promotionalCardTypeDHFormText).toEqual("Graphic");
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that you can edit the values for Audience Details clicking the Edit button in that section in the 5 FINISH step page`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await commonModel.inputTextInLocator(campaignModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignModel.vendorNumberField, "123456");
    await commonModel.inputTextInLocator(campaignModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignModel.emailField, "user@gmail.com");
    await campaignModel.contactPhoneNumberField.click({delay:300});
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "1234567890");
    await campaignModel.productPlacementButton.click();
    await campaignModel.bottomNextButton.click();
    await commonModel.inputTextInLocator(campaignModel.campaignNameField, "Campaign name");
    await commonModel.inputTextInLocator(campaignModel.campaignDescriptionField, "This is a new campaign");
    await campaignModel.chooseDate.click();
    await campaignModel.dateOption.click();
    let date = await campaignModel.campaignChooseDate.nth(0).textContent();
    await campaignModel.bottomNextButton.click();
    await campaignModel.iWouldLikeYourHelpChoosingButton.click();
    await commonModel.inputTextInLocator(campaignModel.notesTextArea, "These are some notes");
    await campaignModel.bottomNextButton.click();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.graphicRadioButton.click();
    await page.setInputFiles('input[type="file"]', 'src/images/lemons.jpg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.bottomNextButton.scrollIntoViewIfNeeded();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.audienceDetailsEditButton.click();
    await campaignModel.verifyStepIsDisplayed("WHO");
    await campaignModel.iWouldLikeYourHelpChoosingButton.click();
    await campaignModel.notesTextArea.fill("These are edited notes");
    await campaignModel.bottomNextButton.click();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.bottomNextButton.click();
    let vendorNameDHFormText = await campaignModel.vendorNameDHForm.textContent();
    expect(vendorNameDHFormText).toEqual("vendor name");
    let vendorNumberDHFormText = await campaignModel.vendorNumberDHForm.textContent();
    expect(vendorNumberDHFormText).toEqual("123456");
    let contactNameDHFormText = await campaignModel.contactNameDHForm.textContent();
    expect(contactNameDHFormText).toEqual("contact name");
    let contactEmailDHFormText = await campaignModel.contactEmailDHForm.textContent();
    expect(contactEmailDHFormText).toEqual("user@gmail.com");
    let contactPhoneNumberDHFormatText = await campaignModel.contactPhonenumberDHForm.textContent();
    expect(contactPhoneNumberDHFormatText).toEqual("(123) 456-7890");
    let campaignNameDHFormText = await campaignModel.campaignNameDHForm.textContent();
    expect(campaignNameDHFormText).toEqual("Campaign name");
    let campaignDescriptionDHFormText = await campaignModel.campaignDescriptionDHForm.textContent();
    expect(campaignDescriptionDHFormText).toEqual("This is a new campaign");
    let campaignStartChoosenDateDHFormText = await campaignModel.campaignStartDHForm.textContent();
    expect(campaignStartChoosenDateDHFormText).toEqual(date);
    let notesDHFormText = await campaignModel.campaignNotesDHForm.innerText();
    expect(notesDHFormText).toEqual("These are edited notes");
    let promotionalCardTypeDHFormText = await campaignModel.campaignPromotionalCardTypeDHForm.textContent();
    expect(promotionalCardTypeDHFormText).toEqual("Graphic");
    await campaignModel.verifyThatTheFileIsUploaded();
});


test(`Verify that is posible to edit the values for Promotional Card clicking the Edit button in that section in the 5 FINISH step page`, async ({ page }) => {
    
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await commonModel.inputTextInLocator(campaignModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignModel.vendorNumberField, "123456");
    await commonModel.inputTextInLocator(campaignModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignModel.emailField, "jhon@gmail.com");
    await campaignModel.contactPhoneNumberField.click({delay:300});
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "1112223456");
    await campaignModel.productPlacementButton.click();
    await campaignModel.bottomNextButton.click();
    await commonModel.inputTextInLocator(campaignModel.campaignNameField, "Campaign name");
    await commonModel.inputTextInLocator(campaignModel.campaignDescriptionField, "This is a new campaign");
    await campaignModel.chooseDate.click();
    await campaignModel.dateOption.click();
    let date = await campaignModel.campaignChooseDate.nth(0).textContent();
    await campaignModel.bottomNextButton.click();
    await campaignModel.iWouldLikeYourHelpChoosingButton.click();
    await commonModel.inputTextInLocator(campaignModel.notesTextArea, "These are some notes");
    await campaignModel.bottomNextButton.click();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.graphicRadioButton.click();
    await page.setInputFiles('input[type="file"]', 'src/images/lemons.jpg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.bottomNextButton.scrollIntoViewIfNeeded();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.promotionalCardEditButton.click();
    await campaignModel.verifyStepIsDisplayed("WHAT");
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.clickDeletebuttonFromAnImage('lemons.jpg');
    await campaignModel.yesBottomConfirmDialog.click();
    await page.setInputFiles('input[type="file"]', 'src/images/carrots.jpeg');
    await campaignModel.bottomNextButton.scrollIntoViewIfNeeded();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover()
    await campaignModel.bottomNextButton.click();
    await campaignModel.verifyTheImageIsPresentPromotionalCard("carrots.jpeg");
});


test(`Verify that when the user has filled the campaign form chossing the: I would like your help choosing option, I Would like IDEAL to Manage Artwork option, Graphic Static or Animated Image option and click the Done button a new campaign should be created`, async ({ page }) => {
   
    const campaignModel = new CampaignModel(page);
    const commonModel = new CommonModel(page);
    
    await page.goto(campaignModel.adFormUrlAutomation);
    await commonModel.inputTextInLocator(campaignModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignModel.vendorNumberField, "123456");
    await commonModel.inputTextInLocator(campaignModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignModel.emailField, "user@gmail.com");
    await campaignModel.contactPhoneNumberField.click({delay:300});
    await commonModel.inputTextInLocator(campaignModel.contactPhoneNumberField, "1112223456");
    await campaignModel.productPlacementButton.click();
    await campaignModel.bottomNextButton.click();
    await commonModel.inputTextInLocator(campaignModel.campaignNameField, "Campaign name");
    await commonModel.inputTextInLocator(campaignModel.campaignDescriptionField, "This is a new campaign");
    await campaignModel.chooseDate.click();
    await campaignModel.dateOption.click();
    let date = await campaignModel.campaignChooseDate.nth(0).textContent();
    await campaignModel.bottomNextButton.click();
    await campaignModel.iWouldLikeYourHelpChoosingButton.click();
    await commonModel.inputTextInLocator(campaignModel.notesTextArea, "These are some notes");
    await campaignModel.bottomNextButton.click();
    await campaignModel.IwouldLikeMDIToManageArtwork.click();
    await campaignModel.graphicRadioButton.click();
    await page.setInputFiles('input[type="file"]', 'src/images/lemons.jpg');
    await campaignModel.verifyThatTheFileIsUploaded();
    await commonModel.waitUntilSpinnerDisappears();
    await campaignModel.bottomNextButton.scrollIntoViewIfNeeded();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.topNextButton.hover();
    await campaignModel.graphicRadioButton.hover();
    await campaignModel.graphicExternalRadioButton.hover();
    await campaignModel.videoRadioButton.hover();
    await campaignModel.recipeRadioButton.hover();
    await campaignModel.bottomNextButton.click();
    await campaignModel.doneButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    let headerText = await campaignModel.confirmationMessage.textContent();
    expect(headerText).toEqual('Confirmation');
    let contactName = await campaignModel.confirmationContactNameField.textContent();
    expect(contactName).toEqual("contact name");
    let userEmail = await campaignModel.confirmationUserEmailField.textContent();
    expect(userEmail).toEqual('user@gmail.com');
});


