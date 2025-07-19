import { test, expect } from '@playwright/test';
import { CampaignMDIModel } from '../../pom/campaignMDIModel';
import { CommonModel } from '../../pom/commonModel';

test(`Verify the elements for the MDI landing page are displayed when the page is visited - mdi-ad-form`, async ({ page }) => {

    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.verifyThatWelcomeHeaderIsDisplayed();
    await campaignMDIModel.verifyThatMdiImageIsDisplayed();
    await campaignMDIModel.verifyTheSourceImage();
    await campaignMDIModel.verifyThatWelcomeHeaderTextIsDisplayed();
    await campaignMDIModel.verifyThatStartYourCampaignTextIsDisplayed();
    //await campaignMDIModel.verifyThatUploadDigitalAssetsTextIsDisplayed();
    await campaignMDIModel.verifyThatSubmitVendorAdFormButtonIsVisible();
    await campaignMDIModel.verifyUploadDigitalAssetsButtonIsVisible();
    //await campaignMDIModel.verifyDownloadSharepointButtonIsVisible();
    await campaignMDIModel.verifyDownloadCircularGuideButtonIsVisible();
});


test(`Verify that the vendor ad form page is displayed clicking the 'SUBMIT VENDOR AD FORM' button - mdi-ad-form`, async ({ page }) => {

    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.verifyThatWelcomeHeaderIsDisplayed();

    await campaignMDIModel.submitVendorAdFormButton.click();

    await campaignMDIModel.verifyVendorNameFieldIsDisplayed();
});


test.skip(`Verify that the user is redirected to the Digital Assets page clicking the 'UPLOAD DIGITAL ASSETS' button - mdi-ad-form`, async ({ page, context }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.verifyThatWelcomeHeaderIsDisplayed();

    const pagePromise = context.waitForEvent('page');
    await campaignMDIModel.uploadDigitalAssetsButton.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('https://login.microsoftonline.com');
});


test.skip(`Verify that the sharepoint guide page is displayed clicking the 'DOWNLOAD SHAREPOINT GUIDE' button`, async ({ page, context }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.verifyThatWelcomeHeaderIsDisplayed();

    // Start waiting for download before clicking. Note no await.
    const downloadPromise = page.waitForEvent('download');
    await campaignMDIModel.downloadSharepointGuideButton.click();
    const download = await downloadPromise;
    // Wait for the download process to complete
    expect(await download.path()).not.toBe('');
    
});


test(`Verify that the circular guide page is displayed clicking the 'DOWNLOAD CIRCULAR GUIDE' button`, async ({ page, context }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.verifyThatWelcomeHeaderIsDisplayed();

    const pagePromise = context.waitForEvent('page');
    await campaignMDIModel.downloadCircularGuideButton.click();
    const newPage = await pagePromise;
    //await newPage.waitForLoadState();
    await newPage.waitForTimeout(2000);
    expect(newPage.url()).toContain(':');
});


