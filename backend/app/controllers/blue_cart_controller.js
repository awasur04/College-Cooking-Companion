
// //Setting up the required modules
const axios = require('axios');
const apiConfig = require('../config/api.config');
const Blue_Cart_Item = require("../models/blue_cart_item.js");

const getBlueCartItem = (item) =>
{
  return new Promise((resolve, reject) => {

    const params = {
      api_key: apiConfig.BLUECARTAPI.API_KEY,
      search_term: item.toString(),
      type: "search"
    
      }

    console.log("get blue cart items running...");
    resultArr = new Array(5);
    success = false;
    
    axios.get('https://api.bluecartapi.com/request', { params })
    .then(response => {

        // store and print the JSON response from BlueCart API
        responseArr = response.data.search_results;
        //console.log(JSON.stringify(response.data, 0, 2));
        

        //storing the result in a formatted arrays
        for (let i = 0; i < 6; i++) {
            itemName = responseArr[i].product.title;
            description = responseArr[i].product.description;
            //Not every item has a description
            if(description == undefined){
              description = "No description provided";
            }
            image = responseArr[i].product.main_image;
            link = responseArr[i].product.link;
            resultArr[i] = new Blue_Cart_Item(itemName, description, image, link);
        }

        success = true;
        console.log("result array built");
        console.log(JSON.stringify(resultArr));
        resolve(resultArr);
  
  }).catch(error => {
  
    // catch and print the error
    console.log(error);
    return error;
  
  }).then((error) => {
    reject(error);
  });

  });
}

exports.findItems = async (item,itemsFound) =>{
  console.log("findItems executed for item : " + item);
  temp = await getBlueCartItem(item);
  console.log("temp is " + temp);
  itemsFound(temp);
}

// //testing block
// System.out.println("Testing");
// const params = {
//   api_key: apiConfig.BLUECARTAPI.API_KEY,
//   search_term: "honey",
//   type: "search"
// }

// // make the http GET request to BlueCart API
// axios.get('https://api.bluecartapi.com/request', { params })
// .then(response => {

//     // store and print the JSON response from BlueCart API
//     responseArr = response.data.search_results;
//     console.log(JSON.stringify(response.data, 0, 2));
//     resultArr = [];

//     //storing the result in a formatted array
//     for (let i = 0; i < 6; i++) {
//         itemName = responseArr[i].product.title;
//         description = responseArr[i].product.description;
//         if(description == undefined){
//           description = "No description provided";
//         }
//         image = responseArr[i].product.main_image;
//         link = responseArr[i].product.link;
//         resultArr[i] = new Blue_Cart_Item(itemName, description, image, link);
//     }

// }).catch(error => {

//   // catch and print the error
//   console.log(error);

// })

// for(let i = 0; i < responseArr.length; i++){
//   System.out.println(resultArr[i]);
// }