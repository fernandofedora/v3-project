const Excel = require('exceljs');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

export  async function createExcelFileCategoryNotCreated(fileName: string, title: string){
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("My Sheet");

  worksheet.columns = [
  {header: 'Image (UPC/Key Word/File Name)', key: 'image', width: 38},
  {header: 'Title (if different from UPC standard)', key: 'title', width: 38}, 
  {header: 'Description (not required)', key: 'description', width: 38},
  {header: 'Price', key: 'price', width: 15},
  {header: 'Units (not required)', key: 'units', width: 38},
  {header: 'Link (not required)', key: 'link', width: 38},
  {header: 'Category (not required)', key: 'category', width: 38}
  ];

  worksheet.addRow({image: "A97.jpg", title: "Soda", description: "this is a description", price: "10.25", units: "10", link: "link", category: "Fruits"});
  worksheet.addRow({image: "A97.jpg", title: "Soda", description: "this is a description", price: "10.25", units: "10", link: "link", category: "Alcohol"});
  worksheet.addRow({image: "A97.jpg", title: "Soda", description: "this is a description", price: "10.25", units: "10", link: "link", category: title});

  // save under export.xlsx
  await workbook.xlsx.writeFile(fileName);

};

export async function deleteFile(path){
  try {
    await fs.unlinkSync(path)
    //file removed
  } catch(err) {
    console.error(err)
  }
}