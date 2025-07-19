import { v4 as uuidv4 } from 'uuid';

let storeGroupsData = {
    storeGroupDefaultName:'Store group'.concat(uuidv4()).slice(0, 32),
    storeGroupDefaultDescription: 'Store group description'.concat(uuidv4()).slice(0, 32),
    storeGroupDefaultNotes: 'This a store group created by automation',
    storeGroupCreatedSuccessfully:"Group Added successfully!",
    storeGroupCantCreatedByRepatedName: "The name is already in use",
    storeGroupNameIsRequired: "Name is required.",
    storeGroupDescriptionIsRequired: "Description is required.",
    storeGroupDeletedSuccessfully:"{name} was deleted successfully!",
    categoryBrowse:"(Browse)",

}

let storeGroupMediaData = {
    mediaCreatedSuccessfully:"Media was created successfully!",
    testMediaJpg: "branca.jpg",
    testMediaPng: "A98.png",
    testMediaGif: "rainbow.gif"
}

let storeGroupsContentData = {
    contentDefaultTitle: 'Content'.concat(uuidv4()).slice(0, 32),
    contentDefaultDescription: 'Content description'.concat(uuidv4()).slice(0, 32),
    contentDefaultStockImage: 'https://media.istockphoto.com/photos/colorful-vegetables-and-fruits-vegan-food-in-rainbow-colors-picture-id1284690585',
    contentCreatedSuccessfully:"Row was created successfully!"
}
export { storeGroupsData, storeGroupsContentData, storeGroupMediaData}