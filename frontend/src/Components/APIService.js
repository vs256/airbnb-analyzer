export default class APIService {
  // Predict Values based on Specifications
  static InsertPredictValues(body) {
    return fetch(`http://localhost:5000/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
}
