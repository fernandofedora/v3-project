import {expect, Locator, Page} from '@playwright/test';

export class CampaignModel{

    readonly page: Page;
    readonly adFormUrlAutomation: string;
    readonly formHeader: Locator;
    readonly topBackButton: Locator;
    readonly topNextButton: Locator;
    readonly vendorNameField: Locator;
    readonly vendorNumberField: Locator;
    readonly contactNameField: Locator;
    readonly emailField: Locator;
    readonly contactPhoneNumberField: Locator;
    readonly productPlacementButton: Locator;
    readonly productPlacementBrandButton: Locator;
    readonly bottomBackButton: Locator;
    readonly bottomNextButton: Locator;
    readonly firstStepCircle: Locator;
    readonly secondStepCircle: Locator;
    readonly thirdStepCircle: Locator;
    readonly fourthStepCircle: Locator;
    readonly errorMessage: Locator;
    readonly campaignNameField: Locator;
    readonly campaignDescriptionField: Locator;
    readonly chooseDate: Locator;
    readonly dateOption: Locator;
    readonly iWouldLikeYourHelpChoosingButton: Locator;
    readonly notesTextArea: Locator;
    readonly idLikeToChooseMyAudience: Locator;
    readonly loyalistMDIInputCustomerBase: Locator;
    readonly allGroceryCustomersInputCustomerBase: Locator;
    readonly allOptionGeneration: Locator;
    readonly milleniansOptionGeneration: Locator;
    readonly generationzOptionGeneration: Locator;
    readonly generationxOptionGeneration: Locator;
    readonly babyBoomersOptionGeneration: Locator;
    readonly allOptionGender: Locator;
    readonly femaleOptionGender: Locator;
    readonly maleOptionGender: Locator;
    readonly bothNeitherOptionGender: Locator;
    readonly allOptionIncomes: Locator;
    readonly discountShoppersOptionIncomes: Locator;
    readonly luxuryShoppersOptionIncomes: Locator;
    readonly affluentShoppersOptionIncomes: Locator;
    readonly allOptionBehaviors: Locator;
    readonly loyalistOptionBehaviors: Locator;
    readonly soccerMomsOptionsBehaviors: Locator;
    readonly frecuentTravelersOptionBehaviors: Locator;
    readonly hispanicFoodsOptionBehaviors: Locator;
    readonly sportsEnthusiastsOptionBehaviors: Locator;
    readonly bigBoxShoppersOptionBehaviors: Locator;
    readonly carRentersOptionBehaviors: Locator;
    readonly millenialParentsOptionBehaviors: Locator;
    readonly convenienceShoppersOptionBehaviors: Locator;
    readonly fitnessEnthusiastsOptionBehaviors: Locator;
    readonly diyersOptionBehaviors: Locator;
    readonly departmentStoreShoppersOptionBehaviors: Locator;
    readonly fastFashionShoppersOptionBehaviors: Locator;
    readonly groceryShoppersOptionBehaviors: Locator;
    readonly momsOptionBehaviors: Locator;
    readonly dadsOptionBehaviors: Locator;
    readonly petLoversOptionsBehavors: Locator;
    readonly additionalNotesTextArea: Locator;
    readonly formBody: Locator;
    readonly IwouldLikeMDIToManageArtwork: Locator;
    readonly graphicRadioButton: Locator;
    readonly graphicExternalRadioButton: Locator;
    readonly videoRadioButton: Locator;
    readonly recipeRadioButton: Locator;
    readonly externalLinkField: Locator;
    readonly chooseSupportMediaFiles: Locator;
    readonly imageTable: Locator;
    readonly recipeTextArea: Locator;
    readonly yesBottomConfirmDialog: Locator;
    readonly snackBar: Locator;
    readonly dates: Locator;
    readonly vendorNameDHForm: Locator;
    readonly vendorNumberDHForm: Locator;
    readonly contactNameDHForm: Locator;
    readonly contactEmailDHForm: Locator;
    readonly contactPhonenumberDHForm: Locator;
    readonly productPlacementDHForm: Locator;
    readonly campaignNameDHForm: Locator;
    readonly campaignDescriptionDHForm: Locator;
    readonly campaignStartDHForm: Locator;
    readonly campaignNotesDHForm:Locator;
    readonly campaignPromotionalCardTypeDHForm: Locator;
    readonly promotionalCardTable: Locator;
    readonly campaignChooseDate: Locator;
    readonly campaignCoustomerBaseDHFormValue: Locator;
    readonly campaignGenerationDHFormValue: Locator;
    readonly campaignGenderDHFormValue: Locator;
    readonly campaignIncomesDHFormValue: Locator;
    readonly campaignBehaviorsDHFormValue: Locator;
    readonly campaignAdditionalNotesValue: Locator;
    readonly idLikeToAddMyOwnArtworkButton: Locator;
    readonly standardRadioButton: Locator;
    readonly fullBleedRadioButton: Locator;
    readonly animatedRadioButton: Locator;
    readonly campaignDealCardTypeDHForm: Locator;
    readonly campaignDealCardTable: Locator;
    readonly doneButton: Locator;
    readonly vendorInformationEditButton: Locator;
    readonly campaignDetailsEditButton: Locator;
    readonly audienceDetailsEditButton: Locator;
    readonly promotionalCardEditButton: Locator;
    readonly yesButtonConfirmationDialog: Locator;
    readonly confirmationMessage: Locator;
    readonly confirmationContactNameField: Locator;
    readonly confirmationUserEmailField: Locator;
    readonly welcomeHeader: Locator;
    readonly startYourCampaignHeader: Locator;
    readonly uploadYourDigitalAssetsHeader: Locator;
    readonly guidelinesForCampaignsAndDigitalAssetsHeader: Locator;
    readonly ampDigitalCircularHeader: Locator;
    readonly mdiIdealImage: Locator;
    readonly submitVendorAdFormButton: Locator;
    readonly uploadDigitalAssetsButton: Locator;
    readonly downloadSharepointGuideButton: Locator;
    readonly downloadCircularGuideButton: Locator;
    readonly uploadedFileTable: Locator;
    readonly newDateOption: Locator;
    

