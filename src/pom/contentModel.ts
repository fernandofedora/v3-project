import {expect, Locator, Page} from '@playwright/test';
import moment, { Moment } from 'moment';
import { BrandsModel } from '../pom/brandsModel';
import { dealTypes, contentData} from '../data/contentData';
import { CommonModel } from '../pom/commonModel';
import {v4 as uuidv4} from 'uuid';


export class ContentModel{

    readonly page: Page;
    readonly singleItemButton: Locator;
    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly dealDropdown: Locator;
    readonly dropdownList: Locator;
    readonly categoryDropdown: Locator;
    readonly contentTable: Locator;
    readonly cardDetailLabel: Locator;
    readonly relativeElement: Locator;
    readonly spinner: Locator;
    readonly deleteContentButton: Locator;
    readonly yesButton: Locator;
    readonly priceField: Locator;
    readonly unitsField: Locator;
    readonly categoryDropdownExpandedMenu: Locator;
    readonly xField: Locator;
    readonly yField: Locator;
    readonly zField: Locator;
    readonly qtyField: Locator
    readonly pField: Locator;
    readonly units2Field: Locator;
    readonly priceMonetaryField: Locator;
    readonly amountOffDropdown: Locator;
    readonly upcField: Locator;
    readonly recipeDropdown: Locator;
    readonly datetimeItems: Locator;
    readonly customDateButton: Locator;
    readonly selectedTime: Locator;
    readonly bulkItemBtn: Locator;
    readonly chooseButton: Locator;
    readonly stepsTitleHighlight: Locator;
    readonly nextButton: Locator;
    readonly categoryMessages: Locator;
    readonly doneButton: Locator;
    readonly categoryCardDetailDropdown: Locator;
    readonly contentSpinner: Locator;
    readonly artHeader: Locator;
    readonly titleHeader: Locator;
    readonly daysHeader: Locator;
    readonly dealsHeader: Locator;
    readonly ownerHeader: Locator;
    readonly widthHeader: Locator;
    readonly heightHeader: Locator;
    readonly cardDetailPanel: Locator;
    readonly styleCardDetailDropdown: Locator;
    readonly cardStyleDropdown: Locator;
    readonly dropdownItems: Locator;
    readonly contentTableSkeleton: Locator;
    readonly styleDropdown: Locator;
    readonly cardStyleItems: Locator;
    readonly lengthCardDetailInput: Locator;
    readonly heightCardDetailInput: Locator;
    readonly mediaTypeCardDetailDropdown: Locator;
    readonly videoIdCardDetailInput: Locator;
    readonly imageThumbCardDetailInput: Locator;
    readonly mediaSaveBtn: Locator;
    readonly dateRangeCardDetailBtn: Locator;
    readonly startsOnInput: Locator;
    readonly expiresInput: Locator;
    readonly submitBtn: Locator;
    readonly upcCardDetailInput: Locator;
    readonly upcInput: Locator;
    readonly headlinesSelect: Locator;
    readonly multiSelectItemsOptions: Locator;
    readonly addNewBtn: Locator;
    readonly nameHeadlineInput: Locator;
    readonly multiSelectCloseBtn: Locator;
    readonly saveBtn: Locator;
    readonly iconsSelect: Locator;
    readonly nameIconInput: Locator;
    readonly uploadImageIcon: Locator;
    readonly titleCardDetailInput: Locator;
    readonly platformDropdown: Locator;
    readonly linkCardDetailBtn: Locator;
    readonly cardUtilityPanel: Locator;
    readonly switchTypeSelected: Locator;
    readonly closeModal: Locator;
    readonly clickLinkCardDetailInput: Locator;
    readonly referenceNameInput: Locator;
    readonly descriptionCardDetailInput: Locator;
    readonly ignoreButton: Locator;
    readonly switchImageFull: Locator;
    readonly amountOffDropdownOptions: Locator;
    readonly createContentButton: Locator;
    readonly imageLoader: Locator;
    readonly editContentTitle: Locator;
    readonly editContentCategory: Locator;
    readonly editContentDealtype: Locator;
    readonly bulkContentPreviewTable: Locator;
    readonly editContentFixedPriceInput: Locator;
    readonly editContentFixedUnitsInput: Locator;
    readonly editContentBogoXInput: Locator;
    readonly editContentBogoYInput: Locator;
    readonly editContentUpcInput: Locator;
    readonly missingFieldsAlert: Locator;
    readonly clickHereMissingFieldAlert: Locator;
    readonly manageContentTitle: Locator;
    readonly uploadImageButton: Locator;
    readonly couponAmountOffField: Locator;
    readonly couponLimitField: Locator;
    readonly couponQuantityRequiredField: Locator;
    readonly chevronRight: Locator;
    readonly generalHeader: Locator;
    readonly dateRangeHeader: Locator;
    readonly cardHeader: Locator;
    readonly mediaIconsHeader: Locator;
    readonly headlinesHeader: Locator;
    readonly couponsHeader: Locator;
    readonly visibleButton: Locator;
    readonly logoutButton: Locator;
    readonly sideBar: Locator;
    readonly snackBar: Locator;
    readonly errorButton: Locator; 
    readonly errorMessagePanel: Locator;
    readonly closeModalLinkButton: Locator;
    readonly videoPlatformDropdown: Locator;
    readonly platformVideoOption: Locator;
    readonly stackButtonRow: Locator;
    readonly campaignBlockEditorModal: Locator;
    readonly titleFromCardinCampaignBlockEditor: Locator;
    readonly leftTableRow: Locator;
    readonly doneButtonCampainBlockBuilder: Locator;
    readonly rightTableRow: Locator;
    readonly expandStackedGroupButton: Locator;
    readonly searchCategoryName: Locator;
    readonly selectAllButton: Locator;
    readonly accordionTable: Locator;
    readonly pageSelector: Locator;
    readonly pageMenu: Locator;
    readonly sideBarMenu: Locator;
    readonly categorySideMenuButton: Locator;
    readonly sideMenucategoryTable: Locator;
    readonly categoryFilterButton: Locator;
    readonly categoryFilterMenu: Locator;
    readonly categoryFilterCheckbox: Locator;
    readonly categoryFilterCategoryName: Locator;
    readonly createCategoryButton: Locator;
    readonly categoryFilterApplyButton: Locator;
    readonly contentPreviewTable: Locator;
    readonly dateTextField: Locator;
    readonly loyaltyDealsToggle: Locator;
    readonly loyaltyDealLabel: Locator;
    readonly loyaltyDealLogo: Locator;
    readonly loyaltyColor: Locator;

