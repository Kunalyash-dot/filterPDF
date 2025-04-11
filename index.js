// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const XLSX = require('xlsx');
// const PDFMerger = require('pdf-merger-js');
import express from 'express';
import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx'
// import PDFMerger from 'pdf-merger-js';
// const fileUpload = require('express-fileupload'); // Or multer
import { fileURLToPath } from 'url';

// Create __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
// app.use(fileUpload());

// app.get('/rename-pdfs', (req, res) => {

//     // Path to the folder containing the PDFs
//     const folderPath = path.join(__dirname, 'pdfs'); // Adjust 'pdfs' to your folder name

//     // Read all files in the folder
//     fs.readdir(folderPath, (err, files) => {
//         if (err) {
//             console.error('Error reading directory:', err);
//             return res.status(500).send('Error reading directory');
//         }

//         // Process each file
//         files.forEach(file => {
//             if (path.extname(file) === '.pdf') {
//                 // Use a regex to extract the 13-digit account number
//                 // console.log(typeof(file))
//                 const split = file.split("_")
//                 console.log(split)
//                 // const match = file.match(/\b\d{14}\b/); // Matches exactly 13 consecutive digits
//                 const accountNumber=split[2];

//                 // console.log(accountNumber.length)
//                 if(accountNumber.length === 14){
//                     const oldPath = path.join(folderPath, file);
//                     const newPath = path.join(folderPath, `${accountNumber}.pdf`);

//                     // Rename the file
//                     fs.rename(oldPath, newPath, err => {
//                         if (err) {
//                             console.error(`Error renaming file ${file}:`, err);
//                         } else {
//                             console.log(`Renamed: ${file} -> ${accountNumber}.pdf`);
//                         }
//                     });

//                 }
//                 else {
//                         console.log(`No account number found in: ${file}`);
//                     }
               
//             }
//         });

//         res.send('PDF renaming process started. Check console for details.');
//     });
// });


// Filter the PDF

// Configuration
const pdfDirectory = './pdfs'; // Directory with 500 PDFs
const excelFilePath = './account_numbers.xlsx'; // Excel file path
const outputDirectory = './filtered_pdfs'; // Directory to save filtered PDFs

// Ensure the output directory exists
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

// Read the Excel file
const workbook = XLSX.readFile(excelFilePath);
const sheetName = workbook.SheetNames[0]; // Read the first sheet
const worksheet = workbook.Sheets[sheetName];

// Extract account numbers from the column "CBS Account No"
const accountNumbers = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) // Convert to array
  .slice(1) // Skip the header row
  .map(row => row[0]?.toString().trim()); // Take the first column, clean whitespace

console.log(`Extracted Account Numbers:`, accountNumbers);

// Process PDFs
fs.readdir(pdfDirectory, (err, files) => {
    if (err) {
      console.error('Error reading PDF directory:', err);
      return;
    }
  
    // Filter and copy matching PDFs
    files.forEach(file => {
      const accountNumber = path.parse(file).name; // Extract filename without extension
      if (accountNumbers.includes(accountNumber)) {
        const sourcePath = path.join(pdfDirectory, file);
        const destinationPath = path.join(outputDirectory, file);
  
        fs.copyFile(sourcePath, destinationPath, err => {
          if (err) {
            console.error(`Error copying file ${file}:`, err);
          } else {
            console.log(`Copied: ${file}`);
          }
        });
      }
    });
  });


// Merger the PDF 

// Function to get all PDF files from a folder
// const getPDFFiles = (folderPath) => {
//   return fs
//       .readdirSync(folderPath)
//       .filter((file) => file.endsWith('.pdf'))
//       .map((file) => path.join(folderPath, file));
// };

// // Endpoint to merge PDFs
// app.get('/merge-pdfs', async (req, res) => {
//   try {
    
//       // const pdfFolder = './needtoMerge'; // Path to your folder containing PDFs
//       const pdfFolder = path.join(__dirname, 'needtoMerge');
//       // Verify the directory
// if (!fs.existsSync(pdfFolder)) {
//   console.error('Directory does not exist:', pdfFolder);
//   process.exit(1);
// }
// if (!fs.lstatSync(pdfFolder).isDirectory()) {
//   console.error('Path is not a directory:', pdfFolder);
//   process.exit(1);
// }
// console.log('Directory verified:', pdfFolder);
//       console.log('Resolved Path:', pdfFolder);
//       const pdfFiles = getPDFFiles(pdfFolder);

//       if (pdfFiles.length === 0) {
//           return res.status(400).send('No PDF files found in the folder.');
//       }

//       const merger = new PDFMerger();

//       for (const pdf of pdfFiles) {
//           await merger.add(pdf); // Add each PDF file
//       }

//       const mergedFilePath = path.join(__dirname, 'merged.pdf');
//       await merger.save(mergedFilePath); // Save the merged PDF

//       // Stream the merged file to the client
//       res.download(mergedFilePath, 'merged.pdf', (err) => {
//           if (err) {
//               console.error(err);
//           }
//           // Cleanup after download
//           fs.unlinkSync(mergedFilePath);
//       });
//   } catch (error) {
//       console.error('Error merging PDFs:', error);
//       res.status(500).send('Error merging PDFs');
//   }
// });




// // Start the Express server
// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });
