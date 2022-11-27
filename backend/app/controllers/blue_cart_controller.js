
//Setting up the required modules
const axios = require('axios');
const apiConfig = require('../config/api.config');
const Blue_Cart_Item = require("../models/blue_cart_item.js");

// Given the missing item, this function will return the result of a
// BlueCart search with the first 5 items
function getBlueCartItem(item){

  // set up the request parameters
  const params = {
  api_key: apiConfig.BLUECARTAPI.API_KEY,
  search_term: item.toString(),
  type: "search"

  }

  //Making the API request
  axios.get('https://api.bluecartapi.com/request', { params })
  .then(response => {
  
      // store and print the JSON response from BlueCart API
      responseArr = response.data.search_results;
      console.log(JSON.stringify(response.data, 0, 2));
      resultArr = [];
  
      //storing the result in a formatted array
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
  
  }).catch(error => {
  
    // catch and print the error
    console.log(error);
  
  })

  return resultArr;

}

exports.findItems = (item) =>{
  (getBlueCartItem(item));
}

// //testing block
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