    constructor (page: Page){
        this.page = page;
        this.singleItemButton = page.locator('div[class="dh-detail-page__toolbar-actions-pane ng-star-inserted"] > dh-button:nth-child(3)');
        this.titleInput = page.locator('div.form-group:nth-child(2) > dh-multilingual-input:nth-child(1) input');
        this.descriptionInput = page.locator('div.content-form-fields p-accordiontab:nth-child(1) div[role="region"] > div > div:nth-child(2) > div > dh-multilingual-input > div > textarea');
        this.dealDropdown = page.locator('div.p-accordion p-accordiontab:nth-child(3) > div > div:nth-child(2) >div > div:nth-child(2) > div p-dropdown');
        this.dropdownList = page.locator('div.p-dropdown-items-wrapper ul');
        this.categoryDropdown = page.locator('div.p-accordion p-accordiontab:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(4) p-dropdown');
        this.contentTable = page.locator('dh-detail-page div.dh-media-content__grid-container p-table table tbody:nth-child(2)');
        this.cardDetailLabel = page.locator('div > span:text("SINGLE CARD EDITOR")');
        this.relativeElement = page.locator('div[style="position: relative; height: 1.7rem; margin: 1rem 0;"]:nth-child(2)');
        this.spinner = page.locator('mat-spinner > svg');
        this.deleteContentButton = page.locator('div.content-padding-container div img[alt="Trash"]');
        this.yesButton = page.locator('button > span:text-is("Yes")');
        this.priceField = page.locator('div.p-accordion p-accordiontab:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(3) > div > div > div:nth-child(1) input');
        this.unitsField = page.locator('div.p-accordion p-accordiontab:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(3) > div > div > div:nth-child(2) input');
        this.categoryDropdownExpandedMenu = page.locator('dh-content-form div.form-group:nth-child(7) p-dropdown');
        this.xField = page.locator('div.p-accordion p-accordiontab:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(1) input');
        this.yField = page.locator('div.p-accordion p-accordiontab:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2) input');
        this.zField = page.locator('div.p-accordion p-accordiontab:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(3) input');
        this.qtyField = page.locator('div.p-accordion p-accordiontab:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(3) > div > div > div:nth-child(1) input');
        this.pField = page.locator('div.p-accordion p-accordiontab:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(3) > div > div > div:nth-child(2) input');
        this.units2Field = page.locator('div.p-accordion p-accordiontab:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(3) > div > div > div:nth-child(3) input');
        this.priceMonetaryField = page.locator('div.p-accordion p-accordiontab:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(3) > div > div > div:nth-child(1) input');
        this.amountOffDropdown = page.locator('div.p-accordion p-accordiontab:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(3) > div > div > div:nth-child(2) p-dropdown');
        this.upcField = page.locator('div.p-accordion p-accordiontab:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(4) input');
        this.recipeDropdown = page.locator('div.p-accordion p-accordiontab:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(3) p-dropdown');
        this.datetimeItems = page.locator('div.dh-datetime-selector__item-container');
        this.customDateButton = page.locator('div.dh-datetime-selector__custom-date-button-container');
        this.selectedTime = page.locator('div.dh-datetime-selector__selected-time');
        this.bulkItemBtn = page.locator('dh-button > div.dh-button.adjust-button-height.full-width.small.white-button');
        this.chooseButton = page.locator('p-fileupload .p-fileupload-choose');
        this.stepsTitleHighlight = page.locator('nav[data-pc-name="steps"] ul li.p-highlight.p-steps-current span.p-steps-title');
        this.nextButton = page.locator('button > span:text-is("Next")');
        this.categoryMessages = page.locator('div > span:nth-child(3):text-is("No categories need to be processed now, you can continue!")');
        this.doneButton = page.locator('button > span:text-is("Done")');
        this.categoryCardDetailDropdown = page.locator('div.dh-media-content__card-details-panel p-dropdown[optionlabel="displayName"] > div');
        this.contentSpinner = page.locator('i.pi-spin');
        this.doneButton = page.locator('button > span:text-is("Done")');
        this.artHeader = page.locator('p-table[styleclass="dh-media-content__grid"] table:nth-child(1) > thead:nth-child(1) tr th:nth-child(2)');
        this.titleHeader = page.locator('p-table[styleclass="dh-media-content__grid"] table:nth-child(1) > thead:nth-child(1) tr th:text-is("Title")');
        this.daysHeader = page.locator('p-table[styleclass="dh-media-content__grid"] table:nth-child(1) > thead:nth-child(1) tr th:text-is("Days")');
        this.dealsHeader = page.locator('p-table[styleclass="dh-media-content__grid"] table:nth-child(1) > thead:nth-child(1) tr th:text-is("Deal Type")');
        this.ownerHeader = page.locator('p-table[styleclass="dh-media-content__grid"] table:nth-child(1) > thead:nth-child(1) tr th:text-is("Owner")');
        this.widthHeader = page.locator('p-table[styleclass="dh-media-content__grid"] table:nth-child(1) > thead:nth-child(1) tr th:text-is("size")');
        this.heightHeader = page.locator('tr > th:text-is("Height")');
        this.cardDetailPanel = page.locator('div.dh-media-content__card-details-panel div.dh-media-content__sidebar-panel-title');
        this.styleCardDetailDropdown = page.locator('div.p-accordion p-accordiontab:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(1) > div')
        this.cardStyleDropdown = page.locator('p-dropdown[formcontrolname="cardStyleHash"] > div');
        this.dropdownItems = page.locator('p-dropdownitem');
        this.contentTableSkeleton = page.locator('dh-detail-page div.dh-detail-page__content p-skeleton');
        this.cardStyleItems = page.locator('ul[role="listbox"]');
        this.lengthCardDetailInput = page.locator('div.p-accordion p-accordiontab:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(5) > div:nth-child(1) input');
        this.heightCardDetailInput = page.locator('div.p-accordion p-accordiontab:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(5) > div:nth-child(2) input');
        this.mediaTypeCardDetailDropdown = page.locator('div.p-accordion p-accordiontab:nth-child(4) > div > div:nth-child(2) > div > div:nth-child(2) > div >p-dropdown');
        this.videoIdCardDetailInput = page.locator('p-accordiontab:nth-child(3) div:nth-child(3) > div > div > div > input');
        this.imageThumbCardDetailInput = page.locator('dh-dd-file-upload');
        this.mediaSaveBtn = page.locator('app-input-media-content-dialog div[role="complementary"] button[label="Save"]');
        this.dateRangeCardDetailBtn = page.locator('div:text-is("Date Range")');
        this.startsOnInput = page.locator('app-datetime-range-picker[controlnamefrom="validFrom"] app-datetime-picker[label="Starts on"] input');
        this.expiresInput = page.locator('app-datetime-range-picker[controlnamefrom="validFrom"] app-datetime-picker[label="Expires"] input');
        this.submitBtn = page.locator('div[role="dialog"] p-button[label="Submit"] button');
        this.upcCardDetailInput = page.locator('div.form-group > input[maxlength="14"]');
        this.upcInput = page.locator('div.p-panel-content input[formcontrolname="upc"]');
        this.headlinesSelect = page.locator('app-headline-field-content div.p-multiselect-label-container');
        this.multiSelectItemsOptions = page.locator('ul[role="listbox"] > p-multiselectitem > li');
        this.addNewBtn = page.locator('div.p-multiselect-footer>p-footer>dh-button');
        this.nameHeadlineInput = page.locator('app-translation-field[formcontrolname="name"] input[formcontrolname="translation"]');
        this.multiSelectCloseBtn = page.locator('div.p-multiselect-header>button.p-multiselect-close');
        this.saveBtn = page.locator('mat-dialog-container button[color="primary"]');
        this.iconsSelect = page.locator('app-icon-mutilist-field div.p-multiselect-label-container');
        this.nameIconInput = page.locator('mat-form-field input[formcontrolname="name"]');
        this.uploadImageIcon = page.locator('button mat-icon[role="img"]');
        this.titleCardDetailInput = page.locator('dh-multilingual-input input[type="text"]').nth(0);
        this.platformDropdown = page.locator('p-dropdown[optionvalue="value"] > div').nth(2);
        this.linkCardDetailBtn = page.locator('div:text-is("Link")');
        this.cardUtilityPanel = page.locator('div.dh-media-content__sidebar-bar div.dh-media-content__sidebar-bar-title');
        this.switchTypeSelected = page.locator('div.dh-switch-group > label');
        this.closeModal = page.locator('button.p-dialog-header-close');
        this.clickLinkCardDetailInput = page.locator('div[role="dialog"] dh-click-link-input input');
        this.referenceNameInput = page.locator('div.p-panel-content input[formcontrolname="referenceName"]');
        this.descriptionCardDetailInput = page.locator('.content-description');
        this.ignoreButton = page.locator('div > label:text-is("Ignore")');
        this.switchImageFull = page.locator('div.dh-switch-group p-inputswitch');
        this.amountOffDropdownOptions = page.locator('p-dropdown').filter({ hasText: 'Monetary' });
        this.createContentButton = page.locator('p-toolbar button[label="Create content"]');
        this.imageLoader = page.locator('app-image-loader>div.preview-container > img.preview-image');
        this.editContentTitle = page.locator('div.p-panel-content app-translation-field:nth-child(1) input');
        this.editContentCategory = page.locator('p-dropdown[id="category-input"]');
        this.editContentDealtype = page.locator('p-dropdown[id="deal-type-input"]');
        this.bulkContentPreviewTable = page.locator('app-manage-preview-content p-table table.p-datatable-table > tbody');
        this.editContentFixedPriceInput = page.locator('input[id="fixed-price-input"]');
        this.editContentFixedUnitsInput = page.locator('input[id="fixed-units-input"]');
        this.editContentBogoXInput = page.locator('input[id="bogo-buy-quantity-input"]');
        this.editContentBogoYInput = page.locator('input[id="bogo-get-quantity-input"]');
        this.editContentUpcInput = page.locator('input[id="reference-name-input"]');
        this.missingFieldsAlert = page.locator('div.container-error > mat-card');
        this.clickHereMissingFieldAlert = page.locator('div.container-error > mat-card a');
        this.manageContentTitle = page.locator('h2.p-card-title');
        this.uploadImageButton = page.locator('dh-new-icon-dialog app-input-dh-media button');
        this.couponAmountOffField = page.locator('div.p-accordion p-accordiontab:nth-child(4) > div > div:nth-child(2) > div > div:nth-child(1) input');
        this.couponLimitField = page.locator('div.p-accordion p-accordiontab:nth-child(4) > div > div:nth-child(2) > div > div:nth-child(3) input');
        this.couponQuantityRequiredField = page.locator('div.p-accordion p-accordiontab:nth-child(4) > div > div:nth-child(2) > div > div:nth-child(2) input');
        this.chevronRight = page.locator('a span.pi-chevron-right');
        this.generalHeader = page.locator('dh-content-form a > div > span:text-is("General")');
        this.dateRangeHeader = page.locator('dh-content-form a > div > span:text-is("Date Range")');
        this.cardHeader = page.locator('dh-content-form a > div > span:text-is("Card")');
        this.mediaIconsHeader = page.locator('dh-content-form a > div > span:text-is("Media/Icons")');
        this.headlinesHeader = page.locator('dh-content-form a > div > span:text-is("Headline")');
        this.couponsHeader = page.locator('dh-content-form a > div > span:text-is(" Coupon ")');
        this.visibleButton = page.locator('div.content-form-wrapper > div:nth-child(1) > div > div:nth-child(2)');
        this.logoutButton = page.locator('dh-button[styles="small secondary"]');
        this.sideBar = page.locator('div.dh-media-content__sidebar-bar > img:nth-child(1)');
        this.visibleButton = page.locator('div.content-form-wrapper > div:nth-child(1) > div > div:nth-child(2)');        
        this.snackBar = page.locator('mat-snack-bar-container simple-snack-bar');
        this.errorButton= page.locator('i.error');
        this.errorMessagePanel = page.locator('div.p-overlaypanel-content');
        this.closeModalLinkButton = page.locator('button.p-dialog-header-close');
        this.videoPlatformDropdown = page.locator('p-accordiontab:nth-child(3) div:nth-child(3) p-dropdown[optionvalue="value"]');
        this.platformVideoOption = page.locator('div.p-dropdown-items-wrapper > ul > p-dropdownitem');
        this.stackButtonRow = page.locator('td.dh-media-content__grid__stacked-content > img');
        this.campaignBlockEditorModal = page.locator('div.cdk-overlay-container');
        this.titleFromCardinCampaignBlockEditor = page.locator('app-group-parent-dialog > div > div:nth-child(2) > div:nth-child(1) > p-table > div > div > table > tbody > tr > td.td-title');
        this.leftTableRow = page.locator('app-group-parent-dialog > div > div:nth-child(2) > div:nth-child(1) > p-table > div > div > table > tbody > tr');
        this.doneButtonCampainBlockBuilder = page.locator('button[label="Done"]');
        this.rightTableRow = page.locator('app-group-parent-dialog > div > div:nth-child(2) > div:nth-child(2) > p-table > div > div > table > tbody > tr');
        this.expandStackedGroupButton = page.locator('button.parent-content-arrow');
        this.searchCategoryName = page.locator("div.ng-trigger-overlayContentAnimation input");
        this.selectAllButton = page.locator('dh-detail-page thead th p-checkbox');
        this.accordionTable = page.locator('dh-detail-page div.dh-media-content__grid-container p-accordion');
        this.pageSelector = page.locator('div.content-header-wrapper > div:nth-child(1) > div > div > div:nth-child(1)');
        this.pageMenu = page.locator('div.p-overlaypanel-content');
        this.sideBarMenu = page.locator('div.dh-media-content__sidebar-bar');
        this.categorySideMenuButton = page.locator('div.dh-media-content__sidebar-container > div:nth-child(1) > div:nth-child(2)');
        this.sideMenucategoryTable = page.locator('div.dh-media-content__sidebar-container p-table tbody');
        this.categoryFilterButton = page.locator('p-columnfilter button.p-column-filter-menu-button');
        this.categoryFilterMenu = page.locator('div.p-column-filter-constraints');
        this.categoryFilterCheckbox = page.locator('div.category-list > div > p-checkbox');
        this.categoryFilterCategoryName = page.locator('div.category-list > div > label');
        this.createCategoryButton = page.locator('button[label="Create"]');
        this.categoryFilterApplyButton = page.locator('p-columnfilterformelement > div > div:nth-child(2) > p-button:nth-child(2)');
        this.contentPreviewTable = page.locator('app-manage-preview-content p-table table tbody:nth-child(2)');
        this.dateTextField = page.locator('textarea').nth(1);
        this.loyaltyDealsToggle = page.getByLabel('Loyalty Deals');
        this.loyaltyDealLabel= page.locator('div').filter({ hasText: /^Loyalty Deal Label$/ }).nth(2);
        this.loyaltyDealLogo = page.locator('div').filter({ hasText: /^Loyalty Deal Logo$/ });
        this.loyaltyColor = page.getByPlaceholder('Loyalty', { exact: true });
    }

    async onClickCardUtilityPanel() {
        let cardUtilityPanelVisible: boolean;

        for(let i = 0; i < 60; i++){
            cardUtilityPanelVisible = await this.cardUtilityPanel.isVisible();
            if(cardUtilityPanelVisible){
                break;
            }
        }
        await this.cardUtilityPanel.click();
    }

    /**
     * Click a deal type for the new content
     * @param dealType
     */
    async selectDealType(dealType: string) {
        const commonModel = new CommonModel(this.page);
        await commonModel.verifyThatLocatorIsVisible(this.dropdownList);
        const listItems = await this.dropdownList.locator('p-dropdownitem').count();
        let listItem = this.dropdownList.locator('p-dropdownitem');

        for(let i = 0; i < listItems; i++){
            const textItem = await listItem.nth(i).textContent();
            //console.log(textItem);
            if(textItem == dealType){
                await listItem.nth(i).click({delay:200});
                break;
            }

        }
    }

    /**
     * Click a category for a new content
     * @param index
     */
    async selectCategory(index: number){
        let dropdownListOptionVisible: boolean;
        for(let i = 0; i < 60; i++){
            dropdownListOptionVisible = await this.dropdownList.locator('p-dropdownitem > li').first().isVisible();
            if(dropdownListOptionVisible){
                break;
            }
            await this.page.waitForTimeout(400);
        }
        const listItems = await this.dropdownList.locator('p-dropdownitem').count();
        let listItem = this.dropdownList.locator('p-dropdownitem').nth(index);
        await listItem.click({ delay:800 })
    }

