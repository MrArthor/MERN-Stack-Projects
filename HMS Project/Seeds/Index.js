const mongoose = require('mongoose');
const Data = require('./Data');
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
    await Department.deleteMany({});
    for (let i = 0; i < 10; i++) {


        const random1000 = Math.floor(Math.random() * 10);
        const price = Math.floor(Math.random() * 20) + 100;
        const Dept = new Department({
            DepartmentName: 'Random Shit 101',
            Username: `${Data[random1000].Username}`,
            HOD: `${Data[random1000].Username}`,
            Email: `${Data[random1000].Email}`,
            Images: [{
                Url: 'https://res.cloudinary.com/mrarthor/image/upload/v1627820835/YelpCamp/evwwpnpimhkzxetbwh9r.jpg',
                FileName: 'YelpCamp/evwwpnpimhkzxetbwh9r'
            }],
            PhoneNumber: `${Data[random1000].PhoneNumber}`,
            DepartmentDetails: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus a urna et tempus. Sed scelerisque, sapien in luctus malesuada, dolor lorem dictum nisi, in sagittis nisi erat semper neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum condimentum id lacus in elementum. Integer suscipit tristique pulvinar. Sed sed est tempor, congue massa non, posuere ex. Etiam ultricies vel lacus fringilla consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;            ",
        });
        await Dept.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});