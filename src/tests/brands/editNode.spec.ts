import { test, expect} from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import {SidebarModel} from '../../pom/sidebarModel';
import {validateEnvironment} from '../../utils/urlHandler';
import {validateUsers} from '../../utils/userHandler';
import { CommonModel } from '../../pom/commonModel';
import { BrandsModel } from '../../pom/brandsModel';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { brandsData, integrations, subBrandData, storeData } from '../../data/brandsData';
import { NodesTypesEnum } from '../../enums/nodeTypes.enum';
import { TopBarModel } from '../../pom/topBarModel';
import {v4 as uuidv4} from 'uuid';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const user = users[0];
const url: string = validateEnvironment();

/**
 * Before running this script
 * You must create the following nodes
 * Brand: newBrand
 * SubBrand: NewSubBrand
 * Store: newStoreBrand (newBrand child), newStoreSubBrand (NewSubBrand child)
 * StoreGroup: newStoreGroup with the stores listed above
 */

test.describe('Manage Brands- edit node', () => {

    test.beforeEach(async ({ page }, testInfo) => {
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);
        const topBarModel = new TopBarModel(page);

        await page.goto(url);
        page.setViewportSize({ width: 1000, height: 1000 });
        await loginModel.login(user.username, user.password);
        await topBarModel.selectBrand(brandsData.brandNodeName);
        await sideBarModel.onClickBrandOptionMenu();
        await commonModel.setSearchValue(brandsData.brandNodeName);
        await brandsModel.hasBrandTableValues();
        await brandsModel.goToManageNodes(brandsData.brandNodeName);
        await topBarModel.selectNodeBrandChild(brandsData.subBrandName, brandsData.subBrand);
        await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
        await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
        await brandsModel.configureDefaultStoreNode(brandsData.subBrandName, brandsData.storeSubBrandName, NodesTypesEnum.subbrand);
        await brandsModel.hasNodeTableValues(3);

    });

    test.afterAll(async () => {
        test.setTimeout(2500);
    });

    test(`Verify a user can edit a brand node`, async ({ page }) => {
        await page.setViewportSize({width: 1600, height: 1200});
        test.setTimeout(180000);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);
        const sideBarModel = new SidebarModel(page);

        let brandName = brandsData.brandDefaultName.concat(uuidv4()).slice(0, 32);
        await sideBarModel.onClickBrandOptionMenu();
        await brandsModel.createBrand(brandName, { dual: false });
        await commonModel.setSearchValue(brandName);
        await brandsModel.hasBrandTableValues();

        await brandsModel.goToManageNodes(brandName);
        await brandsModel.hasNodeTableValues(1);
        await brandsModel.openEditNodePopUp(brandName);
        await brandsModel.hasLoadInputsManageNode();
        await brandsModel.setNodeSiteTitle(subBrandData.siteTitle);
        await brandsModel.setNodeSiteDescription(subBrandData.siteDesc);
        await brandsModel.nodeContentAdminDropdown.click();
        await brandsModel.nodeContentAdminOption.nth(1).click();

        await brandsModel.onClickBrandCategoryDividedLayout(true);
        await brandsModel.onClickBrandNationalFeatureDeals(true);

        await brandsModel.onClickCircularStartDayOption('Tuesday');
        await brandsModel.selectCircularDayStartTime('0815');

        await brandsModel.onClickBrandRecipeToogle(true);

        await brandsModel.onClickBrandCouponToogle(true);
    
        await brandsModel.onClickBrandActiveToogle(true);
    
        await brandsModel.onClickBrandHideCartToogle(true);
    
        await brandsModel.onClickBrandDeferCartToogle(true);
    
        await brandsModel.onClickBrandWarningThresholdToogle(true);
    
        await brandsModel.onSelectSupportedLanguages(brandsData.englishLanguage, true);

        //await brandsModel.selectionDefaultLanguage(brandsData.englishLanguage);
    
        await brandsModel.nodeNotesTextArea.click();
        await brandsModel.nodeNotesTextArea.fill("this is a note");
    
        await brandsModel.uploadImage(0, ["src/images/masterchief helmet.jpg"]); // Logo Field
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.uploadImage(1, ["src/images/masterchief.jpg"]); // How To Image Field
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.uploadImage(2, ["src/images/masterchief2.jpg"]); // Kiosk Header Image Logo Field
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.nodeYoutubeIdInput.click();
        await brandsModel.setHowToYoutubeId("You Tube id");
    
        await brandsModel.uploadImage(3, ["src/images/masterchief3.jpg"]); // Fav Icon Field
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.storeLogoLinkInput.click();
        await brandsModel.storeLogoLinkInput.fill("Logo click field")
    
        await brandsModel.uploadImage(4, ["src/images/masterchief helmet.jpg"]); // Logo Click Link Field
        await commonModel.waitUntilSpinnerDisappears();

        await brandsModel.uploadImage(5, ["src/images/masterchief helmet.jpg"]); // Logo Click Link Field
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.onClickBrandStoresLinkedToogle(true);
    
    
        await brandsModel.nodeUIConfigInput.click();
        await brandsModel.setUiConfig(brandsData.nodeUiConfig);
        await brandsModel.setStoreDisplayText(subBrandData.storeDisplayText);
        await brandsModel.nodeThemeInput.click();
        await brandsModel.setTheme(brandsData.nodeTheme);
        await brandsModel.nodeDefaultPageNameInput.click();
        await brandsModel.setDefaultPageName(brandsData.nodeStartPage);
        await brandsModel.nodeCategoryPageNameInput.click();
        await brandsModel.setCategoryPageName(brandsData.nodeCategoryPage);
        await brandsModel.onClickBrandGoLiveToogle(true);
        await brandsModel.nodeLiveDateInput.click();
        await commonModel.selectDate('2022', 'MAR', '1', '01', '00');
    
        await page.waitForTimeout(2000);
        expect(await brandsModel.nodeNameInput.inputValue()).toEqual(brandName);
        expect(await brandsModel.nodeCircularSubdomainInput.inputValue()).toEqual(brandName.toLowerCase());
        expect(await brandsModel.nodeSiteTitleInput.inputValue()).toEqual(subBrandData.siteTitle);
        expect(await brandsModel.nodeSiteDescriptionInput.inputValue()).toEqual(subBrandData.siteDesc);
        expect(await brandsModel.storeDisplayTextInput.inputValue()).toEqual(subBrandData.storeDisplayText);
        expect(await brandsModel.nodeContentAdminDropdown.innerText()).not.toEqual("");
        expect(await brandsModel.nodeNotesTextArea.inputValue()).toEqual("this is a note");
        expect(await brandsModel.nodeCategoryDividedLayoutSwitch.locator("button").getAttribute("aria-checked")).toEqual("true");
        expect(await brandsModel.nodeNationalFeaturedDealsSwitch.locator("button").getAttribute("aria-checked")).toEqual("true");
        expect(await brandsModel.nodeRecipeSupportToogle.locator("button").getAttribute("aria-checked")).toEqual("true");
        expect(await brandsModel.nodeCouponSupportToogle.locator("button").getAttribute("aria-checked")).toEqual("true");
        expect(await brandsModel.brandActiveToogle.locator("button").getAttribute("aria-checked")).toEqual("true");
        expect(await brandsModel.brandHideCartSwitch.locator("button").getAttribute("aria-checked")).toEqual("true");

        const adminUserValue = await brandsModel.nodeContentAdminDropdown.innerText();
        const circularStartDayValue = await brandsModel.storeCircularStartDayDropdown.inputValue();
        const circularStartTimeValue = await brandsModel.storeCircularDayStartTimeInput.inputValue();
        const supportLanguages = await brandsModel.nodeSupportLanguagesField.innerText();
        const defaultLanguages = await brandsModel.nodeDefaultLanguageField.innerText();
        const liveDateValue = await brandsModel.nodeLiveDateInput.inputValue();
    
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await commonModel.verifyAproveedAlertMessage(brandsData.nodeEditedSuccessfully)
    
        await brandsModel.openEditNodePopUp(brandName);
        await page.waitForTimeout(2000);
        // System must be able to add nodes just as Stores to the Brand, with the values provided.
        expect(await brandsModel.nodeSiteTitleInput.inputValue()).toEqual(subBrandData.siteTitle);
        expect(await brandsModel.nodeSiteDescriptionInput.inputValue()).toEqual(subBrandData.siteDesc);
        expect(await brandsModel.storeDisplayTextInput.inputValue()).toEqual(subBrandData.storeDisplayText);
        expect(await brandsModel.nodeCategoryDividedLayoutSwitch.locator("button").getAttribute("aria-checked")).toEqual("true");
        expect(await brandsModel.nodeNationalFeaturedDealsSwitch.locator("button").getAttribute("aria-checked")).toEqual("true");
        expect(await brandsModel.nodeRecipeSupportToogle.locator("button").getAttribute("aria-checked")).toEqual("true");
        expect(await brandsModel.nodeCouponSupportToogle.locator("button").getAttribute("aria-checked")).toEqual("true");
        expect(await brandsModel.brandActiveToogle.locator("button").getAttribute("aria-checked")).toEqual("true");
        expect(await brandsModel.brandHideCartSwitch.locator("button").getAttribute("aria-checked")).toEqual("true");
        expect(await brandsModel.nodeNotesTextArea.inputValue()).toEqual("this is a note");
        expect(await brandsModel.storeLogoLinkInput.inputValue()).toEqual("Logo click field");
        expect(await brandsModel.nodeUIConfigInput.inputValue()).toEqual(brandsData.nodeUiConfig);
        expect(await brandsModel.nodeThemeInput.inputValue()).toEqual(brandsData.nodeTheme);
        expect(await brandsModel.nodeDefaultPageNameInput.inputValue()).toEqual(brandsData.nodeStartPage);
        expect(await brandsModel.nodeCategoryPageNameInput.inputValue()).toEqual(brandsData.nodeCategoryPage);
    
        const logo = await brandsModel.nodeLogoInput.inputValue();
        const nationalContent = await brandsModel.brandNationalContentBannerInput.inputValue();
        const howToImg = await brandsModel.nodeHowToImgInput.inputValue();
        const kioskHeader = await brandsModel.nodeKioskHeaderImgInput.inputValue();
        const favIcon = await brandsModel.nodeFavIconInput.inputValue();
        const printLogo = await brandsModel.printLogoInput.inputValue();
        const brand = brandName.toLowerCase()
        expect(logo).toContain(brand);
        expect(nationalContent).toContain(brand);
        expect(howToImg).toContain(brand);
        expect(kioskHeader).toContain(brand);
        expect(favIcon).toContain(brand);
        expect(printLogo).toContain(brand);
        await page.waitForTimeout(1500);
        expect(await brandsModel.nodeContentAdminDropdown.textContent()).toEqual(adminUserValue);
        expect(await brandsModel.storeCircularStartDayDropdown.inputValue()).toEqual(circularStartDayValue);
        expect(await brandsModel.storeCircularDayStartTimeInput.inputValue()).toEqual(circularStartTimeValue);
        expect(await brandsModel.nodeSupportLanguagesField.innerText()).toEqual(supportLanguages);
        expect(await brandsModel.nodeDefaultLanguageField.innerText()).toEqual(defaultLanguages);
        expect(await brandsModel.nodeLiveDateInput.inputValue()).toEqual(liveDateValue);
    });

    test(`Verify if a user can edit child nodes SubBrand with required fields to a Brand`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.addChildNodes('Brand');
        const uniqueId = uuidv4();
        let subbrand = Object.assign({} , subBrandData);
        subbrand.name = (subBrandData.name + uniqueId).slice(0, 32);
        subbrand.subDomain = (subBrandData.subDomain + uniqueId).slice(0, 30).split('-').join('');
        await brandsModel.fillSubBrandRequiredFields(subbrand);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.openEditNodePopUp(subbrand.name);
        await page.waitForTimeout(2000);
        await commonModel.waitUntilSpinnerDisappears();
        subbrand.name = subbrand.name.concat("Edit");
        subbrand.subDomain = subbrand.subDomain.concat("edit");
        subbrand.siteTitle = subbrand.siteTitle.concat("Edit");
        subbrand.siteDesc = subbrand.siteDesc.concat("Edit");
        subbrand.storeDisplayText = subbrand.storeDisplayText.concat("Edit");;
        await brandsModel.fillSubBrandRequiredFields(subbrand);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        // Verify that the message that validates that the subbrand was edited correctly appears
        expect(await commonModel.snackbar.innerText()).toContain(brandsData.nodeEditedSuccessfully);
    
        // Verify the edited subbrand exists in the node table
        const subBrandEdited = await brandsModel.checkNodeWithTypeInTable(subbrand.name, brandsData.subBrand);
    
        await brandsModel.openEditNodePopUp(subbrand.name);
        //System must be able to edit the subbrand with the values provided
        expect(await brandsModel.nodeNameInput.inputValue()).toEqual(subbrand.name);
        expect(await brandsModel.nodeCircularSubdomainInput.inputValue()).toEqual(subbrand.subDomain);
        expect(await brandsModel.nodeSiteTitleInput.inputValue()).toEqual(subbrand.siteTitle);
        expect(await brandsModel.nodeSiteDescriptionInput.inputValue()).toEqual(subbrand.siteDesc);
        expect(await brandsModel.storeDisplayTextInput.inputValue()).toEqual(subbrand.storeDisplayText);
    
        await brandsModel.onClickNodeCancelButton();
        await brandsModel.deleteNode(subbrand.name);
        await commonModel.waitUntilSpinnerDisappears();
    });

    test(`Verify if a user can edit child nodes Store with required fields to a Brand`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        const uniqueId = uuidv4();
        let store = Object.assign({} , storeData);
        store.name = storeData.name.concat(uniqueId).slice(0, 40);
        store.circularPath = storeData.circularPath.concat(uniqueId).slice(0, 40);

        await brandsModel.addChildNodes('Brand');
        await brandsModel.onClickNodeTypeStore();
        await brandsModel.fillStoreRequiredFields3(store);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.openEditNodePopUp(store.name);
        await page.waitForTimeout(2000);
        await commonModel.waitUntilSpinnerDisappears();
        const editConcat = "Edit";
        store.name = store.name.concat(editConcat);
        store.circularPath = store.circularPath.concat(editConcat);
        store.address = store.address.concat(editConcat);
        store.city = store.city.concat(editConcat);
        store.state = store.state.concat(editConcat);
        store.zip = store.zip.concat(editConcat);
        store.phone = '(343) 328-7023';
        store.googleLocation = store.googleLocation.concat(editConcat);
        store.title = store.title.concat(editConcat);
    
        await brandsModel.fillStoreRequiredFields3(store);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        // Verify that the message that validates that the store was edited correctly appears
        expect(await commonModel.snackbar.innerText()).toContain(brandsData.nodeEditedSuccessfully);
    
        // Verify the edited store exists in the node table
        const storeEdited = await brandsModel.checkNodeWithTypeInTable(store.name, brandsData.store);
    
        await brandsModel.openEditNodePopUp(store.name);
        //System must be able to edit the store with the values provided
        await brandsModel.checkRequiredValuesInStore(store); 
    
        await brandsModel.onClickNodeCancelButton();
        await brandsModel.deleteNode(store.name);
        await commonModel.waitUntilSpinnerDisappears();
    });


    test(`Verify if a user can edit child nodes Store with required fields to a SubBrand`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        const uniqueId = uuidv4();
        let store = Object.assign({} , storeData);
        store.name = storeData.name.concat(uniqueId).slice(0, 40);
        store.circularPath = storeData.circularPath.concat(uniqueId).slice(0, 40);
        await brandsModel.onClickAddChildToThisNodes(brandsData.subBrandName);
        await brandsModel.fillStoreRequiredFields2(store);
        const imageUrl = 'src/images/Costco-Logo.png';
        await brandsModel.uploadImage(0, [imageUrl]); // This one uploads the logo
        await brandsModel.uploadImage(1, [imageUrl]); // This one uploads the fav icon
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.expandNodeInTable(store.name, brandsData.subBrandName);
    
        await brandsModel.openEditNodePopUp(store.name);
        await page.waitForTimeout(2000);
        await commonModel.waitUntilSpinnerDisappears();
        const editConcat = "Edit";
        store.name = store.name.concat(editConcat);
        store.circularPath = store.circularPath.concat(editConcat);
        store.address = store.address.concat(editConcat);
        store.city = store.city.concat(editConcat);
        store.state = store.state.concat(editConcat);
        store.zip = store.zip.concat(editConcat);
        store.phone = '(343) 328-7023';
        store.googleLocation = store.googleLocation.concat(editConcat);
        store.title = store.title.concat(editConcat);
    
        await brandsModel.fillStoreRequiredFields2(store);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        // Verify that the message that validates that the store was edited correctly appears
        // await t.expect(common.snackBar.innerText).contains(brandsData.nodeEditedSuccessfully);
    
        // Verify the edited store exists in the node table
        await brandsModel.checkNodeWithTypeInTable(store.name, brandsData.store);
    
        await brandsModel.openEditNodePopUp(store.name);
        //System must be able to edit the store with the values provided

        await brandsModel.checkRequiredValuesInStore(store);
    
        await brandsModel.onClickNodeCancelButton();
        await brandsModel.deleteNode(store.name);
        await commonModel.waitUntilSpinnerDisappears();
    });

});