    /**
     * Verify the content is created
     * @param name
     */
    async newContentIsCreated(name: string, type: string, brandName: string, userRole?: string){

        await expect( async () => {
            await expect(this.page.getByRole('row', { name: `${name}` })).toBeVisible( {timeout: 300} );
        }).toPass();

        if(userRole == 'Store Owner'){
            const newContentBrand = await this.contentTable.locator(`tr:has-text("${name}")`).locator(`td:nth-child(6)`).textContent();
            expect(newContentBrand?.trim()).toEqual('storeContent');
        }else{
            await this.contentTable.locator(`tr:has-text("${name}")`).scrollIntoViewIfNeeded();
            const newContentTile = await this.contentTable.locator(`tr:has-text("${name}")`).locator(`td:nth-child(3)`).textContent();
            const newContentType = await this.contentTable.locator(`tr:has-text("${name}")`).locator(`td:nth-child(5)`).textContent();
            const newContentBrand = await this.contentTable.locator(`tr:has-text("${name}")`).locator(`td:nth-child(6)`).textContent();
            expect(newContentTile?.trim()).toEqual(name);
            expect(newContentType?.trim()).toEqual(type);
            expect(newContentBrand?.trim()).toEqual(brandName);
        }

    }


    /**
     * Delete content by name
     * @param name
     */
    async deleteContentByName(name: string){

        await expect( async () => {
            await expect(this.contentTable.locator(`tr:has-text("${name}")`)).toBeVisible( {timeout:300} );
        }).toPass();

        await this.contentTable.locator(`tr:has-text("${name}")`).click();
        
        await expect( async () => {
            await this.deleteContentButton.click( {delay:300} );
        }).toPass();

        await expect( async () => {
            await expect(this.yesButton).toBeVisible( {timeout:300} );
            await this.yesButton.click();
        }).toPass();

        await expect( async () => {
            await expect(this.contentTable.locator(`tr:has-text("${name}")`)).not.toBeVisible( {timeout:300} );
        }).toPass();
    }


    /**
    * Click a deal type for the new content
    * @param dealType
    */
    async selectAmountOffType(dealType: string) {

        const listItems = await this.dropdownList.locator('p-dropdownitem').count();
        let listItem = this.dropdownList.locator('p-dropdownitem');

        for(let i = 0; i < listItems; i++){
            const textItem = await listItem.nth(i).textContent();
            if(textItem == dealType){
                await listItem.nth(i).click();
                break;
            }
        }
    }


    /**
     * Select recipe in the content module
     * @param index
     */
    async selectRecipe(index: number){
        await this.recipeDropdown.click();
        await this.page.waitForTimeout(500);
        let listItem = this.dropdownList.locator('p-dropdownitem li').nth(index);
        await listItem.click({delay: 200});
        await this.page.waitForTimeout(500);

        for (let i = 0; i < 30; i++) {
            if (await this.recipeDropdown.locator('span.p-dropdown-label').innerText() == '...') {
                await this.recipeDropdown.click();
                await listItem.click();
            } else {
                break;
            }
        }
    }


   async getDatesForCircular(count: number, startDayValue: string){
    const brandModel = new BrandsModel(this.page);
    const dateDifference = Number(startDayValue) - moment().weekday();
    const circularStartDay = brandModel.getCircularStartDay(startDayValue);
    let date: Moment[] = [];
    const firstWeek = (dateDifference >= 0) ? moment().day(circularStartDay).subtract(7, 'days') : moment().day(circularStartDay);
    date.push(firstWeek);
    for(let i = 1; i < count; i++){
        const previousDate = date[i-1];
        date.push(moment(previousDate).add(7, 'days'));
    }

        return date;
    }


    /**
     * 24 hours format into AM/PM format
     * @param {string} hour
     * @returns ampmTime The hour in AM/PM format
     */
    formatAMPM(hour: string){
        const ampmTime = moment(hour, ["HH:mm"]).format("hh:mm a") // 12 hour time (with am/pm)
        return ampmTime;
    }


    /**
     * Add the datetime displayed on the view to an array for then make a comparison
     * @param {number} count
     * @returns The dates displayed on the content view
     */
    async getStartDatesDisplayedOnView(count: number){
            let startDates: string[] = [];
            let dateText: string = "";
            let dateArray: string[] = [];
            let dateReplaced: string = "";
            let dateModified: string = "";
            let newDay = "";
            await expect(this.customDateButton).toBeVisible();
            await this.customDateButton.hover();
            for(let i = 0; i < count; i++){
                dateText = await this.datetimeItems.nth(i).textContent() as string;
                dateReplaced = dateText.replace('\n',' ');
                dateArray = dateReplaced.split(' ');
                if(dateArray[1].length == 1){
                    newDay = '0' + dateArray[1];
                    dateModified = dateArray[0] + " " + newDay;
                    startDates.push(dateModified);
                }else{
                    startDates.push(dateReplaced);
                }

            }

        return startDates;
    }


