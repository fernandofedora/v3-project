import {expect, Locator, Page} from '@playwright/test';

export class CampaignMDIModel{

    readonly page: Page;
    readonly adFormMDIUrl: string;
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
    readonly campaignFeaturedBrandField: Locator;
    readonly chooseDate: Locator;
    readonly dateOption: Locator;
    readonly requestHelpButton: Locator;
    readonly notesTextArea: Locator;
    readonly customizeButton: Locator;
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
    readonly IwouldLikeMDIToManageArtwork : Locator;
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
    readonly campaignNotesDHForm: Locator;
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
    readonly finishButton: Locator;
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
    readonly successfulFormSubmisisonHeader: Locator;
    readonly MDIemailLink: Locator;


    constructor (page: Page){
        this.page = page;
        this.adFormMDIUrl = "https://admin.canary.sale/mdi-ad-form";
        this.formHeader = page.locator('div[class="col-8 col-md-8"] > h2');
        this.topBackButton = page.locator('div[class="row d-flex justify-content-center align-items-center m-0"]:nth-child(2) div[class="col-4 col-md-4 d-flex justify-content-end py-2"] > button:nth-child(1)');
        this.topNextButton = page.locator('div[class="row d-flex justify-content-center align-items-center m-0"]:nth-child(2) div[class="col-4 col-md-4 d-flex justify-content-end py-2"] > button:nth-child(2)');
        this.vendorNameField = page.locator('input[formcontrolname="name"]');
        this.vendorNumberField = page.locator('input[formcontrolname="number"]');
        this.contactNameField = page.locator('input[formcontrolname="contactName"]');
        this.emailField = page.locator('input[formcontrolname="email"]');
        this.contactPhoneNumberField = page.locator('p-inputmask[formcontrolname="phoneNumber"]');
        this.productPlacementButton = page.locator('p-radiobutton[inputid="standar"]');
        this.productPlacementBrandButton = page.locator('p-radiobutton[inputid="full"]');
        this.bottomBackButton = page.locator('button[label="Back"]').nth(1);
        this.bottomNextButton = page.locator('button[label="Next"]').nth(1);
        this.firstStepCircle = page.locator('nav[class="p-steps p-component p-readonly"] > ul > li:nth-child(1)');
        this.secondStepCircle = page.locator('nav[class="p-steps p-component p-readonly"] > ul > li:nth-child(2)');
        this.thirdStepCircle = page.locator('nav[class="p-steps p-component p-readonly"] > ul > li:nth-child(3)');
        this.fourthStepCircle = page.locator('nav[class="p-steps p-component p-readonly"] > ul > li:nth-child(4)');
        this.errorMessage = page.locator('app-error-messages > app-alert > ul > li');
        this.campaignNameField = page.locator('input[formcontrolname="campaignTitle"]');
        this.campaignFeaturedBrandField = page.locator('input[formcontrolname="featuredBrandItem"]');
        this.chooseDate = page.locator('p-dropdown[formcontrolname="startDate"]');
        this.dateOption = page.locator('p-dropdownitem:nth-child(1) > li[role="option"]');
        this.requestHelpButton = page.locator('p-button[label="Request Help"]');
        this.notesTextArea = page.locator('textarea');
        this.customizeButton = page.locator('p-button[label="Customize"]');
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
        this.IwouldLikeMDIToManageArtwork = page.locator("button");
        this.graphicRadioButton = page.locator('div[role="region"] > div > div:nth-child(1) > div:nth-child(1) > p-radiobutton > div');
        this.graphicExternalRadioButton = page.locator('div[role="region"] > div > div:nth-child(1) > div:nth-child(2) > p-radiobutton > div');
        this.videoRadioButton = page.locator('div[role="region"] > div > div:nth-child(1) > div:nth-child(3) > p-radiobutton > div');
        this.recipeRadioButton = page.locator('div[role="region"] > div > div:nth-child(1) > div:nth-child(4) > p-radiobutton > div');
        this.externalLinkField = page.locator('div[class="field"] > input');
        this.chooseSupportMediaFiles = page.locator('dh-creative-media-form input[type="file"]');
        this.imageTable = page.locator('tbody[class="p-datatable-tbody"]');
        this.recipeTextArea = page.locator('textarea');
        this.yesBottomConfirmDialog = page.locator('div[class="cdk-overlay-pane"] > mat-dialog-container > app-confirmation-dialog > div:nth-child(3) > button:nth-child(2)');
        this.snackBar = page.locator('body > div[class="cdk-overlay-container"] > div > div > snack-bar-container > div > div > simple-snack-bar');
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
        this.idLikeToAddMyOwnArtworkButton = page.locator('button')
        this.standardRadioButton = page.locator('div[role="region"] > div > div:nth-child(1) > p-radiobutton');
        this.fullBleedRadioButton = page.locator('div[role="region"] > div > div:nth-child(2) > p-radiobutton');
        this.animatedRadioButton = page.locator('div[role="region"] > div > div:nth-child(3) > p-radiobutton');
        this.campaignDealCardTypeDHForm = page.locator('dh-review-form > div > div:nth-child(7) > div:nth-child(2) p');
        this.campaignDealCardTable = page.locator('dh-review-form > div > div:nth-child(7) > div:nth-child(3) table tbody');
        this.finishButton = page.locator('button > span:text-is("Finish")').nth(1);
        this.vendorInformationEditButton = page.locator('dh-review-form > div > div:nth-child(1) > div:nth-child(2) > button');
        this.campaignDetailsEditButton = page.locator('dh-review-form > div > div:nth-child(3) > div button');
        this.audienceDetailsEditButton = page.locator('dh-review-form > div > div:nth-child(5) > div button');
        this.promotionalCardEditButton = page.locator('dh-review-form > div > div:nth-child(7) > div:nth-child(5)> div button');
        this.yesButtonConfirmationDialog = page.locator('button')
        this.confirmationMessage = page.locator('dh-confirmation-view > div > h2');
        this.confirmationContactNameField = page.locator('dh-confirmation-view > div > div[class="ng-star-inserted"] > p:nth-child(5)');
        this.confirmationUserEmailField = page.locator('dh-confirmation-view > div > div[class="ng-star-inserted"] > p:nth-child(6)');
        this.welcomeHeader = page.locator('div[class="p-card-body"] h2');
        this.startYourCampaignHeader = page.locator('div[class="p-card-body"] div[class^="row d-flex"]:nth-child(3) h3');
        this.uploadYourDigitalAssetsHeader = page.locator('div[class="p-card-body"] div[class^="row d-flex"]:nth-child(5) h3');
        this.guidelinesForCampaignsAndDigitalAssetsHeader = page.locator('div[class="p-card-body"] div[class^="row d-flex"]:nth-child(7) h3');
        this.ampDigitalCircularHeader = page.locator('div[class="p-card-body"] div[class^="row d-flex"]:nth-child(9) h4');
        this.mdiIdealImage = page.locator('div[class="p-card-header"] img');
        this.submitVendorAdFormButton = page.locator('div[class="p-card-body"] div[class^="row d-flex"]:nth-child(3) a');
        this.uploadDigitalAssetsButton = page.locator('div[class="p-card-body"] div[class^="row d-flex"]:nth-child(5) a');
        this.downloadSharepointGuideButton = page.locator('div[class="p-card-body"] div[class^="row d-flex"]:nth-child(8) a');
        this.downloadCircularGuideButton = page.locator('div[class="p-card-body"] div[class^="row d-flex"]:nth-child(5) > div:nth-child(2) > a');
        this.successfulFormSubmisisonHeader = page.locator('dh-confirmation-view > div > h3');
        this.MDIemailLink = page.locator('a:text-is("digital@mdi.com")');
    }


