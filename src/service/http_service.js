import store from "../store";
import axios from "axios";

export function http() {
  return axios.create({
    baseURL: store.state.apiUrl,
    headers: {
      Accept: "application/json",
      Authorization: "bearer " + store.state.token,
    },
  });
}

export function httpFile() {
  return axios.create({
    baseURL: store.state.apiUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": ["multipart/form-data", "application/json"],
      Authorization: "bearer " + store.state.token,
    },
  });
}

export function downloadPdf(url, file_name = "File") {
  return axios({
    url: url,
    method: "GET",
    responseType: "blob",
    headers: {
      Accept: "application/json",
      "Content-Type": ["multipart/form-data", "application/pdf"],
      Authorization: "bearer " + store.state.token,
    },
  }).then((response) => {
    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
    var fileLink = document.createElement("a");

    fileLink.href = fileURL;
    fileLink.setAttribute("download", file_name + '.pdf');
    document.body.appendChild(fileLink);

    fileLink.click();
  });
}

// export function downloadPdfInvoice(url, file_name = "File") {
//   return axios({
//     url: url,
//     method: "GET",
//     responseType: "blob",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": ["multipart/form-data", "application/pdf"],
//       Authorization: "bearer " + store.state.token,
//     },
//   }).then((response) => {
//     var fileURL = window.URL.createObjectURL(new Blob([response.data]));
//     console.log(file_name);
//     console.log(response);
//     console.log(fileURL)
//     var fileLink = document.createElement("a");

//     fileLink.href = fileURL;
//     fileLink.setAttribute("download", file_name + '.pdf');
//     document.body.appendChild(fileLink);

//     fileLink.click();
//   });
// }

export function downloadPdfInvoice() {
  return axios.create({
    baseURL: store.state.apiUrl,
    headers: {
      Accept: "application/json",
      Authorization: "bearer " + store.state.token,
    },
  });
}
