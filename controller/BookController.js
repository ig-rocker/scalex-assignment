import csv from  'csv-parser';
import fs from 'fs';

const userData=[];
const adminData=[];

fs.createReadStream('./csv-files/adminUser.csv')
.pipe(csv())
.on('data', (data) => adminData.push(data))

fs.createReadStream('./csv-files/regularUser.csv')
.pipe(csv())
.on('data', (data) => userData.push(data))

function updateData(data){
    const csvData = data.map(item => Object.values(item).join(',')).join('\n');
    fs.writeFile("./csv-files/regularUser.csv", csvData, 'utf8', (err) => {
        if (err) {
            console.error('Error overwriting CSV file with data:', err);
        } else {
            console.log('Data has been added to the CSV file successfully.');
        }
    });
}

export function getAllBook(req,res){
    try{
        let bookName;
        if(req.body.role=='admin'){
            const combineData=userData.concat(adminData);
            bookName=combineData.map(book=>book['Book Name']);
        }else{
            bookName=userData.map(book=>book['Book Name']);
        }
        res.status(200).json({"Book Name": bookName});
    }
    catch(error){
        res.status(500).json({ message: "Server error: "+error });
    }
}

export function addBook(req,res){
    try{
        const{bookName,author,publicationyear}=req.body;
        if(!bookName || !author || !publicationyear){
            res.status(412).json("Please provide the Book Name, author, publication year.");
        }
        if(typeof(bookName)!='string' || bookName ==''){
            res.status(412).json("Please provide Proper Book Name");
        }
        if(typeof(author)!='string' || author ==''){
            res.status(412).json("Please provide Proper Author Name");
        }
        if(typeof(publicationyear)!='number' || bookName ==0){
            res.status(412).json("Please provide Proper BookName");
        }

        const newEntry={
            'Book Name':bookName,
             Author:author,
            'Publication Year':publicationyear
          }
        userData.push(newEntry);
        updateData(userData);
        res.status(200).json({message:"Data added succesfully"})
   
    }
    catch(error){
        res.status(500).json({ message: "Server error: "+error });
    }
}


export function deleteBook(req,res){
    try{
        const bookName=req.body.bookName;
        if(!bookName){
            res.status(412).json({message:'Book name should be Present!'});
        }
        if(typeof(bookName)!='string'){
            res.status(412).json({message:'Book name should be string'});
        }
        const index = userData.findIndex(book => book['Book Name'].toLowerCase() === bookName.toLowerCase());
        if(index!=-1){
            userData.splice(index,1);
            updateData(userData);
            res.status(200).json({message:"Deleted Successfully!"})
        }else{
            res.status(404).json({message:"Book Not found!"})
        }
    }
    catch(error){
        res.status(500).json({ message: "Server error: "+error });  
    }
}