test.skip(`Verify that a new MDI campaign can be created using the new campaign ad form With product placement I would like your help choosing options`, async ({ page }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNumberField, "22222222");
    await commonModel.inputTextInLocator(campaignMDIModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignMDIModel.emailField, "jhon@gmail.com");
    await campaignMDIModel.contactPhoneNumberField.click({delay:200});
    await commonModel.inputTextInLocator(campaignMDIModel.contactPhoneNumberField, "1234567890");
    //await campaignMDIModel.productPlacementButton.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.verifyStepIsDisplayed("WHEN");
    await campaignMDIModel.verifyTheSecondStepCircleIsSelected();
    await campaignMDIModel.campaignNameField.type("Campaign name");
    await commonModel.inputTextInLocator(campaignMDIModel.campaignNameField, "Campaign name");
    //await campaignMDIModel.campaignDescriptionField.type("This is a new campaign");
    await campaignMDIModel.chooseDate.click();
    await campaignMDIModel.dateOption.click();
    let date = await campaignMDIModel.campaignChooseDate.nth(0).textContent();
    await campaignMDIModel.bottomNextButton.click();
    //await campaignMDIModel.iWouldLikeYourHelpChoosingButton.click();
    //await campaignMDIModel.notesTextArea.type("These are some notes");
    //await campaignMDIModel.bottomNextButton.click();
    //await campaignMDIModel.verifyStepIsDisplayed("FINISH");
    //let vendorNameDHFormText = await campaignMDIModel.vendorNameDHForm.textContent();
    //expect(vendorNameDHFormText).toEqual("vendor name");
    //let vendorNumberDHFormText = await campaignMDIModel.vendorNumberDHForm.textContent();
    //expect(vendorNumberDHFormText).toEqual("123456");
    //let contactNameDHFormText = await campaignMDIModel.contactNameDHForm.textContent();
    //expect(contactNameDHFormText).toEqual("contact name");
    //let contactEmailDHFormText = await campaignMDIModel.contactEmailDHForm.textContent();
    //expect(contactEmailDHFormText).toEqual("user@gmail.com");
    //let contactPhoneNumberDHFormatText = await campaignMDIModel.contactPhonenumberDHForm.textContent();
    //expect(contactPhoneNumberDHFormatText).toEqual("(123) 456-7890");
    //let campaignNameDHFormText = await campaignMDIModel.campaignNameDHForm.textContent();
    //expect(campaignNameDHFormText).toEqual("Campaign name");
    //let campaignDescriptionDHFormText = await campaignMDIModel.campaignDescriptionDHForm.textContent();
    //expect(campaignDescriptionDHFormText).toEqual("This is a new campaign");
    //let campaignStartChoosenDateDHFormText = await campaignMDIModel.campaignStartDHForm.textContent();
    //expect(campaignStartChoosenDateDHFormText).toEqual(date);
    //let notesDHFormText = await campaignMDIModel.campaignNotesDHForm.textContent();
    //expect(notesDHFormText).toEqual("These are some notes");
    //await campaignMDIModel.finishButton.click();
    //await campaignMDIModel.verifyTheConfirmationMessageIsDisplayed();
    //let confirmationHeaderText = await campaignMDIModel.confirmationMessage.textContent();
    //expect(confirmationHeaderText).toEqual("Confirmation");
    //await campaignMDIModel.verifyThatTheSuccessFullFormSubmisisonHeaderIsDisplayed();
    //await campaignMDIModel.verifyThatTheMDIemailLinkFieldIsDisplayed();
    //let MDIemailLinkText = await campaignMDIModel.MDIemailLink.textContent();
    //expect(MDIemailLinkText).toBe("digital@mdi.com");

    await page.waitForTimeout(3000);
});


test.skip(`Verify that a new MDI campaign can be created using the new campaign ad form with product placement Id like to choose my audience options`, async ({ page }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNumberField, "22222222");
    await commonModel.inputTextInLocator(campaignMDIModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignMDIModel.emailField, "jhon@gmail.com");
    await campaignMDIModel.contactPhoneNumberField.click({delay:200});
    await commonModel.inputTextInLocator(campaignMDIModel.contactPhoneNumberField, "1234567890");
    await campaignMDIModel.productPlacementButton.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.verifyStepIsDisplayed("WHEN");
    await campaignMDIModel.verifyTheSecondStepCircleIsSelected();
    await commonModel.inputTextInLocator(campaignMDIModel.campaignNameField, "Campaign name");
    await commonModel.inputTextInLocator(campaignMDIModel.campaignDescriptionField, "This is a new campaign");
    await campaignMDIModel.chooseDate.click();
    await campaignMDIModel.dateOption.click();
    let date = await campaignMDIModel.campaignChooseDate.nth(0).textContent();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.idLikeToChooseMyAudience.click();
    await campaignMDIModel.milleniansOptionGeneration.click();
    await campaignMDIModel.maleOptionGender.click();
    await campaignMDIModel.discountShoppersOptionIncomes.click();
    await campaignMDIModel.soccerMomsOptionsBehaviors.click();
    await campaignMDIModel.notesTextArea.type("These are some notes");
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.verifyStepIsDisplayed("FINISH");
    let vendorNameDHFormText = await campaignMDIModel.vendorNameDHForm.textContent();
    expect(vendorNameDHFormText).toEqual("vendor name");
    let vendorNumberDHFormText = await campaignMDIModel.vendorNumberDHForm.textContent();
    expect(vendorNumberDHFormText).toEqual("123456");
    let contactNameDHFormText = await campaignMDIModel.contactNameDHForm.textContent();
    expect(contactNameDHFormText).toEqual("contact name");
    let contactEmailDHFormText = await campaignMDIModel.contactEmailDHForm.textContent();
    expect(contactEmailDHFormText).toEqual("user@gmail.com");
    let contactPhoneNumberDHFormatText = await campaignMDIModel.contactPhonenumberDHForm.textContent();
    expect(contactPhoneNumberDHFormatText).toEqual("(123) 456-7890");
    let campaignNameDHFormText = await campaignMDIModel.campaignNameDHForm.textContent();
    expect(campaignNameDHFormText).toEqual("Campaign name");
    let campaignDescriptionDHFormText = await campaignMDIModel.campaignDescriptionDHForm.textContent();
    expect(campaignDescriptionDHFormText).toEqual("This is a new campaign");
    let campaignStartChoosenDateDHFormText = await campaignMDIModel.campaignStartDHForm.textContent();
    expect(campaignStartChoosenDateDHFormText).toEqual(date);
    let campaignCoustomerBaseDHFormValue = await campaignMDIModel.campaignCoustomerBaseDHFormValue.textContent();
    expect(campaignCoustomerBaseDHFormValue).toEqual("Loyalist (targeting MDI stores only)");
    let campaignGenerationDHFormValue = await campaignMDIModel.campaignGenerationDHFormValue.textContent();
    expect(campaignGenerationDHFormValue).toEqual("Millennials");
    let campaignIncomesDHFormValue = await campaignMDIModel.campaignIncomesDHFormValue.textContent();
    expect(campaignIncomesDHFormValue?.trim()).toEqual("Discount Shoppers");
    let campaignBehaviorsDHFormValue = await campaignMDIModel.campaignBehaviorsDHFormValue.textContent();
    expect(campaignBehaviorsDHFormValue).toEqual("Soccer Moms");
    let notesDHFormText = await campaignMDIModel.campaignNotesDHForm.textContent();
    expect(notesDHFormText).toEqual("These are some notes");
    await campaignMDIModel.finishButton.click();
    await campaignMDIModel.verifyTheConfirmationMessageIsDisplayed();
    let confirmationHeaderText = await campaignMDIModel.confirmationMessage.textContent();
    expect(confirmationHeaderText).toEqual("Confirmation");
    await campaignMDIModel.verifyThatTheSuccessFullFormSubmisisonHeaderIsDisplayed();
    await campaignMDIModel.verifyThatTheMDIemailLinkFieldIsDisplayed();
    let MDIemailLinkText = await campaignMDIModel.MDIemailLink.textContent();
    expect(MDIemailLinkText).toBe("digital@mdi.com");
});


