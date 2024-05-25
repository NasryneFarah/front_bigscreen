<script>
export default {
  data() {
    return {
      responses6: [], //pour récupérer le nombre de réponses de la question 6
      responses7: [], //pour récupérer le nombre de réponses de la question 7
      responses8: [], //pour récupérer le nombre de réponses de la question 8
    };
  },

  methods: {
    //la fonction me permettra de récupérer le nombre de réponses données pour chaque propositions
    async getCountResponses() {
      var url = `${this.API_URL}/count`;
      const res = await (
        await fetch(url, {
          method: "get",
          headers: {
            "Content-Type": "application/json", //je précise le type du contenu
          },
        })
      ).json();

      // je fais une condition
      if (res.status == 200) {
        this.responses6 = res.question6;
        this.responses7 = res.question7;
        this.responses8 = res.question8;
        //les fonctions qui afficheront mes graphiques
        this.graphOne();
        this.graphTwo();
        this.graphThree();
      }
    },

    //les données de mon chart
    //id_canva => il me permet de cibler spécifiquement un canvas dans mon document html
    //labels => les données à afficher sur mon grpahique
    //Numbers => Les données numériques à afficher sur mon graphique
    //color => les couleurs des différents éléments graphiques
    //type => le type de graphique à créer

    chartType(id_canva, labels, Numbers, colors, type) {
      //méthode pour définir le type de grpahique en fonction de la condition
      if (type == "pie") { // si le graphique est de type pieChart
        const ctx = document.getElementById(id_canva);
        const data = {
          labels: labels,
          datasets: [
            {
              label: "Propsitions de réponses des utilisateurs",
              data: Numbers,
              backgroundColor: colors,
              hoverOffset: 4,
            },
          ],
        };
        const myChart = new Chart(ctx, {
          type: type,
          data: data,
          options: {
            //animation
            animation: {
        animateRotate: true, // Activer l'animation de rotation
        animateScale: true, // Activer l'animation de mise à l'échelle
        easing: 'easeInOutCirc', // Easing function pour une animation plus fluide (optionnel)
        duration: 2500, // Durée de l'animation en millisecondes
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            boxWidth: 20, // Largeur de la case de légende
            color: 'white', // Changer la couleur du texte des labels
            usePointStyle: true, // Utiliser le style de point pour les légendes
            pointStyle: 'circle', // Style de point pour les puces 
            padding: 20, // Espacement entre les éléments de légende
            font:{
              size: "17", //taille des légendes
            }
          },
        },
      },
    },
        });
      } else if (type == "radar") { //si le graphique est de type radarChart
        const ctx = document.getElementById(id_canva);
        const data = {
          labels: labels,
          datasets: [
            {
              label: "Qualités",
              data:Numbers,
              fill: true,
              backgroundColor: colors,
              borderColor: "rgb(255, 99, 132)",
              pointBackgroundColor: "rgb(255, 99, 132)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(255, 99, 132)",
            },
          ],
        };
        const myChart = new Chart(ctx, {
          type: type,
          data: data,
        });
      }
    },

    // fonction pour le 1er graphique
    graphOne(){
        var id =  "graphOne"; 
        var labels = [
          "Oculus Quest",
          "Oculus Rift/s",
          "HTC Vive",
          " Windows Mixed Reality",
          "Valve index"
        ];
        var data = [];
        var colors = [
        "rgb(205, 198, 195)",
        "rgb(212, 178, 167)",
        "rgb(231, 215, 201)",
        "rgb(237, 233, 227)",
        "rgb(163, 143, 134)",
        // "rgb(0, 0, 0)",
        // "rgb(179, 186, 192)",
        // "rgb(255, 255, 255)",
        // "rgb(103, 107, 110)",
        // "rgb(219, 228, 235)",
      ];
      var type = "pie";
      
      var questions6 = this.responses6; //je récupère les données de réponses de la question

      var data = labels.map((label) => questions6[label] || 0); //je récupéres les valeurs de chaque labels

      this. chartType(id, labels, data, colors, type,); //j'appelle ma fonction chartType et je retourne les infos en paramètre
    },

    // fonction pour le 2ème graphique
    graphTwo(){
        var id =  "graphTwo"; 
        var labels = ["SteamVR","Occulus store","Viveport","Windows store", ];
        var data = [];
        var colors = [
        "rgb(146, 165, 191)",
        "rgb(196, 152, 148)",
        "rgb(211, 227, 214)",
        "rgb(238, 206, 201)",
      ];
      var type = "pie";
      
      var questions7 = this.responses7; //je récupère les données de réponses de la question

      var data = labels.map((label) => questions7[label] || 0); //je récupéres les valeurs de chaque labels

      this. chartType(id, labels, data, colors, type,); //j'appelle ma fonction chartType et je retourne les infos en paramètre
    },

    // fonction pour le 3ème graphique
    graphThree(){
        var id =  "graphThree"; 
        var labels = [
        "Occulus Quest",
        "Occulus Go",
        "HTC Vive Pro",
        "PSVR", 
        "Autre", 
        "Aucun", 
      ];
        var data = [];
        var colors = [
        "rgb(244, 234, 241)",
        "rgb(201, 195, 222)",
        "rgb(243, 214, 211)",
        "rgb(142, 131, 169)",
        "rgb(202, 188, 203)",
        "rgb(76, 83, 114)",
      ];
      var type = "pie";
      
      var questions8 = this.responses8; //je récupère les données de réponses de la question

      var data = labels.map((label) => questions8[label] || 0); //je récupéres les valeurs de chaque labels

      this. chartType(id, labels, data, colors, type,); //j'appelle ma fonction chartType et je retourne les infos en paramètre
    }
  },

  mounted() {
    this.getCountResponses();
    this.graphOne;
    this.graphTwo;
    this.graphThree;
  },
};
</script>

