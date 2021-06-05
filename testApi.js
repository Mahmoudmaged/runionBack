// let jsonVariable ;
// app.get('/', (req, res) => {

//     const fs = require('fs');
//     const request = require('request');

//     const options = {
//       method: 'POST',
//       url: 'https://face-verification2.p.rapidapi.com/FaceVerification',
//       headers: {
//         'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
//         'x-rapidapi-key': '5834cb2847msh2c96ebb8f6b326ap1276d5jsn4ff377f09c79',
//         'x-rapidapi-host': 'face-verification2.p.rapidapi.com',
//         useQueryString: true
//       },
//       formData: {
//         photo1: {
//           value: fs.createReadStream('image/72209274_426125221375177_4375502945026834432_n.jpg'),
//           options: {filename: 'mg2.jpg', contentType: 'application/octet-stream'}
//         },
//         photo2: {
//           value: fs.createReadStream('image/71181566_1269517756550355_7658000686759542784_n.jpg'),
//           options: {filename: 'mg1.jpg', contentType: 'application/octet-stream'}
//         }
//       }
//     };

//     request(options, function (error, response, body) {
//         if (error) throw new Error(error);

//         // console.log(json.parse(body));
//          jsonVariable =JSON.parse(body)
//         res.json(jsonVariable['data'])
//     });

// });

// console.log(jsonVariable);