import axios from "axios";

const API_URL = "https://localhost:7004/api";

class driversService {
  getDrivers() {
    var config = {
      method: "get",
      url: API_URL + "/drivers",
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
      url: API_URL + "/drivers/" + animalId,
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
  updateAnimal(firstName, lastName,startedDriving,startedWorking,driverId) {
    var user = JSON.parse(localStorage.getItem("user"));
    let userName =
      user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    var data = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        startedDriving: startedDriving,
        startedWorking: startedWorking,
        workingForId:1
    });
    var config = {
      method: "put",
      url: API_URL + "/drivers/" + driverId,
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
  createAnimal(firstName, lastName,startedDriving,startedWorking) {
    var user = JSON.parse(localStorage.getItem("user"));
    let userName =
      user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    var data = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        startedDriving: startedDriving,
        startedWorking: startedWorking,
        workingForId: 1

    });
    var config = {
      method: "post",
      url: API_URL + "/drivers",
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
      url: API_URL + "/drivers/" + animalId,
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

export default new driversService();
