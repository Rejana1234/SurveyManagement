<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/*Root css variable*/
:root {
  --color-white: #ffffff;
  --color-light: #f0eff5;
  --color-gray-light: #86848c;
  --color-gray-dark: #56555e;
  --color-dark: #27282f;
  --color-primary: rgb(71, 7, 234);
  --color-success: rgb(34, 202, 75);
  --color-danger: rgb(255, 67, 54);
  --color-warning: rgb(234, 181, 7);
  --color-purple: rgb(160, 99, 245);

  --color-primary-light: rgba(71, 7, 234, 0.2);
  --color-success-light: rgba(34, 202, 75, 0.2);
  --color-danger-light: rgba(255, 67, 54, 0.2);
  --color-purple-light: rgba(160, 99, 245, 0.2);

  --card-padding: 1.6rem;
  --padding-1: 1rem;
  --padding-2: 8px;

  --card-border-radius: 1.6rem;
  --border-radius-1: 1rem;
  --border-radius-2: 6px;
}

.dark-theme {
  --color-white: #131316;
  --color-light: #23232a;
  --color-dark: #ddd;
  --color-gray-dark: #abacb5;
}

* {
  margin: 0;
  padding: 0;
  outline: 0;
  border: 0;
  /*appearance: none;*/
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
}

html {
  font-size: 12px;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  scroll-padding-top: 15rem;
}

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background-color: #ebebeb;
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #6d6d6d;
}

body {
  background: var(--color-light);
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
  color: var(--color-dark);
}

.overflow-hidden {
  overflow: hidden;
}

img {
  width: 30%;
}

h1 {
  font-size: 1.5rem;
  margin-left: 4%;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5%;
}

h3 {
  font-size: 1.2rem;
}

h4 {
  font-size: 1rem;
}

h5 {
  font-size: 0.86rem;
  font-weight: 500;
}

h6 {
  font-size: 0.76rem;
}

p {
  font-size: 0.86rem;
  color: var(--color-gray-dark);
}

small {
  font-weight: 300;
  font-size: 0.77rem;
}

.text-muted {
  color: var(--color-gray-light);
}

.primary {
  color: var(--color-primary);
}

.danger {
  color: var(--color-danger);
}

.success {
  color: var(--color-success);
}

.purple {
  color: var(--color-purple);
}

.bg-primary {
  background: var(--color-primary);
  box-shadow: 0 0.8rem 0.8rem var(--color-primary-light);
}

.bg-danger {
  background: var(--color-danger);
  box-shadow: 0 0.8rem 0.8rem var(--color-danger-light);
}

.bg-success {
  background: var(--color-success);
  box-shadow: 0 0.8rem 0.8rem var(--color-success-light);
}

.bg-purple {
  background: var(--color-purple);
  box-shadow: 0 0.8rem 0.8rem var(--color-purple-light);
}

.bg-dark {
  background: #27282f;
  box-shadow: 0 0.8rem 0.8rem rgba(0, 0, 0, 0.2);
}

.bg-purple-light {
  background: var(--color-purple-light);
}

.bg-danger-light {
  background: var(--color-danger-light);
}

.bg-success-light {
  background: var(--color-success-light);
}

.bg-primary-light {
  background: var(--color-primary-light);
}

.actio-button-margin {
  margin-left: 2px;
  margin-right: 2px;
}
button {
  padding: 7px 9px;
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
}
.entries_count {
  border: 1px solid #aaa !important;
  border-radius: 3px !important;
  background-color: transparent !important;
  padding: 4px !important;
}
.add_new {
  padding: 10px 15px;
  margin: 10px;
  color: #ffffff;
  background-color: blue;
  font-weight: 900;
}
.export {
  padding: 7px 7px;
  margin: 7px;
  border-radius: 10%;
  color: #ffffff;
  background-color: red;
  font-weight: 900;
  font-size: 13px;
}
.import {
  padding: 5px 5px;
  margin: 10px;
  color: #ffffff;
  background-color: green;
  font-weight: 900;
  font-size: 13px;
  border-radius: 10%;
}
.add {
  font-weight: 900;
}
.edit {
  background-color: #f4a411;
  border: 1px solid orange;
}
.edit:hover {
  background-color: orangered;
}
.delete {
  background-color: #fa5858;
  border: 1px solid red;
}
.delete:hover {
  background-color: rgb(197, 6, 6);
}

