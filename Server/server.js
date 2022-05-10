import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'snowboards'
});

const server = express();

server.listen(4400, function(){
    console.log('server is successfully running on port 4400')
});

server.use(express.json())

server.use(cors());

db.connect(error =>{
    if(error)
        console.log("sorry, cannot connect to db", error);
    else
        console.log("connected to mysql db");
})

server.get('/womens', (req, res) => {
    let sbData = "SELECT * FROM snowboards";
    let query = db.query(sbData, (error, data) => {
        if (error){
            res.json ({ErrorMessage:error});
        }
        else {
            res.json(data);
            // console.log(data);
        }
    })
})

server.get('/womens/:productid', (req, res) =>{
    let id_from_client = req.params.productid;
    let sbData = "SELECT * FROM snowboards";
    
    let query = db.query(sbData, (error, data) => {
        if (error){
            res.json ({ErrorMessage:error});
        }
        else {
            res.json(data.find(x => x.id == id_from_client));
            // console.log(data);
        }
    })
    
})

// server.get('/womens', (req, res) => {
//     res.send(productsJson);
// })

// server.get('/womens/:productid', (req, res) =>{
//     let id_from_client = req.params.productid;
//     res.json(productsJson.find(x => x.id == id_from_client))
// })

// let productsJson = [
//     {
//         id: 1,
//         image: "../assets/saloman1.jpg",
//         image2: "../assets/saloman2.jpg",
//         image3: "../assets/saloman3.jpg",
//         image4: "../assets/saloman4.jpg",
//         image5: "../assets/saloman5.jpg",
//         title: "Salomon Wonder Snowboard - Women's 2022",
//         description: "One of Salomon's most versatile boards, the Wonder is designed for maximum performance and playfulness on all terrains, in all conditions. An advanced directional twin shape is built for switch riding, with lengthened contact points for soft snow performance that won't affect handling on groomers.",
//         price: 479.99,
//         stock: 10,
//     },
//     {
//         id: 2,
//         image: "../assets/burton1.jpg",
//         image2: "../assets/burton2.jpg",
//         image3: "../assets/burton3.jpg",
//         image4: "../assets/burton4.jpg",
//         image5: "../assets/burton5.jpg",
//         title: "Women’s Burton Feelgood Camber Snowboard",
//         description: "Backed by Kelly Clark, the women’s Burton Feelgood Snowboard has been the defining force in women’s snowboarding for two decades. The Feelgood boasts a unique shape, matched with positively powerful pop for Ferrari-like handing.",
//         price: 629.99,
//         stock: 5,
//     },
//     {
//         id: 3,
//         image: "../assets/assassin1.jpg",
//         image2: "../assets/assassin2.jpg",
//         image3: "../assets/assassin3.jpg",
//         image4: "../assets/assassin4.jpg",
//         image5: "../assets/assassin5.jpg",
//         title: "Women’s Salomon Lotus Snowboard",
//         description: "Like a friend who waits for you to get up and clean off your goggles on a powder day, the Salomon Lotus Snowboard has that rare combination of trusty performance and easygoing likeability you need to take your riding to the next level. A directional twin with a 10mm setback for stability at speed and float in the deep stuff, the Lotus features a classic single radius sidecut and a forgiving Flat Out Camber profile.",
//         price: 549.99,
//         stock: 3,
//     }
// ]