    /**
     * Verify that the welcome header is displayed
     */
    async verifyThatWelcomeHeaderIsDisplayed(){
        let welcomeHeaderVisible: boolean;

        for(let i = 0; i < 60; i++){
            welcomeHeaderVisible = await this.welcomeHeader.isVisible();
            if(welcomeHeaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(welcomeHeaderVisible!).toBe(true);
    }


    /**
     * Verify that the mdi image is displayed
     */
    async verifyThatMdiImageIsDisplayed(){
        let mdiIdealImageVisible: boolean;

        for(let i = 0; i < 60; i++){
            mdiIdealImageVisible = await this.mdiIdealImage.isVisible();
            if(mdiIdealImageVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(mdiIdealImageVisible!).toBe(true);
    }


    /**
     * Get the mdi image source image
     */
    async verifyTheSourceImage(){
        let mdiImageSource = await this.mdiIdealImage.getAttribute("src");
        expect(mdiImageSource).toEqual('assets/images/portal-logo.png');
    }


    /**
     * Verify that the welcome header text is displayed
     */
    async verifyThatWelcomeHeaderTextIsDisplayed(){
        let welcomeHeaderText = await this.welcomeHeader.textContent();
        expect(welcomeHeaderText).toEqual("Welcome to MDI AMP Program");
    }


    /**
     * Verify that the start your campaign header is displayed
     */
    async verifyThatStartYourCampaignTextIsDisplayed(){
        let startYourCampaignHeaderText = await this.startYourCampaignHeader.textContent();
        expect(startYourCampaignHeaderText).toEqual("Start your campaign");
    }


    /**
     * Verify that upload digital assets text is displayed
     */
    async verifyThatUploadDigitalAssetsTextIsDisplayed(){
        let uploadYourDigitalAssets = await this.uploadYourDigitalAssetsHeader.textContent();
        expect(uploadYourDigitalAssets).toEqual("Upload your digital assets");
    }


    /**
     * Verify that the submit vendorAdFormButton is visible
     */
    async verifyThatSubmitVendorAdFormButtonIsVisible(){
        let submitVendorAdFormButtonVisible: boolean;

        for(let i = 0; i < 60; i++){
            submitVendorAdFormButtonVisible = await this.submitVendorAdFormButton.isVisible();
            if(submitVendorAdFormButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(submitVendorAdFormButtonVisible!).toBe(true);
    }


    /**
     * Verify that the upload digital assets button is visible
     */
    async verifyUploadDigitalAssetsButtonIsVisible(){
        let uploadDigitalAssetsButtonVisible: boolean;

        for(let i = 0; i < 60; i++){
            uploadDigitalAssetsButtonVisible = await this.uploadDigitalAssetsButton.isVisible();
            if(uploadDigitalAssetsButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(uploadDigitalAssetsButtonVisible!).toBe(true);
    }


    /**
     * Verify that the download sharepoint button is visible
     */
    async verifyDownloadSharepointButtonIsVisible(){
        let downloadSharepointGuideButtonVisible: boolean;

        for(let i = 0; i < 60; i++){
            downloadSharepointGuideButtonVisible = await this.downloadSharepointGuideButton.isVisible();
            if(downloadSharepointGuideButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(downloadSharepointGuideButtonVisible!).toBe(true);
    }


    /**
     * Verify thta the download circular guide button is displayed
     */
    async verifyDownloadCircularGuideButtonIsVisible(){
        let downloadCircularGuideButtonVisible: boolean;

        for(let i = 0; i < 60; i++){
            downloadCircularGuideButtonVisible = await this.downloadCircularGuideButton.isVisible();
            if(downloadCircularGuideButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(downloadCircularGuideButtonVisible!).toBe(true);
    }


    /**
     * Verify that the vendor name field is displayed
     */
    async verifyVendorNameFieldIsDisplayed(){
        let vendorNameFieldVisible: boolean;

        for(let i = 0; i < 60; i++){
            vendorNameFieldVisible = await this.vendorNameField.isVisible();
            if(vendorNameFieldVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(vendorNameFieldVisible!).toBe(true);
    }


    /**
     * Verify that the correct step is displayed
     * @param text 
     */
    async verifyStepIsDisplayed(text: string){
        let contains: boolean;
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
     * Verify thta the confirmation message is displayed
     */
    async verifyTheConfirmationMessageIsDisplayed(){
        let confirmationMessageVisible: boolean;
        for(let i =0; i < 60; i++){
            confirmationMessageVisible = await this.confirmationMessage.isVisible();
            if(confirmationMessageVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(confirmationMessageVisible!).toBe(true);
    }


    /**
     * Verify that the successfull form is displayed
     */
    async verifyThatTheSuccessFullFormSubmisisonHeaderIsDisplayed(){
        let successfulFormSubmisisonHeaderVisible: boolean;
        for(let i = 0; i < 60; i++){
            successfulFormSubmisisonHeaderVisible = await this.successfulFormSubmisisonHeader.isVisible();
            if(successfulFormSubmisisonHeaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
    }


    /**
     * Verify that the MDI email link is displayed
     */
    async verifyThatTheMDIemailLinkFieldIsDisplayed(){
        let MDIemailLinkVisible: boolean;
        for(let i = 0; i < 60; i++){
            MDIemailLinkVisible = await this.MDIemailLink.isVisible();
            if(MDIemailLinkVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(MDIemailLinkVisible!).toBe(true);
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
        let errorsMessages = ['Name is required.','Number is required.', 'Contactname is required.', 'Email is required.', 'Phonenumber is required.'];
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
}