test.skip(`Verify that a new MDI campaign can be created using the new campaign ad form with the Product Placement Brand Page radio option`, async ({ page }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNumberField, "22222222");
    await commonModel.inputTextInLocator(campaignMDIModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignMDIModel.emailField, "jhon@gmail.com");
    await campaignMDIModel.contactPhoneNumberField.click({delay:200});
    await commonModel.inputTextInLocator(campaignMDIModel.contactPhoneNumberField, "1234567890");
    await campaignMDIModel.productPlacementBrandButton.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.verifyStepIsDisplayed("WHEN");
    await campaignMDIModel.verifyTheSecondStepCircleIsSelected();
    await commonModel.inputTextInLocator(campaignMDIModel.campaignNameField, "Campaign name");
    await commonModel.inputTextInLocator(campaignMDIModel.campaignDescriptionField, "This is a new campaign");
    await campaignMDIModel.chooseDate.click();
    await campaignMDIModel.dateOption.click();
    let date = await campaignMDIModel.campaignChooseDate.nth(0).textContent();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.iWouldLikeYourHelpChoosingButton.click();
    await campaignMDIModel.notesTextArea.type("These are some notes");
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.verifyStepIsDisplayed("FINISH");
    let vendorNameDHFormText = await campaignMDIModel.vendorNameDHForm.textContent();
    expect(vendorNameDHFormText).toEqual("vendor name");
    let vendorNumberDHFormText = await campaignMDIModel.vendorNumberDHForm.textContent();
    expect(vendorNumberDHFormText).toEqual("123456");
    let contactNameDHFormText = await campaignMDIModel.contactNameDHForm.textContent();
    expect(contactNameDHFormText).toEqual("contact name");
    let contactEmailDHFormText = await campaignMDIModel.contactEmailDHForm.textContent();
    expect(contactEmailDHFormText).toEqual("user@gmail.com");
    let contactPhoneNumberDHFormatText = await campaignMDIModel.contactPhonenumberDHForm.textContent();
    expect(contactPhoneNumberDHFormatText).toEqual("(123) 456-7890");
    let campaignNameDHFormText = await campaignMDIModel.campaignNameDHForm.textContent();
    expect(campaignNameDHFormText).toEqual("Campaign name");
    let campaignDescriptionDHFormText = await campaignMDIModel.campaignDescriptionDHForm.textContent();
    expect(campaignDescriptionDHFormText).toEqual("This is a new campaign");
    let campaignStartChoosenDateDHFormText = await campaignMDIModel.campaignStartDHForm.textContent();
    expect(campaignStartChoosenDateDHFormText).toEqual(date);
    let notesDHFormText = await campaignMDIModel.campaignNotesDHForm.textContent();
    expect(notesDHFormText).toEqual("These are some notes");
    await campaignMDIModel.finishButton.click();
    await campaignMDIModel.verifyTheConfirmationMessageIsDisplayed();
    let confirmationHeaderText = await campaignMDIModel.confirmationMessage.textContent();
    expect(confirmationHeaderText).toEqual("Confirmation");
    await campaignMDIModel.verifyThatTheSuccessFullFormSubmisisonHeaderIsDisplayed();
    await campaignMDIModel.verifyThatTheMDIemailLinkFieldIsDisplayed();
    let MDIemailLinkText = await campaignMDIModel.MDIemailLink.textContent();
    expect(MDIemailLinkText).toBe("digital@mdi.com");
});



test(`Verify that when the vendor name field is empty The 'Name is required.' message is displayed`, async ({ page }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await campaignMDIModel.vendorNumberField.pressSequentially("22222222");
    await commonModel.inputTextInLocator(campaignMDIModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignMDIModel.emailField, "jhon@gmail.com");

    await campaignMDIModel.contactPhoneNumberField.pressSequentially("1234567890");
    //await campaignMDIModel.productPlacementButton.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.verifyAlertMessageIsDisplayed("Name is required.");
});


test(`Verify that when the vendor number field is empty The 'Number is required.' message is displayed.`, async ({ page }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignMDIModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignMDIModel.emailField, "jhon@gmail.com");
    await campaignMDIModel.contactPhoneNumberField.click();
    await campaignMDIModel.contactPhoneNumberField.pressSequentially("1234567890");
    //await campaignMDIModel.productPlacementButton.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.verifyAlertMessageIsDisplayed("Number is required.");
});


test(`Verify that when the Contact Name field is empty The 'Contactname is required.' message is displayed.`, async ({ page }) => {
       
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNumberField, "22222222");
    await commonModel.inputTextInLocator(campaignMDIModel.emailField, "jhon@gmail.com");
    await campaignMDIModel.contactPhoneNumberField.click();
    await campaignMDIModel.contactPhoneNumberField.pressSequentially("1234567890");
    //await campaignMDIModel.productPlacementButton.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.verifyAlertMessageIsDisplayed("Contactname is required.");
});


test(`Verify that when the Contact Email field is empty The 'Email is required.' message is displayed.`, async ({ page }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNumberField, "22222222");
    await commonModel.inputTextInLocator(campaignMDIModel.contactNameField, "contact name");
    await campaignMDIModel.contactPhoneNumberField.click();
    await campaignMDIModel.contactPhoneNumberField.pressSequentially("1234567890");
    //await campaignMDIModel.productPlacementButton.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.verifyAlertMessageIsDisplayed("Email is required.");
});


