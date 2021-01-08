// http://localhost:8000/api/v1/mautic/contacts?search=octavioamuchastegui@gmail.com
// if (document.contxt.github_handle && document.contxt.env === 'prod') {
//   mtcId
// }
document.addEventListener('mauticPageEventDelivered', function(e) {
  console.log(e)
  if (document.contxt.github_handle && mtcId && !document.contxt.mautic_id) {
    //   mtcId
    saveMauticId(mtcId)
  }

})



// `api/v1/mautic/contacts/${mtcId}/edit?includeCustomObjects=true`
// let product = {
//   "email": "octavioamuchastegui@gmail.com",
//   "customObjects": {
//       "data": [
//           {
//               "alias": "products",
//               "data": [
//                   {
//                       "name": "Kernel",
//                       "attributes": {
//                           "product": "kernel"
//                       }
//                   }
//               ]
//           }
//       ]
//   }
// }


const saveMauticId = function(mauticId) {
  console.log(mauticId)
  let url = `api/v1/mautic_profile_save/`;
  const postData = fetchData(url, 'POST', {'mtcId': mauticId});

  $.when(postData).then((response) => {

    document.contxt.mautic_id = mauticId;
  }).catch((err) => {
    console.log(err);
    _alert('Unable to save your profile. Please login again', 'error');
  });

}

class MauticEvent {
  /**
   * @value {product}
   * bounties, hackathons, grants, kernel
   */

  /**
   * @value {persona}
   * bounty-hunter, bounty-funder, hackathon-hunter, hackathon-funder, grants-creator, grants-contributor,grants-pledger,kernel-student, kernel-mentor
   */


  static dataMock(data) {
    let obj = {
      "email": data.email,
      "customObjects": {
        "data": [
          {
            "alias": "products",
            "data": [
              {
                "name": "product",
                "attributes": {
                  "product": data.product
                }
              }
            ]
          }
        ]
      }
    };
    if (data.persona) {
      obj.customObjects.data[0].data[0].attributes.persona = data.persona
    }

    return obj;

  }

  static send(data) {
    let contactApi = `api/v1/mautic/contacts/${mtcId}/edit?includeCustomObjects=true`
    let dataMock = this.dataMock(data)

    fetch(contactApi, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataMock)
    }).then(function (response) {
      return response.json();
    })
    .then(function (result) {
        console.log(result);
    })
    .catch (function (error) {
        console.log('Request failed', error);
    });

  }

  static product(data) {
    // MauticEvent.product({'product':'bounties', 'persona': 'bounty-hunter'})
    this.send({'email': document.contxt.email, 'product': data.product, 'persona': data.persona})
  }
}