    constructor(page: Page){
        this.page = page;
        this.adFormUrlAutomation = "https://admin.canary.sale/ad-form";
        this.formHeader = page.locator('div[class="col-8 col-md-8"] > h2');
        this.topBackButton = page.locator('div[class="row d-flex justify-content-center align-items-center m-0"]:nth-child(2) div[class="col-4 col-md-4 d-flex justify-content-end py-2"] > button:nth-child(1)');
        this.topNextButton = page.locator('div[class="row d-flex justify-content-center align-items-center m-0"]:nth-child(2) div[class="col-4 col-md-4 d-flex justify-content-end py-2"] > button:nth-child(2)');
        this.vendorNameField = page.locator('input[formcontrolname="name"]');
        this.vendorNumberField = page.locator('input[formcontrolname="number"]');
        this.contactNameField = page.locator('input[formcontrolname="contactName"]');
        this.emailField = page.locator('input[formcontrolname="email"]');
        this.contactPhoneNumberField = page.locator('p-inputmask[formcontrolname="phoneNumber"] input');
        this.productPlacementButton = page.locator('p-radiobutton[inputid="standar"]');
        this.productPlacementBrandButton = page.locator('p-radiobutton[inputid="full"]');
        this.bottomBackButton = page.locator('div[class="row d-flex justify-content-center align-items-center m-0"]:nth-child(6) div[class="col-4 col-md-4 d-flex justify-content-end py-2"] > button:nth-child(1)');
        this.bottomNextButton = page.locator('div[class="row d-flex justify-content-center align-items-center m-0"]:nth-child(6) div[class="col-4 col-md-4 d-flex justify-content-end py-2"] > button:nth-child(2)');
        this.firstStepCircle = page.locator('nav[class="p-steps p-component p-readonly"] > ul > li:nth-child(1)');
        this.secondStepCircle = page.locator('nav[class="p-steps p-component p-readonly"] > ul > li:nth-child(2)');
        this.thirdStepCircle = page.locator('nav[class="p-steps p-component p-readonly"] > ul > li:nth-child(3)');
        this.fourthStepCircle = page.locator('nav[class="p-steps p-component p-readonly"] > ul > li:nth-child(4)');
        this.errorMessage = page.locator('app-error-messages > app-alert > ul > li');
        this.campaignNameField = page.locator('input[formcontrolname="name"]');
        this.campaignDescriptionField = page.locator('textarea[formcontrolname="description"]');
        this.chooseDate = page.locator('p-dropdown[formcontrolname="startDate"]');
        this.dateOption = page.locator('p-dropdownitem:nth-child(1) > li[role="option"]');
        this.iWouldLikeYourHelpChoosingButton = page.locator('button > span:text-is("I would like your help choosing")');
        this.notesTextArea = page.locator('textarea');
        this.idLikeToChooseMyAudience = page.locator('button > span:text-is("I\'d like to choose my audience")');
        this.loyalistMDIInputCustomerBase = page.locator('div[class="content ng-star-inserted"] > div > p-panel[header="Customer Base"] > div> div[role="region"] > div > div:nth-child(2) > div:nth-child(1) > p-radiobutton > div');
        this.allGroceryCustomersInputCustomerBase = page.locator('div[class="content ng-star-inserted"] > div > p-panel[header="Customer Base"] > div> div[role="region"] > div > div:nth-child(2) > div:nth-child(2) > p-radiobutton > div');
        this.allOptionGeneration = page.locator('div[class="content ng-star-inserted"] > div:nth-child(4) > p-panel[header="Generation/Age Group"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p-checkbox:nth-child(1) > div');
        this.milleniansOptionGeneration = page.locator('div[class="content ng-star-inserted"] > div:nth-child(4) > p-panel[header="Generation/Age Group"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p-checkbox:nth-child(2) > div');
        this.generationzOptionGeneration = page.locator('div[class="content ng-star-inserted"] > div:nth-child(4) > p-panel[header="Generation/Age Group"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p-checkbox:nth-child(3) > div');
        this.generationxOptionGeneration = page.locator('div[class="content ng-star-inserted"] > div:nth-child(4) > p-panel[header="Generation/Age Group"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > p-checkbox:nth-child(1) > div');
        this.babyBoomersOptionGeneration = page.locator('div[class="content ng-star-inserted"] > div:nth-child(4) > p-panel[header="Generation/Age Group"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > p-checkbox:nth-child(2) > div');
        this.allOptionGender = page.locator('div[class="content ng-star-inserted"] > div:nth-child(5) > p-panel[header="Gender"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p-checkbox:nth-child(1) > div');
        this.femaleOptionGender = page.locator('div[class="content ng-star-inserted"] > div:nth-child(5) > p-panel[header="Gender"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p-checkbox:nth-child(2) > div');
        this.maleOptionGender = page.locator('div[class="content ng-star-inserted"] > div:nth-child(5) > p-panel[header="Gender"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > p-checkbox:nth-child(1) > div');
        this.bothNeitherOptionGender = page.locator('div[class="content ng-star-inserted"] > div:nth-child(5) > p-panel[header="Gender"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > p-checkbox:nth-child(2) > div');
        this.allOptionIncomes = page.locator('div[class="content ng-star-inserted"] > div:nth-child(6) > p-panel[header="Incomes"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p-checkbox:nth-child(1) > div');
        this.discountShoppersOptionIncomes = page.locator('div[class="content ng-star-inserted"] > div:nth-child(6) > p-panel[header="Incomes"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p-checkbox:nth-child(2) > div');
        this.luxuryShoppersOptionIncomes = page.locator('div[class="content ng-star-inserted"] > div:nth-child(6) > p-panel[header="Incomes"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > p-checkbox:nth-child(1) > div');
        this.affluentShoppersOptionIncomes = page.locator('div[class="content ng-star-inserted"] > div:nth-child(6) > p-panel[header="Incomes"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > p-checkbox:nth-child(2) > div');
        this.allOptionBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p-checkbox:nth-child(1) > div');
        this.loyalistOptionBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p-checkbox:nth-child(2) > div');
        this.soccerMomsOptionsBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p-checkbox:nth-child(3) > div');
        this.frecuentTravelersOptionBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p-checkbox:nth-child(4) > div');
        this.hispanicFoodsOptionBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p-checkbox:nth-child(5) > div');
        this.sportsEnthusiastsOptionBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p-checkbox:nth-child(6) > div');
        this.bigBoxShoppersOptionBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p-checkbox:nth-child(7) > div');
        this.carRentersOptionBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p-checkbox:nth-child(8) > div');
        this.millenialParentsOptionBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p-checkbox:nth-child(9) > div');
        this.convenienceShoppersOptionBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > p-checkbox:nth-child(1) > div');
        this.fitnessEnthusiastsOptionBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > p-checkbox:nth-child(2) > div');
        this.diyersOptionBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > p-checkbox:nth-child(3) > div');
        this.departmentStoreShoppersOptionBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > p-checkbox:nth-child(4) > div');
        this.fastFashionShoppersOptionBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > p-checkbox:nth-child(5) > div');
        this.groceryShoppersOptionBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > p-checkbox:nth-child(6) > div');
        this.momsOptionBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > p-checkbox:nth-child(7) > div');
        this.dadsOptionBehaviors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > p-checkbox:nth-child(8) > div');
        this.petLoversOptionsBehavors = page.locator('div[class="content ng-star-inserted"] > div:nth-child(7) > p-panel[header="Behaviors"] > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > p-checkbox:nth-child(9) > div');
        this.additionalNotesTextArea = page.locator('div[class="content ng-star-inserted"] > div:nth-child(8) > div> textarea');
        this.formBody = page.locator('div[class="p-card-body"]');
        this.IwouldLikeMDIToManageArtwork = page.locator("button > span:text-is('I would like IDEAL to Manage Artwork')");
        this.graphicRadioButton = page.locator('div[role="region"] > div > div:nth-child(1) > div:nth-child(1) > p-radiobutton > div');
        this.graphicExternalRadioButton = page.locator('div[role="region"] > div > div:nth-child(1) > div:nth-child(2) > p-radiobutton > div');
        this.videoRadioButton = page.locator('div[role="region"] > div > div:nth-child(1) > div:nth-child(3) > p-radiobutton > div');
        this.recipeRadioButton = page.locator('div[role="region"] > div > div:nth-child(1) > div:nth-child(4) > p-radiobutton > div');
        this.externalLinkField = page.locator('div[class="field"] > input');
        this.chooseSupportMediaFiles = page.locator('p-fileupload > div > div > span');
        this.imageTable = page.locator('tbody[class="p-datatable-tbody"]');
        this.recipeTextArea = page.locator('textarea');
        this.yesBottomConfirmDialog = page.locator('button > span:text-is("Yes")');
        this.snackBar = page.locator('mat-snack-bar-container simple-snack-bar');
        this.dates = page.locator('p-dropdownitem > li');
        this.vendorNameDHForm = page.locator('dh-review-form > div > div:nth-child(2) > div > div:nth-child(1) > p');
        this.vendorNumberDHForm = page.locator('dh-review-form > div > div:nth-child(2) > div > div:nth-child(2) > p');
        this.contactNameDHForm = page.locator('dh-review-form > div > div:nth-child(2) > div > div:nth-child(3) > p');
        this.contactEmailDHForm = page.locator('dh-review-form > div > div:nth-child(2) > div > div:nth-child(4) > p');
        this.contactPhonenumberDHForm = page.locator('dh-review-form > div > div:nth-child(2) > div > div:nth-child(5) > p');
        this.productPlacementDHForm = page.locator('div[class="col-md-6 pt-3 review"] > div[class="field-radiobutton"] > label:nth-child(2)');
        this.campaignNameDHForm = page.locator('dh-review-form > div > div:nth-child(4) > div > p:nth-child(2)');
        this.campaignDescriptionDHForm = page.locator('dh-review-form > div > div:nth-child(4) > div > p:nth-child(4)');
        this.campaignStartDHForm = page.locator('p-panel[header="Campaign Start"] > div > div[role=region] p');
        this.campaignNotesDHForm = page.locator('dh-review-form > div > div:nth-child(6) > div > div > div > p');
        this.campaignPromotionalCardTypeDHForm = page.locator('dh-review-form > div > div:nth-child(7) > div:nth-child(6) div p');
        this.promotionalCardTable = page.locator('dh-review-form > div > div:nth-child(7) > div:nth-child(6) div tbody');
        this.campaignChooseDate = page.locator('dh-date-dropdown > form span');
        this.campaignCoustomerBaseDHFormValue = page.locator('dh-review-form > div > div:nth-child(6) > div > div > div:nth-child(1) p');
        this.campaignGenerationDHFormValue = page.locator('dh-review-form > div > div:nth-child(6) > div > div > div:nth-child(2) > p-panel > div > div:nth-child(2) p');
        this.campaignGenderDHFormValue = page.locator('dh-review-form > div > div:nth-child(6) > div > div > div:nth-child(3) p');
        this.campaignIncomesDHFormValue = page.locator('dh-review-form > div > div:nth-child(6) > div > div > div:nth-child(4) p');
        this.campaignBehaviorsDHFormValue = page.locator('dh-review-form > div > div:nth-child(6) > div > div > div:nth-child(5) p');
        this.campaignAdditionalNotesValue = page.locator('dh-review-form > div > div:nth-child(6) > div > div:nth-child(2) p');
        this.idLikeToAddMyOwnArtworkButton = page.locator('button > span:text-is("I\'d like to add my own Artwork")');
        this.standardRadioButton = page.locator('div[role="region"] > div > div:nth-child(1) > p-radiobutton');
        this.fullBleedRadioButton = page.locator('div[role="region"] > div > div:nth-child(2) > p-radiobutton');
        this.animatedRadioButton = page.locator('div[role="region"] > div > div:nth-child(3) > p-radiobutton');
        this.campaignDealCardTypeDHForm = page.locator('dh-review-form > div > div:nth-child(7) > div:nth-child(2) p');
        this.campaignDealCardTable = page.locator('dh-review-form > div > div:nth-child(7) > div:nth-child(3) table tbody');
        this.doneButton = page.getByRole('button', { name: 'Done' }).nth(1);
        this.vendorInformationEditButton = page.locator('dh-review-form > div > div:nth-child(1) > div:nth-child(2) > button');
        this.campaignDetailsEditButton = page.locator('dh-review-form > div > div:nth-child(3) > div button');
        this.audienceDetailsEditButton = page.locator('dh-review-form > div > div:nth-child(5) > div button');
        this.promotionalCardEditButton = page.locator('dh-review-form > div > div:nth-child(7) > div:nth-child(5)> div button');
        this.yesButtonConfirmationDialog = page.locator('button');
        this.confirmationMessage = page.locator('dh-confirmation-view > div > div > h2');
        this.confirmationContactNameField = page.locator('dh-confirmation-view > div > div[class="ng-star-inserted"] > p:nth-child(8)');
        this.confirmationUserEmailField = page.locator('dh-confirmation-view > div > div[class="ng-star-inserted"] p:nth-child(9)');
        this.welcomeHeader = page.locator('div[class="p-card-body"] h2');
        this.startYourCampaignHeader = page.locator('div[class="p-card-body"] div[class^="row d-flex"]:nth-child(3) h3');
        this.uploadYourDigitalAssetsHeader = page.locator('div[class="p-card-body"] div[class^="row d-flex"]:nth-child(5) h3');
        this.guidelinesForCampaignsAndDigitalAssetsHeader = page.locator('div[class="p-card-body"] div[class^="row d-flex"]:nth-child(7) h3');
        this.ampDigitalCircularHeader = page.locator('div[class="p-card-body"] div[class^="row d-flex"]:nth-child(9) h4');
        this.mdiIdealImage = page.locator('div[class="p-card-header"] img');
        this.submitVendorAdFormButton = page.locator('div[class="p-card-body"] div[class^="row d-flex"]:nth-child(3) a');
        this.uploadDigitalAssetsButton = page.locator('div[class="p-card-body"] div[class^="row d-flex"]:nth-child(5) a');
        this.downloadSharepointGuideButton = page.locator('div[class="p-card-body"] div[class^="row d-flex"]:nth-child(8) a');
        this.downloadCircularGuideButton = page.locator('div[class="p-card-body"] div[class^="row d-flex"]:nth-child(9) a');
        this.uploadedFileTable = page.locator('table tbody');
        this.newDateOption = page.locator('p-dropdownitem:nth-child(3)');
    }