test(`Verify that when the Contact Email field has an invalid email format the 'Email is invalid,Email is not the correct format.' message is displayed.`, async ({ page }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNumberField, "22222222");
    await commonModel.inputTextInLocator(campaignMDIModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignMDIModel.emailField, "jhonmail");
    await campaignMDIModel.contactPhoneNumberField.click();
    await campaignMDIModel.contactPhoneNumberField.pressSequentially("1234567890");
    //await campaignMDIModel.productPlacementButton.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.verifyTheEmailErrorMessage("Email is invalid,Email is not the correct format.");
});


test(`Verify that when the contact phone number field has an invalid phone number the 'Phonenumber is required.' message is displayed.`, async ({ page }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNumberField, "22222222");
    await commonModel.inputTextInLocator(campaignMDIModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignMDIModel.emailField, "jhon@gmail.com");
    await campaignMDIModel.contactPhoneNumberField.click();
    await campaignMDIModel.contactPhoneNumberField.pressSequentially("11122");
    //await campaignMDIModel.productPlacementButton.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.verifyAlertMessageIsDisplayed("Phonenumber is required.");
});


test.skip(`Verify that when no level is selected the 'Level is required.' message is displayed.`, async ({ page }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNumberField, "22222222");
    await commonModel.inputTextInLocator(campaignMDIModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignMDIModel.emailField, "jhon@gmail.com");
    await campaignMDIModel.contactPhoneNumberField.click();
    await campaignMDIModel.contactPhoneNumberField.pressSequentially("1234567890");
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.verifyAlertMessageIsDisplayed("Level is required.");
});


test(`Verify that when all the fields are empty the error messages are displayed`, async ({ page }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.verifyAllAlertMessagesAreDisplayed();
});


test(`Verify that the name is required message is displayed when the Campaign Name field is empty`, async ({ page }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNumberField, "123456");
    await commonModel.inputTextInLocator(campaignMDIModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignMDIModel.emailField, "jhon@gmail.com");
    await campaignMDIModel.contactPhoneNumberField.click();
    await campaignMDIModel.contactPhoneNumberField.pressSequentially("1234567890");
    //await campaignMDIModel.productPlacementButton.click();
    await campaignMDIModel.bottomNextButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.campaignFeaturedBrandField, "Brand name");
    await campaignMDIModel.chooseDate.click();
    await campaignMDIModel.dateOption.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.verifyAlertMessageIsDisplayed("Campaigntitle is required.");
});


test(`Verify that the written notes remain displayed in the notes field when the back button is clicked`, async ({ page }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNumberField, "123456");
    await commonModel.inputTextInLocator(campaignMDIModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignMDIModel.emailField, "jhon@gmail.com");
    await campaignMDIModel.contactPhoneNumberField.click();
    await campaignMDIModel.contactPhoneNumberField.pressSequentially("1234567890");
    //await campaignMDIModel.productPlacementButton.click();
    await campaignMDIModel.bottomNextButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.campaignNameField, "new campaign");
    await commonModel.inputTextInLocator(campaignMDIModel.campaignFeaturedBrandField, "Brand name");
    await campaignMDIModel.chooseDate.click();
    await campaignMDIModel.dateOption.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.requestHelpButton.click();
    await campaignMDIModel.notesTextArea.type("These are notes");
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.bottomBackButton.click();
    await campaignMDIModel.requestHelpButton.click();
    let text1 = await campaignMDIModel.notesTextArea.inputValue();
    await campaignMDIModel.bottomBackButton.click();
    await campaignMDIModel.requestHelpButton.click();
    let text2 = await campaignMDIModel.notesTextArea.inputValue();
    expect(text1).toEqual("These are notes");
    expect(text2).toEqual("These are notes");
});


