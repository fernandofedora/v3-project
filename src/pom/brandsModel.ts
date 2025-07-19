import { expect, Locator, Page } from '@playwright/test';
import { CommonModel } from './commonModel';
import { brandsData, storeData, contentIntegrations, checkoutIntegrations } from '../data/brandsData';
import { NodesTypesEnum } from '../enums/nodeTypes.enum';
import { LanguageDto } from '../dto/language.dto';
import { SubBrandDto } from '../dto/subbrand.dto';
import { StoreDto } from '../dto/store.dto';
import { StoreFullDto } from '../dto/storeFull.sto';


export class BrandsModel {

    readonly page: Page;
    readonly commonModel: CommonModel;
    readonly createBtn: Locator;
    readonly brandNameInput: Locator;
    readonly brandSaveBtn: Locator;
    readonly nodeSupportLanguagesField: Locator;
    readonly nodeDefaultLanguageField: Locator;
    readonly multiSelectOptionsPanel: Locator;
    readonly defaultLanguagesMenu: Locator;
    readonly brandTable: Locator;
    readonly nodesTable: Locator;
    readonly editBtn: Locator;
    readonly manageNodeBtn: Locator;
    readonly addChildBtn: Locator;
    readonly editNodeBtn: Locator;
    readonly brandHierarchyTable: Locator;
    readonly nodeTable: Locator;
    readonly manageContentBtn: Locator;
    readonly cancelButton: Locator;
    readonly storeCircularStartDayDropdown: Locator;
    readonly circularTimezoneDropdown: Locator;
    readonly storeCircularStartDayOption: Locator;
    readonly timezoneOptions: Locator;

    readonly brandSubdomainInput: Locator;
    readonly nodePopupBtn: Locator;
    readonly brandNationalContentBannerInput: Locator;
    readonly nodeCategoryDividedLayoutSwitch: Locator;
    readonly nodeNationalFeaturedDealsSwitch: Locator;
    readonly nodeRecipeSupportToogle: Locator;
    readonly nodeCouponSupportToogle: Locator;
    readonly nodeActiveToogle: Locator;
    readonly nodeHideCartSwitch: Locator;
    readonly nodeDeferCartToogle: Locator;
    readonly nodeWarningThresholdToogle: Locator;
    readonly storeWarningThresholdToogle: Locator;
    readonly storeSelectorRadiusToogle: Locator;
    readonly storeManageImageBtn: Locator;
    readonly nodeYoutubeIdInput: Locator;
    readonly nodeUIConfigInput: Locator;
    readonly nodeThemeInput: Locator;
    readonly nodeDefaultPageNameInput: Locator;
    readonly nodeCategoryPageNameInput: Locator;
    readonly nodeStoresLinkedToogle: Locator;
    readonly brandLoyaltyDeals: Locator;
    readonly brandGoLiveSwitch: Locator;
    readonly brandGoLiveSwitchStatusIcons: Locator;
    readonly nodeLiveDateInput: Locator;
    readonly minimumContentThresholdInput: Locator;
    readonly nodeLogoInput: Locator;
    readonly nodeHowToImgInput: Locator;
    readonly nodeKioskHeaderImgInput: Locator;
    readonly nodeFavIconInput: Locator;
    readonly printLogoInput: Locator;
    readonly nodeCardStylesField: Locator;
    readonly switchToView: Locator;
    readonly unclippingSupportToogle: Locator;
    readonly useBrandSubDomain: Locator;

    readonly nodeDropdown: Locator;
    readonly nodeTypeStore: Locator;
    readonly nodeNameInput: Locator;
    readonly storeAddressInput: Locator;
    readonly storeCityInput: Locator;
    readonly storeStateInput: Locator;
    readonly storeZipInput: Locator;
    readonly storePhoneInput: Locator;
    readonly storeCircularPathInput: Locator;
    readonly storeGoogleLocationInput: Locator;
    readonly storeLogoLinkInput: Locator;
    readonly nodeSiteTitleInput: Locator;
    readonly nodeSiteDescriptionInput: Locator;
    readonly storeDisplayTextInput: Locator;
    readonly nodeCircularSubdomainInput: Locator;
    readonly storeContactBtnLabelInput: Locator;
    readonly storeHoursInput: Locator;
    readonly nodeNotesTextArea: Locator;
    readonly nodeContentAdminDropdown: Locator;
    readonly nodeContentAdminOption: Locator;
    readonly storeCircularDayStartTimeInput: Locator;
    readonly nodeCircularStartDayDropdown: Locator;
    readonly nodeCircularStartDayOption: Locator;
    readonly googlePlaceIdInput: Locator;
    readonly latitudeInput: Locator;
    readonly longitudeInput: Locator;
    readonly storeGoLiveSwitch: Locator;
    readonly storeActiveSwitch: Locator;
    readonly dateTimePickerOkBtn: Locator;
    readonly storeContentIntegrationSwitch: Locator;
    readonly storeCheckoutIntegrationSwitch: Locator;
    readonly storePwaSwitch: Locator;
    readonly storeShowContactSwitch: Locator;
    readonly storeContentIntegrationDropdown: Locator;
    readonly storeAppKeyInput: Locator;
    readonly storeAppSecretInput: Locator;
    readonly storeIdInput: Locator;
    readonly storeCheckoutIntegrationDropdown: Locator;
    readonly storeDomainInput: Locator;
    readonly storePwaTitleInput: Locator;
    readonly storeCheckoutIntegrationOption: Locator;
    readonly nodeLoyaltyDealsToogle: Locator;
    readonly nodeLoyaltyDealLogoField: Locator;

    readonly chooseManageImgInput: Locator;
    readonly nodeTogglerIcon: Locator;

    readonly deleteBtn: Locator;
    readonly deleteConfirmnBtn: Locator;
    readonly storeVanityNameInput: Locator;
    readonly storeIdFieldInput: Locator;
    readonly dropdownOptions: Locator;
    readonly couponIntegrationDropdown: Locator;
    readonly appcardMerchantIdInput: Locator;
    readonly bannerInput: Locator;
    readonly inmarRetailerId: Locator;
    readonly registrationUrl: Locator;
    readonly goLiveIcon: Locator;
    readonly activeIcon: Locator;
    readonly brandCategoryDividedLayoutSwitch: Locator;
    readonly brandNationalFeaturedDealsSwitch: Locator;
    readonly brandRecipeSupportToogle: Locator;
    readonly brandCouponSupportToogle: Locator;
    readonly brandActiveToogle: Locator;
    readonly brandUnclippingSupportToogle: Locator;
    readonly brandHideCartSwitch: Locator;
    readonly brandDeferCartToogle: Locator;
    readonly brandWarningThresholdToogle: Locator;
    readonly brandStoreSelectorRadiusToogle: Locator;
    readonly brandStoresLinkedToogle: Locator;
    readonly nodeGoLiveSwitch: Locator;
    readonly loyaltyDealLabelField: Locator;
    readonly loyaltyDealLogoField: Locator;
    readonly loyaltyColorField: Locator;
    readonly saveBtn: Locator;
    readonly errorMessageLoyaltyDealLabelIsRequired: Locator;
    readonly errorMessageLoyaltyDealColorIsRequired: Locator;

    readonly pwaBtn: Locator;

