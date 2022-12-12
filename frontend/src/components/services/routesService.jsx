import axios from "axios";

const API_URL = "https://localhost:7004/api";

class routesService {
  getDrivers() {
    var config = {
      method: "get",
      url: API_URL + "/routes",
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
  getDriver(animalId) {
    var config = {
      method: "get",
      url: API_URL + "/routes/" + animalId,
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
  updateAnimal(from, to,time,price,routeId) {
    var user = JSON.parse(localStorage.getItem("user"));
    let userName =
      user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    var data = JSON.stringify({
      from: from,
      to: to,
      time: time,
      price: price
    });
    var config = {
      method: "put",
      url: API_URL + "/routes/" + routeId,
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
  createAnimal(from, to,time,price) {
    var user = JSON.parse(localStorage.getItem("user"));
    let userName =
      user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    var data = JSON.stringify({
      from: from,
      to: to,
      time: time,
      price: price,
        workingForId: 2

    });
    var config = {
      method: "post",
      url: API_URL + "/routes",
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
      url: API_URL + "/routes/" + animalId,
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

export default new routesService();