test(`Verify that when no option is choosen in the Generation/Age Group section the Generation is required. message is displayed`, async ({ page }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNumberField, "123456");
    await commonModel.inputTextInLocator(campaignMDIModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignMDIModel.emailField, "jhon@gmail.com");
    await campaignMDIModel.contactPhoneNumberField.click();
    await campaignMDIModel.contactPhoneNumberField.pressSequentially("1234567890");
    //await campaignMDIModel.productPlacementButton.click();
    await campaignMDIModel.bottomNextButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.campaignNameField, "new campaign");
    await commonModel.inputTextInLocator(campaignMDIModel.campaignFeaturedBrandField, "Brand name");
    await campaignMDIModel.chooseDate.click();
    await campaignMDIModel.dateOption.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.customizeButton.click();
    await campaignMDIModel.allOptionGeneration.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.errorMessage.scrollIntoViewIfNeeded();
    await campaignMDIModel.verifyAlertMessageIsDisplayed("Generation is required.");
});


test(`Verify that when no option is choosen in the Gender section the Gender is required. message is displayed`, async ({ page }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNumberField, "123456");
    await commonModel.inputTextInLocator(campaignMDIModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignMDIModel.emailField, "jhon@gmail.com");
    await campaignMDIModel.contactPhoneNumberField.click();
    await campaignMDIModel.contactPhoneNumberField.pressSequentially("1234567890");
    //await campaignMDIModel.productPlacementButton.click();
    await campaignMDIModel.bottomNextButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.campaignNameField, "new campaign");
    await commonModel.inputTextInLocator(campaignMDIModel.campaignFeaturedBrandField, "Brand name");
    await campaignMDIModel.chooseDate.click();
    await campaignMDIModel.dateOption.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.customizeButton.click();
    await campaignMDIModel.allOptionGender.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.errorMessage.scrollIntoViewIfNeeded();
    await campaignMDIModel.verifyAlertMessageIsDisplayed("Gender is required.");
});


test(`Verify that when no option is choosen in the Incomes section the Incomes is required. message is displayed`, async ({ page }) => {
        
    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNumberField, "123456");
    await commonModel.inputTextInLocator(campaignMDIModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignMDIModel.emailField, "jhon@gmail.com");
    await campaignMDIModel.contactPhoneNumberField.click();
    await campaignMDIModel.contactPhoneNumberField.pressSequentially("1234567890");
    //await campaignMDIModel.productPlacementButton.click();
    await campaignMDIModel.bottomNextButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.campaignNameField, "new campaign");
    await commonModel.inputTextInLocator(campaignMDIModel.campaignFeaturedBrandField, "Brand name");
    await campaignMDIModel.chooseDate.click();
    await campaignMDIModel.dateOption.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.customizeButton.click();
    await campaignMDIModel.allOptionIncomes.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.errorMessage.scrollIntoViewIfNeeded();
    await campaignMDIModel.verifyAlertMessageIsDisplayed("Incomes is required.");
});


test(`Verify that when no option is choosen in the Behaviors section the Behaviors is required. message is displayed`, async ({ page }) => {

    const campaignMDIModel = new CampaignMDIModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(campaignMDIModel.adFormMDIUrl);
    await campaignMDIModel.submitVendorAdFormButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNameField, "vendor name");
    await commonModel.inputTextInLocator(campaignMDIModel.vendorNumberField, "123456");
    await commonModel.inputTextInLocator(campaignMDIModel.contactNameField, "contact name");
    await commonModel.inputTextInLocator(campaignMDIModel.emailField, "jhon@gmail.com");
    await campaignMDIModel.contactPhoneNumberField.click();
    await campaignMDIModel.contactPhoneNumberField.pressSequentially("1234567890");
    //await campaignMDIModel.productPlacementButton.click();
    await campaignMDIModel.bottomNextButton.click();
    await commonModel.inputTextInLocator(campaignMDIModel.campaignNameField, "new campaign");
    await commonModel.inputTextInLocator(campaignMDIModel.campaignFeaturedBrandField, "Brand name");
    await campaignMDIModel.chooseDate.click();
    await campaignMDIModel.dateOption.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.customizeButton.click();
    await campaignMDIModel.allOptionBehaviors.click();
    await campaignMDIModel.bottomNextButton.click();
    await campaignMDIModel.errorMessage.scrollIntoViewIfNeeded();
    await campaignMDIModel.verifyAlertMessageIsDisplayed("Behaviors is required.");
});