    constructor (page: Page) {
        this.page = page;
        this.commonModel = new CommonModel(page);
        this.createBtn = page.locator('div.dh-detail-page__wrapper dh-button>div.dh-button');
        this.brandNameInput = page.locator('div>input[formControlName="name"]');
        this.brandSaveBtn = page.getByRole('button', { name: 'Save' });
        this.nodeSupportLanguagesField = page.locator('p-multiselect[formcontrolname="languages"] > div');
        this.nodeDefaultLanguageField = page.locator('p-dropdown[formcontrolname="defaultLanguage"] > div');
        this.multiSelectOptionsPanel = page.locator("div.p-multiselect-panel");
        this.defaultLanguagesMenu = page.locator('div.p-dropdown-panel p-dropdownitem')
        this.brandTable = page.locator('table.p-datatable-table > tbody.p-datatable-tbody');
        this.nodesTable = page.locator('dh-detail-page table > tbody');
        this.editBtn = page.locator('button.p-button-rounded.p-button-success.p-mr-2.p-ripple.p-button.p-component.p-button-icon-only>span.p-button-icon.pi.pi-pencil');
        this.manageNodeBtn = page.locator('button.p-button-rounded.p-button-success.p-button.p-component.p-button-icon-only>span.p-button-icon.pi.pi-users');
        this.addChildBtn = page.locator('button.p-button-rounded.p-button-success.p-button.p-button-icon-only>span.p-button-icon.pi.pi-plus');
        this.editNodeBtn = page.locator('button.p-button-rounded.p-button-success>span.p-button-icon.pi.pi-pencil');
        this.brandHierarchyTable = page.locator('app-brand-hierarchy table tbody');
        this.nodeCardStylesField = page.locator('p-multiselect[formcontrolname="cardStyles"] > div');
        this.brandHierarchyTable = page.locator('app-brand-hierarchy table tbody');
        this.nodeTable = page.locator('p-treetable table tbody');
        this.manageContentBtn = page.locator('button.p-button-rounded.p-button-success.p-button.p-component.p-button-icon-only>span.p-button-icon.pi.pi-folder');
        this.cancelButton = page.locator('button.cancel-btn');
        this.storeCircularStartDayDropdown = page.locator('mat-form-field div select[formcontrolname="circularStartDayOfWeek"]');
        this.circularTimezoneDropdown = page.locator('mat-select[formcontrolname="circularTimezone"]');
        this.timezoneOptions = page.locator('div[role="listbox"]');
        this.saveBtn = page.getByRole('button', { name: 'Save' });

        // * Node brand page.locators
        this.brandSubdomainInput = page.locator('mat-form-field input[formcontrolname="circularSubdomain"]');
        this.nodePopupBtn = page.locator('mat-dialog-actions > button > span:nth-child(2)');
        this.brandNationalContentBannerInput = page.locator('app-input-dh-media[controlnamefrom="nationalContentBannerHref"]>mat-form-field input');
        this.useBrandSubDomain = page.locator('mat-dialog-container mat-slide-toggle').nth(0);
        this.brandCategoryDividedLayoutSwitch = page.locator("mat-dialog-container mat-slide-toggle").nth(0);
        this.brandNationalFeaturedDealsSwitch = page.locator("mat-dialog-container mat-slide-toggle").nth(1);
        this.brandRecipeSupportToogle = page.locator("mat-dialog-container mat-slide-toggle").nth(2);
        this.brandCouponSupportToogle = page.locator("mat-dialog-container mat-slide-toggle").nth(3);
        this.brandActiveToogle = page.locator("mat-dialog-container mat-slide-toggle").nth(4);
        this.brandUnclippingSupportToogle = page.locator("mat-dialog-container mat-slide-toggle").nth(5);
        this.brandHideCartSwitch = page.locator("mat-dialog-container mat-slide-toggle").nth(6);
        this.brandDeferCartToogle = page.locator("mat-dialog-container mat-slide-toggle").nth(7);
        this.brandWarningThresholdToogle = page.locator("mat-dialog-container mat-slide-toggle").nth(8);
        this.brandStoreSelectorRadiusToogle = page.locator("mat-dialog-container mat-slide-toggle").nth(9);
       // this.brandLoyaltyDeals = page.locator("mat-dialog-container mat-slide-toggle").nth(10);
       this.brandLoyaltyDeals = page.getByLabel('Loyalty Deals');

        this.brandStoresLinkedToogle = page.locator("mat-dialog-container mat-slide-toggle").nth(13);
        this.brandGoLiveSwitch = page.locator('mat-dialog-container mat-slide-toggle').nth(15);
        //this.loyaltyDealLabelField = page.locator('input[formcontrolname="loyaltyDealLabel"]');
        this.loyaltyDealLabelField = page.locator('div').filter({ hasText: /^Loyalty Deal Label$/ }).first().getByRole('textbox');
        //this.loyaltyDealLogoField = page.locator('app-edit-brand-form > div:nth-child(1) > div:nth-child(10) app-input-dh-media input');
        this.loyaltyDealLogoField = page.locator('div').filter({ hasText: /^Loyalty Deal Logo$/ }).getByRole('textbox');
        //this.loyaltyColorField = page.locator('input[formcontrolname="loyaltyDealColor"]');
        this.loyaltyColorField = page.getByPlaceholder('Loyalty', { exact: true });
        //this.errorMessageLoyaltyDealLabelIsRequired = page.locator('app-error-messages ul>li').nth(0);
        this.errorMessageLoyaltyDealLabelIsRequired = page.getByText('Loyalty Deal Label is required');
        //this.errorMessageLoyaltyDealColorIsRequired = page.locator('app-error-messages ul>li').nth(1);
        this.errorMessageLoyaltyDealColorIsRequired = page.getByText('Loyalty Deal Color is required');

        this.nodeCategoryDividedLayoutSwitch = page.locator("mat-dialog-container mat-slide-toggle").nth(1);
        this.nodeNationalFeaturedDealsSwitch = page.locator("mat-dialog-container mat-slide-toggle").nth(2);
        this.nodeRecipeSupportToogle = page.locator("mat-dialog-container mat-slide-toggle").nth(3);
        this.nodeCouponSupportToogle = page.locator("mat-dialog-container mat-slide-toggle").nth(4);
        this.nodeActiveToogle = page.locator("mat-dialog-container mat-slide-toggle").nth(5);
        this.unclippingSupportToogle = page.locator("mat-dialog-container mat-slide-toggle").nth(6);
        this.nodeHideCartSwitch = page.locator("mat-dialog-container mat-slide-toggle").nth(7);
        this.nodeDeferCartToogle = page.locator("mat-dialog-container mat-slide-toggle").nth(8);
        this.nodeWarningThresholdToogle = page.locator("mat-dialog-container mat-slide-toggle").nth(9);
        this.storeWarningThresholdToogle = page.locator("app-node-group-form div[class='col-md-6'] > div:nth-child(11) > div:nth-child(3) mat-slide-toggle");
        this.storeSelectorRadiusToogle = page.locator("app-node-group-form div:nth-child(1) > div:nth-child(10) > div:nth-child(7) > mat-slide-toggle");
        this.nodeGoLiveSwitch = page.locator('mat-dialog-container mat-slide-toggle').nth(16);
        this.storeManageImageBtn = page.locator('mat-dialog-container button[aria-label="Select"]');
        this.nodeYoutubeIdInput = page.locator('mat-form-field input[formcontrolname="howToVideo"]');
        this.nodeUIConfigInput = page.locator('input[formcontrolname="uiConfig"]');
        this.nodeThemeInput = page.locator('mat-form-field input[formcontrolname="theme"]');
        this.nodeDefaultPageNameInput = page.locator('app-translation-field[formcontrolname="defaultPageName"] input[formcontrolname="translation"]');
        this.nodeCategoryPageNameInput = page.locator('app-translation-field[formcontrolname="categoryPageName"] input[formcontrolname="translation"]');
        this.nodeStoresLinkedToogle = page.locator("mat-dialog-container mat-slide-toggle").nth(14);
        this.nodeLoyaltyDealsToogle = page.getByLabel('Loyalty Deals');
        this.brandGoLiveSwitchStatusIcons = page.locator('mat-dialog-container mat-slide-toggle').nth(12);
        this.nodeLiveDateInput = page.locator('app-datetime-picker[controlname="goLiveDate"] input');
        this.minimumContentThresholdInput = page.locator('mat-form-field input[formcontrolname="minimumContentThreshold"]');
        this.nodeLogoInput = page.locator('app-input-dh-media[controlnamefrom="logoHref"]>mat-form-field input');
        this.nodeHowToImgInput = page.locator('app-input-dh-media[controlnamefrom="howToImageHref"]>mat-form-field input');
        this.nodeKioskHeaderImgInput = page.locator('app-input-dh-media[controlnamefrom="kioskHeaderImageHref"]>mat-form-field input');
        this.nodeFavIconInput = page.locator('app-input-dh-media[controlnamefrom="faviconHref"]>mat-form-field input');
        this.printLogoInput = page.locator('app-input-dh-media[controlnamefrom="printLogoHref"]>mat-form-field input');
        this.nodeCardStylesField = page.locator('p-multiselect[formcontrolname="cardStyles"] > div');
        this.switchToView = page.locator('a[style="color: blue;"]');
        this.storeCircularStartDayOption = page.locator('mat-form-field select[formcontrolname="circularStartDayOfWeek"] > option');
        this.nodeLoyaltyDealLogoField = page.locator('div').filter({ hasText: /^Loyalty Deal Logo$/ });

        // * New node store page.locators
        this.nodeDropdown = page.locator('app-new-node-group-dialog app-node-group-form mat-form-field.mat-mdc-form-field select');
        this.nodeTypeStore = page.locator('mat-form-field select').getByRole('combobox', { name: 'Node Type' });
        this.nodeNameInput = page.locator('mat-form-field input[formcontrolname="name"]');
        this.storeAddressInput = page.locator('mat-form-field input[formcontrolname="address1"]');
        this.storeCityInput = page.locator('mat-form-field input[formcontrolname="city"]');
        this.storeStateInput = page.locator('mat-form-field input[formcontrolname="state"]');
        this.storeZipInput = page.locator('mat-form-field input[formcontrolname="zip"]');
        this.storePhoneInput = page.locator('mat-form-field input[formcontrolname="phone"]');
        this.storeCircularPathInput = page.locator('mat-form-field input[formcontrolname="circularPath"]');
        this.storeGoogleLocationInput = page.locator('mat-form-field input[formcontrolname="googleMapsHref"]');
        this.storeLogoLinkInput = page.locator('mat-form-field input[formcontrolname="logoClickHref"]');
        this.nodeSiteTitleInput = page.locator('app-translation-field[formcontrolname="siteTitle"] input[formcontrolname="translation"]');
        this.nodeSiteDescriptionInput = page.locator('app-translation-field[formcontrolname="siteDescription"] input[formcontrolname="translation"]');
        this.storeDisplayTextInput = page.locator('app-translation-field[formcontrolname="chooseStoreDisplayText"] input[formcontrolname="translation"]');
        this.nodeCircularSubdomainInput = page.locator('mat-form-field input[formcontrolname="circularSubdomain"]');
        this.storeContactBtnLabelInput = page.locator('mat-form-field input[formcontrolname="contactName"]');
        this.storeHoursInput = page.locator('mat-form-field input[formcontrolname="hours"]');
        this.nodeNotesTextArea = page.locator('mat-form-field textarea[formcontrolname="notes"]');
        this.nodeContentAdminDropdown = page.locator('mat-dialog-container mat-select[formcontrolname="contentAdminUserHash"]');
        this.nodeContentAdminOption = page.locator('div.cdk-overlay-pane mat-option');
        this.storeCircularDayStartTimeInput = page.locator('app-time-picker-dh[formcontrolname="circularStartTimeOfDay"] div.p-inputgroup input');
        this.nodeCircularStartDayDropdown = page.locator('mat-form-field select[formcontrolname="circularStartDayOfWeek"]');
        this.nodeCircularStartDayOption = page.locator('mat-form-field select[formcontrolname="circularStartDayOfWeek"] > option');
        this.googlePlaceIdInput = page.locator('input[formcontrolname="googlePlaceId"]');
        this.latitudeInput = page.locator('mat-form-field input[formcontrolname="latitude"]');
        this.longitudeInput = page.locator('mat-form-field input[formcontrolname="longitude"]');
        this.storeGoLiveSwitch = page.locator('app-edit-store-form > div:nth-child(1) > div.row:nth-child(8) > div:nth-child(1) > mat-slide-toggle');
        this.storeActiveSwitch = page.locator('app-edit-store-form > div:nth-child(1) > div.row:nth-child(8) > div:nth-child(2) mat-slide-toggle');
        this.dateTimePickerOkBtn = page.locator('ngx-mat-datetime-content > div.actions > button');
        this.storeContentIntegrationSwitch = page.locator('app-edit-store-form > div:nth-child(1) > div.row:nth-child(10) > div:nth-child(1) mat-slide-toggle');
        this.storeCheckoutIntegrationSwitch = page.locator('app-edit-store-form > div:nth-child(1) > div.row:nth-child(10) > div:nth-child(2) mat-slide-toggle');
        this.storePwaSwitch = page.locator('app-edit-store-form > div:nth-child(2) form > div > mat-slide-toggle');
        this.storeShowContactSwitch = page.locator('app-edit-store-form > div:nth-child(1) > div.row:nth-child(11) > div:nth-child(1) mat-slide-toggle');
        this.storeContentIntegrationDropdown = page.locator('mat-form-field select[formcontrolname="contentIntegrationType"]');
        this.storeAppKeyInput = page.locator('mat-form-field input[formcontrolname="appKey"]');
        this.storeAppSecretInput = page.locator('mat-form-field input[formcontrolname="appSecret"]');
        this.storeIdInput = page.locator('mat-form-field input[formcontrolname="storeId"]');
        this.storeCheckoutIntegrationDropdown = page.locator('mat-form-field select[formcontrolname="checkoutIntegrationType"]');
        this.storeDomainInput = page.locator('mat-form-field input[formcontrolname="domain"]');
        this.storePwaTitleInput = page.locator('app-translation-field[formcontrolname="title"] input[formcontrolname="translation"]');
        this.storeCheckoutIntegrationOption = page.locator('mat-form-field select[formcontrolname="checkoutIntegrationType"] > option');

        this.chooseManageImgInput = page.locator('p-fileupload input[type="file"]');
        this.nodeTogglerIcon = page.locator('dh-detail-page button.p-treetable-toggler.p-link.p-ripple');

        this.deleteBtn = page.locator('button.p-button-rounded.p-button-danger.p-ripple.p-button.p-component.p-button-icon-only.ng-star-inserted');
        this.deleteConfirmnBtn = page.locator('button.confirm-btn');
        this.storeVanityNameInput = page.locator('mat-form-field input[formcontrolname="storeVanityName"]');
        this.storeIdFieldInput = page.locator('mat-form-field input[formcontrolname="storeId"]');
        this.dropdownOptions = page.locator('mat-option > span');
        this.couponIntegrationDropdown = page.locator('mat-form-field mat-select[formcontrolname="couponIntegration"]');
        this.appcardMerchantIdInput = page.locator('mat-form-field input[formcontrolname="appcardMerchantId"]');
        this.bannerInput = page.locator('mat-form-field input[formcontrolname="banner"]');
        this.inmarRetailerId = page.locator('mat-form-field input[formcontrolname="inmarRetailerId"]');
        this.registrationUrl = page.locator('mat-form-field input[formcontrolname="registrationUrl"]');
        this.goLiveIcon = page.locator('mat-icon[role="img"]').getByText("update", {exact: true});
        this.activeIcon = page.locator('mat-icon[role="img"]').getByText('check_circle', {exact: true});

        this.pwaBtn = page.locator('button[title="PWA Configuration"] span.mat-mdc-button-touch-target');
    }

