<script></script>

<template>
  <div>
    <!-- sidebar -->
    <div class="wrapper">
      <!-- le menu à gauche -->
      <div class="sidebar">
        <img src="public/assets/images/logo_bigscreen.png" width="150" />
        <ul>
          <li>
            <a href="#"
              ><i class="fas fa-solid fa-house" style="color: #7089c0"></i
              >Accueil</a
            >
          </li>
          <li>
            <a href="#"
              ><i class="fas fa-solid fa-question" style="color: #7089c0"></i
              >Questionnaire</a
            >
          </li>
          <li>
            <a href="#"
              ><i class="fas fa-solid fa-scroll" style="color: #7089c0"></i
              >Réponses</a
            >
          </li>
        </ul>
      </div>
      <!-- corps du dashboard -->
      <div class="main-content">
        <div class="header">Liste des 20 questions</div>

        <!-- Le tableau pour afficher la liste des questions -->
        <table class="tableau">
            <!-- entête du tableau -->
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Titre de la question</th>
                    <th>Corps de la question</th>
                </tr>
            </thead>
            <!-- corps du tableau -->
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Questions 1/20</td>
                    <td>Votre adresse email?</td>
                </tr>

                <!-- <tr>
                    <td>1</td>
                    <td>Questions 1/20</td>
                    <td>Votre adresse email?</td>
                </tr> -->

                
            </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
/* importer police */
@import url("https://fonts.googleapis.com/css2?family=Ysabeau+Infant:wght@1;100;200;300;400;500;600;700;800;900;1000&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  font-family: "Ysabeau Infant", sans-serif;
}

body {
  background: rgb(112, 137, 192);
  background: linear-gradient(
    69deg,
    rgba(112, 137, 192, 1) 22%,
    rgba(198, 29, 110, 1) 100%
  );
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  min-height: 100vh;
}

.wrapper {
  display: flex;
  position: relative;
}

.wrapper .sidebar {
  position: fixed;
  width: 200px;
  height: 100%;
  background: #221e42;
  /* padding: 55px 0; */
  padding: 12% 0;
}

.wrapper .sidebar img {
  display: block;
  margin: auto;
  cursor: pointer;
}

.wrapper .sidebar ul li {
  padding: 15px;
  border-bottom: 1px solid rgb(112, 137, 192);
  border-top: 1px solid rgb(112, 137, 192);
}

.wrapper .sidebar ul li a {
  color: whitesmoke;
  font-size: 20px;
  text-shadow: 3px 5px 2px #7089c0;
  display: block;
}

.wrapper .sidebar ul li a .fas {
  width: 30px;
}

.wrapper .sidebar ul li:hover {
  background: #c61d6e;
}

/* .wrapper .sidebar ul li:hover a{
    color: #7089C0;
  text-shadow: 3px 5px 2px whitesmoke; 
} */

.wrapper .main-content {
  width: 100%;
  margin-left: 200px;
}

.wrapper .main-content .header {
  padding: 20px;
  border-bottom: 1px solid #7089c0;
  border-top: 1px solid #7089c0;
  background: rgba(245, 245, 245, 0.334);
  text-align: center;
  font-size: 2rem;
  color: #221e42;
  font-weight: 700;
  text-transform: capitalize;
}

/* tableau */
.tableau{
    border-collapse: collapse;
    min-width: 500px;
    /* border: 2px solid #343777; */
    border: 1px solid rgba(245, 245, 245, 0.469);
    width: auto;
    box-shadow: 0 5px 50px rgba(0, 0, 0, 0.15);
    margin: 20px auto;
    cursor: pointer;
}

thead tr{
    background-color: #343777;
    color: #7089c0;
    text-align: left;
}

th, td{
    padding: 15px 20px;
}

tbody tr, td, th{
    border: 1px solid #7089c0;
}

tbody tr:nth-child(even){
    background-color: rgba(245, 245, 245, 0.469);
}

tbody tr:last-of-type{
   border-bottom: 2px solid #343777;
}

</style>
