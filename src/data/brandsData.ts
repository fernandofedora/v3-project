let brandsData = {
    brandDefaultName:'Costco',
    brandCreatedSuccessfully: 'Brand was created successfully!',
    brandExist: 'The name has already been taken or the name is reserved',
    brandNameExist: 'The name is invalid because it has a conflict with another subdomain',
    brandEditedSuccessfully: 'Brand edited successfully.',
    nodeEditedSuccessfully: 'Nodes edited successfully.',
    fieldRequired: '* This field is required',
    nameRequired: 'Name is required.',
    siteDescriptionRequired: 'Sitedescription is required',
    siteTitleRequired: 'Sitetitle is required',
    circularSubdomainRequired: 'Circularsubdomain is required.',
    storeDisplayTextRequired: 'Choosestoredisplaytext is required',
    defaultTranslationRequired: '* Default translation is required',
    titleRequired: 'Title is required',
    imageHrefRequired: 'Imagehref is required.',
    popupBannerRequired: 'Popupbannerhref is required.',
    image120Required: 'Image120href is required.',
    image180Required: 'Image180href is required.',
    image192Required: 'Image192href is required.',
    image512Required: 'Image512href is required.',
    couponBannerRequired: 'Couponintegrationmetadata banner is required.',
    couponStoreIdRequired: 'Couponintegrationmetadata storeid is required.',
    couponAppcardMerchantIdRequired: 'Couponintegrationmetadata appcardmerchantid is required.',
    couponRetailerIdRequired: 'Couponintegrationmetadata inmarretailerid is required.',
    couponRegistrationUrlRequired: 'Couponintegrationmetadata registrationurl is required.',
    checkoutIntegrationTypeRequired: 'Checkoutintegrationtype is required.',
    checkoutStoreVanityNameRequired: 'Checkoutintegration storevanityname is required.',
    checkoutStoreIdRequired: 'Checkoutintegration storeid is required.',
    contentIntegrationMustEqual: 'Contentintegrationtype must be equal to wakefern',
    nodeAddedSuccessfully: 'Node Added successfully!',
    brandNodeName: 'newBrand',
    brandNodeNameEn: 'newBrandEn',
    brandNodeNameEs: 'newBrandEs',
    brandNodeContentName: 'newBrandContent',
    subBrandName: 'NewSubBrand',
    subBrandNameEn: 'NewSubBrandEn',
    subBrandNameEs: 'NewSubBrandEs',
    subBrandContentName: 'NewSubBrandContent',
    storeBrandName: 'newStoreBrand',
    storeBrandNameEn: 'newStoreBrandEn',
    storeBrandNameEs: 'newStoreBrandEs',
    storeBrandContentName: 'newStoreBrandContent',
    brandCdlOn: 'Amanda',
    storeCdlOn: 'AmandaStore',
    storeSubBrandName: 'newStoreSubBrand',
    storeSubbrandContentName: 'newStoreSubBrandContent',
    storeGroupName: 'newStoreGroup',
    storeGroup: 'storeGroup',
    switchStoreGroups: '(Switch to store groups)',
    switchStoreNodes: '(Switch to store nodes)',
    englishLanguage: 'English',
    spanishLanguage: 'Spanish',
    howToYoutubeId: 'ZlkGBmJhp7I',
    nodeUiConfig: 'UI config field',
    nodeTheme: 'Theme field',
    nodeStartPage: 'StartPage',
    nodeCategoryPage: 'Categories',
    brand: 'Brand',
    subBrand: 'SubBrand',
    store: 'Store',
    group: 'Group',
    default: 'Default',
    onlyPages: 'onlyPages',
    subBrandPages: 'subBrandPages',
    storePages: 'storePages',
    onlyContent: 'onlyContent',
    subBrandContent: 'subBrandContent',
    storeContent: 'storeContent',
    onlyContent2: 'onlyContent2',
    onlySchedules: 'onlySchedules',
    onlySchedules2: 'onlySchedules2',
    onlySchedules3: 'onlySchedules3',
    onlyContent3: 'onlyContent3',
    onlyContent4: 'onlyContent4'
};

let subBrandData = {
    name: 'Kirkland Signature',
    subDomain: 'kirkland-signature',
    siteTitle: 'KIRKLAND',
    siteDesc: 'Kirland Signature means quality and value',
    storeDisplayText: 'Kirkland by Costco',
};

let storeData = {
    name: 'Charlottesville Warehouse Costco',
    address: '3171 District Ave Charlottesville, VA',
    city: 'Charlottesville',
    state: 'Virginia',
    zip: '22901-2784',
    phone: '(434) 328-7023',
    circularPath: 'charlottesville',
    googleLocation: '3171 District Ave, Charlottesville, VA, EE. UU.',
    title: 'Costco Charlottesville Warehouse',
    contactBtnLabel: 'Contact here',
    hours: '9',
    notes: 'American operator of discount stores',
    logoLink: 'https://www.costco.com/warehouse-locations/charlottesville-va-1184.html',
    appKey: 'fairvalue_push_to_pos',
    appSecret: '111',
    storeId: '111',
    storeDomain: 'www.fairvalue.com',
    pwaTitle: 'Costco Charlottesville',
    contentThreshold: '3',
    googlePlaceId: [
        'ChIJ7fPilbhcIVMRIbNbog6wwJQ',
        'ChIJDwQcmgPkIFMRJcd-MjeBr1g',
        'ChIJxfHb6schTIYR166UzrtdiGo',
        'ChIJz4flen1J21IRtR775ZmagEA',
        'ChIJ_6RPjMvk3FIR9RSTnogYkHo'
    ],
    latitude: '38.0683848',
    longitude: '-78.4911551',
};


let timezones = {
    pacific: 'Pacific Time',
    mountain: 'Mountain Time',
    central: 'Central Time',
    eastern: 'Eastern Time'
}

let integrations = {
    wakefern: 'Wakefern',
    appcard: 'Appcard',
    inmar: 'Inmar',
    birdzi: 'Birdzi'
}

let contentIntegrations = {
    freshop: 'Freshop',
    wakefern: 'Wakefern',
}

let checkoutIntegrations = {
    freshop: 'Freshop',
    shoprite: 'Shoprite',
    rosie: 'Rosie',
    fairway: 'Fairway',
}

export { brandsData, subBrandData, storeData, timezones, integrations, contentIntegrations, checkoutIntegrations }