/*========= navbar start ==========*/
nav {
  width: 100%;
  background: var(--color-white);
  padding: 1rem 0;
}

nav .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 96%;
  margin: 0 auto;
}

nav img.logo {
  width: 7rem;
  height: 3rem;
}

nav .search-bar {
  background: var(--color-light);
  padding: var(--padding-2) var(--card-padding);
  width: 32vw;
  border-radius: var(--border-radius-2);
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-gray-light);
  position: absolute;
  left: 10.5%;
}

nav .search-bar input[type="search"] {
  color: var(--color-dark);
  background: transparent;
  width: 100%;
}

nav .search-bar input[type="search"]::placeholder {
  color: var(--color-gray-dark);
}

nav .profile-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

nav .profile-area .theme-btn {
  display: flex;
  background: var(--color-light);
  width: 5rem;
  height: 2rem;
  border-radius: var(--border-radius-2);
  cursor: pointer;
}

nav .profile-area .theme-btn span {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

nav .profile-area .theme-btn .active {
  background: var(--color-dark);
  border-radius: var(--border-radius-2);
  color: var(--color-white);
}

nav .profile-area .profile {
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
}

nav .profile-area .profile-photo {
  display: block;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
}

nav .profile-area button {
  display: none;
}

.profile-link.show {
  display: block;
}

nav .profile {
  position: relative;
}
nav .profile img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}
nav .profile .profile-link {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: rgb(255, 255, 255);
  padding: 10px 0;
  box-shadow: 4px 4px 16px rgba(108, 54, 121, 0.1);
  border-radius: 10px;
  width: 160px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
}
nav .profile .profile-link.show {
  opacity: 1;
  pointer-events: visible;
  top: 100%;
}
nav .profile .profile-link a {
  padding: 10px 16px;
  display: flex;
  grid-gap: 10px;
  font-size: 14px;
  color: var(--dark);
  align-items: center;
  transition: all 0.3s ease;
}
nav .profile .profile-link a:hover {
  background: var(--grey);
}

/*========= navbar end ==========*/

/*========= Asie and Sidebar start ==========*/
main {
  display: grid;
  grid-template-columns: 16rem auto;
  gap: 1rem;
  width: 100%;
  margin: 0rem auto 0rem;
}

main aside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

main aside button#close-btn {
  display: none;
}

main aside .sidebar::-webkit-scrollbar {
  width: 7px;
}

main aside .sidebar::-webkit-scrollbar-track {
  background-color: #655f5f;
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

main aside .sidebar::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #6d6d6d;
}
main aside .sidebar a {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  height: 4.2rem;
  color: var(--color-gray-light);
  position: relative;
}

main aside .sidebar a span {
  font-size: 1.7rem;
  margin-left: 2rem;
  transition: all 300ms ease;
}

main aside .sidebar a.exact-active {
  /* background: var(--color-white); */
  color: #5e5cdb;
}

main aside .sidebar a:hover {
  color: rgb(79, 93, 111);
}

main aside .sidebar h4 {
  font-weight: 500;
}

main aside .updates {
  background: var(--color-white);
  border-radius: var(--border-radius-1);
  text-align: center;
  padding: var(--card-padding);
}

main aside .updates span {
  font-size: 2.8rem;
}

main aside .updates h4 {
  margin: 1rem 0;
}

main aside .updates a {
  display: block;
  width: 100%;
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--border-radius-1);
  padding: 0.8rem 0;
  margin-top: 2rem;
  transition: all 300ms ease;
}

main aside .updates a:hover {
  box-shadow: 0 1rem 2rem var(--color-primary-light);
}

main aside .sidebar li a .link_name {
  pointer-events: none;
}

main aside .sidebar li .sub-menu {
  padding: 6px 6px 14px;
  display: none;
  background: var(--color-white);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-bottom: 1px solid var(--color-gray-light);
}