    async onClickBrandCreateButton() {
        let createBtnVisible: boolean;
        for(let i = 0;  i < 60; i++){
            createBtnVisible = await this.createBtn.isVisible();
            if(createBtnVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.createBtn.click();
    }

    async onClickNodeSaveButton(){
        let saveButtonVisible: boolean;
        for(let i = 0; i < 60; i++){
            saveButtonVisible = await this.nodePopupBtn.nth(1).isVisible();
            if(saveButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.nodePopupBtn.nth(1).click({delay:1000});
    }

    async onClickNodeCancelButton(){
        let cancelButtonVisible: boolean;
        for(let i = 0; i < 60; i++){
            cancelButtonVisible = await this.nodePopupBtn.nth(0).isVisible();
            if(cancelButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.nodePopupBtn.nth(0).click({delay:1000});
    }

    async onClickPwaConfigButton() {
        let pwaBtnVisible: boolean;
        for(let i = 0;  i < 60; i++){
            pwaBtnVisible = await this.pwaBtn.nth(0).isVisible();
            if(pwaBtnVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.pwaBtn.nth(0).click();
    }

    async setBrandName(brandName: string) {
        let brandNameInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            brandNameInputVisible = await this.brandNameInput.isVisible();
            if(brandNameInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.brandNameInput.click({delay:200});
        await this.brandNameInput.clear();
        await this.brandNameInput.fill(brandName, {timeout:1000});
    }

    async setNodeName(name: string) {
        let nodeNameInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            nodeNameInputVisible = await this.nodeNameInput.isVisible();
            if(nodeNameInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.nodeNameInput.click( {delay:2000} );
        await this.nodeNameInput.clear();
        await this.nodeNameInput.fill(name, {timeout: 500});
    }

    async setNodeSubdomain(name: string) {
        let nodeCircularSubDomainInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            nodeCircularSubDomainInputVisible = await this.nodeCircularSubdomainInput.isVisible();
            if(nodeCircularSubDomainInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.nodeCircularSubdomainInput.click( {delay:500} );
        await this.nodeCircularSubdomainInput.clear();
        await this.nodeCircularSubdomainInput.fill(name, {timeout:1000});
    }

    async setNodeSiteTitle(name: string, index = 0) {
        let nodeSiteTitleInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            nodeSiteTitleInputVisible = await this.nodeSiteTitleInput.nth(index).isVisible();
            if(nodeSiteTitleInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.nodeSiteTitleInput.nth(index).click({delay:200});
        await this.nodeSiteTitleInput.nth(index).clear();
        await this.nodeSiteTitleInput.nth(index).fill(name, {timeout:2000});
        await this.nodeSiteTitleInput.nth(index).clear();
        await this.nodeSiteTitleInput.nth(index).fill(name);
        await this.page.waitForTimeout(500);
    }

    async setNodeSiteDescription(name: string, index = 0) {
        let nodeSiteDescriptionInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            nodeSiteDescriptionInputVisible = await this.nodeSiteDescriptionInput.nth(index).isVisible();
            if(nodeSiteDescriptionInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.nodeSiteDescriptionInput.nth(index).click({delay:200});
        await this.nodeSiteDescriptionInput.nth(index).clear();
        await this.nodeSiteDescriptionInput.nth(index).fill(name, {timeout:2000});
    }

    async setStoreDisplayText(name: string, index = 0) {
        let storeDisplayTextInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            storeDisplayTextInputVisible = await this.storeDisplayTextInput.nth(index).isVisible();
            if(storeDisplayTextInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.storeDisplayTextInput.nth(index).click({delay:200});
        await this.storeDisplayTextInput.nth(index).clear();
        await this.storeDisplayTextInput.nth(index).fill(name, {timeout:2000});
    }

    async setNotes(notes: string) {
        await this.nodeNotesTextArea.fill(notes);
    }

    async setHowToYoutubeId(youtubeId: string) {
        await this.nodeYoutubeIdInput.fill(youtubeId);
    }

    async setUiConfig(uiConfig: string) {
        await this.nodeUIConfigInput.fill(uiConfig);
    }

    async setTheme(theme: string) {
        await this.nodeThemeInput.fill(theme);
    }

    async setDefaultPageName(name: string) {
        await this.nodeDefaultPageNameInput.fill(name);
    }

    async setCategoryPageName(name: string) {
        await this.nodeCategoryPageNameInput.fill(name);
    }

    async setMinimumContentThreshold(value: string) {
        await this.minimumContentThresholdInput.fill(value, {timeout: 1000});
    }

    async setStoreAddress(address: string) {
        await this.storeAddressInput.fill(address);
    }

    async setStoreCity(city: string) {
        await this.storeCityInput.fill(city);
    }

    async setStoreState(state: string) {
        await this.storeStateInput.fill(state);
    }

    async setStoreZip(zip: string) {
        await this.storeZipInput.fill(zip);
    }

    async setStorePhone(phone: string) {
        await this.commonModel.verifyThatLocatorIsVisible(this.storePhoneInput);
        await this.storePhoneInput.fill(phone);
    }

    async setStoreCircularPath(circularPath: string) {
        await this.storeCircularPathInput.fill(circularPath);
    }

    async setStoreGoogleLocation(googleLocation: string) {
        await this.storeGoogleLocationInput.fill(googleLocation);
    }

    async setLogoClickLink(link: string) {
        await this.storeLogoLinkInput.fill(link);
    }

    async setGooglePlaceId(id: string) {
        //if (id instanceof Array) id = id[0];
        await this.googlePlaceIdInput.click({delay:100});
        await this.googlePlaceIdInput.clear();
        await this.googlePlaceIdInput.fill(id, {timeout:1000});
    }

    async setLatitude(lat: string) {
        await this.latitudeInput.fill(lat);
    }

    async setLongitude(lng: string) {
        await this.longitudeInput.fill(lng);
    }

    async uploadImage(index: number, imageUrl: string | string[]) {
        await this.storeManageImageBtn.nth(index).click()
        await this.page.waitForTimeout(500);
        await this.chooseManageImgInput.setInputFiles(imageUrl);
        await this.commonModel.waitUntilSpinnerDisappears();

        await this.nodePopupBtn.nth(3).click();
    }

    async onClickBrandSaveButton() {
        await this.brandSaveBtn.click();
        await this.commonModel.waitUntilSpinnerDisappears();
    }

    async onClickNodeDeleteButton(indexRow: number) {
        await this.deleteBtn.nth(indexRow).click();
        await this.deleteConfirmnBtn.click();
    }

    async onClickContentAdminUser(index: number) {
        await this.nodeContentAdminDropdown.click();
        await this.nodeContentAdminOption.nth(index).click();
    }

    async onClickCategoryDividedLayout(enabled: boolean) {
        const isCdlEnabled = (await this.nodeCategoryDividedLayoutSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isCdlEnabled && !enabled) || (!isCdlEnabled && enabled)) {
            await this.nodeCategoryDividedLayoutSwitch.click();
        }
    }

    async onClickBrandCategoryDividedLayout(enabled: boolean) {
        const isCdlEnabled = (await this.brandCategoryDividedLayoutSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isCdlEnabled && !enabled) || (!isCdlEnabled && enabled)) {
            await this.brandCategoryDividedLayoutSwitch.click();
        }
    }

    async onClickNationalFeatureDeals(enabled: boolean) {
        const isNationalFeatureEnabled = (await this.nodeNationalFeaturedDealsSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isNationalFeatureEnabled && !enabled) || (!isNationalFeatureEnabled && enabled)) {
            await this.nodeNationalFeaturedDealsSwitch.click();
        }
    }

    async onClickBrandNationalFeatureDeals(enabled: boolean) {
        const isNationalFeatureEnabled = (await this.brandNationalFeaturedDealsSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isNationalFeatureEnabled && !enabled) || (!isNationalFeatureEnabled && enabled)) {
            await this.brandNationalFeaturedDealsSwitch.click();
        }
    }

    async onClickRecipeToogle(enabled: boolean) {
        const isRecipeSupportEnabled = (await this.nodeRecipeSupportToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isRecipeSupportEnabled && !enabled) || (!isRecipeSupportEnabled && enabled)) {
            await this.nodeRecipeSupportToogle.click();
        }
    }

    async onClickBrandRecipeToogle(enabled: boolean) {
        const isRecipeSupportEnabled = (await this.brandRecipeSupportToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isRecipeSupportEnabled && !enabled) || (!isRecipeSupportEnabled && enabled)) {
            await this.brandRecipeSupportToogle.click();
        }
    }

    async onClickCouponToogle(enabled: boolean) {
        const isCouponSupportEnabled = (await this.nodeCouponSupportToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isCouponSupportEnabled && !enabled) || (!isCouponSupportEnabled && enabled)) {
            await this.nodeCouponSupportToogle.click();
        }
    }


    async onClickBrandCouponToogle(enabled: boolean) {
        const isCouponSupportEnabled = (await this.brandCouponSupportToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isCouponSupportEnabled && !enabled) || (!isCouponSupportEnabled && enabled)) {
            await this.brandCouponSupportToogle.click();
        }
    }

    async onClickActiveToogle(enabled: boolean) {
        const isActiveEnabled = (await this.nodeActiveToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isActiveEnabled && !enabled) || (!isActiveEnabled && enabled)) {
            await this.nodeActiveToogle.click();
        }
    }

    async onClickBrandActiveToogle(enabled: boolean) {
        const isActiveEnabled = (await this.brandActiveToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isActiveEnabled && !enabled) || (!isActiveEnabled && enabled)) {
            await this.brandActiveToogle.click();
        }
    }

    async onClickHideCartToogle(enabled: boolean) {
        const isHideCartEnabled = (await this.nodeHideCartSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isHideCartEnabled && !enabled) || (!isHideCartEnabled && enabled)) {
            await this.nodeHideCartSwitch.click();
        }
    }

    async onClickBrandHideCartToogle(enabled: boolean) {
        const isHideCartEnabled = (await this.brandHideCartSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isHideCartEnabled && !enabled) || (!isHideCartEnabled && enabled)) {
            await this.brandHideCartSwitch.click();
        }
    }

    async onClickDeferCartToogle(enabled: boolean) {
        const isDeferCartEnabled = (await this.nodeDeferCartToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isDeferCartEnabled && !enabled) || (!isDeferCartEnabled && enabled)) {
            await this.nodeDeferCartToogle.click();
        }
    }

    async onClickBrandDeferCartToogle(enabled: boolean) {
        const isDeferCartEnabled = (await this.brandDeferCartToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isDeferCartEnabled && !enabled) || (!isDeferCartEnabled && enabled)) {
            await this.brandDeferCartToogle.click();
        }
    }

    async onClickWarningThresholdToogle(enabled: boolean) {
        const isWarningThresholdEnabled = (await this.nodeWarningThresholdToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isWarningThresholdEnabled && !enabled) || (!isWarningThresholdEnabled && enabled)) {
            await this.nodeWarningThresholdToogle.click();
        }
    }

    async onClickBrandWarningThresholdToogle(enabled: boolean) {
        const isWarningThresholdEnabled = (await this.brandWarningThresholdToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isWarningThresholdEnabled && !enabled) || (!isWarningThresholdEnabled && enabled)) {
            await this.brandWarningThresholdToogle.click();
        }
    }

    async onClickStoreWarningThresholdToogle(enabled: boolean) {
        const isWarningThresholdEnabled = (await this.storeWarningThresholdToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isWarningThresholdEnabled && !enabled) || (!isWarningThresholdEnabled && enabled)) {
            await this.storeWarningThresholdToogle.click();
        }
    }

    async onClickStoreSelectorRadiusToogle(enabled: boolean) {
        const isStoreSelectorRadiusEnabled = (await this.storeSelectorRadiusToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isStoreSelectorRadiusEnabled && !enabled) || (!isStoreSelectorRadiusEnabled && enabled)) {
            await this.storeSelectorRadiusToogle.click();
        }
    }

    async onClickBrandStoreSelectorRadiusToogle(enabled: boolean) {
        const isStoreSelectorRadiusEnabled = (await this.brandStoreSelectorRadiusToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isStoreSelectorRadiusEnabled && !enabled) || (!isStoreSelectorRadiusEnabled && enabled)) {
            await this.brandStoreSelectorRadiusToogle.click();
        }
    }

    async onClickBrandLoyaltyDealsToogle(enabled: boolean) {
        const isLoyaltyDealsEnabled = await this.brandLoyaltyDeals.isChecked();
        if ((isLoyaltyDealsEnabled && !enabled) || (!isLoyaltyDealsEnabled && enabled)) {
            await this.brandLoyaltyDeals.click();
        }
    }

    async onClickNodeLoyaltyDealsToogle(enabled: boolean) {
        const isLoyaltyDealsEnabled = await this.nodeLoyaltyDealsToogle.isChecked();
        if ((isLoyaltyDealsEnabled && !enabled) || (!isLoyaltyDealsEnabled && enabled)) {
            await this.nodeLoyaltyDealsToogle.click();
        }
    }

    async onClickStoresLinkedToogle(enabled: boolean) {
        const isStoresLinkedEnabled = (await this.nodeStoresLinkedToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isStoresLinkedEnabled && !enabled) || (!isStoresLinkedEnabled && enabled)) {
            await this.nodeStoresLinkedToogle.click();
        }
    }

    async onClickBrandStoresLinkedToogle(enabled: boolean) {
        const isStoresLinkedEnabled = (await this.brandStoresLinkedToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isStoresLinkedEnabled && !enabled) || (!isStoresLinkedEnabled && enabled)) {
            await this.brandStoresLinkedToogle.click();
        }
    }

    async onClickGoLiveToogle(enabled: boolean) {
        const isGoLiveEnabled = (await this.nodeGoLiveSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isGoLiveEnabled && !enabled) || (!isGoLiveEnabled && enabled)) {
            await this.nodeGoLiveSwitch.click();
        }
    }

    async onClickBrandGoLiveToogle(enabled: boolean) {
        const isGoLiveEnabled = (await this.brandGoLiveSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isGoLiveEnabled && !enabled) || (!isGoLiveEnabled && enabled)) {
            await this.brandGoLiveSwitch.click();
        }
    }

    async onClickUnclippingSupportToogle(enabled: boolean) {
        const unclippingSupportEnabled = (await this.unclippingSupportToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((unclippingSupportEnabled && !enabled) || (!unclippingSupportEnabled && enabled)) {
            await this.unclippingSupportToogle.click();
        }
    }

    async onClickBrandUnclippingSupportToogle(enabled: boolean) {
        const unclippingSupportEnabled = (await this.brandUnclippingSupportToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((unclippingSupportEnabled && !enabled) || (!unclippingSupportEnabled && enabled)) {
            await this.brandUnclippingSupportToogle.click();
        }
    }

    async onClickNodeLoyaltyDealsToogleEnabledToogle(enabled: boolean) {
        const nodeLoyaltyDealsToogleEnabled = (await this.nodeLoyaltyDealsToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((nodeLoyaltyDealsToogleEnabled && !enabled) || (!nodeLoyaltyDealsToogleEnabled && enabled)) {
            await this.nodeLoyaltyDealsToogle.click({delay:4000});
        }
    }

    async onClickCircularStartDayOption(option: string) {
        await this.nodeCircularStartDayDropdown.click();
        await this.page.selectOption('mat-form-field select[formcontrolname="circularStartDayOfWeek"]', option);
        await this.nodeCircularStartDayDropdown.click();
    }

    /**
     * @param time Format 'HHMM'
     */
    async selectCircularDayStartTime(time: string){
        await this.storeCircularDayStartTimeInput.fill(time);
    }

    async createBrand(brandName: string, language: LanguageDto) {
        await this.onClickBrandCreateButton();
        await this.setBrandName(brandName);
        await this.onSelectSupportedLanguages(brandsData.englishLanguage, true);
        await this.selectionDefaultLanguage(brandsData.englishLanguage);

        if (language.dual){
            await this.onSelectSupportedLanguages(brandsData.spanishLanguage, true);
            await this.selectionDefaultLanguage(language.defaultLanguage);
        }

        await this.onClickBrandSaveButton();
    }

    async onClickBrandEditButton(indexRow: number) {
        await this.editBtn.nth(indexRow).click();
    }

    async onClickNodeEditButton(indexRow: number) {
        await this.editNodeBtn.nth(indexRow).click();
    }

    async editBrand(brandName: string) {
        let brandTableVisible: boolean;
        const brandNameEdit = brandName + 'Edit';
        let brandValue = '';

        await this.page.waitForTimeout(1000);
        for(let i = 0; i < 60; i++){
            brandTableVisible = await this.brandTable.first().isVisible();
            if(brandTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        const rowCount = await this.brandTable.locator('tr').count();

        for (let i = 0; i < rowCount; i++) {
            brandValue = await this.brandTable.locator('tr').nth(i).locator('td').nth(0).innerText();

            if (brandValue === brandName) {
                await this.onClickBrandEditButton(0);
                await this.setBrandName(brandNameEdit);
                await this.onClickBrandSaveButton();
                break;
            }
        }
    }

    async onClickManageNodeButton(indexRow: number) {
        await this.manageNodeBtn.nth(indexRow).click();
    }

    async goToManageNodes(brandName: string) {
        let brandTableVisible: Boolean;

        await this.page.waitForTimeout(1000);
        //await expect(this.brandTable).toBeEnabled();
        for (let i = 0; i < 60; i++) {
            brandTableVisible = await this.brandTable.locator('tr').first().isVisible();
            if (brandTableVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }
        const rowCount = await this.brandTable.locator('tr').count();
        for (let i = 0; i < rowCount; i++) {
            const brandValue = await this.brandTable.locator('tr').nth(i).locator('td').nth(0).innerText();
            if (brandValue.trim() === brandName) {
                await this.onClickManageNodeButton(i);
                break;
            }
        }
    }

    /**
     * Check or uncheck a supported language
     * @param language
     * @param enabled
     */
    async onSelectSupportedLanguages(language: string, enabled: boolean) {
        await expect(this.nodeSupportLanguagesField).toBeEnabled();
        await this.nodeSupportLanguagesField.scrollIntoViewIfNeeded();
        await this.nodeSupportLanguagesField.click();

        const isSelected = (await this.multiSelectOptionsPanel.locator('li', { hasText: language })
            .getAttribute('class'))?.includes('p-highlight');

        if ((isSelected && !enabled) || (!isSelected && enabled)) {
            await this.multiSelectOptionsPanel.locator('ul').locator('li', { hasText: language}).click();
        }
    }

    async selectionDefaultLanguage(language?: string) {
        await this.nodeDefaultLanguageField.click();
        await this.defaultLanguagesMenu.locator('li', { hasText: language}).click();
    }

    /**
     * Count the rows in the brand table
     * @param value
     */
    async hasBrandTableValues(){
        let brandTableVisible: boolean;
        for(let i = 0; i < 60; i++){
            brandTableVisible = await this.brandTable.first().isVisible();
            if(brandTableVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        let rowCount = await this.brandTable.locator('tr').count();
        expect(rowCount).toBeGreaterThan(0);

    }

    async hasNodeTableValues(count: number) {
        await expect(this.nodesTable.first()).toBeVisible();
        let nodeTableVisible: boolean;
        let rowCount: number;

        for(let i = 0; i < 60; i++){
            nodeTableVisible = await this.nodesTable.isVisible();
            if(nodeTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.page.waitForTimeout(1000);
        for(let i = 0; i < 60; i++){
            rowCount = await this.nodesTable.locator('tr').count();
            if(rowCount >= 3){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(rowCount!).toBeGreaterThanOrEqual(count);
    }

    async hasLoadInputsManageNode() {
        await expect(this.nodeSupportLanguagesField.locator('div.p-multiselect-label')).not.toHaveText('', { timeout: 5000 });
        await expect(this.nodeDefaultLanguageField.locator('span').nth(0)).not.toHaveText('', { timeout: 5000 });
        await expect(this.nodeDefaultPageNameInput.first()).toBeEnabled();
    }


    async checkValueInBrandTable(brandName: string) {
        let brandTableVisible: boolean;
        let exists = false;

        await this.page.waitForTimeout(1000);
        for(let i = 0; i < 60; i++){
            brandTableVisible = await this.brandTable.first().isVisible();
            if(brandTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        const rowCount = await this.brandTable.locator('tr').count();

        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < 60; j++) {
                const brandValue = (await this.brandTable.locator('tr').nth(i).locator('td').nth(0).innerText()).trim();
                if (brandValue === brandName) {
                    exists = true;
                    break;
                }
                await this.page.waitForTimeout(300);
            }
            if (exists) {
                break;
            }
        }

        expect(exists).toBeTruthy();
    }

    /**
     * Checks if a node exists with the type required
     * @param nodeName
     * @param type
     */
    async checkNodeWithTypeInTable(nodeName: string, type: string) {
        await this.page.waitForTimeout(1000);
        let exists = false;
        let nodesTableVisible: boolean;

        for(let i = 0; i < 60; i++){
            nodesTableVisible = await this.nodesTable.isVisible();
            if(nodesTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        const rowCount = await this.nodesTable.locator('tr').count();


        for (let i = 0; i < rowCount; i++) {
            const brandValue = await this.nodesTable.locator('tr').nth(i).locator('td').nth(0).innerText();
            const typeValue = await this.nodesTable.locator('tr').nth(i).locator('td').nth(1).innerText();

            if (brandValue.trim() === nodeName && typeValue === type) {
                exists = true;
                break;
            }
        }

        expect(exists).toBeTruthy();
    }

    async onClickAddChildNodesBtn(indexRow: number) {
        await this.addChildBtn.nth(indexRow).click();
    }

    /**
     * Create a new child node for either a `Brand` or a `SubBrand`
     * @param nodeType
     */
    async addChildNodes(nodeType: string) {
        let nodesTableVisible: boolean;
        for(let i = 0; i < 60; i++){
            nodesTableVisible = await this.nodesTable.locator('tr').first().isVisible();
            if(nodesTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        const rowCount = await this.nodesTable.locator('tr').count();
        for(let i = 0; i < rowCount; i++) {
            const columnText = await this.nodesTable.locator('tr').nth(i).locator('td').nth(1).innerText();

            if(columnText === nodeType) {
                await this.onClickAddChildNodesBtn(i);
                break;
            }
        }
    }

    async onClickNodeTypeStore(){
        await this.nodeDropdown.nth(0).click();
        await this.page.selectOption('app-new-node-group-dialog app-node-group-form mat-form-field.mat-mdc-form-field select', 'Store');
    }

    /**
     * Fill a subBrand with all the required fields
     * @param subBrandData
     */
    async fillSubBrandRequiredFields(subBrandData: SubBrandDto) {
        await this.nodeNameInput.click();

        await expect(this.nodeSiteTitleInput.first()).not.toHaveValue('', { timeout: 5000 });
        await expect(this.nodeSiteDescriptionInput).not.toHaveValue('', { timeout: 5000 });
        await expect(this.storeDisplayTextInput).not.toHaveValue('', { timeout: 5000 });

        await this.setNodeName(subBrandData.name);
        await this.setNodeSubdomain(subBrandData.subDomain);
        await this.setNodeSiteTitle(subBrandData.siteTitle);
        await this.setNodeSiteDescription(subBrandData.siteDesc);
        await this.setStoreDisplayText(subBrandData.storeDisplayText);
        await this.onClickWarningThresholdToogle(true);
        await this.setMinimumContentThreshold('2');
    }

    /**
     * Fill a store with all the required fields
     * @param storeData
     */
    async fillStoreRequiredFields(storeData: StoreDto) {
        await this.setNodeName(storeData.name);
        await this.setStoreAddress(storeData.address);
        await this.setStoreCity(storeData.city);
        await this.setStoreState(storeData.state);
        await this.setStoreZip(storeData.zip);
        await this.setStorePhone(storeData.phone);
        await this.setStoreCircularPath(storeData.circularPath);
        await this.setStoreGoogleLocation(storeData.googleLocation);
        await this.setNodeSiteTitle(storeData.title);
        await this.onClickStoreWarningThresholdToogle(true);
        await this.setMinimumContentThreshold(storeData.contentThreshold);
        await this.setGooglePlaceId('ChIJz4flen1J21IRtR775ZmagEA');
        await this.setLatitude(storeData.latitude);
        await this.setLongitude(storeData.longitude);
    }

    async checkRequiredValuesInStore(storeData: StoreDto) {
        let nodeNameInputVisible: boolean;
        let storeAddressInputVisible: boolean;
        let storeCityInput: boolean;
        let storeStateInput: boolean;
        let storeZipInput: boolean;
        let storePhoneInput: boolean;
        let storeCircularPathInput: boolean;
        let storeGoogleLocationInput: boolean;
        let nodeSiteTitleInput: boolean;

        for(let i = 0; i < 60; i++){
            nodeNameInputVisible = await this.nodeNameInput.isVisible();
            storeAddressInputVisible = await this.storeAddressInput.isVisible();
            storeCityInput = await this.storeCityInput.isVisible();
            storeStateInput = await this.storeStateInput.isVisible();
            storeZipInput = await this.storeZipInput.isVisible();
            storePhoneInput = await this.storePhoneInput.isVisible();
            storeCircularPathInput = await this.storeCircularPathInput.isVisible();
            storeGoogleLocationInput = await this.storeGoogleLocationInput.isVisible();
            nodeSiteTitleInput = await this.nodeSiteTitleInput.isVisible();

            if(nodeNameInputVisible && storeAddressInputVisible && storeCityInput && storeStateInput && storeZipInput && storePhoneInput &&
                storeCircularPathInput){
                    break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.page.waitForTimeout(1500);
        await expect(this.nodeNameInput).toHaveValue(storeData.name);
        await expect(this.storeAddressInput).toHaveValue(storeData.address);
        await expect(this.storeCityInput).toHaveValue(storeData.city);
        await expect(this.storeStateInput).toHaveValue(storeData.state);
        await expect(this.storeZipInput).toHaveValue(storeData.zip);
        await expect(this.storePhoneInput).toHaveValue(storeData.phone);
        await expect(this.storeCircularPathInput).toHaveValue(storeData.circularPath);
        await expect(this.storeGoogleLocationInput).toHaveValue(storeData.googleLocation);
        await expect(this.nodeSiteTitleInput).toHaveValue(storeData.title);
    }

    /**
     * If the table is collapsed, we need to expanded in order to read the rows data
     * @param index
     */
    async expandItemsInTable(index: number) {
        const tableCollapsed = await this.nodeTogglerIcon.nth(index).locator('chevronrighticon').isVisible();
        if(tableCollapsed)
            await this.nodeTogglerIcon.nth(index).click();
    }

    /**
     * Iterates the table to find the value required
     * @param nodeName
     */
    async getNodeNameCoincidenceInTable(nodeName: string) {
        await this.page.waitForTimeout(1500);
        let tableVisible: boolean;
        for(let i = 0; i < 60; i++){
            tableVisible = await this.nodesTable.isVisible();
            if(tableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        const rowCount = await this.nodesTable.locator('tr').count();
        let coincideName: string = '';
        let exists = false;
        for (let i = 0; i < rowCount; i++) {
            const columnText = await this.nodesTable.locator('tr').nth(i).locator('td').nth(0).innerText();

            if (columnText.trim() === nodeName) {
                exists = true;
                coincideName = columnText.trim();
                expect(exists).toBeTruthy();
                break;
            }
        }

        return coincideName;
    }

    async deleteNode(nodeName: string) {
        await this.page.waitForTimeout(3000);
        let nodesTableVisible: boolean;
        let nodeVisible: boolean;
        for(let i = 0; i < 60; i++){
            nodesTableVisible = await this.nodesTable.isVisible();
            if(nodesTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        const rowCount = await this.nodesTable.locator('tr').count();

        for (let i = 0; i < rowCount; i++) {
            const columnText = await this.nodesTable.locator('tr').nth(i).locator('td').nth(0).innerText();

            if (columnText.trim() === nodeName) {
                await this.onClickNodeDeleteButton(i-1);
                break;
            }
        }


        for (let i = 0; i < 60; i++) {
            nodeVisible = await this.nodesTable.locator(`tr:has-text("${nodeName}")`).isVisible();
            if (!nodeVisible) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(nodeVisible!).toBeFalsy();
    }

    async openEditNodePopUp(nodeName: string) {
        await this.page.waitForTimeout(2000);

        let nodesTableVisible: boolean;

        for(let i = 0; i < 60; i++){
            nodesTableVisible = await this.nodesTable.isVisible();
            if(nodesTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        const rowCount = await this.nodesTable.locator('tr').count();

        for(let i = 0; i < rowCount; i++) {
            const columnText = (await this.nodesTable.locator('tr').nth(i).locator('td').nth(0).innerText()).trim();

            if(columnText.trim() === nodeName){
                await this.onClickNodeEditButton(i);
                break;
            }
        }
    }

    async onClickAddChildToThisNodes(nodeName: string) {
        await this.page.waitForTimeout(1000);
        let tableVisible: boolean;
        for(let i = 0; i < 60; i++){
            tableVisible = await this.nodesTable.isVisible();
            if(tableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        const rowCount = await this.nodesTable.locator('tr').count();

        for(let i = 0; i < rowCount; i++) {
            const columnText = await this.nodesTable.locator('tr').nth(i).locator('td').nth(0).innerText();

            if(columnText.trim() === nodeName){
                await this.nodesTable.locator('tr').nth(i).locator('td').nth(8).locator('button[icon="pi pi-plus"]').click();
                break;
            }
        }
    }

    async expandNodeInTable(nodeToFind: string, nodeToExpand: string) {
        await this.page.waitForTimeout(2000);
        let tableVisible: boolean;

        for(let i = 0; i < 80; i++){
            tableVisible = await this.nodesTable.isVisible();
            if(tableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        const rowCount = await this.nodesTable.locator('tr').count();
        let elementExists = false;
        for (let i = 0; i < rowCount && !elementExists; i++) {
            await this.page.waitForTimeout(500);
            const columnText = await this.nodesTable.locator('tr').nth(i).locator('td').nth(0).innerText();
            elementExists = columnText.trim() === nodeToFind;
        }

        if (!elementExists) {
            for(let i = 0; i < rowCount; i++) {
                const columnText = await this.nodesTable.locator('tr').nth(i).locator('td').nth(0).innerText();

                if(columnText.trim() === nodeToExpand){
                    await this.nodesTable.locator('tr').nth(i).locator('td').nth(0).locator('button').click();
                    break;
                }
            }
        }
    }

    /**
     * Create the default subbrand node child as a prerequisite for the test if it does not exists.
     * @param parentNode The parent of the node to be created
     * @param childNode The node to be created
     * @param language
     */
    async configureDefaultSubBrandNode(parentNode: string, childNode: string, language?: LanguageDto) {
        await this.expandNodeInTable(childNode, parentNode);
        const nodeName = await this.getNodeNameCoincidenceInTable(childNode);
        if(!nodeName){
            await this.onClickAddChildToThisNodes(parentNode);
            const subbrandData = {
                name: childNode,
                subDomain: childNode,
                siteTitle: childNode,
                siteDesc: childNode,
                storeDisplayText: childNode
            };
            await this.fillSubBrandRequiredFields(subbrandData);

            if(language?.dual){
                await this.onSelectSupportedLanguages(brandsData.englishLanguage, true);
                await this.onSelectSupportedLanguages(brandsData.spanishLanguage, true);
                await this.selectionDefaultLanguage(language.defaultLanguage);
                await this.setNodeSiteTitle(childNode);
                await this.setNodeSiteDescription(childNode);
                await this.setStoreDisplayText(childNode);
            }

            await this.onClickNodeSaveButton();
            await this.commonModel.waitUntilSpinnerDisappears();
        }
    }

    /**
     * Create the default store node child as a prerequisite for the test if it does not exists.
     * @param parentNode The parent of the node to be created
     * @param childNode The node to be created
     */
    async configureDefaultStoreNode(parentNode: string, childNode: string, parentType: string){
        await this.expandNodeInTable(childNode, parentNode);
        const nodeName = await this.getNodeNameCoincidenceInTable(childNode);
        if(!nodeName){
            await this.onClickAddChildToThisNodes(parentNode);
            if(parentType === NodesTypesEnum.brand) await this.onClickNodeTypeStore();
            const data = {
                name: childNode,
                address: storeData.address,
                city: storeData.city,
                state: storeData.state,
                zip: storeData.zip,
                phone: storeData.phone,
                circularPath: childNode,
                googleLocation: storeData.googleLocation,
                title: childNode,
                contentThreshold: storeData.contentThreshold,
                googlePlaceId: storeData.googlePlaceId[4],
                latitude: storeData.latitude,
                longitude: storeData.longitude
            };
            await this.fillStoreRequiredFields(data);
            await this.onClickNodeSaveButton();
            await this.commonModel.waitUntilSpinnerDisappears();
        }
    }


    async verifyThatTheBrandTableIsDisplayed(){
        let brandTableVisible: boolean;
        for(let i = 0; i < 60; i++){
            brandTableVisible = await this.brandTable.first().isVisible();
            if(brandTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(brandTableVisible!).toBe(true);
    }

    /**
     * Create a sub brand name dinamically
     * @returns
     */
    async subBrandName(){
        var dateTime = await this.getActualTime()
        var subBrandName = "subBrand " + dateTime
        return subBrandName
    }


    /**
     * Get the actual time formated adn returned
     * @returns
     */
    async getActualTime(){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var datetime = date +' '+ time;
        return datetime
    }


    /**
     * wait for card styles menu is visible
     */
    async waitCardStylesMenuVisible(){
        let nodeCardStyles: string | null;
        for(let i = 0; i < 60; i++){
            nodeCardStyles = await this.nodeCardStylesField.locator('div.p-multiselect-label').textContent();
            if(nodeCardStyles != 'empty'){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        return nodeCardStyles!;
    }


    /**
     * Click the card styles menu
     */
    async onClickCardStylesField(){
        await this.nodeCardStylesField.scrollIntoViewIfNeeded();
        await this.nodeCardStylesField.click();
    }


    getCircularStartDay(value: string){
        let day = '';
        switch (value) {
            case '0':
                day = 'Sunday';
                break;
            case '1':
                day =  'Monday';
                break;
            case '2':
                day =  'Tuesday';
                break;
            case '3':
                day =  'Wednesday';
                break;
            case '4':
                day =  'Thursday';
                break;
            case '5':
                day =  'Friday';
                break;
            case '6':
                day =  'Saturday';
                break;
        }
        return day;
    }


    /**
     * Click the manage content button from a brand
     * @param node
     */
    async goToManageNodeContent(nodeName: string){
        let nodeTableVisible: boolean;
        for(let i = 0; i < 60; i++){
            nodeTableVisible = await this.nodesTable.locator('tr').first().isVisible();
            if(nodeTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        const rowCount = await this.nodesTable.locator('tr').count();
        for(let i = 0; i < rowCount; i++) {
            let columnText: string | null;
            columnText = await this.nodesTable.locator('tr').nth(i).locator('td').nth(0).textContent();
            if(columnText?.trim() === nodeName){
                await this.manageContentBtn.nth(i).click();
                break;
            }
        }
    }

    /**
     * Count the rows in the brand detail table
     * @param value
     */
    async hasBrandHierarchyTableValues(value: number){
        await this.brandHierarchyTable.locator('tr').first().waitFor();
        let tableRows = await this.brandHierarchyTable.locator('tr').count();
        expect(tableRows).toBeGreaterThanOrEqual(value);
    }

    async goToManageContentView(node: string){
        let brandHierarchyTableVisible: boolean;
        let elementVisible: boolean;
        let nodeName: string;
        let rowCount: number;
        let index: number;
        for(let i = 0; i < 60; i++){
            brandHierarchyTableVisible = await this.brandHierarchyTable.locator('tr').first().isVisible();
            if(brandHierarchyTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        rowCount = await this.brandHierarchyTable.locator('tr').count();

        for(let i = 0; i < rowCount; i++){
            nodeName = (await this.brandHierarchyTable.locator('tr').nth(i).locator('td:nth-child(1)').innerText()).trim();
            if(nodeName == node){
                index = i;
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.brandHierarchyTable.locator('tr').nth(index!).locator(`button[icon="pi pi-folder"]`).click({delay:300});
    }

    /**
     * Click the manage content button from a brand
     * @param node
     */
    async goToManageContentViewSubbrand(node: string){
        let brandHierarchyTableVisible: boolean;
        let elementVisible: boolean;
        for(let i = 0; i < 60; i++){
            brandHierarchyTableVisible = await this.brandHierarchyTable.locator('tr').first().isVisible();
            if(brandHierarchyTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        for(let i = 0; i < 60; i++){
            elementVisible = await this.brandHierarchyTable.locator(`tr:has-text("${node}")`).locator('button[icon="pi pi-folder"]').isVisible();
            if(elementVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.brandHierarchyTable.locator(`tr:has-text("${node}")`).locator('button[icon="pi pi-folder"]').click({delay:2000});
    }


    /**
     * Fill a store all the fields in the form
     * @param {*} storeData
     */
    async fillStoreAllFields(storeData: StoreFullDto){
        await this.setNodeName(storeData.name);
        await this.setStoreAddress(storeData.address);
        await this.setStoreCity(storeData.city);
        await this.setStoreState(storeData.state);
        await this.setStoreZip(storeData.zip);
        await this.setStorePhone(storeData.phone);
        await this.setStoreCircularPath(storeData.circularPath);
        await this.setStoreGoogleLocation(storeData.googleLocation);
        await this.setNodeSiteTitle(storeData.title);
        await this.onClickStoreWarningThresholdToogle(true);
        await this.setMinimumContentThreshold(storeData.contentThreshold);
        await this.setGooglePlaceId(storeData.googlePlaceId[3]);
        await this.setLatitude(storeData.latitude);
        await this.setLongitude(storeData.longitude);
        await this.fillStoreRequiredFields(storeData);
        await this.setStoreContactBtnLabel(storeData.contactBtnLabel);
        await this.setStoreHours(storeData.hours);
        await this.setNodeNotes(storeData.notes);
        await this.nodeContentAdminDropdown.click();
        await this.nodeContentAdminOption.nth(1).click();
        const imageUrl = 'src/images/Costco-Logo.png';
        await this.uploadImage(0, [imageUrl]); // This one uploads the logo
        await this.setLogoClickLink(storeData.logoLink);
        await this.uploadImage(1, [imageUrl]); // This one uploads the print log
        await this.uploadImage(2, [imageUrl]); // This one uploads the fav icon
        await this.onClickCircularStartDayOption('Tuesday');
        await this.selectCircularDayStartTime('0815');

        await this.onClickStoreGoLiveToogle(true);
        const liveDateValue = await this.nodeLiveDateInput.inputValue();
        if(liveDateValue == ''){
            await this.selectLiveDate();
        }
        await this.onClickStoreActiveToogle(true);
        await this.onClickStoreContentIntegrationToogle(true);
        await this.onClickStoreCheckoutIntegrationToogle(true);
        await this.onClickStorePwaSwitchToogle(true);

        await this.onClickStoreShowContactSwitchToogle(true);

        await this.selectStoreContentIntegrationOption(contentIntegrations.freshop);
        await this.setStoreAppKey(storeData.appKey);
        await this.setStoreAppSecret(storeData.appSecret);
        await this.setStoreId(storeData.storeId);

        await this.selectStoreCheckoutIntegrationOption(checkoutIntegrations.freshop);
        await this.setStoreDomain(storeData.storeDomain);

        await this.uploadImage(3, [imageUrl]); // This one uploads the 120 img
        await this.uploadImage(4, [imageUrl]); // This one uploads the 180 img
        await this.uploadImage(5, [imageUrl]); // This one uploads the 192 img
        await this.uploadImage(6, [imageUrl]); // This one uploads the 512 img
        await this.setPwaTitle(storeData.pwaTitle);
        await this.uploadImage(7, [imageUrl]); // This one uploads the pwa image
        await this.uploadImage(8, [imageUrl]); // This one uploads the popup banner
    }


    async setStoreContactBtnLabel(contactBtnLabel: string){
        await this.storeContactBtnLabelInput.fill(contactBtnLabel);
    }

    async setStoreHours(hours: string){
        await this.storeHoursInput.fill(hours);
    }

    async setNodeNotes(notes: string){
        await this.nodeNotesTextArea.fill(notes);
    }

    async onClickStoreGoLiveToogle(enabled: boolean) {
        const isGoLiveStoreEnabled = (await this.storeGoLiveSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((isGoLiveStoreEnabled && !enabled) || (!isGoLiveStoreEnabled && enabled)) {
            await this.storeGoLiveSwitch.click();
        }
    }

    async selectLiveDate(){
        await this.nodeLiveDateInput.click();
        await this.dateTimePickerOkBtn.click();
    }

    async onClickStoreActiveToogle(enabled: boolean) {
        const storeActiveSwitchEnabled = (await this.storeActiveSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((storeActiveSwitchEnabled && !enabled) || (!storeActiveSwitchEnabled && enabled)) {
            await this.storeActiveSwitch.click();
        }
    }

    async onClickStoreContentIntegrationToogle(enabled: boolean) {
        const storeContentIntegrationSwitchEnabled = (await this.storeContentIntegrationSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((storeContentIntegrationSwitchEnabled && !enabled) || (!storeContentIntegrationSwitchEnabled && enabled)) {
            await this.storeContentIntegrationSwitch.click();
        }
    }

    async onClickStoreCheckoutIntegrationToogle(enabled: boolean){
        const storeCheckoutIntegrationSwitchEnabled = (await this.storeCheckoutIntegrationSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
        if((storeCheckoutIntegrationSwitchEnabled && !enabled) || (!storeCheckoutIntegrationSwitchEnabled && enabled)){
            await this.storeCheckoutIntegrationSwitch.click();
        }
    }

    async onClickStorePwaSwitchToogle(enabled: boolean){
        const storePwaSwitchEnabled = (await this.storePwaSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
        if((storePwaSwitchEnabled && !enabled) || (!storePwaSwitchEnabled && enabled)){
            await this.storePwaSwitch.click();
        }
    }

    async onClickStoreShowContactSwitchToogle(enabled: boolean){
        const storeShowContactSwitchEnabled = (await this.storeShowContactSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
        if((storeShowContactSwitchEnabled && !enabled) || (!storeShowContactSwitchEnabled && enabled)){
            await this.storeShowContactSwitch.click();
        }
    }

    async selectStoreContentIntegrationOption(value: string){
        await this.onClickStoreContentIntegrationDropdown();
        await this.storeContentIntegrationDropdown.selectOption(value);
        await this.onClickStoreContentIntegrationDropdown();
    }

    async onClickStoreContentIntegrationDropdown(){
        await this.storeContentIntegrationDropdown.click();
    }

    async setStoreAppKey(appKey: string){
        await this.storeAppKeyInput.fill(appKey);
    }

    async setStoreAppSecret(appSecret: string){
        await this.storeAppSecretInput.fill(appSecret);
    }

    async setStoreId(storeId: string, index = 0){
        await this.storeIdInput.nth(index).fill(storeId);
    }

    async selectStoreCheckoutIntegrationOption(value: string){
        await this.onClickStoreCheckoutIntegrationDropdown();
        await this.storeCheckoutIntegrationDropdown.selectOption(value);
        await this.onClickStoreCheckoutIntegrationDropdown();
    }

    async onClickStoreCheckoutIntegrationDropdown(){
        await this.storeCheckoutIntegrationDropdown.click();
    }

    async setStoreDomain(domain: string){
        await this.storeDomainInput.fill(domain);
    }

    async setPwaTitle(title: string){
        await this.storePwaTitleInput.fill(title);
    }


    /**
     * Checks that the not required value in the input equals the expected value
     * @param {*} storeData
     */
    async checkNotRequiredValuesInStore(storeData: StoreFullDto){
        expect(await this.storeContactBtnLabelInput.inputValue()).toEqual(storeData.contactBtnLabel);
        expect(await this.storeHoursInput.inputValue()).toEqual(storeData.hours);
        expect(await this.nodeNotesTextArea.inputValue()).toEqual(storeData.notes);
        expect(await this.storeLogoLinkInput.inputValue()).toEqual(storeData.logoLink);
        expect(await this.storeAppKeyInput.inputValue()).toEqual(storeData.appKey);
        expect(await this.storeAppSecretInput.inputValue()).toEqual(storeData.appSecret);
        expect(await this.storeIdInput.inputValue()).toEqual(storeData.storeId);
        expect(await this.storeDomainInput.inputValue()).toEqual(storeData.storeDomain);
        expect(await this.storePwaTitleInput.inputValue()).toEqual(storeData.pwaTitle);
        expect((await this.storeGoLiveSwitch.locator('button').getAttribute('aria-checked'))?.includes('true')).toBe(true);
        expect((await this.storeActiveSwitch.locator('button').getAttribute('aria-checked'))?.includes('true')).toBe(true);
        expect((await this.storeContentIntegrationSwitch.locator('button').getAttribute('aria-checked'))?.includes('true')).toBe(true);
        expect((await this.storeCheckoutIntegrationSwitch.locator('button').getAttribute('aria-checked'))?.includes('true')).toBe(true);
        expect((await this.storePwaSwitch.locator('button').getAttribute('aria-checked'))?.includes('true')).toBe(true);
        expect((await this.storeShowContactSwitch.locator('button').getAttribute('aria-checked'))?.includes('true')).toBe(true);
    }


    /**
     * Fill a store with all the required fields
     * @param storeData
     */
    async fillStoreRequiredFields2(storeData: StoreDto) {
        await this.setNodeName(storeData.name);
        await this.setStoreAddress(storeData.address);
        await this.setStoreCity(storeData.city);
        await this.setStoreState(storeData.state);
        await this.setStoreZip(storeData.zip);
        await this.setStorePhone(storeData.phone);
        await this.setStoreCircularPath(storeData.circularPath);
        await this.setStoreGoogleLocation(storeData.googleLocation);
        await this.setNodeSiteTitle(storeData.title);
        await this.onClickStoreWarningThresholdToogle(true);
        await this.setMinimumContentThreshold(storeData.contentThreshold);
        await this.setGooglePlaceId('ChIJxfHb6schTIYR166UzrtdiGo');
        await this.setLatitude(storeData.latitude);
        await this.setLongitude(storeData.longitude);
    }


    /**
     * Fill a store with all the required fields
     * @param storeData
     */
    async fillStoreRequiredFields3(storeData: StoreDto) {
        await this.setNodeName(storeData.name);
        await this.setStoreAddress(storeData.address);
        await this.setStoreCity(storeData.city);
        await this.setStoreState(storeData.state);
        await this.setStoreZip(storeData.zip);
        await this.setStorePhone(storeData.phone);
        await this.setStoreCircularPath(storeData.circularPath);
        await this.setStoreGoogleLocation(storeData.googleLocation);
        await this.setNodeSiteTitle(storeData.title);
        await this.onClickStoreWarningThresholdToogle(true);
        await this.setMinimumContentThreshold(storeData.contentThreshold);
        await this.setGooglePlaceId('ChIJDwQcmgPkIFMRJcd-MjeBr1g');
        await this.setLatitude(storeData.latitude);
        await this.setLongitude(storeData.longitude);
    }


    /**
     * Check that the required values of a node has been loaded
     */
    async hasNodeRequiredValues(){
        let nameInvalidVisible: boolean;

        for(let i = 0; i < 60; i++){
            nameInvalidVisible = await this.brandNameInput.isVisible();
            if(nameInvalidVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        let nameInvalidValue = await this.brandNameInput.first().inputValue();
        let siteTitleInvalidValue = await this.nodeSiteTitleInput.first().inputValue();
        let siteDescInvalidValue = await this.nodeSiteDescriptionInput.first().inputValue();
        let storeTxtInvalidValue = await this.storeDisplayTextInput.first().inputValue();
        let supportLanguagesInvalidText = await this.nodeSupportLanguagesField.locator('div.p-multiselect-label').textContent();
        let defaultLanguageInvalidText = await this.nodeDefaultLanguageField.locator('span').nth(0).textContent();
        let defaultPageExists = await this.nodeDefaultPageNameInput.nth(0).isVisible();

        expect(nameInvalidValue).not.toEqual('');
        expect(siteTitleInvalidValue).not.toEqual('');
        expect(siteDescInvalidValue).not.toEqual('');
        expect(storeTxtInvalidValue).not.toEqual('');
        expect(supportLanguagesInvalidText).not.toEqual('');
        expect(defaultLanguageInvalidText).not.toEqual('');
        expect(defaultPageExists).toBe(true);
    }

    async onClickSwitchToView(view: string){
        await this.switchToView.click();
    }


    /**
    * Check that the required values of a store node has been loaded
    */
    async hasNodeStoreRequiredValues(){
        let brandNameInputVisible: boolean;
        let storeAddressInputVisible: boolean;
        let storeCityInputVisible: boolean;
        let storeStateInputVisible: boolean;
        let storeZipInputVisible: boolean;
        let storePhoneInputVisible: boolean;
        let storeCircularPathInputVisible: boolean;
        let storeGoogleLocationInputVisible: boolean;
        let nodeSiteTitleInputVisible: boolean;

        for(let i = 0; i < 60; i++){
            brandNameInputVisible = await this.brandNameInput.isVisible();
            storeAddressInputVisible = await this.storeAddressInput.isVisible();
            storeCityInputVisible = await this.storeCityInput.isVisible();
            storeStateInputVisible = await this.storeStateInput.isVisible();
            storeZipInputVisible = await this.storeZipInput.isVisible();
            storePhoneInputVisible = await this.storePhoneInput.isVisible();
            storeCircularPathInputVisible = await this.storeCircularPathInput.isVisible();
            storeGoogleLocationInputVisible = await this.storeGoogleLocationInput.isVisible();
            nodeSiteTitleInputVisible = await this.nodeSiteTitleInput.isVisible();
            if(brandNameInputVisible && storeAddressInputVisible && storeCityInputVisible && storeStateInputVisible && storeZipInputVisible && storePhoneInputVisible &&
                storeCircularPathInputVisible && storeGoogleLocationInputVisible && nodeSiteTitleInputVisible){
                break;
            }
            await this.page.waitForTimeout(800);
        }


        expect(brandNameInputVisible!).toBeTruthy();
        expect(storeAddressInputVisible!).toBeTruthy();
        expect(storeCityInputVisible!).toBeTruthy();
        expect(storeStateInputVisible!).toBeTruthy();
        expect(storeZipInputVisible!).toBeTruthy();
        expect(storePhoneInputVisible!).toBeTruthy();
        expect(storeCircularPathInputVisible!).toBeTruthy();
        expect(storeGoogleLocationInputVisible!).toBeTruthy();
        expect(nodeSiteTitleInputVisible!).toBeTruthy();


        let nameInvalidValue = await this.brandNameInput.inputValue();
        let addressInvalidValue = await this.storeAddressInput.inputValue();
        let cityInvalidValue = await this.storeCityInput.inputValue();
        let stateInvalidValue = await this.storeStateInput.inputValue();
        let zipInvalidValue = await this.storeZipInput.inputValue();
        let phoneInvalidValue = await this.storePhoneInput.inputValue();
        let digitalPathInvalidValue = await this.storeCircularPathInput.inputValue();
        let locationInvalidValue = await this.storeGoogleLocationInput.inputValue();
        let siteTitleInvalidValue = await this.nodeSiteTitleInput.inputValue();

        expect(nameInvalidValue).not.toEqual('');
        expect(addressInvalidValue).not.toEqual('');
        expect(cityInvalidValue).not.toEqual('');
        expect(stateInvalidValue).not.toEqual('');
        expect(zipInvalidValue).not.toEqual('');
        expect(phoneInvalidValue).not.toEqual('');
        expect(digitalPathInvalidValue).not.toEqual('');
        expect(locationInvalidValue).not.toEqual('');
        expect(siteTitleInvalidValue).not.toEqual('');
    }


    /**
     * verify that the store vanity name field is empty if not delete the text in the field
     */
    async verifyIfStoreVanityNameEmpty(){
        let storeVanityNameInputValue = await this.storeVanityNameInput.inputValue();
        if(storeVanityNameInputValue != ""){
            await this.storeVanityNameInput.click();
            await this.page.keyboard.press('Control+A');
            await this.page.keyboard.press('Backspace');
        }
    }


    /**
     * Verify that the store id field is empty if not delete the text in the field
     */
    async verifyIfStoreIdFieldInputEmpty(){
        let storeIdFieldInputValue = await this.storeIdFieldInput.inputValue();
        if(storeIdFieldInputValue != ""){
            await this.storeIdFieldInput.click();
            await this.page.keyboard.press('Control+A');
            await this.page.keyboard.press('Backspace');
        }
    }

    /**
     * Enable or disable coupon support
     * @param {boolean} enable
     */
    async onClickCouponSupport(enable: boolean){
        const nodeCouponSupportToogleEnabled = (await this.nodeCouponSupportToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
        if ((nodeCouponSupportToogleEnabled && !enable) || (!nodeCouponSupportToogleEnabled && enable)) {
            await this.nodeCouponSupportToogle.click();
        }
    }

    async onClickBrandCouponsIntegrationDropdown(){
        await this.couponIntegrationDropdown.click();
    }

    /**
     * @param {string} integration The coupon integration name
     */
    async selectCouponIntegration(integration: string){
        let index: number;
        let couponIntegrationDropdownVisible: boolean;
        for(let i = 0;  i < 60; i++){
            couponIntegrationDropdownVisible = await this.couponIntegrationDropdown.isVisible();
            if(couponIntegrationDropdownVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.couponIntegrationDropdown.click();

        let options = await this.dropdownOptions.count();
        for( index = 0; index < options; index++) {
            let optionText = await this.dropdownOptions.nth(index).textContent();
            if(optionText == integration){
                break;
            }
        }
        await this.dropdownOptions.nth(index).click();
    }


    async setAppcardMerchantId(merchantId: string){
        await this.appcardMerchantIdInput.clear();
        await this.appcardMerchantIdInput.fill(merchantId);
    }

    async setBanner(banner: string){
        await this.bannerInput.clear();
        await this.bannerInput.fill(banner);
    }

    async setInmarRetailerId(retailerId: string){
        await this.inmarRetailerId.clear();
        await this.inmarRetailerId.fill(retailerId);
    }

    async setRegistrationUrl(registrationUrl: string){
        await this.registrationUrl.clear();
        await this.registrationUrl.fill(registrationUrl);
    }


    /**
     * Checks if a node exists with the type required
     * @param nodeName
     * @param type
     */
    async checkNodeWithTypeIsNotInTable(nodeName: string, type: string) {
        let nodesTableVisible: boolean;
        let nodeVisible: boolean;
        await this.page.waitForTimeout(3000);
        for(let i = 0; i < 60; i++){
            nodesTableVisible = await this.nodesTable.first().isVisible();
            if(nodesTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        for(let i = 0; i < 60; i++){
            nodeVisible = await this.nodesTable.getByRole('cell', { name: nodeName, exact: true }).isVisible();
            if(!nodeVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        const rowCount = await this.nodesTable.locator('tr').count();
        let exists = false;

        for (let i = 0; i < rowCount; i++) {
            const brandValue = await this.nodesTable.locator('tr').nth(i).locator('td').nth(0).innerText();
            const typeValue = await this.nodesTable.locator('tr').nth(i).locator('td').nth(1).innerText();

            if (brandValue.trim() === nodeName && typeValue === type) {
                exists = true;
                break;
            }
        }

        expect(exists).toBeFalsy();
    }

    async editBrand2(brandName: string) {
        let brandTableVisible: boolean;
        let brandValue = '';
        await this.page.waitForTimeout(1000);
        for(let i = 0; i < 60; i++){
            brandTableVisible = await this.brandTable.first().isVisible();
            if(brandTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        const rowCount = await this.brandTable.locator('tr').count();

        for (let i = 0; i < rowCount; i++) {
            brandValue = await this.brandTable.locator('tr').nth(i).locator('td').nth(0).innerText();

            if (brandValue === brandName) {
                await this.onClickBrandEditButton(0);
                await this.setBrandName('test');
                await this.onClickBrandSaveButton();
                break;
            }
        }
    }


    /**
     * Check go live icon status
     * @param {string} nodeName Node name
     * @param {boolean} status Status of the icon expected
     */
    async checkGoLiveValidation(nodeName: string, status: boolean){

        const rowCount = await this.nodesTable.locator('tr').count();
        let isGreen: boolean | undefined;
        let nodeNameTable: string;
        let index: number;

        for(let i = 0; i < rowCount; i++) {

            nodeNameTable = (await this.nodesTable.locator('tr').nth(i).locator('td').nth(0).innerText()).trim();

            if(nodeNameTable == nodeName){
                index = i;
                break;
            }

        }

        if(status == true) {

            for(let j = 0; j < 60; j++) {

                isGreen = (await this.goLiveIcon.nth(index!).getAttribute('class'))?.includes('green-icon');
                if(isGreen){
                    break;
                }

                await this.page.waitForTimeout(300);

            }

        } else if(status == false) {

            for(let j = 0; j < 60; j++){

                isGreen = (await this.goLiveIcon.nth(index!).getAttribute('class'))?.includes('green-icon');

                if(!isGreen){
                    break;
                }

                await this.page.waitForTimeout(300);
            }
        }

        switch (status) {
            case true:
                expect(isGreen).toBeTruthy();
                break;
            case false:
                expect(isGreen).toBeFalsy();
                break;
            }
    }



    async checkActiveFlag(nodeName: string, status: boolean){

        const rowCount = await this.nodesTable.locator('tr').count();
        let isActive: boolean | undefined;
        let nodeNameTable: string;
        let index: number;

        for(let i = 0; i < rowCount; i++) {

            nodeNameTable = (await this.nodesTable.locator('tr').nth(i).locator('td').nth(0).innerText()).trim();

            if(nodeNameTable == nodeName){
                index = i;
                break;
            }

        }

        if(status == true) {

            for(let j = 0; j < 60; j++) {

                isActive = (await this.activeIcon.nth(index!).getAttribute('class'))?.includes('green-icon');
                if(isActive){
                    break;
                }

                await this.page.waitForTimeout(300);

            }

        } else if(status == false) {

            for(let j = 0; j < 60; j++){

                isActive = (await this.activeIcon.nth(index!).getAttribute('class'))?.includes('green-icon');

                if(!isActive){
                    break;
                }

                await this.page.waitForTimeout(300);
            }
        }

        switch (status) {
            case true:
                expect(isActive).toBeTruthy();
                break;
            case false:
                expect(isActive).toBeFalsy();
                break;
            }
    }


    async verifyThatTheTitleIsProperlyDisplayed(siteTitle: string){
        let nodeSitetitleFieldVisible: boolean;
        let nodeSitetitleFieldText: string;

        for(let i = 0; i < 60; i++){
            nodeSitetitleFieldVisible = await this.nodeSiteTitleInput.nth(0).isVisible();
            if(nodeSitetitleFieldVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        for(let i = 0; i < 60; i++){
            nodeSitetitleFieldText = await this.nodeSiteTitleInput.nth(0).inputValue();
            if( nodeSitetitleFieldText == siteTitle){
                break;
            }
            await this.page.waitForTimeout(300);
        }
    }

    async verifyTheTheDropdownOptionIsDisplayed(){
        let dropdownOptionIsVisible: boolean;

        for(let i = 0; i < 60; i++){
            dropdownOptionIsVisible = await this.couponIntegrationDropdown.locator('span:nth-child(1) > span').isVisible();
            if(dropdownOptionIsVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

    }


    async verifyAlertMessagesAreDisplayed(){
        let alertVisible1: boolean;
        let alertVisible2: boolean;
        let alertVisible3: boolean;
        let alertVisible4: boolean;

        let commonModel = new CommonModel(this.page);

        for(let i = 0; i < 60; i++){
            alertVisible1 = await commonModel.existAlert.nth(0).isVisible();
            alertVisible2 = await commonModel.existAlert.nth(1).isVisible();
            alertVisible3 = await commonModel.existAlert.nth(2).isVisible();
            alertVisible4 = await commonModel.existAlert.nth(3).isVisible();
            if(alertVisible1 && alertVisible2 && alertVisible3 && alertVisible4){
                break;
            }
            await this.page.waitForTimeout(400);
        }

        expect(alertVisible1!).toBeTruthy();
        expect(alertVisible2!).toBeTruthy();
        expect(alertVisible3!).toBeTruthy();
        expect(alertVisible4!).toBeTruthy();

    }

    async brandTableShouldHasOneRow(){

        await expect( async () => {
            await expect(this.brandTable.locator('tr').first()).toBeVisible( {timeout:300} );
        }).toPass();

        await expect( async () => {
            let rowCount = await this.brandTable.locator('tr').count();
            expect(rowCount!).toBeGreaterThanOrEqual(1);
        }).toPass();

    }

    async brandTableVisible(){

        await expect( async () => {
            await expect(this.brandTable).toBeVisible( {timeout:300} );
        }).toPass();
    }

    async openEditSubNodePopUp(node: string){
        let tableIsVisible: boolean;
        let buttonIsVisible: boolean;

        for(let i = 0; i < 60; i++){
            tableIsVisible = await this.brandHierarchyTable.locator('tr').first().isVisible();
            if(tableIsVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        for(let i = 0; i < 60; i++) {
           buttonIsVisible = await this.brandHierarchyTable.locator(`tr:has-text("${node}")`).locator('button[title="Edit SubBrand Node"]').isVisible();
           if(buttonIsVisible){
            break;
           }
           await this.page.waitForTimeout(300);
        }

        await this.brandHierarchyTable.locator(`tr:has-text("${node}")`).locator('button[title="Edit SubBrand Node"]').click({delay:2000});
    }


    async selectCircularStartDayOption(value: string){
        await this.storeCircularStartDayDropdown.scrollIntoViewIfNeeded();
        //await this.storeCircularStartDayDropdown.click();
        await this.page.locator('mat-form-field select[formcontrolname="circularStartDayOfWeek"]').selectOption(value);
    }


    /**
     * @param {string} timezone The timezone to select
     */
    async selectCircularTimezone(timezone: string){

        let timezoneOptionsVisible: boolean;
        let index: number;
        await this.brandSaveBtn.scrollIntoViewIfNeeded();
        //await this.circularTimezoneDropdown.scrollIntoViewIfNeeded();
        await this.circularTimezoneDropdown.click();

        for(let i = 0; i < 60; i++){
            timezoneOptionsVisible = await this.timezoneOptions.isVisible();
            if(timezoneOptionsVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        let itemsCount = await this.timezoneOptions.locator('mat-option').locator('span').count();

        for(let i = 0; i < itemsCount; i++){
            let text = await this.timezoneOptions.locator('mat-option').locator('span').nth(i).innerText();
            if(text == timezone){
                index = i;
                break;
            }

        }

        await this.timezoneOptions.locator('mat-option > span').nth(index!).click();
    }

    async hasBrandTableOneRow(){
        let brandTableVisible: boolean;
        for(let i = 0; i < 60; i++){
            brandTableVisible = await this.brandTable.first().isVisible();
            if(brandTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        for(let i = 0; i < 60; i++){
            let rowsTable = await this.brandTable.locator('tr').count();
            if(rowsTable == 1){
                break;
            }
            await this.page.waitForTimeout(300);
        }

    }

    /**
     * This function waits until the message is visible and verifies that is correct
     */
    async verifyThatCheckoutIntegrationTypeRequiredErrorMessageIsVisible(){
        const commonModel = new CommonModel(this.page);

        let existAlertVisible: boolean;
        for(let i = 0; i < 60; i++){
            existAlertVisible = await commonModel.existAlert.isVisible();
            if(existAlertVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(await commonModel.existAlert.innerText()).toEqual(brandsData.checkoutIntegrationTypeRequired);
    }

    /**
     * This function waits until the message is visible and verifies that is correct
     */
    async verifyThatCheckoutStoreVanityNameRequiredErrorMessageIsVisible(){
        const commonModel = new CommonModel(this.page);

        let existAlertVisible: boolean;
        for(let i = 0; i < 60; i++){
            existAlertVisible = await commonModel.existAlert.isVisible();
            if(existAlertVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(await commonModel.existAlert.innerText()).toEqual(brandsData.checkoutStoreVanityNameRequired);
    }

    async verifyThatNodeSiteTitleIsVisible(){

        let nodeSiteTitleInputVisible: boolean;

        for(let i = 0; i < 60; i++){
            nodeSiteTitleInputVisible = await this.nodeSiteTitleInput.first().isVisible();
            if(nodeSiteTitleInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

    }

    /**
     * This fucntino verifies that a node is not displayed in the nodes table
     * @param name
     */
    async verifyNodeIsNotDisplayed(name: string){
        let nodeVisible: boolean;;

        for(let i = 0; i < 60; i++){
            nodeVisible = await this.nodesTable.locator('tr').filter({hasText: name}).isVisible();
            if(!nodeVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(nodeVisible!).toBeFalsy();
    }

    /**
     * This function verifies that the elements in the edit node modal are displayed
     */
    async verifyThatElementsInEditNodePopUpAreVisible() {

        let elementVisible: boolean, elementVisible2: boolean, elementVisible3: boolean, elementVisible4: boolean,
        elementVisible5: boolean, elementVisible6: boolean, elementVisible7: boolean;
        for(let i = 0; i < 60; i++){
            elementVisible = await this.nodeLogoInput.isVisible();
            elementVisible2 = await this.brandNationalContentBannerInput.isVisible();
            elementVisible3 = await this.nodeHowToImgInput.isVisible();
            elementVisible4 = await this.nodeKioskHeaderImgInput.isVisible();
            elementVisible5 = await this.nodeFavIconInput.isVisible();
            elementVisible6 = await this.printLogoInput.isVisible();
            elementVisible7 = await this.nodeContentAdminDropdown.isVisible();

            if(elementVisible && elementVisible2 && elementVisible3 && elementVisible4  && elementVisible5 && elementVisible6 && elementVisible7){
                break;
            }

            await this.page.waitForTimeout(300);
        }
    }

    async waitBrandSaveButtonIsNotVisible(){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.brandSaveBtn.isVisible();
            if(!isVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeFalsy();
    }

    /**
     * This function verifies that the loyalty deal label field is visible
     */
    async verifyThatLoyaltyDealLabelFieldIsVisible() {
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.loyaltyDealLabelField.isVisible();
            if(isVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();

    }

    /**
     * This function verifies that the loyalty deal logo field is visible
     */
    async verifyThatLoyaltyDealLogoFieldIsVisible() {
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.loyaltyDealLogoField.isVisible();
            if(isVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();

    }

    /**
     * This function verifies that the loyalty deal logo field is visible
     */
    async verifyThatLoyaltyColorFieldIsVisible() {
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.loyaltyColorField.isVisible();
            if(isVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();

    }


    /**
     * This function verifies that the loyalty deal logo field is visible
     */
    async verifyThatErrorMessageLoyaltyDealLabelIsRequiredIsVisible() {
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.errorMessageLoyaltyDealLabelIsRequired.isVisible();
            if(isVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();

        let text = await this.errorMessageLoyaltyDealLabelIsRequired.innerText();
        
        expect(text).toEqual("Loyalty Deal Label is required");

    }

    async verifyThatErrorMessageLoyaltyDealColorIsRequiredIsVisible() {
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.errorMessageLoyaltyDealColorIsRequired.isVisible();
            if(isVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();

        let text = await this.errorMessageLoyaltyDealColorIsRequired.innerText();
        
        expect(text).toEqual("Loyalty Deal Color is required.");

    }

    /**
     * This function verifies that the loyalty deal logo field is visible
     */
    async verifyThatNodeLoyaltyColorFieldIsVisible() {
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.nodeLoyaltyDealLogoField.isVisible();
            if(isVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();
    }

    async openEditStoreNodePopUp(node: string){
        let tableIsVisible: boolean;
        let buttonIsVisible: boolean;

        for(let i = 0; i < 60; i++){
            tableIsVisible = await this.brandHierarchyTable.locator('tr').first().isVisible();
            if(tableIsVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        for(let i = 0; i < 60; i++) {
           buttonIsVisible = await this.brandHierarchyTable.locator(`tr:has-text("${node}")`).locator('button[title="Edit Store Node"]').isVisible();
           if(buttonIsVisible){
            break;
           }
           await this.page.waitForTimeout(300);
        }

        await this.brandHierarchyTable.locator(`tr:has-text("${node}")`).locator('button[title="Edit Store Node"]').click({delay:2000});
    }
}
