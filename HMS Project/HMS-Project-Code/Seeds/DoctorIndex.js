const mongoose = require('mongoose');
const Data = require('./Data');
const UserName = require('./Username');
const Doctor = require("../Models/Doctor");
const Department = require("../Models/Department");
const Patient = require("../Models/Patients");

mongoose.connect('mongodb://localhost:27017/HMS', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async() => {
    const Dept = await Department.find({});
    await Doctor.deleteMany({});

    for (let i = 0; i < 10; i++) {

        const random1000 = Math.floor(Math.random() * 10);
        const random100 = Math.floor(Math.random() * 100);
        const Doc = new Doctor({
            FirstName: `${Data[random1000].FirstName}`,
            LastName: `${Data[random1000].LastName}`,
            DepartmentName: `${Dept[random1000%5].DepartmentName}`,
            JobTitle: 'Resident',
            Images: [{
                Url: 'https://res.cloudinary.com/mrarthor/image/upload/v1627820835/YelpCamp/evwwpnpimhkzxetbwh9r.jpg',
                FileName: 'YelpCamp/evwwpnpimhkzxetbwh9r'
            }],
            PhoneNumber: `${Data[random1000].PhoneNumber}`,
            Email: `${Data[random1000].Email}`,
            Gender: 'Male',
            DOB: `${Data[random1000].DOB}`,
            username: `${UserName[random100].username}`,
            Department: `${Dept[random1000%5]._id}`

        });
        await Doc.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});