main aside .sidebar li .sub-menu a span {
  font-size: 1.7rem;
  margin-left: 3rem;
}

main aside .sidebar li.showMenu .sub-menu {
  display: block;
  margin-bottom: 10px;
  position: relative;
}

main aside .sidebar li .sub-menu a {
  padding: 5px 0;
  white-space: nowrap;
  height: 2.5rem;
}

/*========= Asie and Sidebar end ==========*/

/*========= Middle Section start ===========*/
main section.middle .header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

main section.middle .header input[type="date"] {
  padding: 0.5rem 2rem;
  border-radius: var(--border-radius-2);
  background: var(--color-white);
  color: var(--color-gray-dark);
}

main section.middle .cards {
  margin-top: 0rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

main section.middle .cards .card {
  margin-top: 2%;
  /* background-color: rgb(31, 59, 72); */
  background: linear-gradient(#869fbb, #869fbb);
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  color: rgb(236, 235, 235);
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  transition: all 300ms ease;
  min-width: 22rem;
  /* margin-left: 13%; */
}
main section.middle .cards .card:nth-child(2) {
  margin-top: 2%;
  /* background-color: rgb(31, 59, 72); */
  /* background: linear-gradient(#869fbb, #869fbb); */
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  color: rgb(236, 235, 235);
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  transition: all 300ms ease;
  min-width: 22rem;
  /* margin-left: 13%; */
  background: linear-gradient(#0c8671, #0c8671);
  /* box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.2); */
}

main section.middle .cards .card:nth-child(3) {
  background: linear-gradient(#1a606c, #1a606c);
  box-shadow: 0 2rem 3rem var(--color-primary-light);
}
main section.middle .cards .card:nth-child(4) {
  /* background: linear-gradient(#da534f, #da534f); */
  background: linear-gradient(#0fa58c, #0fa58c);
  box-shadow: 0 2rem 3rem var(--color-primary-light);
}

main section.middle .cards .card:nth-child(5) {
  background: linear-gradient(#54a1de, #54a1de);
  box-shadow: 0 2rem 3rem var(--color-primary-light);
}

main section.middle .cards .card:nth-child(6) {
  background: linear-gradient(#2478bb, #2478bb);
  box-shadow: 0 2rem 3rem var(--color-primary-light);
}

main section.middle .cards .card:nth-child(7) {
  background: linear-gradient(#01579b, #01579b);
  box-shadow: 0 2rem 3rem var(--color-primary-light);
}

main section.middle .cards .card:nth-child(8) {
  background: linear-gradient(#27496e, #27496e);
  box-shadow: 0 2rem 3rem var(--color-primary-light);
}

main section.middle .cards .card:hover {
  box-shadow: none;
}

main section.middle .card .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

main section.middle .card .top .left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 11rem;
}
main section.middle .card .top .right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10rem;
}
main section.middle .card .top .left h2 {
  font-weight: 200;
  font-size: 1.5rem;
  margin-top: -5%;
  color: #fff !important;
}
main section.middle .card .top .right h2 {
  font-weight: 200;
  font-size: 1.5rem;
  margin-top: -5%;
  color: #fff !important;
}

main section.middle .card .middle {
  display: flex;
  justify-content: space-between;
}

main section.middle .card .middle .chip {
  width: 3.5rem;
}

main section.middle .card .bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

main section.middle .card .bottom .right {
  display: flex;
  gap: 2rem;
}

main section.middle .charts_card {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 1.5rem;
}

main section.middle .charts_card .pie_chart {
  margin-top: 3px;
  padding: 3rem 2rem;
  background: #fff;
  border-radius: var(--card-border-radius);
}

main section.middle .charts_card .bar_chart {
  margin-top: 3px;
  padding: 3rem 2rem;
  background: #fff;
  border-radius: var(--card-border-radius);
}

main section.middle .latest_data_card {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50rem, 1fr));
  gap: 1.5rem;
}

main section.middle .latest_data_card .table_card {
  padding: 3rem 2rem;
  background: #fff;
  border-radius: var(--card-border-radius);
}
/*========= Middle Section end ===========*/

.danger_text {
  color: red;
}

/*======= All Table Design CSS Start =======*/

.row {
  margin-bottom: 1%;
}
.row1 {
  margin-top: 5%;
  margin-bottom: 5%;
  display: flex;
  justify-content: flex-end;
}

.submit-btn {
  background-color: green;
  color: rgb(255, 255, 255);
  padding: 0.5rem 0.5rem;
  border: 1px solid gray;
  border-radius: 0.5rem;
  cursor: pointer;
  float: right;
}
.back-btn {
  background-color: #ddd;
  color: #111;
  padding: 0.5rem 0.5rem;
  border: 1px solid gray;
  border-radius: 0.5rem;
  cursor: pointer;
  float: right;
  margin-right: 0.3%;
}
.remove-btn {
  background-color: #ddd;
  color: #111;
  padding: 0.5rem 0.5rem;
  border: 1px solid gray;
  border-radius: 0.5rem;
  cursor: pointer;
  float: right;
  margin-right: 0.3%;
}

input[type="text"],
textarea,
input[type="number"],
input[type="password"],
input[type="time"],
input[type="email"] {
  width: 70%;
  padding: 8px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  box-shadow: 0 2px 1px 0 rgb(0 0 0 / 20%), 0 2px 15px 0 rgb(0 0 0 / 19%);
}

input[type="date"] {
  width: 70%;
  padding: 8px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 1px 0 rgb(0 0 0 / 20%), 0 2px 15px 0 rgb(0 0 0 / 19%);
  /* resize: vertical; */
}
input[type="datetime-local"] {
  width: 70%;
  padding: 8px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 1px 0 rgb(0 0 0 / 20%), 0 2px 15px 0 rgb(0 0 0 / 19%);
  /* resize: vertical; */
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
  font-weight: 500;
  margin-left: 5px;
  margin-bottom: -10px;
}

input[type="submit"] {
  background-color: green;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  margin-left: 5px;
}

input[type="submit"]:hover {
  background-color: rgb(3, 82, 3);
}

#global_select {
  border: 1px solid #aaa !important;
  border-radius: 3px !important;
  background-color: transparent !important;
  padding: 5px !important;
  width: 250px;
}

select {
  height: 41px;
  text-align: left;
  box-shadow: 0 2px 1px 0 rgb(0 0 0 / 20%), 0 2px 15px 0 rgb(0 0 0 / 19%);
}

select.classic {
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, blue 50%),
    linear-gradient(135deg, blue 50%, transparent 50%), linear-gradient(to right, skyblue, skyblue);
  background-position: calc(100% - 14px) calc(1em + 7px), calc(100% - 9px) calc(1em + 7px), 100% 0;
  background-size: 5px 5px, 5px 5px, 2em 3.5em;
  background-repeat: no-repeat;
  width: 110%;
}

.back-btn {
  background-color: #ddd;
  color: #111;
  padding: 12px 20px;
  border: 1px solid gray;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

.back-btn:hover {
  background-color: rgb(190, 188, 188);
}

.col-25 {
  float: left;
  width: 100%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 100%;
  margin-top: 6px;
}

.button {
  margin-left: 80%;
}
.flex-container-flex-end {
  display: flex;
  text-align: center;
  justify-content: flex-end;
}
.btn {
  height: 45px;
  width: 100px;
  background-color: rgb(154 205 89 / 91%);
  font-size: 16px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

table {
  /* border-collapse: collapse; */
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 10px 10px 0 0 !important;
  /* border-radius: 1em; */
  /* box-shadow: 4px 4px 6px grey; */
}

th {
  text-align: center;
  padding: 10px;
  width: 10%;
  font-weight: bold;
  font-size: 14px;
}
td {
  text-align: center;
  padding: 10px;
  width: 10%;
  font-weight: bolder;
}

th {
  background-color: #43a1b8;
  color: #ffffff;
}

tr:nth-child(even) {
  background-color: rgb(246, 238, 238);
}
tr:nth-child(odd) {
  background-color: rgb(232, 232, 232);
}

.actio-button-margin {
  margin-left: 2px;
  margin-right: 2px;
}
.entries_count {
  border: 1px solid rgb(255, 255, 255) !important;
  border-radius: 3px !important;
  background-color: transparent !important;
  padding: 4px !important;
}
.add_new {
  padding: 10px 15px;
  margin: 10px;
  color: #ffffff;
  background-color: blue;
}
.edit {
  background-color: orange;
  border: 1px solid orange;
}
.edit:hover {
  background-color: orangered;
}
.delete {
  background-color: red;
  border: 1px solid red;
}

.delete:hover {
  background-color: rgb(197, 6, 6);
}
.flex-container {
  display: flex;
  text-align: center;
  justify-content: space-between;
  /* background-color: #f1f1f1; */
}
.flex-container-pagination {
  display: flex;
  text-align: center;
  justify-content: space-between;
  /* background-color: #f1f1f1; */
}
.flex-item-pagination {
  /* margin: 5px 2px; */
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 7px 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #ddd;
}
.flex-item-pagination:hover {
  background-color: #ddd;
}
.flex-item {
  padding: 10px;
}

img {
  width: 50%;
}

.chips {
  display: inline-flex;
  padding: 4px 6px;
  height: 22px;
  font-size: 12px;
  line-height: 13px;
  border-radius: 32px;
  background-color: #99d9aa8c;
  margin-left: 40px;
  margin-right: 1px;
  margin-top: 23px;
  color: rgb(84, 83, 83);
  align-items: center;
  justify-content: center;
}

.chips1 {
  display: inline-flex;
  padding: 4px 6px;
  height: 22px;
  font-size: 12px;
  line-height: 13px;
  border-radius: 32px;
  background-color: #e59f8583;
  margin-left: 40px;
  margin-right: 4px;
  margin-top: 23px;
  color: #0e6408;
  align-items: center;
  justify-content: center;
}
.chips2 {
  display: inline-flex;
  padding: 4px 6px;
  height: 22px;
  font-size: 12px;
  line-height: 13px;
  border-radius: 32px;
  background-color: #ebc1a074;
  margin-left: 40px;
  margin-right: 4px;
  margin-top: 23px;
  color: rgb(236, 46, 46);
  align-items: center;
  justify-content: center;
}
.chips3 {
  display: inline-flex;
  padding: 4px 6px;
  height: 22px;
  font-size: 12px;
  line-height: 13px;
  border-radius: 32px;
  background-color: #9cc5f360;
  margin-left: 40px;
  margin-right: 4px;
  margin-top: 23px;
  color: rgb(48, 45, 207);
  align-items: center;
  justify-content: center;
}

/*======= All Table Design CSS End =======*/

/*========= Recent Transaction section end =========*/

/*========= Media Quires start for tablet =====================*/
@media screen and (max-width: 1024px) {
  nav .search-bar {
    display: none;
  }

  nav .profile-area {
    gap: 2rem;
  }

  nav .profile-area button#menu-btn {
    display: block;
    background: transparent;
    color: var(--color-dark);
  }

  main {
    grid-template-columns: 1fr;
  }

  main aside {
    position: fixed;
    top: 0;
    left: -100%;
    z-index: 3;
    background: var(--color-white);
    width: 22rem;
    height: 100vh;
    box-shadow: 2rem 0 2rem var(--color-primary-light);
    display: none;
    animation: showSidebar 500ms ease forwards;
    overflow-y: scroll;
  }

  @keyframes showSidebar {
    to {
      left: 0;
    }
  }

  main aside button#close-btn {
    display: inline-block;
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 4;
    background: transparent;
    color: var(--color-dark);
  }

  button:hover {
    cursor: pointer;
  }

  main aside .sidebar {
    margin-top: 4rem;
  }

  main aside .updates {
    display: none;
  }

  main section.middle .cards {
    grid-template-columns: 1fr 1fr;
  }

  main canvas {
    margin: 3rem 0 1rem;
  }

  main section.right .recent-transactions {
    margin-top: 3rem;
  }
}
/*========= Media Quires end for tablet=====================*/

/*========= Media quires for mobile phone start ============*/

@media screen and (max-width: 400px) {
  nav {
    display: block;
    width: 231%;
  }
  .basic_w_order {
    width: 119%;
  }
}

@media screen and (max-width: 768px) {
  nav .profile-area {
    gap: 2.6rem;
  }

  nav {
    display: block;
    width: 100%;
  }

  main section.middle .cards {
    grid-template-columns: 1fr;
  }

  main section.middle .charts_card .pie_chart {
    padding: 0;
    grid-template-columns: repeat(auto-fit, minmax(2rem, 1fr));
  }

  main section.middle .charts_card .bar_chart {
    padding: 0;
    grid-template-columns: repeat(auto-fit, minmax(2rem, 1fr));
  }

  main section.middle .latest_data_card {
    grid-template-columns: repeat(auto-fit, minmax(2rem, 1fr));
  }

  #doughnut-chart {
    height: 300px !important;
  }

  #bar-chart {
    height: 300px !important;
  }

  .flex-container {
    flex-direction: column;
  }

  .flex-container-flex-end {
    display: block;
  }

  .btn {
    height: 45px;
    width: 100px;
    background-color: orange;
    font-size: 16px;
    margin-right: 40%;
  }

  .flex-item {
    text-align: end;
  }

  main section.middle .card {
    grid-template-columns: 1fr;
  }
  .flex-item select {
    width: 100%;
  }
  .card {
    flex-direction: column;
    width: 100%;
  }
  .modal-vue .modal[data-v-47568e25] {
    position: absolute;
    width: 50%;
    height: 96%;
    z-index: 9999;
    margin: -200px auto;
    padding: 20px 30px;
    background-color: #fff;
    left: 0;
    right: 0;
    margin-top: -105%;
    overflow: auto;
  }
}

@media screen and (max-width: 600px) {
  /* .bar_chart {
    padding: 0px 5px 0px 5px;
    margin: 0px 15px 0px 15px;
    margin-top: 26px;
  } */
  nav .profile-area {
    gap: 2.6rem;
  }

  nav {
    display: block;
    width: 184%;
  }

  main section.middle .cards {
    display: grid;
    grid-template-columns: repeat(2, 0fr);
  }
  main section.middle .bar_chart.cards {
    display: grid;
    /* grid-template-columns: repeat(2, 0fr); */
  }
  main section.middle .cards .card {
    width: 42rem;
  }
  main section.middle .cards .card .work {
    font-size: 55px;
  }
  main section.middle .cards .card .account_circle {
    font-size: 55px;
  }
  main section.middle .cards .card .kayaking {
    font-size: 55px;
  }
  main section.middle .cards .card .incomplete_circle {
    font-size: 55px;
  }

  main section.middle .latest_data_card {
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  }

  #doughnut-chart {
    height: 300px !important;
  }

  #bar-chart {
    height: 300px !important;
  }

  .flex-container {
    flex-direction: column;
  }

  .flex-container-flex-end {
    display: block;
  }

  .btn {
    height: 45px;
    width: 100px;
    background-color: orange;
    font-size: 16px;
    margin-right: 40%;
  }

  .flex-item {
    text-align: end;
  }

  main section.middle .card {
    grid-template-columns: 1fr;
  }

  .flex-item select {
    width: 100%;
  }

  .card {
    flex-direction: column;
    width: 100%;
  }

  .modal-vue .modal[data-v-47568e25] {
    position: absolute;
    width: 50%;
    height: 96%;
    z-index: 9999;
    margin: -200px auto;
    padding: 20px 30px;
    background-color: #fff;
    left: 0;
    right: 0;
    margin-top: -105%;
    overflow: auto;
  }
}

@media screen and (max-width: 1255px) {
  nav {
    width: 116%;
    background: var(--color-white);
    padding: 1rem 0;
  }

  main section.middle .cards .card1 {
    min-width: 22rem;
  }
  main section.middle .cards .card4 {
    min-width: 22rem;
  }
  main section.middle .cards .card5 {
    min-width: 22rem;
  }
  main section.middle .cards .card6 {
    min-width: 22rem;
  }
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    font-weight: 400;
    text-align: right;
  }

  table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }

  .flex-container {
    align-items: center;
    justify-content: center;
  }

  .mobile-flex-container {
    margin-bottom: 20px;
  }

  th {
    width: 100%;
  }
  td {
    width: 100%;
    text-align: right;
    font-weight: 400;
  }
}

@media screen and (max-width: 600px) {
  .col-25,
  .col-75,
  input[type="submit"] {
    width: 100%;
    margin-top: 5px;
  }
}

@media screen and (max-width: 464px) {
  nav .profile-area {
    gap: 2.6rem;
  }

  nav {
    display: block;
    width: 100%;
  }

  main section.middle .cards {
    grid-template-columns: 1fr;
  }

  main section.middle .cards .card {
    width: 30rem;
    margin-top: 0%;
  }
  main section.middle .cards .card .storage {
    color: #fff;
    font-size: 55px;
    margin-left: 4rem;
  }
  main section.middle .cards .card .work {
    font-size: 55px;
    margin-left: -10px;
  }

  main section.middle .cards .card .account_circle {
    font-size: 55px;
  }

  main section.middle .cards .card .kayaking {
    font-size: 55px;
    margin-left: 20px;
  }

  main section.middle .cards .card .incomplete_circle {
    font-size: 55px;
    margin-left: 32px;
  }
  main section.middle .cards .card .incomplete_wallet {
    color: #fff;
    font-size: 55px;
    margin-left: -8px;
  }
  main section.middle .cards .card .incomplete {
    color: #fff;
    font-size: 55px;
    margin-left: 6px;
  }
  main section.middle .cards .card .incomplete_circle1 {
    color: #fff;
    font-size: 55px;
    margin-left: -34px;
  }
  main section.middle .charts_card .pie_chart {
    padding: 0;
    grid-template-columns: repeat(auto-fit, minmax(2rem, 1fr));
  }

  main section.middle .charts_card .bar_chart {
    width: 100%;
    height: 90%;
    margin-left: 1px;
  }

  main section.middle .latest_data_card {
    grid-template-columns: repeat(auto-fit, minmax(2rem, 1fr));
  }

  #doughnut-chart {
    display: block;
    box-sizing: border-box;
    height: 251.714px;
    width: 348.714px;
  }

  #bar-chart {
    display: block;
    box-sizing: border-box;
    height: 251.714px;
    width: 362.571px;
  }
  .bar_chart[data-v-a44c444e] {
    padding: 0px 5px 0px 5px;
    margin: 0px 15px 0px 15px;
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    box-shadow: #f1f1f1;
    margin-top: 25px;
    margin-top: 10px;
  }

  .flex-container {
    flex-direction: column;
  }

  .flex-container-pagination {
    flex-direction: column;
  }
  .flex-container-flex-end {
    display: block;
  }
  .btn {
    height: 45px;
    width: 100px;
    background-color: orange;
    font-size: 16px;
    margin-right: 40%;
  }
  .flex-item {
    text-align: end;
  }

  main section.middle .card {
    grid-template-columns: 1fr;
  }
  .flex-item select {
    width: 100%;
  }
  .card {
    flex-direction: column;
    width: 100%;
  }
  .modal-vue .modal[data-v-47568e25] {
    position: absolute;
    width: 50%;
    height: 96%;
    z-index: 9999;
    margin: -200px auto;
    padding: 20px 30px;
    background-color: #fff;
    left: 0;
    right: 0;
    margin-top: -105%;
    overflow: auto;
  }
}
@media screen and (min-width: 300px) {
  /* nav .profile-area {
    gap: 2.6rem;
  } */
  nav {
    display: block;
    /* width: 124%; */
    margin: auto;
  }
}
@media screen and (max-width: 360px) {
  /* nav .profile-area {
    gap: 2.6rem;
  } */
  nav {
    display: block;
    width: 150%;
  }
}
@media screen and (max-width: 460px) {
  nav .profile-area {
    gap: 2.6rem;
  }
  nav {
    display: block;
    width: 150%;
  }
}
/*========= Media quires for mobile phone end ============*/
</style>