<template>
  <!-- sidebar -->
  <div class="wrapper">
    <!-- le menu à gauche -->
    <div class="sidebar">
      <router-link to="/administration">
        <img src="public/assets/images/logo_bigscreen.png" width="150" />
      </router-link>
      <ul>
        <li>
          <a href="#">
            <i class="fas fa-solid fa-house" style="color: #7089c0"></i>Accueil
            </a>
        </li>
        <li>
          <router-link to="/administration/questions">
            <a href="#"
              ><i class="fas fa-solid fa-question" style="color: #7089c0"></i
              >Questionnaire</a
            >
          </router-link>
        </li>
        <li>
          <router-link to="">
            <a href="#"
              ><i class="fas fa-solid fa-scroll" style="color: #7089c0"></i
              >Réponses</a
            >
          </router-link>
        </li>
      </ul>
    </div>
    <!-- corps du dashboard -->
    <div class="main-content">
      <div class="header">
        Les Statistiques du Sondage
        <i class="fa-solid fa-chart-line fa-bounce"></i> <!--style="color: #c61d6e"-->
      </div>
      <!-- row 1 -->
      <div class="chart-row">
        <!-- chart 1 -->
      <div class="chart">
        <div class="title">
          <h1>Statisque de la question 6</h1>
          <canvas id="graphOne" width="500" height="500"></canvas>
        </div>
      </div>
      <!-- chart 2 -->
      <div class="chart">
        <div class="title">
          <h1>Statisque de la question 7</h1>
          <canvas id="graphTwo" width="500" height="500"></canvas>
        </div>
      </div>
      </div>
      <!-- row 2 -->
      <div class="chart-row">
          <!-- chart 3 -->
      <div class="chart">
        <div class="title">
          <h1>Statisque de la question 8</h1>
          <canvas id="graphThree" width="500" height="500"></canvas>
        </div>
      </div>
      <!-- chart 4 -->
      <div class="chart">
        <div class="title">
          <h1>Statisque des question 11 à 15</h1>
          <canvas id="graphOne" width="50" height="50"></canvas>
        </div>
      </div>
      <!-- fin des charts -->
      </div>
    
    </div>
  </div>
</template>

<style>
/* importer police */
@import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  font-family: "Urbanist", sans-serif;
}

body {
  /* background-image:url("public/assets/images/2.png");
  backdrop-filter: blur(5px); */
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
  margin: 0;
  padding: 0;
}

.wrapper {
  display: flex;
  position: relative;
  min-height: 100vh;
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
  color: #fff;
  text-shadow: 0 0 10px #7089c0;
  font-size: 20px;
  display: block;
}

.wrapper .sidebar ul li a .fas {
  width: 30px;
}

.wrapper .sidebar ul li:hover {
  background: #c61d6e;
}

.wrapper .main-content {
  width: 100%;
  margin-left: 200px;
}

.wrapper .main-content .header {
  padding: 20px;
  border-bottom: 1.5px solid #221e42;
  /* border-top: 1px solid #7089c0; */
  /* background: rgba(245, 245, 245, 0.334); */
  text-align: center;
  font-size: 2rem;
  color: #221e42;
  font-weight: 700;
  text-transform: capitalize;
}

/* Organiser les graphiques en lignes */
.chart-row {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

/* dimension du canva 1*/
.chart canvas {
  width: 500px !important;
  height: 500px !important;
  margin: 5%;
  margin-top: 2%;
  padding: 2.5%;
}

#graphOne,
#graphTwo,
#graphThree,
#graphFour {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Ajoute une ombre de couleur légère */
}

.title h1{
  margin-top: 2%;
  margin-left: 5%;
  color: #221e42;
  position: relative;
  padding-left: 20px;
  text-decoration:underline;
}

.title h1::before{
  content: '\2022'; /* Caractère de la puce \2022*/
  position: absolute;
  left: 5px;
  color: #FFF; /* Couleur de la puce */
  font-size: 1.5em; /* Taille de la puce, ajustable */
  top: 50%;
  transform: translateY(-50%);
}
</style>
