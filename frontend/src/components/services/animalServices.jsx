import axios from "axios";

const API_URL = "https://localhost:7004/api";

class animalService {
  getAnimals() {
    var config = {
      method: "get",
      url: API_URL + "/DispatchCenters",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    return axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getAnimal(animalId) {
    var config = {
      method: "get",
      url: API_URL + "/DispatchCenters/" + animalId,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    return axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  updateAnimal(name,city,animalId) {
    var user = JSON.parse(localStorage.getItem("user"));
    let userName =
      user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    var data = JSON.stringify({
      name: name,
      city: city
    });
    var config = {
      method: "put",
      url: API_URL + "/DispatchCenters/" + animalId,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    return axios(config)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  }
  createAnimal(name, city) {
    var user = JSON.parse(localStorage.getItem("user"));
    let userName =
      user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    var data = JSON.stringify({
      name: name,
      city: city
    });
    var config = {
      method: "post",
      url: API_URL + "/DispatchCenters/",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    return axios(config)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  }
  deleteAnimal(animalId) {
    var config = {
      method: "delete",
      url: API_URL + "/DispatchCenters/" + animalId,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    return axios(config)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  }
}

export default new animalService();
