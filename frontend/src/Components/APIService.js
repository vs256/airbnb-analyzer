
export default class APIService {

  
  // Predict Values based on Specifications
  static InsertPredictValues(body) {
    return fetch(`http://ec2-44-212-42-42.compute-1.amazonaws.com:5000/`, {
      method: "POST",
      headers: {
        
        "Content-Type": "application/json",
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
}