   async checkTimesOnContentView(startDayValue: string, circularStartTime: string, circularTimezone: string){
        let isVisible: boolean;
        for(let i = 0; i < 60; i++){
            isVisible = await this.datetimeItems.nth(0).isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(isVisible!).toBe(true);
        const datetimeItemsCount = await this.datetimeItems.count();
        const circularDate = await this.getDatesForCircular(datetimeItemsCount, startDayValue);

        const currentYear = circularDate[1].format('YYYY').toString();
        const startTimeAmPm = this.formatAMPM(circularStartTime);
        const timezoneInitials = circularTimezone.charAt(0)+'T';

        // Add the datetime displayed on the view to an array for then make a comparison
        const startDates = await this.getStartDatesDisplayedOnView(datetimeItemsCount);
        
        // Check the circular time zone must be displayed on the content selected time
        let timeZone = await this.selectedTime.textContent();
        let timeZone2 = timeZone?.trim();
        expect(timeZone2).toContain(currentYear +'  '+startTimeAmPm +'  ' + timezoneInitials);


        // The scheduled dates listed before the create content buttons on content view,
        // must match with the start day and time on the brand node
        for(let i = 0; i < datetimeItemsCount; i++){
            let startDate = startDates[i].trim();
            let newCircularDate = circularDate[i].format('MMM D').toString().replace(' ', '  ');
            expect(startDate).toContain(newCircularDate);
        }
    }


    async onClickBulkItemBtn(){
        const commonModel = new CommonModel(this.page);
        await expect(async () => {
            await commonModel.verifyThatLocatorIsVisible(this.bulkItemBtn);
            await this.bulkItemBtn.click({delay:1000});
            await expect(this.chooseButton).toBeVisible({timeout:300});
        }).toPass();
        
    }


    async bulkSelectUpload(image: string[] ,button: Locator){
        let chooseImgInput = 'p-fileupload input[type="file"]';
        await this.page.setInputFiles(chooseImgInput, image);
    }


    async checkBulkCurrentStep(step: string) {
        let isValid: boolean;
        let text: string;

        for(let i = 0; i < 60; i++){
            text = await this.stepsTitleHighlight.innerText();
            if(text.includes(step)){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(text!).toEqual(step);
    }


    async selectContentItem(title: string, brand: string){
        
        await expect(async () => {
            await expect(this.page.getByRole('row', { name: `${title}`})).toBeVisible({timeout:300});
            let element = this.page.getByRole('row', { name: `${title}`});
            await element.click();
        }).toPass();

    }


    async checkIfBulkLoadOk(data, brand: string) {
        await this.hoverHeaders();
        for(let i = 0; i < data.length; i++) {
            await this.selectContentItem(data[i].name, brand);
            if ('name' in data[i]){
                let titleInputText = await this.titleInput.inputValue();
                expect(titleInputText).toContain(data[i].name);
            }
            if ('category' in data[i]){
                let dropdownText = await this.categoryCardDetailDropdown.textContent();
                expect(dropdownText).toContain(data[i].category);
            }
            if ('price' in data[i]) {
                if(await this.dealDropdown.textContent() == dealTypes.fixedPrice)
                    expect(await this.priceField.inputValue()).toContain(data[i].price);
                else
                    expect(await this.pField.inputValue()).toContain(data[i].price);
            }
            if ('description' in data[i]) expect(await this.descriptionInput.inputValue()).toContain(data[i].description);
            // if ('link' in data[i]) await t.expect(this.clickLinkInput.value).contains(data[i].link, { timeout: 40000 });
            if ('qty' in data[i]) expect(await this.qtyField.inputValue()).toContain(data[i].qty);
            if ('units' in data[i]) {
                if(await this.dealDropdown.textContent() == dealTypes.fixedPrice)
                    expect(await this.unitsField.inputValue()).toContain(data[i].units);
                else
                    expect(await this.units2Field.inputValue()).toContain(data[i].units);
            }
        }

    }

    async deleteContentItem(title: string, brand: string){

        await this.selectContentItem(title, brand);

        await expect( async () => {
            await expect(this.deleteContentButton).toBeVisible( {timeout:300} );
            await this.deleteContentButton.click();
        }).toPass();

        await expect( async () => {
            await expect(this.yesButton).toBeVisible( {timeout:300} );
            await this.yesButton.click();
        }).toPass();

        await expect( async () => {
            await expect(this.page.getByText(`${title}`, {exact: true})).not.toBeVisible( {timeout:300} );
        }).toPass();
    }

    async deleteAllContent(data, brand: string) {
        const common = new CommonModel(this.page);
        for(let i = 0; i < data.length; i++) {
            await this.deleteContentItem(data[i].name, brand);
            await common.waitUntilSpinnerDisappears();
        }
    }


    async waitUntilContentSpinnerDisappears() {
        let exists = true;
        for (let i = 0; i <= 50 && exists; i++) {
            await this.page.waitForTimeout(500);
            exists = await this.contentSpinner.isVisible();
        }
        await this.page.waitForTimeout(500);
    }

    async hoverHeaders(){
        await this.artHeader.hover();
        await this.titleHeader.hover();
        await this.daysHeader.hover();
        await this.dealsHeader.hover();
        await this.ownerHeader.hover();
        await this.artHeader.hover();
        await this.titleHeader.hover();
        await this.daysHeader.hover();
        await this.dealsHeader.hover();
        await this.ownerHeader.hover();
        await this.artHeader.hover();
        await this.titleHeader.hover();
        await this.daysHeader.hover();
        await this.dealsHeader.hover();
        await this.ownerHeader.hover();
        await this.artHeader.hover();
        await this.titleHeader.hover();
        await this.daysHeader.hover();
        await this.dealsHeader.hover();
        await this.ownerHeader.hover();
        await this.artHeader.hover();
        await this.titleHeader.hover();
        await this.daysHeader.hover();
        await this.dealsHeader.hover();
        await this.ownerHeader.hover();
    }

    async verifyTitleIsComplete(title: string){
        for(let i = 0; i < 50; i++){
            let titleText = await this.titleInput.inputValue();
            if(titleText != title || titleText == ''){
                await this.titleInput.clear();
                await this.titleInput.fill(title);
            }
            if(titleText === title){
                break;
            }

            await this.page.waitForTimeout(300);
        }
    }


    /**
     * Click a deal type for the new content
     * @param dealType
     */
    async verifyDeleteButtonIsDisplayed() {

        await expect( async () => {
            await expect(this.deleteContentButton).toBeVisible( {timeout:300} );
        }).toPass();

    }

    /**
     * Click the single item button
     */
    async onClikSingleItemBtn(){
        let singleItemButtonVisible: boolean;
        for(let i = 0; i < 60; i++){
            singleItemButtonVisible = await this.singleItemButton.isVisible();
            if(singleItemButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.singleItemButton.click();
    }


    /**
     * Click the card styles menu when is displayed
     */
    async clickCardStylesMenuIfIsVisible(){
        let cardDetailPanelVisible: boolean;
        for(let i = 0; i < 60; i++){
            cardDetailPanelVisible = await this.cardDetailPanel.isVisible();
            if(cardDetailPanelVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        if(cardDetailPanelVisible!){
            await this.styleCardDetailDropdown.click();
        }else{
            await this.cardStyleDropdown.click();
        }
    }


    async verifyThatTheStylesCardsAreDisplayed(cardStylesSelected: string[]){
        let dropdonwMenuDisplayed: boolean;
        let namesIndropdonwMenu: string[] = [];
        let namesCardStyles: string[] = [];

        for(let i = 0; i < 60; i++){
            dropdonwMenuDisplayed = await this.dropdownItems.locator('li').first().isVisible();
            if(dropdonwMenuDisplayed){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(await this.dropdownItems.locator('li').count()).toBeGreaterThanOrEqual(cardStylesSelected.length);

        for(let i = 0; i < cardStylesSelected.length; i++){
            let nameIndropdonwMenu = await this.dropdownItems.locator('li').nth(i).getAttribute('aria-label');
            let nameCardStyles = cardStylesSelected[i];
            namesIndropdonwMenu.push(nameIndropdonwMenu!);
            namesCardStyles.push(nameCardStyles);
        }
        namesIndropdonwMenu.sort();
        namesCardStyles.sort();
        expect(namesIndropdonwMenu).toEqual(namesCardStyles);
    }


    async onClickDatetimeItem(index: number){
        let dateTimeItemsVisible: boolean;

        for(let i = 0; i < 60; i++){
            dateTimeItemsVisible = await this.datetimeItems.nth(index).isVisible();
            if(dateTimeItemsVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.datetimeItems.nth(index).click();
    }



    /**
     * Verify that the content table skeleton is not displayed
     */
    async waitContentSkeletonNotVisible(){
       
        await expect( async () => {
            await expect(this.contentTableSkeleton.last()).not.toBeVisible( {timeout:300} );
        }).toPass();

    }


    /**
     * Select a card detail 
     */
    async selectCardDetailType(type: string){
        let cardStyleItemsVisible: boolean;
        let index: number;

        for(let i = 0; i < 60; i++){
            cardStyleItemsVisible = await this.cardStyleItems.locator('p-dropdownitem').nth(0).isVisible();
            if(cardStyleItemsVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        const itemsCount = await this.cardStyleItems.locator('p-dropdownitem').count();
        
        for(let i = 0; i < 60; i++){
            let styleName = await this.cardStyleItems.locator('p-dropdownitem').nth(i).textContent();
            if(type == styleName){
                index = i;
                break;
            }
        }

        await this.cardStyleItems.locator('p-dropdownitem').nth(index!).click();
    }

    /**
     * Set the length or width of the card content
     * @param {string} value
     */
    async setLength(value: number) {
        let lengthCardDetailInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            lengthCardDetailInputVisible = await this.lengthCardDetailInput.isVisible();
            if(lengthCardDetailInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.lengthCardDetailInput.click();
        await this.lengthCardDetailInput.clear();
        await this.lengthCardDetailInput.fill(value.toString());
    }


    /**
     * Set the height of the card content
     * @param {string} value
     */
    async setHeight(value: number) {
        let heightCardDetailInput: boolean;

        for(let i = 0; i < 60; i++){
            heightCardDetailInput = await this.heightCardDetailInput.isVisible();
            if(heightCardDetailInput){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.heightCardDetailInput.click();
        await this.heightCardDetailInput.clear();
        await this.heightCardDetailInput.fill(value.toString());
    }


    async selectMediaType(type: string){

        let mediaTypeCardDetailDropdownVisible: boolean;
        let itemsVisible: boolean;
        let index: number;

        for(let i = 0; i < 60; i++){
            mediaTypeCardDetailDropdownVisible = await this.mediaTypeCardDetailDropdown.isVisible();
            if(mediaTypeCardDetailDropdownVisible){
                break;
            }
            await this.page.waitForTimeout(300);

        }
        await this.mediaTypeCardDetailDropdown.click();

        for(let i = 0; i < 60; i++){
            itemsVisible = await this.dropdownItems.first().isVisible();
            if(itemsVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        let itemsCount = await this.dropdownItems.count();
        for(let i = 0; i < itemsCount; i++){
            let name = await this.dropdownItems.nth(i).textContent();
            if(name == type){
                index = i
                break;
            }
        }


        await this.dropdownItems.nth(index!).click();
    }


    async setVideoUrl(value: string){
        let videoIdCardDetailInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            videoIdCardDetailInputVisible = await this.videoIdCardDetailInput.isVisible();
            if(videoIdCardDetailInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        
        }
        await this.videoIdCardDetailInput.click();
        await this.videoIdCardDetailInput.clear();
        await this.videoIdCardDetailInput.fill(value);
    }


    async uploadImageLocation(imageUrl: string[]){

        let imageThumbCardDetailInputVisible: boolean;

        const common = new CommonModel(this.page);

        for(let i = 0; i < 60; i++){
            imageThumbCardDetailInputVisible = await this.imageThumbCardDetailInput.isVisible();
            if(imageThumbCardDetailInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.imageThumbCardDetailInput.click();
        
        let chooseImgInput = 'p-fileupload input[type="file"]';
        await this.page.setInputFiles(chooseImgInput, imageUrl);
        await common.waitUntilSpinnerDisappears();
        await this.mediaSaveBtn.click();
    }


    async onClickDateRangeButton(){
        let dateRangeCardDetailBtnVisible: boolean;
        for(let i = 0; i < 60; i++){
            dateRangeCardDetailBtnVisible = await this.dateRangeCardDetailBtn.isVisible();
            if(dateRangeCardDetailBtnVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.dateRangeCardDetailBtn.click();
    }

    async getDateRangeData(){
        let startsOnInputText: string | null;
        let expiresInputText: string | null;
        let startsOnInputVisible: boolean;
        let expiresInputVisible: boolean;
        
        for(let i = 0; i < 60; i++){
            startsOnInputVisible = await this.startsOnInput.isVisible();
            expiresInputVisible = await this.expiresInput.isVisible();
            if(startsOnInputVisible && expiresInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        startsOnInputText = await this.startsOnInput.inputValue();
        expiresInputText = await this.expiresInput.inputValue();

        return [startsOnInputText, expiresInputText] as const;
    }

    async onClickSubmitButton(){
        let submitBtnVisible: boolean;
        for(let i = 0; i < 60; i++){
            submitBtnVisible = await this.submitBtn.isVisible();
            if(submitBtnVisible){
               break; 
            }

            await this.page.waitForTimeout(300);
        }
        await this.submitBtn.click();
    }


    async setUpc(value: string){
        if(await this.upcCardDetailInput.isVisible()) {
            await this.upcCardDetailInput.click();
            await this.upcCardDetailInput.clear();
            await this.upcCardDetailInput.fill(value);
        } else {
            await this.upcInput.click();
            await this.upcInput.clear();
            await this.upcInput.fill(value);
        }
    }


    async onClickHeadlinesField() {
        await this.headlinesSelect.click();
    }

    /**
     * Click in _Add New Headline_ or _Add New Icon_ button
     */
    async onClickAddNewHeadlineOrIcon(){
        await this.addNewBtn.click();
    }

    async setNameHeadline(value: string, index = 0){
        await this.nameHeadlineInput.nth(index).fill(value);
    }

    async selectHeadlines(index: number){
        const common = new CommonModel(this.page);

        await this.onClickHeadlinesField();

        if(!await this.multiSelectItemsOptions.first().isVisible()){
            await this.onClickAddNewHeadlineOrIcon();
            await this.setNameHeadline(contentData.headline);
            await this.onClickSaveBtn();
            await common.waitUntilSpinnerDisappears();
            await this.onClickHeadlinesField();
        }

        await this.multiSelectItemsOptions.nth(index).click();
        await this.multiSelectCloseBtn.click();
    }


    /**
     * Click on the save button of a pop-up
     * @param {number} index
     */
    async onClickSaveBtn(index:number = 0){
        await this.saveBtn.nth(index).click();
    }

    /**
     * get the text in the headline field
     */
    async getHeadlineText(){
        let headlineSelected: string

        for(let i = 0; i < 60; i++){
            headlineSelected = await this.headlinesSelect.locator('div.headline-ships').innerText();
            if(headlineSelected.length > 0){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        return headlineSelected!;
    }

    async onClickIconsField() {
        let iconsSelectVisible: boolean;
        for(let i = 0; i < 60; i++){
            iconsSelectVisible = await this.iconsSelect.isVisible();
            if(iconsSelectVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.iconsSelect.click();
    }

    async setNameIcon(value: string){
        await this.nameIconInput.fill(value);
    }

    async setLogoIcon(imageUrl: string[]){
        const common = new CommonModel(this.page);

        await this.uploadImageIcon.click();
        let chooseImgInput = 'p-fileupload input[type="file"]';
        await this.page.setInputFiles(chooseImgInput, imageUrl);
        await common.waitUntilSpinnerDisappears();
        await this.onClickSaveBtn(1);
    }

    async selectIcons(index: number){

        const common = new CommonModel(this.page);

        await this.onClickIconsField();

        if(!await this.multiSelectItemsOptions.first().isVisible()){
            await this.onClickAddNewHeadlineOrIcon();
            await this.setNameIcon(contentData.icon);
            await this.setLogoIcon(['src/images/avocados.png']);
            await this.onClickSaveBtn();
            await common.waitUntilSpinnerDisappears();
            await this.onClickIconsField();
        }

        await this.multiSelectItemsOptions.nth(index).click();
        await this.multiSelectCloseBtn.click();
    }


    async getIconsText(){
        let iconsText: string;
        for(let i = 0; i < 60; i++){
            iconsText = await this.iconsSelect.locator('span.icon-selected-title').innerText();
            if(iconsText.length > 0){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        return iconsText!;

    }


    async getCategoryText(){
        let categoryText: string;
        for(let i = 0; i < 60; i++){
            categoryText = await this.categoryCardDetailDropdown.locator('span.p-dropdown-label').innerText();
            if(categoryText.length > 0){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        return categoryText!;
    }

    async getCardStylesText(){
        let cardStylesText: string;
        for(let i = 0; i < 60; i++){
            cardStylesText = await this.categoryCardDetailDropdown.locator('span.p-dropdown-label').innerText();
            if(cardStylesText.length > 0){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        return cardStylesText!;
    }

    async onClickLinkButton(){
        await this.linkCardDetailBtn.click();
    }

    async onClickCloseModalLinkButton(){
        let closeModalLinkVisible: boolean;

        for(let i = 0; i < 60; i++){
            closeModalLinkVisible = await this.closeModalLinkButton.isVisible();
            if(closeModalLinkVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.closeModalLinkButton.click();

    }

    async onClickCloseModalButton(){
        let closeModalVisible: boolean;

        for(let i = 0; i < 60; i++){
            closeModalVisible = await this.closeModal.isVisible();
            if(closeModalVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.closeModal.click();
    }

    async setClickLink(value: string){
        await this.clickLinkCardDetailInput.fill(value);
    }

    /**
     * Set price in Fixed Price and Amount Off deals
     * @param {string} value
     */
    async setPrice(value: string){
        if(await this.priceField.isVisible()){
            await this.priceField.fill(value);
        }
    }

    /**
     * Set units in Fixed Price deals
     * @param {string} value
     */
    async setUnits(value: string){
        if(await this.unitsField.isVisible()){
            await this.unitsField.fill(value);
        }
    }

    /**
     * Set quantity in BOGO and NumberFor deals
     * @param {string} value
     */
    async setQuantity(value: string){
        if(await this.xField.isVisible()){
            await this.xField.fill(value);
        }
    }


    /**
     * Set get quantity value or price value in BOGO and NumberFor deals
     * @param {string} value
     */
    async setGetQuantityPrice(value: string){
        if(await this.yField.isVisible()){
            await this.yField.fill(value);;
        }
    }

    /* Set units or price value in BOGO and NumberFor deals
    * @param {string} value
    */
   async setUnitsPrice(value: string){
       if(await this.zField.isVisible()){
           await this.zField.fill(value);
       }
    }

    async setQtyForPrice(value: string){
        if(await this.qtyField.isVisible()){
           await this.qtyField.fill(value);
        }
    }

    async setPriceForPrice(value: string){
        if(await this.pField.isVisible()){
           await this.pField.fill(value);
        }
    }

    async setUnitsForPrice(value: string){
        if(await this.units2Field.isVisible()){
            await this.units2Field.fill(value);
         }
    }


    async setPriceAmountOff(value: string){
        if(await this.priceMonetaryField.isVisible()){
            await this.priceMonetaryField.fill(value);
        }
    }

    async switchTypeSelectedCard(type: string){
        let switchVisible: boolean;

        for(let i = 0; i < 20; i++){
            switchVisible = await this.switchImageFull.isVisible();
            if(switchVisible){
                break;
            }

            await this.page.waitForTimeout(100);
        }
        if(switchVisible!){
            if(type == "Standard"){
                const toogleStandardEnabled = (await this.switchImageFull.locator('input').getAttribute('aria-checked'))?.includes('false');
                expect(toogleStandardEnabled).toBeTruthy();
            }
            if(type == "Full"){
                const toogleStandardEnabled = (await this.switchImageFull.locator('input').getAttribute('aria-checked'))?.includes('true');
                expect(toogleStandardEnabled).toBeTruthy();
            }
        }


    }

    async verifyThatNoDropdownMenuIsNotDisplayed(){
        let amountOffDropdownOptionsVisible: boolean;
        for(let i = 0; i < 60; i++){
            amountOffDropdownOptionsVisible = await this.amountOffDropdownOptions.isVisible();
            if(amountOffDropdownOptionsVisible!){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.page.waitForTimeout(1000);
    }

    async selectDealTypeAmountOff(type: string){

        let amountOffDropdownOptionsVisible: boolean;

        await this.amountOffDropdown.click();

        for(let i = 0; i < 60; i++){
            amountOffDropdownOptionsVisible = await this.amountOffDropdownOptions.isVisible();
            if(amountOffDropdownOptionsVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        let countItems = await this.amountOffDropdownOptions.locator('li').count();
        
        for(let i = 0; i < countItems; i++){
            let text = await this.amountOffDropdownOptions.locator('li').nth(i).locator('span:nth-child(1)').innerText();
            if(text == type){
                let text = await this.amountOffDropdownOptions.locator('li').nth(i).click();
            }
        }

    }

    async checkAllCardDetailValues(values: {title: string, category: string, dealType: string, contentData: string, videoType: string, videoId: string, length: string,
        height: string, cardStyle: string, startsOnDate: string, expiresDate: string, headlines:string, icons: string, price?:string, units?: string, x?: string, y?: string, z?: string, amountOffType?: string, recipeName?: string, mediaSize?: string }){
        expect(await this.titleInput.inputValue()).toContain(values.title);
        expect(await this.categoryCardDetailDropdown.locator('span.p-dropdown-label').innerText()).toContain(values.category);
        expect(await this.dealDropdown.locator('span.p-dropdown-label').innerText()).toContain(values.dealType);

        switch (values.dealType) {
            case dealTypes.fixedPrice:
                expect(await this.priceField.inputValue()).toContain(values.price);
                expect(await this.unitsField.inputValue()).toContain(values.units);
                break;
            case dealTypes.bogo || dealTypes.numberForPrice:
                expect(await this.xField.inputValue()).toContain(values.x);
                expect(await this.yField.inputValue()).toContain(values.y);
                expect(await this.zField.inputValue()).toContain(values.z);
                break;
            case dealTypes.amountOff:
                expect(await this.amountOffDropdown.locator('span.p-dropdown-label').innerText()).toContain(values.amountOffType);
                expect(await this.priceMonetaryField.inputValue()).toContain(values.price);
                break;
            case dealTypes.recipe:
                expect(await this.recipeDropdown.locator('span.p-dropdown-label').innerText()).toContain(values.recipeName);
                break;
        }

        //expect(await this.mediaTypeCardDetailDropdown.innerText()).toContain(values.contentData);

        if(values.contentData == contentData.video){
            //expect(await this.videoPlatformDropdown.locator('span.p-dropdown-label.p-inputtext').innerText()).toContain(values.videoType);
            expect(await this.videoIdCardDetailInput.inputValue()).toContain(values.videoId);
        } else {
            await this.switchTypeSelectedCard('Standard');
            await this.onClickLinkButton();
            expect(await this.clickLinkCardDetailInput.inputValue()).toContain(contentData.clickLink);
            await this.onClickCloseModalLinkButton();
            await this.verifyLinkDialogNotDisplayed();
        }

        expect(await this.descriptionCardDetailInput.nth(0).inputValue()).toContain(contentData.descriptionDummyText);
        expect(await this.lengthCardDetailInput.inputValue()).toContain(values.length);
        expect(await this.heightCardDetailInput.inputValue()).toContain(values.height);
        expect(await this.styleCardDetailDropdown.locator('span.p-dropdown-label').innerText()).toContain(values.cardStyle);
        expect(await this.imageThumbCardDetailInput.locator('div.dh-dropzone div.image-loader').getAttribute('style'))?.toContain('url');
        await this.onClickDateRangeButton();
        const [startsOnDate, expiresDate] = await this.getDateRangeData();
        expect(startsOnDate).toContain(values.startsOnDate);
        expect(expiresDate).toContain(values.expiresDate);
        await this.onClickCloseModalButton();
        await this.verifyDateRangeNotDisplayed();
        expect(await this.upcCardDetailInput.inputValue()).toContain(contentData.upc);
        expect(await this.headlinesSelect.locator('div.headline-ships').innerText()).toContain(values.headlines);
        expect(await this.iconsSelect.locator('span.icon-selected-title').innerText()).toContain(values.icons);
    }


    async verifyDateRangeNotDisplayed(){
        let clickLinkCardDetailInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            clickLinkCardDetailInputVisible = await this.clickLinkCardDetailInput.isVisible();
            if(!clickLinkCardDetailInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
    }

    async verifyLinkDialogNotDisplayed(){
        let dateRangeCardDetailBtnVisible: boolean;
        for(let i = 0; i < 60; i++){
            dateRangeCardDetailBtnVisible = await this.dateRangeCardDetailBtn.isVisible();
            if(!dateRangeCardDetailBtnVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
    }
    
    async clickIgnoreButtonIfPresent(){
        let ignoreButtonVisible: boolean;
        for(let i = 0; i < 60; i++){
            ignoreButtonVisible = await this.ignoreButton.isVisible();
            if(ignoreButtonVisible){
                await this.ignoreButton.click();
            }
        }
        
    }


    /**
     * Create single content in create bulk content manager
     */
    async onClickCreateContentBtn(){
        let createContentButtonVisible: boolean;
        for(let i = 0; i < 60; i++){
            createContentButtonVisible = await this.createContentButton.isVisible();
            if(createContentButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        await this.createContentButton.click();
    }

    async verifyThatImageLoaderIsVisible(){
        let imageLoaderVisible: boolean;

        for(let i = 0; i < 60; i++){
            imageLoaderVisible =  await this.imageLoader.isVisible();
            if(imageLoaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
    }

    async setTitleEditContent(value: string){
        let editContentTitleVisible: boolean;
        for(let i = 0; i < 60;  i++){
            editContentTitleVisible = await this.editContentTitle.isVisible();
            if(editContentTitleVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.editContentTitle.fill(value, {timeout:500});
    }

    async selectCategoryEditContent(index?: number){
        let editContentCategoryVisible: boolean;
        for(let i = 0; i < 70; i++){
            editContentCategoryVisible = await this.editContentCategory.isVisible();
            if(editContentCategoryVisible){
                break;
            }
            await this.page.waitForTimeout(400);
        }

        await this.editContentCategory.click();

    }

    async selectDealTypeEditContent(dealType: string){
        let editContentDealtypeVisible: boolean;
        let dealTypeItemVisible: boolean;
        for(let i = 0; i < 60; i++){
            editContentDealtypeVisible = await this.editContentDealtype.isVisible();
            if(editContentDealtypeVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.editContentDealtype.click();

        for(let i = 0; i < 60; i++){
            dealTypeItemVisible = await this.dropdownList.locator('p-dropdownitem').first().isVisible();
            if(dealTypeItemVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }   

        await this.page.waitForTimeout(1500);
        const listItems = await this.dropdownList.locator('p-dropdownitem').count();

        for(let i = 0; i < listItems; i++){
            const textItem = (await this.dropdownList.locator('p-dropdownitem').nth(i).innerText()).trim();
            if(textItem == dealType){
                await this.dropdownList.locator('p-dropdownitem').nth(i).click({delay:200});
                break;
            }

        }
    }

    async checkContentInBulkTable(title: string, type: string){
        let bulkContentPreviewTableVisible: boolean;
        let titleExists: string;
        let typeExists: string;
        let contentExists: boolean;
        contentExists = false;

        for(let i = 0; i < 60; i++){
            bulkContentPreviewTableVisible = await this.bulkContentPreviewTable.isVisible();
            if(bulkContentPreviewTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.bulkContentPreviewTable.scrollIntoViewIfNeeded();
        const rowCount = await this.bulkContentPreviewTable.locator('tr').count();
        
        for(let i = 0; i < rowCount; i++){
            titleExists = await this.bulkContentPreviewTable.locator('tr').nth(i).locator('td:nth-child(1)').innerText();
            typeExists = await this.bulkContentPreviewTable.locator('tr').nth(i).locator('td:nth-child(2)').innerText();
            if(titleExists == title && type == typeExists){
                contentExists = true;
                break;   
            }
        }

        expect(contentExists).toBeTruthy();
    }

    async verifyThatImageLoaderIsNotVisible(){
        let imageLoaderVisible: boolean;

        for(let i = 0; i < 60; i++){
            imageLoaderVisible =  await this.imageLoader.isVisible();
            if(!imageLoaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
    }


    async editContentsetPrice(value: string){
        let editContentFixedPriceInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            editContentFixedPriceInputVisible = await this.editContentFixedPriceInput.isVisible();
            if(editContentFixedPriceInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.editContentFixedPriceInput.fill(value, { timeout: 800 } );

    }

    async editContentsetUnits(value: string){
        let editContentFixedUnitsInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            editContentFixedUnitsInputVisible = await this.editContentFixedUnitsInput.isVisible();
            if(editContentFixedUnitsInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.editContentFixedUnitsInput.fill(value, { timeout: 800 } );
    }

    async editContentBogoXInputSet(value: string){
        let editContentBogoXInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            editContentBogoXInputVisible = await this.editContentBogoXInput.isVisible();
            if(editContentBogoXInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.editContentBogoXInput.fill(value, { timeout: 200 } );
    }

    async editContentBogoYInputSet(value: string){
        let editContentBogoXInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            editContentBogoXInputVisible = await this.editContentBogoYInput.isVisible();
            if(editContentBogoXInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.editContentBogoYInput.fill(value, { timeout: 500 } );
    }

    async editContentUpcInputSet(value: string){
        let editContentUpcInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            editContentUpcInputVisible = await this.editContentUpcInput.isVisible();
            if(editContentUpcInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.editContentUpcInput.fill(value, { timeout: 1000 } );
    }

    async verifyAlertMessageMissingTitleIsDisplayed(){

        let missingFieldsAlertVisible: boolean;
        for(let i = 0; i < 60; i++){
            missingFieldsAlertVisible = await this.missingFieldsAlert.isVisible();
            if(missingFieldsAlertVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(await this.missingFieldsAlert.innerText()).toContain('Missing Title');
    }


    async onClickHereToViewMissingField(index = 0){
        let clickHereMissingFieldAlertVisible: boolean;
        for(let i = 0; i < 60; i++){
            clickHereMissingFieldAlertVisible = await this.clickHereMissingFieldAlert.isVisible();
        }
        await this.clickHereMissingFieldAlert.click();
    }

    async verifyThatManageContentTitleNotVisible(){
        let manageContentTitleVisible: boolean;
        for(let i = 0; i < 60; i++){
            manageContentTitleVisible = await this.manageContentTitle.isVisible();
            if(!manageContentTitleVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(manageContentTitleVisible!).toBeFalsy();
        
    }
    
    async verifyThatTheCardDetailPanelVisible(){
        let cardDetailPanelVisible: boolean;
        for(let i = 0; i < 60; i++){
            cardDetailPanelVisible = await this.cardDetailPanel.isVisible();
            if(cardDetailPanelVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(cardDetailPanelVisible!).toBeTruthy();
    }

    /**
     * Function to create a icon name
     * @returns 
     */
    async iconName(){
        const uniqueId = uuidv4();
        let dateTime = uniqueId;
        let iconName = "icon" + dateTime;
        return iconName;
    }

    async uploadImage(image: string){
        await this.page.waitForTimeout(500);
        await this.page.setInputFiles("input[type='file']",image);
    }


    async findIconCreated(iconName: string){
        let multiSelectItemsOptionsVisible: boolean;
        let iconExists: boolean;
        iconExists = false;
        for(let i = 0; i < 60; i++){
            multiSelectItemsOptionsVisible = await this.multiSelectItemsOptions.first().isVisible();
            if(multiSelectItemsOptionsVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        let iconsCount = await this.multiSelectItemsOptions.count();
        
        for(let i = 0; i < iconsCount; i++){
            let text = await this.multiSelectItemsOptions.nth(i).innerText();
            if(text == iconName){
                iconExists = true;
                break;
            }
        }

        expect(iconExists).toBeTruthy();
        
    }

    async waitIconMenuIsClosed(){
        let multiSelectItemsOptionsVisible: boolean;
        for(let i = 0; i < 60; i++){
            multiSelectItemsOptionsVisible = await this.multiSelectItemsOptions.first().isVisible();
            if(multiSelectItemsOptionsVisible!){
                break;
            }
            await this.page.waitForTimeout(300);
        }
    }


    async headlineName(){
        const uniqueId = uuidv4();
        let dateTime = uniqueId;
        let headlineName = "headline" + dateTime;
        return headlineName;
    }


    /**
     * Verify the new headline is created
     * @param headlineName 
     */
    async verifyTheHeadlineIsCreated(headlineName: string){

        let multiSelectItemsOptions: boolean;
        let headlineExists: boolean;
        headlineExists = false;

        for(let i = 0; i < 60; i++){
            multiSelectItemsOptions = await this.multiSelectItemsOptions.first().isVisible();
            if(multiSelectItemsOptions){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.page.waitForTimeout(4000);
        let countHeadlines = await this.multiSelectItemsOptions.count();
        
        for(let i = 0; i < countHeadlines; i++){
            let text = await this.multiSelectItemsOptions.nth(i).innerText();
            if(text == headlineName){
                headlineExists = true;
                break;
            }
        }
        
        expect(headlineExists).toBeTruthy();

    }

    async verifyThatThealertMessageHeadlineIsDisplayed(){

        const commonModel = new CommonModel(this.page);

        let alertVisible: boolean;
        for(let i = 0; i < 60; i++){
            alertVisible = await commonModel.existAlert.isVisible();
            if(alertVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(await commonModel.existAlert.innerText()).toContain(contentData.headlineNameRequired);
        expect(await commonModel.fieldRequired.innerText()).toContain(contentData.fieldRequired);
    }


    async verifyThatThealertMessageIconIsDisplayed(){

        const commonModel = new CommonModel(this.page);

        let alertVisible: boolean;
        for(let i = 0; i < 60; i++){
            alertVisible = await commonModel.existAlert.first().isVisible();
            if(alertVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(await commonModel.existAlert.first().innerText()).toContain(contentData.iconsNameRequired);
    }

    async verifyThatCouponAmountOffFieldIsVisible(){
        let couponAmountOffFieldVisible: boolean;

        for(let i = 0; i < 60; i++){
            couponAmountOffFieldVisible = await this.couponAmountOffField.isVisible();
            if(couponAmountOffFieldVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(couponAmountOffFieldVisible!).toBeTruthy();
    }


    async verifyThatCouponLimitFieldIsVisible(){
        let couponLimitFieldVisible: boolean;

        for(let i = 0; i < 60; i++){
            couponLimitFieldVisible = await this.couponLimitField.isVisible();
            if(couponLimitFieldVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(couponLimitFieldVisible!).toBeTruthy();
    }


    async verifyThatCouponQuantityRequiredFieldIsVisible(){
        let couponQuantityRequiredFieldVisible: boolean;

        for(let i = 0; i < 60; i++){
            couponQuantityRequiredFieldVisible = await this.couponLimitField.isVisible();
            if(couponQuantityRequiredFieldVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(couponQuantityRequiredFieldVisible!).toBeTruthy();
    }


    async verifyThatCouponAmountOffFieldIsNotVisible(){
        let couponAmountOffFieldVisible: boolean;

        for(let i = 0; i < 60; i++){
            couponAmountOffFieldVisible = await this.couponAmountOffField.isVisible();
            if(!couponAmountOffFieldVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(couponAmountOffFieldVisible!).toBeFalsy();
    }


    async verifyThatCouponLimitFieldIsNotVisible(){
        let couponLimitFieldVisible: boolean;

        for(let i = 0; i < 60; i++){
            couponLimitFieldVisible = await this.couponLimitField.isVisible();
            if(!couponLimitFieldVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(couponLimitFieldVisible!).toBeFalsy();
    }


    async verifyThatCouponQuantityRequiredFieldIsNotVisible(){
        let couponQuantityRequiredFieldVisible: boolean;

        for(let i = 0; i < 60; i++){
            couponQuantityRequiredFieldVisible = await this.couponLimitField.isVisible();
            if(!couponQuantityRequiredFieldVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(couponQuantityRequiredFieldVisible!).toBeFalsy();
    }

    /**
    * This function clicks the right arrows that are present
    */
    async verifyThatTheRightArrosAreClicked(){
        let rightArrowVisible: boolean;

        for(let i = 0; i < 60; i++){
            rightArrowVisible = await this.chevronRight.first().isVisible();  
        }
        await this.page.waitForTimeout(300);

        let itemsCount = await this.chevronRight.count();

        for(let i = 0; i < itemsCount; i++){
            await this.chevronRight.nth(i).click();
            await this.page.waitForTimeout(300);
        }
    }
    
    /**
     * This function clicks the general menu to expanded
     */
    async clickGeneralMenu(){
        let generalHeaderVisible: boolean;

        for(let i = 0; i < 60; i++){
            generalHeaderVisible = await this.generalHeader.isVisible();
            if(generalHeaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.generalHeader.click();        
    }
    
    /**
     * This function clicks the general menu to expanded
     */
    async clickDateRangeMenu(){
        let dateRangeHeaderVisible: boolean;

        for(let i = 0; i < 60; i++){
            dateRangeHeaderVisible = await this.dateRangeHeader.isVisible();
            if(dateRangeHeaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.dateRangeHeader.click();        
    }
    
    /**
     * This function clicks the general menu to expanded
     */
    async clickDealMenu(){
        let dealHeaderVisible: boolean;

        for(let i = 0; i < 60; i++){
            dealHeaderVisible = await this.cardHeader.isVisible();
            if(dealHeaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.cardHeader.click();        
    }
    
    /**
     * This function clicks the general menu to expanded
     */
    async clickMediaIconsMenu(){

        await expect( async () => {
            await expect(this.mediaIconsHeader).toBeVisible( {timeout:300} );
        }).toPass();

        await this.mediaIconsHeader.click();        
    }


    /**
     * This function clicks the general menu to expanded
     */
    async clickHeadlinesMenu(){
        let headlinesHeaderVisible: boolean;

        for(let i = 0; i < 60; i++){
            headlinesHeaderVisible = await this.headlinesHeader.isVisible();
            if(headlinesHeaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.headlinesHeader.click();        
    }


    /**
     * This function clicks the general menu to expanded
     */
    async clickCouponsMenu(){
        let couponsHeaderVisible: boolean;

        for(let i = 0; i < 60; i++){
            couponsHeaderVisible = await this.couponsHeader.isVisible();
            if(couponsHeaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.couponsHeader.click();        
    }


    /**
     * This function clicks the general menu to expanded
     */
    async verifyCouponsMenuNotVisible(){
        let couponsHeaderVisible: boolean;

        for(let i = 0; i < 60; i++){
            couponsHeaderVisible = await this.couponsHeader.isVisible();
            if(!couponsHeaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(couponsHeaderVisible!).toBeFalsy();
    }

    /**
     * This function get the class from the dealtype dropdown
     * @param dealType
     */
    async getClassDealType(dealType: string) {

        let dealTypeClass: string | null;
        let isDisabled: boolean;

        const listItems = await this.dropdownList.locator('p-dropdownitem').count();
        let listItem = this.dropdownList.locator('p-dropdownitem');

        for(let i = 0; i < listItems; i++){
            const textItem = await listItem.nth(i).textContent();
            if(textItem == dealType){
                dealTypeClass = await listItem.nth(i).locator('li').getAttribute('class');
                if(dealTypeClass?.includes("disabled")){
                    isDisabled = true;
                }
                break;
            }

        }

        expect(isDisabled!).toBeTruthy();
    }


    /**
     * Verify that the created message is present
     * @param message 
     */
    async verifyErrorMessageIsVisible(message: string) {
        let snackBarVisible: boolean;
        
        for(let i = 0; i < 70; i++){
            snackBarVisible = await this.snackBar.isVisible();
            if(snackBarVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        let text = await this.snackBar.textContent();
        expect(text).toContain(message);
    }

    /**
     * This function clicks the error button
     */
    async clickErrorButton(){
        let errorButtonVisible: boolean;

        for(let i = 0; i < 60; i++){
            errorButtonVisible = await this.errorButton.isVisible();
            if(errorButtonVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        await this.errorButton.click();
    }

    /**
     * This function verifies the error message
     */
    async verifyErrorMessage(message: string){
        let errorMessagePanelVisible: boolean;

        for(let i = 0; i < 60; i++){
            errorMessagePanelVisible = await this.errorMessagePanel.isVisible();
            if(errorMessagePanelVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        let errorsText = await this.errorMessagePanel.textContent();
        expect(errorsText).toEqual(message);
    }

    /**
     * This function clicks the video platform menu
     */
    async clickVideoPlatformDrodpownMenu(){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.videoPlatformDropdown.isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(isVisible!).toBeTruthy();

        await this.videoPlatformDropdown.click();
    }

    /**
     * This function selects the video platform from the dropdown menu is open
     * @param option 
     */
    async selectVideoPlatform(option: string){
        let optionVisible: boolean;
        let index: number;

        for(let i = 0; i < 60; i++){
            optionVisible = await this.platformVideoOption.last().isVisible();
            if(optionVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(optionVisible!).toBeTruthy();

        await this.page.waitForTimeout(1500);

        let optionsCount = await this.platformVideoOption.count();

        for(let i = 0; i < optionsCount; i++){
            let text = await this.platformVideoOption.nth(i).innerText();
            if(text == option){
                index = i;
                break;
            }
        }

        await this.platformVideoOption.nth(index!).click();
    }

    /**
     * This function verifies that the content table is empty
     */
    async verifyContentTableIsEmpty(name: string){
        let isVisible: boolean;
        for(let i = 0; i < 60; i++){
            isVisible = await this.contentTable.locator(`tr:has-text("${name}")`).isVisible();
            if(!isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(isVisible!).toBeFalsy();
    }

    /**
     * This function verifies that the card is hidden
     */
    async verifyThatIsHidden(){
        let isHidden: boolean;
        isHidden = false;
        for(let i = 0; i < 60; i++){
            let imgValue = await this.visibleButton.locator("img").getAttribute("src");
            if(imgValue?.includes("eye-slash")){
                isHidden = true;
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(isHidden).toBeTruthy();
    }

    /**
     * This function verifies that the tittle field is disabled
     */
    async verifyTitleFieldIsDisabled(){
        let isDisabled: boolean;
        let attributeValue: string | null;

        for(let i = 0; i < 60; i++){
            attributeValue = await this.titleInput.getAttribute('disabled');
            if(attributeValue?.includes('disabled')){
                isDisabled = true;
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(isDisabled!).toBeTruthy();
    }

    /**
     * This function verifies that the decription field is disabled
     */
    async verifyDescriptionFieldIsDisabled(){
        let isDisabled: boolean;
        let attributeValue: string | null;

        for(let i = 0; i < 60; i++){
            attributeValue = await this.descriptionInput.getAttribute('disabled');
            if(attributeValue?.includes('disabled')){
                isDisabled = true;
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(isDisabled!).toBeTruthy();
    }

    /**
     * This function verifies that the width field is disabled
     */
    async verifyThatWidthFieldIsDisabled(){
        let isDisabled: boolean;
        let attributeValue: string | null;

        for(let i = 0; i < 60; i++){
            attributeValue = await this.lengthCardDetailInput.getAttribute('disabled');
            if(attributeValue?.includes('disabled')){
                isDisabled = true;
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(isDisabled!).toBeTruthy();
    }

    /**
     * This fucntion verifies that the height fiels is disabled
     */
    async verifyThatHeightFieldIsDisabled(){
        let isDisabled: boolean;
        let attributeValue: string | null;

        for(let i = 0; i < 60; i++){
            attributeValue = await this.heightCardDetailInput.getAttribute('disabled');
            if(attributeValue?.includes('disabled')){
                isDisabled = true;
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(isDisabled!).toBeTruthy();
    }

    /**
     * This function verifies that the deal type menu is disabled
     */
    async verifyThatDealTypeMenuIsDisabled(){
        let isDisabled: boolean;
        let attributeValue: string | null;

        for(let i = 0; i < 60; i++){
            attributeValue = await this.dealDropdown.locator('div').first().getAttribute('class');
            if(attributeValue?.includes('disabled')){
                isDisabled = true;
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(isDisabled!).toBeTruthy();
    }

    /**
     * This function verifies that the card styles menu is disabled
     */
    async verifyThatCardStyleMenuIsDisabled(){
        let isDisabled: boolean;
        let attributeValue: string | null;

        for(let i = 0; i < 60; i++){
            attributeValue = await this.styleCardDetailDropdown.locator('p-dropdown').locator('div').first().getAttribute('class');
            if(attributeValue?.includes('disabled')){
                isDisabled = true;
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(isDisabled!).toBeTruthy();
    }

    /**
     * This function verifies that the upc field is disabled
     */
    async verifyThatUPCFieldIsDisabled(){
        let isDisabled: boolean;
        let attributeValue: string | null;

        for(let i = 0; i < 60; i++){
            attributeValue = await this.upcField.getAttribute('disabled');
            if(attributeValue?.includes('disabled')){
                isDisabled = true;
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(isDisabled!).toBeTruthy();
    }

    /**
     * This function verifies that the delete modal is not visible
     */
    async verifyThatDeleteModalisNotVisible(){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.yesButton.isVisible();
            if(!isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(isVisible!).toBeFalsy();
    }

    /**
     * This function verifies that the card is not hidden
     */
    async verifyThatIsNotHidden(){
        let isHidden: boolean;
        isHidden = false;
        for(let i = 0; i < 60; i++){
            let imgValue = await this.visibleButton.locator("img").getAttribute("src");
            if(imgValue?.includes("eye")){
                isHidden = true;
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(isHidden).toBeTruthy();
    }

    /**
     * This function verifies that the campaign block modal is visible
     */
    async verifyThatTheCampaignBlockModalIsVisible(){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.campaignBlockEditorModal.isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();
    }

    /**
     * This function clicks tha add button from a specific card in the stack from a campaign block  
     */
    async clickTheStackContentButtonFromASpecificCard(title: string){
        await this.contentTable.locator(`tr:has-text("${title}")`).locator(`td.dh-media-content__grid__stacked-content > img`).click();
    }

    /**
     * This function click the add button from a card inside campaign block builder
     */
    async clickTheAddButtonFromCardInsidecampaingBlockBuilder(title: string){
        let tableVisible: boolean;
        let titleRow: string;
        let index:  number;
        for(let i = 0; i < 60; i++){
            tableVisible = await this.titleFromCardinCampaignBlockEditor.last().isVisible();
            if(tableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(tableVisible!).toBeTruthy();

        let rowCount = await this.titleFromCardinCampaignBlockEditor.count();
        for(let i = 0; i < rowCount; i++){
            titleRow = await this.titleFromCardinCampaignBlockEditor.nth(i).innerText();
            if(titleRow == title){
                index = i;
                break;
            }

        }
        await this.leftTableRow.nth(index!).locator('td > button.p-button-success').click();
    }

    /**
     * This function verifies that a card is not displayed in the content table
     */
    async verifyThatTheAddedCardIsNotDisplayed(name: string){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
           isVisible = await this.contentTable.locator(`tr:has-text("${name}")`).isVisible();
           if(!isVisible){
                break;
           }
           await this.page.waitForTimeout(300);
        }
        expect(isVisible!).toBeFalsy();
    }

    /**
     * This function verifies that the card is moved to the stack group
     * @param title 
     */
    async verifyThatCardIsAddedToStackGroup(title: string){
        let isVisible: boolean;
        let titleRow: string;

        await this.page.waitForTimeout(3000);
        let rowCount = await this.rightTableRow.count();
    
        for(let i = 0; i < rowCount; i++){
            titleRow = await this.rightTableRow.nth(i).locator('td.td-title').innerText();
            if(titleRow == title){
                isVisible = true;
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();
    }

    /**
     * This function verifies that the campaign block modal is visible
     */
    async verifyThatTheCampaignBlockModalIsNotVisible(){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.campaignBlockEditorModal.isVisible();
            if(!isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeFalsy();
    }

    /**
     * This function verifies that the card is displayed when the stacked group card is expanded
     * @param title 
     */
    async verifythatTheAddedCardIsDisplayedInStackedGroup(title: string, title2: string){
        let isVisible: boolean;
        let index: number;
        let index2: number;
        let rowTitle: string;
        let stackedCardIsVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.contentTable.locator(`tr:has-text("${title}")`).isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();

        await this.page.waitForTimeout(2000);
        let contentRows = await this.contentTable.locator('tr').count();
        
        for(let i = 0; i < contentRows; i++){
            rowTitle = (await this.contentTable.locator(`tr`).nth(i).locator('td:nth-child(3)').innerText()).trim();
            if(rowTitle == title){
                index = i;
                 break;
            }
        }
        await this.expandStackedGroupButton.nth(index!).click();

        await this.page.waitForTimeout(2000);
        let contentRows2 = await this.contentTable.locator('tr').count();

        for(let i = 0; i < contentRows2; i++){
            rowTitle = await this.contentTable.locator(`tr`).nth(i).locator('td:nth-child(3)').innerText();
            if(rowTitle == title2){
                index2 = i;
                stackedCardIsVisible = true;
                break;
            }
        }

        expect(stackedCardIsVisible!).toBeTruthy();
        await this.contentTable.locator(`tr`).nth(index2!).click();
    }


    async editCampaignBlockFields(titleFieldValue: string, descriptionFieldValue: string){
        let titleFieldVisible: boolean;
        let descriptionFieldVisible: boolean;

        for(let i = 0; i < 60; i++){
            titleFieldVisible = await this.titleInput.isVisible();
            if(titleFieldVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(titleFieldVisible!).toBeTruthy();

        for(let i = 0; i < 60; i++){
            descriptionFieldVisible = await this.descriptionInput.isVisible();
            if(descriptionFieldVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(descriptionFieldVisible!).toBeTruthy();

        await this.titleInput.clear();
        await this.titleInput.fill(titleFieldValue);
        //await this.descriptionInput.clear();
        await this.descriptionInput.click();
        await this.descriptionInput.fill(descriptionFieldValue);
        await this.titleInput.click();
    }

    /**
     * this function verifies that a card is not displayed in the comntent table
     * @param title 
     */
    async verifyThatSpecificCardIsNotVisible(title: string){
        let contentVisible: boolean;

        for(let i = 0; i < 60;  i++){
            contentVisible = await this.contentTable.locator(`tr:has-text("${title}")`).isVisible();
            if(!contentVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(contentVisible!).toBeFalsy();
    }

    /**
     * This function verifies that the specific card is viisble in the content table
     * @param title 
     */
    async verifyThatSpecificCardIsVisible(title: string){
        let contentVisible: boolean;

        for(let i = 0; i < 60;  i++){
            contentVisible = await this.contentTable.locator(`tr:has-text("${title}")`).isVisible();
            if(contentVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(contentVisible!).toBeTruthy();
    }

    /**
     * This function verifies thta the title is displayed
     */
    async verifyThatTitleIsVisible(title: string){
        let contentVisible: boolean;
        let titletext: string | undefined;

        for(let i = 0; i < 60;  i++){
            contentVisible = await this.contentTable.locator(`tr:has-text("${title}")`).isVisible();
            if(contentVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(contentVisible!).toBeTruthy();

        titletext = (await this.contentTable.locator(`tr:has-text("${title}")`).locator('td:nth-child(3)').textContent())?.trim();
        expect(titletext).toEqual(title);
        
    }

    /**
     * This function verifies that the days field is visible
     */
    async verifyThatTheDaysAreVisible(title: string){
        let daystext: string | undefined;

        daystext = (await this.contentTable.locator(`tr:has-text("${title}")`).locator('td:nth-child(4)').textContent())?.trim();
        expect(daystext).toEqual("7");
        
    }

    /**
     * This function verifies that the days field is visible
     */
    async verifyThatTheDealTypeVisible(title: string){
        let dealTypetext: string | undefined;

        dealTypetext = (await this.contentTable.locator(`tr:has-text("${title}")`).locator('td:nth-child(5)').textContent())?.trim();
        expect(dealTypetext).toEqual("Campaign Block");
        
    }

    /**
     * This function verifies that th expad button is visible
     * @param title 
     */
    async verifyThatExpandButtonIsVisible(title: string){
        let buttonVisible: boolean;

        for(let i = 0; i < 60; i++){
            buttonVisible = await this.contentTable.locator(`tr:has-text("${title}")`).locator('button.parent-content-arrow').isVisible();
            if(buttonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(buttonVisible!).toBeTruthy();
    }

    /**
     * This function verifies that the owner field is displayed
     * @param title 
     */
    async verifyThatTheOwnerFieldIsVisible(title: string){
        let ownerText: string | undefined;

        ownerText = (await this.contentTable.locator(`tr:has-text("${title}")`).locator('td:nth-child(6)').textContent())?.trim();
        expect(ownerText).toEqual("onlyContent");
    }

    /**
     * This function verifies that the size field is visible
     * @param title 
     */
    async verifyThatTheSizeFieldIsVisible(title: string){
        let ownerText: string | undefined;

        ownerText = (await this.contentTable.locator(`tr:has-text("${title}")`).locator('td:nth-child(7)').textContent())?.trim();
        expect(ownerText).toEqual("1 x 1");
    }

    async selectCategoryByName(name: string){
        let dropdownListOptionVisible: boolean;
        let categoryName: string;
        let index: number;

        for(let i = 0; i < 60; i++){
            dropdownListOptionVisible = await this.dropdownList.locator('p-dropdownitem > li').first().isVisible();
            if(dropdownListOptionVisible){
                break;
            }
            await this.page.waitForTimeout(400);
        }

        await this.searchCategoryName.fill(name, {timeout:1000});

        const listItems = await this.dropdownList.locator('p-dropdownitem').count();
        for(let i = 0; i < listItems; i++){
            categoryName = (await this.dropdownList.locator('p-dropdownitem').nth(i).innerText()).trim();
            if(categoryName == name){
                index = i;
                break;
            }

            await this.page.waitForTimeout(300);
        }
        
        await this.dropdownList.locator('p-dropdownitem').nth(index!).click({ delay:800 })
    }

    async deleteCategoriesHeaders(){
        let selectAllButtonVisible: boolean;
        let contentVisible: boolean;
        const commonModel = new CommonModel(this.page);

        for(let i = 0; i < 60; i++){
            selectAllButtonVisible = await this.selectAllButton.isVisible();
            if(selectAllButtonVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        await this.selectAllButton.click();

        await this.deleteContentButton.click();
        await this.yesButton.click();
        await commonModel.waitUntilSpinnerDisappears();
        for(let i = 0; i < 60; i++){
            contentVisible = await this.accordionTable.isVisible();
            if(contentVisible){
               //await this.contentTable.locator(`tr:has-text("${name}")`).click();
            }
            if(!contentVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.page.waitForTimeout(1000);

        expect(contentVisible!).toBeFalsy();
    }


    async navigateToPageCircularModule(pageName: string){
        let pageSelectorVisible: boolean;
        let pageMenu: boolean;
        let pageNameMenu: string;
        let index: number;

        for(let i = 0; i < 60; i++){
            pageSelectorVisible = await this.pageSelector.isVisible();
            if(pageSelectorVisible){
                break;
            }

            await this.page.waitForTimeout(400);
        }

        await this.pageSelector.click({delay:2000});

        for(let i = 0; i < 60; i++){
            pageMenu = await this.pageMenu.isVisible();
            if(pageMenu){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(pageMenu!).toBeTruthy();

        let pagesCount = await this.pageMenu.locator(' > div > div').count();

        for(let i = 0; i < pagesCount; i++){
            pageNameMenu = (await this.pageMenu.locator(' > div > div').nth(i).innerText()).trim();
            if(pageNameMenu.includes(pageName)){
                index = i;
                break;
            }
        }

        await this.pageMenu.locator(' > div').nth(index!).click({delay:1000});
    }

    async navigateToSubPageCircularModule(pageName: string){
        let pageSelectorVisible: boolean;
        let pageMenu: boolean;
        let pageNameMenu: string;
        let index: number;

        for(let i = 0; i < 60; i++){
            pageSelectorVisible = await this.pageSelector.isVisible();
            if(pageSelectorVisible){
                break;
            }

            await this.page.waitForTimeout(400);
        }

        await this.pageSelector.click({delay:2000});

        for(let i = 0; i < 60; i++){
            pageMenu = await this.pageMenu.isVisible();
            if(pageMenu){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(pageMenu!).toBeTruthy();

        let pagesCount = await this.pageMenu.locator(' > div > div:nth-child(2)').count();

        for(let i = 0; i < pagesCount; i++){
            pageNameMenu = (await this.pageMenu.locator(' > div > div:nth-child(2)').nth(i).innerText()).trim();
            if(pageNameMenu.includes(pageName)){
                index = i;
                break;
            }
        }

        await this.pageMenu.locator(' > div > div:nth-child(2)').nth(index!).click({delay:1000});

    }

    async verifyThatTheSubPageCategoryIsHidden(categoryName: string){
        let sideBarMenuVisible: boolean;
        let sideMenuCategoryTableVisible: boolean;
        let sideMenuCategoryTableName: string;
        let index: number;
        let categoryClass: string | null;

        for(let i = 0; i < 60; i++){
            sideBarMenuVisible = await this.sideBar.isVisible();
            if(sideBarMenuVisible){
                break;
            }

            await this.page.waitForTimeout(300);

        }

        expect(sideBarMenuVisible!).toBeTruthy();

        await this.sideBar.click();

        await this.categorySideMenuButton.click({delay:2000});

        for(let i = 0; i < 60; i++){
            sideMenuCategoryTableVisible = await this.sideMenucategoryTable.isVisible();
            if(sideMenuCategoryTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(sideMenuCategoryTableVisible!).toBeTruthy();

        let countRows = await this.sideMenucategoryTable.locator('tr').count();

        for(let i = 0; i < countRows; i++){
            sideMenuCategoryTableName = (await this.sideMenucategoryTable.locator('tr').nth(i).innerText()).trim();
            if(sideMenuCategoryTableName == categoryName){
                index  = i;
                break;
            }
            await this.page.waitForTimeout(300);
        }

        categoryClass = await this.sideMenucategoryTable.locator('tr').nth(index!).getAttribute("class");
        
        expect(categoryClass).toContain("deleted-category");

    }

    /**
     * This function clicks the filter button 
     */
    async clickCategoryFilterButton(){
        const commonModel = new CommonModel(this.page);
        await commonModel.verifyThatLocatorIsVisible(this.categoryFilterButton);
        await commonModel.clickLocator(this.categoryFilterButton);
    }

    /**
     * This function verifies that the category menu is expanded
     * @param locator 
     */
    async verifyCategoryMenuIsExpanded(){
        const commonModel = new CommonModel(this.page);

        await commonModel.verifyThatLocatorIsVisible(this.categoryFilterMenu);
    }

    /**
     * This function count the number of categories created in category filter in the bulk upload
     */
    async countTheNumberOfCategories(categoriesNumber: number) {
        const commonModel = new CommonModel(this.page);

        let categoriesQuantity = await commonModel.countElements(this.categoryFilterCheckbox);
        
        expect(categoriesQuantity).toEqual(categoriesNumber);

    }


    async verifyTheNameOfCategories(){

        let categoriesInFile: string[] = ["All categories", "Meats", "Fruits", "Alcohol"];
        let categoriesCreated: string[] = [];
        let categoryName: string;

        let categoryQuantity = await this.categoryFilterCategoryName.count();

        for(let i = 0; i < categoryQuantity; i++) {
            categoryName = (await this.categoryFilterCategoryName.nth(i).innerText()).trim();
            categoriesCreated.push(categoryName);
        }

        let categoriesInFileLength =  categoriesInFile.length;
        let categoriesCreatedLength = categoriesCreated.length;

        expect(categoriesInFileLength).toEqual(categoriesCreatedLength);

        for(let i = 0; i < categoriesInFileLength; i++) {
            let categoryNameInFile = categoriesInFile[i];

            let categoryNameCreated = categoriesCreated[i];

            expect(categoryNameInFile).toEqual(categoryNameCreated);

        }
    }

    /**
     * This function click the category create button
     */
    async clickCreateCategoryButton(){
        const commonModel = new CommonModel(this.page);

        await commonModel.verifyThatLocatorIsVisible(this.createCategoryButton);
        await commonModel.clickLocator(this.createCategoryButton);

    }

    /**
     * This function verifies that the name matches with the creatwd categories and the categories displayed at the filter
     * @param title 
     */
    async verifyTheNameOfCreatedCategories(title: string){

        let categoriesInFile: string[] = ["All categories", "Fruits", "Alcohol", "Uncategorized"];
        let categoriesCreated: string[] = [];
        let categoryName: string;

        let categoryQuantity = await this.categoryFilterCategoryName.count();

        for(let i = 0; i < categoryQuantity; i++) {
            categoryName = (await this.categoryFilterCategoryName.nth(i).innerText()).trim();
            categoriesCreated.push(categoryName);
        }

        let categoriesInFileLength =  categoriesInFile.length;
        let categoriesCreatedLength = categoriesCreated.length;

        expect(categoriesInFileLength).toEqual(categoriesCreatedLength);

        for(let i = 0; i < categoriesInFileLength; i++) {
            let categoryNameInFile = categoriesInFile[i];

            let categoryNameCreated = categoriesCreated[i];

            expect(categoryNameInFile).toEqual(categoryNameCreated);

        }
    }

    /**
     * Select only one category in the category menu bulk upload filter
     * @param categoryName 
     */
    async selectOptionInCategoryFilter(categoryName: string){
        let categoryNameFilter: string;

        let categoryQuantity = await this.categoryFilterCategoryName.count();


        for(let i = 0; i < categoryQuantity; i++) {
            categoryNameFilter = (await this.categoryFilterCategoryName.nth(i).innerText()).trim();
            if(categoryNameFilter == "All categories"){
                await this.categoryFilterCheckbox.nth(i).click({delay:400});
                break;
            }
            
        }

        for(let i = 0; i < categoryQuantity; i++) {
            categoryNameFilter = (await this.categoryFilterCategoryName.nth(i).innerText()).trim();
            if(categoryNameFilter == categoryName){
                await this.categoryFilterCheckbox.nth(i).click({delay:400});
                break;
            }
        }
    }

    async verifyCategoriesInTable(categoryName: string){
        const common = new CommonModel(this.page);
        let categoryInTable: string;
        let validFiltered: boolean = true;

        await common.verifyThatLocatorIsVisible(this.contentPreviewTable.locator('tr').last().locator('td').last());


        for(let i = 0; i < 60; i++) {
            categoryInTable = await this.contentPreviewTable.locator('tr').nth(1).locator("td").nth(0).innerText();
            if(categoryInTable != ""){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        let rows = await this.contentPreviewTable.locator('tr').count();
        
        for(let i = 0; i < rows; i++) {
            categoryInTable = await this.contentPreviewTable.locator('tr').nth(i).locator("td").nth(6).innerText();
            if(categoryInTable != categoryName){
                validFiltered = false;
            }
        }

        expect(validFiltered).toBeTruthy();
    }

    async verifyCategoryIsDisplayed(categoryName: string) {

        await expect( async () => {
            await expect(this.page.getByRole('button', { name: `${categoryName}` })).toBeVisible( {timeout:300} );
        }).toPass();

        let isExpanded = await this.page.getByRole('button', { name: `${categoryName}` }).getAttribute("aria-expanded");

        if(isExpanded === "false") {
            await expect( async () => {
                await this.page.getByRole('button', { name: `${categoryName}` }).click();
            }).toPass();
            
        }

    }
}


