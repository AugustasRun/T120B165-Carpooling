import axios from "axios";
import jwt from "jwt-decode";

const API_URL = "https://taxidispatcherv320221212151155.azurewebsites.net/api";

class AuthService {
  login(username, password) {
    var data = JSON.stringify({
      userName: username,
      password: password,
    });
    var config = {
      method: "post",
      url: API_URL + "/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    return axios(config).then(function (response) {
      if (response.data.accessToken) {
        const user = jwt(response.data.accessToken);
        const token = response.data.accessToken;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        let roles =
          user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        console.log(roles);
        if (roles.length === 3) {
          localStorage.setItem("role", "Admin");
        } else {
          localStorage.setItem("role", roles);
        }
      }
      return response.data;
    });
  }
  logout() {
    localStorage.clear();
  }
  register(username, password, email) {
    var data = JSON.stringify({
      userName: username,
      email: email,
      password: password,
    });
    var config = {
      method: "post",
      url: API_URL + "/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    return axios(config).then(function (response) {
      return response.data;
    });
  }
  getUsers() {
    var config = {
      method: "get",
      url: API_URL + "/users/",
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
  getEmployees() {
    var config = {
      method: "get",
      url: API_URL + "/employees",
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
  remove(id) {
    var data = JSON.stringify({
      id: id,
    });
    var config = {
      method: "delete",
      url: API_URL + "/remove",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    return axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  updateRole(id) {
    var data = JSON.stringify({
      id: id,
    });
    var config = {
      method: "put",
      url: API_URL + "/update",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    return axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
export default new AuthService();