    /**
     * Verify that the correct step is displayed
     * @param text 
     */
    async verifyStepIsDisplayed(text: string){
        let contains: boolean;
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.formHeader.nth(0).isVisible();
            if(isVisible == true){
                break;
            }
            await this.page.waitForTimeout(300)
        }

        for(let i = 0; i < 60; i++){
            let title = await this.formHeader.nth(0).textContent();
            contains = title!.includes(text);
            if(contains == true){
                break;
            }
            await this.page.waitForTimeout(300)
        }

        expect(contains!).toBe(true);
    }


    /**
     * Verify the second step on the ad form is selected
     */
    async verifyTheSecondStepCircleIsSelected(){
        let selected = await this.secondStepCircle.locator('a').getAttribute('aria-selected');
        expect(selected).toBe("true");
    }

    /**
     * Verify the alert message is displayed 
     * @param text 
     */
    async verifyAlertMessageIsDisplayed(text: string){
        let errorTextVisible: boolean;
        for(let i = 0; i < 60; i++){
            errorTextVisible = await this.errorMessage.first().isVisible();
            if(errorTextVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        let errorText = await this.errorMessage.first().textContent();
        expect(errorText).toEqual(text);
    }


    /**
     * Verify that the email error message is displayed
     * @param message 
     */
    async verifyTheEmailErrorMessage(message: string){
        let errorTextVisible: boolean;
        let errors: string[] = [];
        
        let errorsMessage = message.split(',');
        for(let i = 0; i < 60; i++){
            errorTextVisible = await this.errorMessage.first().isVisible();
            if(errorTextVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        let errorCount = await this.errorMessage.count();
        for(let i = 0; i < errorCount; i++){
            let error = await this.errorMessage.nth(i).textContent();
            expect(error).toEqual(errorsMessage[i]);  
            
        }
         
    }


    /**
     * Verify that all the messages are displayed 
     */
    async verifyAllAlertMessagesAreDisplayed(){
        let errorMessageVisible: boolean;
        for(let i = 0; i < 60; i++){
            errorMessageVisible = await this.errorMessage.first().isVisible();
            if(errorMessageVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        let errorMessageCount = await this.errorMessage.count();
        let arrayLenghtEqual = false;
        let messagesArray: string[] = [];
        let errorsMessages = ['Name is required.','Number is required.', 'Contactname is required.', 'Email is required.', 'Phonenumber is required.', 'Level is required.'];
        for(let i = 0; i < errorMessageCount; i++) {
            let messageText = await this.errorMessage.nth(i).textContent();
            messagesArray.push(messageText!);
        }
        if(messagesArray.length == errorsMessages.length){
            arrayLenghtEqual = true;
        }

        expect(arrayLenghtEqual).toBe(true);

        let array1 = errorsMessages.filter(x => !messagesArray.includes(x));

        expect(array1.length).toEqual(0);

        let array2 = messagesArray.filter(x => !errorsMessages.includes(x));

        expect(array2.length).toEqual(0);

    }


    /**
     * Fill all the required fields in the first step
     */
    async fillAllFieldsFirstStep(){
        await this.vendorNameField.fill('vendor name');
        await this.vendorNumberField.fill('22222222');
        await this.contactNameField.fill('contact name');
        await this.emailField.fill('jhon@gmail.com');
        await this.contactPhoneNumberField.fill('1112223456');
        await this.productPlacementButton.click({delay:1000});
        await this.bottomNextButton.click({delay:1000});
    }


    /**
     * Verify that the third step is selected
     */
    async verifyTheThirdStepCircleIsSelected(){
        let selected = await this.thirdStepCircle.locator('a').getAttribute('aria-selected');
        expect(selected).toBe("true");
    }


    /**
     * Fill all the fields in the second step
     */
    async fillAllFieldsSecondStep(){
        await this.campaignNameField.fill('campaign name', {timeout:2000});
        await this.campaignDescriptionField.fill('campaign description', {timeout:2000});
        await this.chooseDate.click();
        await this.dateOption.click();
        await this.bottomNextButton.click();
        await this.verifyStepIsDisplayed("WHO");
        await this.verifyTheThirdStepCircleIsSelected();
    }


    /**
     * Verify that the fourth step is selected
     */
    async verifyTheFourthStepCircleIsSelected(){

        let fourthStepCircleSelected: string | null;
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.fourthStepCircle.isVisible();

            if(isVisible){
                break;
            }
            
            await this.page.waitForTimeout(300);
        }

        for(let i = 0; i < 60; i++){
            fourthStepCircleSelected = await this.fourthStepCircle.locator('a').getAttribute('aria-selected');
            if(fourthStepCircleSelected == "true"){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(fourthStepCircleSelected!).toBe("true");

    }


    /**
     * Verify that only all grocery customer option is selected
     */
    async verifyOnlyAllGroceyCustomerOptionIsSelected(){
        let loyalistOptionStatus = await this.loyalistMDIInputCustomerBase.getAttribute('class');
        let loyalistIsSelected = loyalistOptionStatus!.includes('checked');
        expect(loyalistIsSelected).toBe(false);

        let allGroceryCustomersOptionStatus = await this.allGroceryCustomersInputCustomerBase.getAttribute('class');
        let allGroceryCustomersOptionIsSelected = allGroceryCustomersOptionStatus!.includes('checked');
        expect(allGroceryCustomersOptionIsSelected).toBe(true);
    }


    /**
     *  Verify that the all option is only selected 
     */
    async verifyOnlyAllOptionIsSelectedGenerationSection(){
        let allStatus = await this.allOptionGeneration.getAttribute('class');
        let allSelected = allStatus!.includes('checked');
        expect(allSelected).toBe(true);

        let millennialsOptionStatus = await this.milleniansOptionGeneration.getAttribute('class');
        let millennialOptionSelected = millennialsOptionStatus!.includes('checked');
        expect(millennialOptionSelected).toBe(false);

        let generationzOptionStatus = await this.generationzOptionGeneration.getAttribute('class');
        let generationzOptionSelected = generationzOptionStatus!.includes('checked');
        expect(generationzOptionSelected).toBe(false);

        let generationxOptionStatus = await this.generationxOptionGeneration.getAttribute('class');
        let generationxOptionSelected = generationxOptionStatus!.includes('checked');
        expect(generationxOptionSelected).toBe(false);

        let babyBoomerOptionStatus = await this.babyBoomersOptionGeneration.getAttribute('class');
        let babyBoomerOptionSelected = babyBoomerOptionStatus!.includes('checked');
        expect(babyBoomerOptionSelected).toBe(false);
    }


    /**
     * Verify that only all option in the gender section is selected
     */
    async verifyOnlyAllOptionIsSelectedGenderSection(){
        let allStatus = await this.allOptionGender.getAttribute('class');
        let allSelected = allStatus!.includes('checked');
        expect(allSelected).toBe(true);

        let femaleOptionStatus = await this.femaleOptionGender.getAttribute('class');
        let femaleOptionSelected = femaleOptionStatus!.includes('checked');
        expect(femaleOptionSelected).toBe(false);

        let maleOptionStatus = await this.maleOptionGender.getAttribute('class');
        let maleOptionSelected = maleOptionStatus!.includes('checked');
        expect(maleOptionSelected).toBe(false);

        let bothNeitherOptionStatus = await this.bothNeitherOptionGender.getAttribute('class');
        let bothNeitherOptionSelected = bothNeitherOptionStatus!.includes('checked');
        expect(bothNeitherOptionSelected).toBe(false);
    }


    /**
     * Verify that only the all option is selected in the incomes section
     */
    async verifyOnlyAllOptionIsSelectedIncomesSection(){

        let allStatus = await this.allOptionIncomes.getAttribute('class');
        let allSelected = allStatus!.includes('checked');
        expect(allSelected).toBe(true);

        let discountShoppersOptionStatus = await this.discountShoppersOptionIncomes.getAttribute('class');
        let discountShopperOptionSelected = discountShoppersOptionStatus!.includes('checked');
        expect(discountShopperOptionSelected).toBe(false);

        let luxuryShoppersOptionStatus = await this.luxuryShoppersOptionIncomes.getAttribute('class');
        let luxuryShopperOptionSelected = luxuryShoppersOptionStatus!.includes('checked');
        expect(luxuryShopperOptionSelected).toBe(false);

        let affluentShoppersOptionStatus = await this.affluentShoppersOptionIncomes.getAttribute('class');
        let affluentShopperOptionSelected = affluentShoppersOptionStatus!.includes('checked');
        expect(affluentShopperOptionSelected).toBe(false);
    }


    /**
     * Verify that the only all option is selected on the behaviros section
     */
    async verifyOnlyAllOptionIsSelectedBehaviorsSection(){
        let allStatus: string | null;
        let allSelected: boolean;
        for(let i = 0; i < 60; i++){
            allStatus = await this.allOptionBehaviors.getAttribute('class');
            allSelected = allStatus!.includes('checked');
            if(allSelected){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(allSelected!).toBe(true);

        let loyalistOptionStatus = await this.loyalistOptionBehaviors.getAttribute('class');
        let loyalistOptionSelected = loyalistOptionStatus!.includes('checked');
        expect(loyalistOptionSelected).toBe(false);

        let soccerMomOptionStatus = await this.soccerMomsOptionsBehaviors.getAttribute('class');
        let soccerMomOptionSelected = soccerMomOptionStatus!.includes('checked');
        expect(soccerMomOptionSelected).toBe(false);

        let frecuentTravelersOptionStatus = await this.frecuentTravelersOptionBehaviors.getAttribute('class');
        let frecuentTravelersOptionSelected = frecuentTravelersOptionStatus!.includes('checked');
        expect(frecuentTravelersOptionSelected).toBe(false);

        let hispanicFoodsOptionStatus = await this.hispanicFoodsOptionBehaviors.getAttribute('class');
        let hispanicFoodsOptionSelected = hispanicFoodsOptionStatus!.includes('checked');
        expect(hispanicFoodsOptionSelected).toBe(false);

        let sportsEnthusiastsOptionStatus = await this.sportsEnthusiastsOptionBehaviors.getAttribute('class');
        let sportsEnthusiastsOptionSelected = sportsEnthusiastsOptionStatus!.includes('checked');
        expect(sportsEnthusiastsOptionSelected).toBe(false);

        let bigBoxShoppersOptionStatus = await this.bigBoxShoppersOptionBehaviors.getAttribute('class');
        let bigBoxOptionSelected = bigBoxShoppersOptionStatus!.includes('checked');
        expect(bigBoxOptionSelected).toBe(false);

        let carRenterOptionStatus = await this.carRentersOptionBehaviors.getAttribute('class');
        let carRenterOptionSelected = carRenterOptionStatus!.includes('checked');
        expect(carRenterOptionSelected).toBe(false);

        let millenialParentsOptionStatus = await this.millenialParentsOptionBehaviors.getAttribute('class');
        let millenialParentsOptionSelected = millenialParentsOptionStatus!.includes('checked');
        expect(millenialParentsOptionSelected).toBe(false);

        let convenienceShoppersOptionStatus = await this.convenienceShoppersOptionBehaviors.getAttribute('class');
        let convenienceShopperOptionSelected = convenienceShoppersOptionStatus!.includes('checked');
        expect(convenienceShopperOptionSelected).toBe(false);

        let fitnessEnthusiastsOptionStatus = await this.fitnessEnthusiastsOptionBehaviors.getAttribute('class');
        let fitnessEnthusiastsOptionSelected = fitnessEnthusiastsOptionStatus!.includes('checked');
        expect(fitnessEnthusiastsOptionSelected).toBe(false);

        let diyersOptionStatus = await this.diyersOptionBehaviors.getAttribute('class');
        let diyersOptionSelected = diyersOptionStatus!.includes('checked');
        expect(diyersOptionSelected).toBe(false);

        let departmentStoreOptionStatus = await this.departmentStoreShoppersOptionBehaviors.getAttribute('class');
        let departmentStoreOptionSelected = departmentStoreOptionStatus!.includes('checked');
        expect(departmentStoreOptionSelected).toBe(false);

        let fastFashionOptionStatus = await this.fastFashionShoppersOptionBehaviors.getAttribute('class');
        let fastFashionOptionSelected = fastFashionOptionStatus!.includes('checked');
        expect(fastFashionOptionSelected).toBe(false);

        let groceryShopperOptionStatus = await this.groceryShoppersOptionBehaviors.getAttribute('class');
        let groceryShopperOptionSelected = groceryShopperOptionStatus!.includes('checked');
        expect(groceryShopperOptionSelected).toBe(false);

        let momsOptionStatus = await this.momsOptionBehaviors.getAttribute('class');
        let momsOptionSelected = momsOptionStatus!.includes('checked');
        expect(momsOptionSelected).toBe(false);

        let dadsOptionStatus = await this.dadsOptionBehaviors.getAttribute('class');
        let dadsOptionSelected = dadsOptionStatus!.includes('checked');
        expect(dadsOptionSelected).toBe(false);

        let petLoversOptionStatus = await this.petLoversOptionsBehavors.getAttribute('class');
        let petLoversOptionSelected = petLoversOptionStatus!.includes('checked');
        expect(petLoversOptionSelected).toBe(false);
    }


    /**
     * Verify that the text in notes field is displayed
     */
    async verifyTheTextInNotesfield(){
        let notesTextAreaVisible: boolean;
        for(let i = 0; i < 60; i++){
            notesTextAreaVisible = await this.notesTextArea.isVisible();
            if(notesTextAreaVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        let notesText = await this.notesTextArea.inputValue();
        expect(notesText).toEqual('notes');
    }


    /**
     * Verify that the error message is displayed in the sections on third step
     */
    async verifyThatTheErrorMessageIsDsiplayedOnThirdStep(errorMessage: string){
        let errorMessageVisible: boolean;

        for(let i = 0; i < 60; i++){
            errorMessageVisible = await this.errorMessage.isVisible();
            if(errorMessageVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        let errorMessageText = await this.errorMessage.textContent();
        expect(errorMessageText).toEqual(errorMessage);
    }


    /**
     * Verify thta the generation x option is selected
     */
    async verifyThatGenerationxOptionGenerationIsSelected(){
        let optionSelected: string | null;
        let optionChecked: boolean;
        for(let i = 0; i < 60; i++){
            optionSelected = await this.generationxOptionGeneration.getAttribute('class');
            optionChecked = optionSelected!.includes('checked');
            if(optionChecked == true){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(optionChecked!).toBe(true);
    }


    /**
     * Verify thta the generation x option is selected
     */
    async verifyThatMaleOptionGenderIsSelected(){
        let optionSelected: string | null;
        let optionChecked: boolean;
        for(let i = 0; i < 60; i++){
            optionSelected = await this.maleOptionGender.getAttribute('class');
            optionChecked = optionSelected!.includes('checked');
            if(optionChecked == true){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(optionChecked!).toBe(true);
    }


    /**
     * Verify that the luxury shoppers option is selected
     */
    async verifyThatLuxuryShoppersOptionIsSelected(){
        let optionSelected: string | null;
        let optionChecked: boolean;
        for(let i = 0; i < 60; i++){
            optionSelected = await this.luxuryShoppersOptionIncomes.getAttribute('class');
            optionChecked = optionSelected!.includes('checked');
            if(optionChecked == true){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(optionChecked!).toBe(true);
    }



    /**
     * Verify thta the generation x option is selected
     */
    async verifyThatFitnessEnthusiastsOptionBehaviorsIsSelected(){
        let optionSelected: string | null;
        let optionChecked: boolean;
        for(let i = 0; i < 60; i++){
            optionSelected = await this.fitnessEnthusiastsOptionBehaviors.getAttribute('class');
            optionChecked = optionSelected!.includes('checked');
            if(optionChecked == true){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(optionChecked!).toBe(true);
    }


    /**
     * Verify that the loyalist option is selected
     */
    async verifyOnlyLoyalistOptionIsSelected(){
        let loyalistOptionStatus: string | null;
        let allGroceryCustomersOptionStatus: string | null;
        let loyalistIsSelected: boolean;
        let allGroceryCustomersOptionIsSelected: boolean;
        for(let i = 0; i < 60; i++){
            loyalistOptionStatus = await this.loyalistMDIInputCustomerBase.getAttribute('class');
            loyalistIsSelected = loyalistOptionStatus!.includes('checked');
            if(loyalistIsSelected == true){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(loyalistIsSelected!).toBe(true);


        allGroceryCustomersOptionStatus = await this.allGroceryCustomersInputCustomerBase.getAttribute('class');
        allGroceryCustomersOptionIsSelected = allGroceryCustomersOptionStatus!.includes('checked');
        expect(allGroceryCustomersOptionIsSelected).toBe(false);
    }


    /**
     * Fill properly all the fields on the third step
     */
    async fillAllFieldsThirdStep(){
        await this.idLikeToChooseMyAudience.click();
        await this.verifyOnlyLoyalistOptionIsSelected();
        await this.verifyOnlyAllOptionIsSelectedGenerationSection();
        await this.verifyOnlyAllOptionIsSelectedGenderSection();
        await this.verifyOnlyAllOptionIsSelectedIncomesSection();
        await this.verifyOnlyAllOptionIsSelectedBehaviorsSection();
        await this.bottomNextButton.click();
        await this.verifyStepIsDisplayed("WHAT");
        await this.verifyTheFourthStepCircleIsSelected();
    }


    /**
     * Verify that the file is uploaded
     */
    async verifyThatTheFileIsUploaded(){
        let uploadedFileTableVisible: boolean;

        for(let i = 0; i < 60; i++){
            uploadedFileTableVisible = await this.uploadedFileTable.locator('tr').first().isVisible();
            if(uploadedFileTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(uploadedFileTableVisible!).toBe(true);
    }


    /**
     * click the delete button from the image row
     * @param name 
     */
    async clickDeletebuttonFromAnImage(name: string){
        let imageVisible: boolean;
        for(let i = 0; i < 60; i++){
            imageVisible = await this.uploadedFileTable.locator('tr').filter({hasText: `${name}`}).locator('button').isVisible();
            if(imageVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.uploadedFileTable.locator('tr').locator('button').click();
    }


    /**
     * Verify that the file is not uploaded
     */
    async verifyThatTheFileIsNotUploaded(){
        let uploadedFileTableVisible: boolean;

        for(let i = 0; i < 60; i++){
            uploadedFileTableVisible = await this.uploadedFileTable.locator('tr').first().isVisible();
            if(!uploadedFileTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(uploadedFileTableVisible!).toBe(false);
    }


    /**
     * Verify not upload alert message message is displayed
     */
    async verifyNotUploadAlertMessageDisplayed(){
        let snackBarVisible: boolean;
        let message = "Can't upload more than 30M";
        for(let i = 0; i < 60; i++){
            snackBarVisible = await this.snackBar.isVisible();
            if(snackBarVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        let elementMessage = (await this.snackBar.textContent())?.trim();
        expect(elementMessage).toEqual(message);
    }


    /**
     * Verify that the image is present
     * @param name 
     */
    async verifyTheImageIsPresentDealCard(name: string){
            let campaignDealCardTableVisible: boolean;

            for(let i = 0; i < 60; i++){
                campaignDealCardTableVisible = await this.campaignDealCardTable.locator('tr').locator(`td:text-is("${name}")`).isVisible();
                if(campaignDealCardTableVisible){
                    break;
                }
                await this.page.waitForTimeout(300);
            }

            expect(campaignDealCardTableVisible!).toBe(true);
    }

    async verifyTheImageIsPresentPromotionalCard(name: string){
        let promotionalCardTable: boolean;
        for(let i = 0; i < 60; i++){
            promotionalCardTable = await this.promotionalCardTable.locator('tr').locator(`td:text-is("${name}")`).isVisible();
            if(promotionalCardTable){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(promotionalCardTable!).toBe(true);
        
    }
}