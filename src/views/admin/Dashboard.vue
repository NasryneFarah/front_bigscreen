<script>
export default {
  data() {
    return {
      loading: true, //ça indique que mon loader est visible au début 
      responses6: [], //pour récupérer le nombre de réponses de la question 6
      responses7: [], //pour récupérer le nombre de réponses de la question 7
      responses10: [], //pour récupérer le nombre de réponses de la question 8
     answer_Quality:{} //pour récupérer les taux des réponses des questions 11 à 15
    };
  },

  methods: {
    //cette fonction me permet de changer l'état de loading après 3 secondes afin qu'il disparaisse
    hideLoaderWithDelay() { 
      setTimeout(() => {
        this.loading = false;
      }, 3000); // Le loader disparaîtra après 3 secondes
    },

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
        this.responses10 = res.question10;
        this.answer_Quality= res.averages;
        //les fonctions qui afficheront mes graphiques
        this.graphOne();
        this.graphTwo();
        this.graphThree();
        this.graphFour();
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
              family: 'Urbanist, sans-serif' // Police de caractères des labels
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
              borderColor: "rgb(228, 224, 247)",
              pointBackgroundColor: "rgb(233, 197, 197)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(255, 99, 132)",
            },
          ],
        };
        const myChart = new Chart(ctx, {
          type: type,
          data: data,
          options: {
            scales: {
                r: {
                    angleLines: {
                        color: 'rgb(216, 148, 134)' // Couleur des lignes d'angle
                    },
                    grid: {
                        color: 'rgb(247, 246, 243)' // Couleur de la grille
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.8)', // Couleur des étiquettes de ticks
                        backdropColor: 'rgba(0, 0, 0, 0.1)', // Couleur de fond derrière les ticks
                        font: {
                            size: 14,
                            family: 'Urbanist, sans-serif', // Police de caractères
                        },
                        stepSize: 0.2, // Taille de chaque pas pour les ticks
                    },
                    pointLabels: {
                        color: 'rgb(225, 225, 225)', // Couleur des labels
                        font: {
                            size: 13,
                            family: 'Urbanist, sans-serif', // Police de caractères des labels
                            weight: 'bold' // Rendre la police des ticks en gras
                        },
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'rgba(255, 255, 255)', // Couleur des labels de la légende
                        font: {
                            size: 17,
                            family: 'Urbanist, sans-serif' // Police de caractères des labels de la légende
                        }
                    }
                }
            }
        }
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
          "Windows Mixed Reality",
          "Valve index"
        ];
        var data = [];
        var colors = [
        "rgb(205, 198, 195)",
        "rgb(212, 178, 167)",
        "rgb(231, 215, 201)",
        "rgb(237, 233, 227)",
        "rgb(163, 143, 134)",
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
        "regarder la TV en direct",
        "regarder des films",
        "travailler",
        "jouer en solo", 
        "jouer en équipe", 
      ];
        var data = [];
        var colors = [
        "rgb(244, 234, 241)",
        "rgb(201, 195, 222)",
        "rgb(243, 214, 211)",
        "rgb(142, 131, 169)",
        "rgb(202, 188, 203)",
      ];
      var type = "pie";
      
      var questions10 = this.responses10; //je récupère les données de réponses de la question

      var data = labels.map((label) => questions10[label] || 0); //je récupéres les valeurs de chaque labels

      this. chartType(id, labels, data, colors, type,); //j'appelle ma fonction chartType et je retourne les infos en paramètre
    },

    // fonction pour le 4ème graphique
    graphFour(){
        var id = "graphFour"; 
        var labels = [
        "Qualité d'image",
        "Confort d'utilisation",
        "Connexion Réseau",
        "Qualité des graphismes 3D", 
        "Qualité Audio", 
      ];
      var data = [];
      var colors = ["rgb(187, 176, 203, 0.8)"];
      var type = "radar";

      var questions = [
        "average11",
        "average12",
        "average13",
        "average14",
        "average15",
      ];
      var quality = this.answer_Quality;
      var data = questions.map((element) => quality[element]);
      // console.log(data);

      this. chartType(id, labels, data, colors, type); //j'appelle ma fonction chartType et je retourne les infos en paramètre
    },

    // la fonction permettra à l'admin de se déconnecter et je le redirige sur la page d'acceuil du site
    async logout() {
      var url = `${this.API_URL}/logout`;
      // const token = localStorage.getItem('token');
      const res = await(
                await fetch(url,{
                   method: "post",
                   headers: {
                    "Content-Type": "application/json", //je précise le type du contenu
                   } 
                })
            ).json();
      if (res.status == 200) {
        // Redirigez vers la page d'accueil
        window.location.href = "/";
      } else {
        alert('Erreur lors de la déconnexion');
      }
    }
  },

  mounted() {
    this.hideLoaderWithDelay();
    this.getCountResponses();
    this.graphOne;
    this.graphTwo;
    this.graphThree;
    this.graphFour;
  },
};
</script>

<template>
  <!-- loader de la page  -->
 <!-- transition est un composant vue qui me permet d'appliquer des effets à mes éléments -->
 <transition name="fade">
    <div class="loader" v-if="loading" >
   <div data-glitch="Bigscreen..." class="glitch">Bigscreen...</div>
</div>
 </transition>

  <!-- sidebar -->
  <div class="wrapper">
    <!-- le menu à gauche -->
    <div class="sidebar">
      <router-link to="/administration">
        <img src="public/assets/images/bigscreen.svg" width="150"/>
        <!-- <img src="public/assets/images/logo_bigscreen.png" width="150" /> -->
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
          <router-link to="/administration/responses">
            <a href="#"
              ><i class="fas fa-solid fa-scroll" style="color: #7089c0"></i
              >Réponses</a
            >
          </router-link>
        </li>
      </ul>
      <!-- bouton de déconnexion -->
      <button class="Btn" @click="logout">
  <div class="sign">
    <svg viewBox="0 0 512 512">
      <path
        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
      ></path>
    </svg>
  </div>

  <div class="text">Déconnexion</div>
</button>

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
          <h1>Statisque de la question 10</h1>
          <canvas id="graphThree" width="500" height="500"></canvas>
        </div>
      </div>
      <!-- chart 4 -->
      <div class="chart">
        <div class="title">
          <h1>Statisque des questions 11 à 15</h1>
          <canvas id="graphFour" width="500" height="500"></canvas>
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
background: rgb(34,30,66);
background: linear-gradient(195deg, rgba(34,30,66,1) 0%, rgba(77,30,247,1) 99%);
  /* background: rgb(112, 137, 192);
  background: linear-gradient(
    69deg,
    rgba(112, 137, 192, 1) 22%,
    rgba(198, 29, 110, 1) 100%
  ); */
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

/* loader de la page */
.loader {
    width: 100%;
    height: 100%;
    z-index: 10000;
  }
  
  .loader {
    width: 100%;
    height: 100%;
    background: rgb(34,30,66);
    background: linear-gradient(335deg, rgba(34,30,66,1) 25%, rgba(198,29,110,1) 90%);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
  }
  
.fade-enter-active, .fade-leave-active { /*ils définisssent la transition pour l'opacité sur 0.5 seconde.*/
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {  /*ils définissent l'opacité initiale et finale à 0 pour la transition..*/
  opacity: 0;
}

.glitch {
  position: relative;
  font-size: 50px;
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
  letter-spacing: 5px;
  z-index: 1;
  animation: shift 1s ease-in-out infinite alternate;
}

.glitch:before,
.glitch:after {
  display: block;
  content: attr(data-glitch);
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
}

.glitch:before {
  animation: glitch 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
  color: #C61D6E;
  z-index: -1;
}

.glitch:after {
  animation: glitch 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
  color: #7089C0;
  z-index: -2;
}

@keyframes glitch {
  0% {
    transform: translate(0);
  }

  20% {
    transform: translate(-3px, 3px);
  }

  40% {
    transform: translate(-3px, -3px);
  }

  60% {
    transform: translate(3px, 3px);
  }

  80% {
    transform: translate(3px, -3px);
  }

  to {
    transform: translate(0);
  }
}

@keyframes shift {
  0%, 40%, 44%, 58%, 61%, 65%, 69%, 73%, 100% {
    transform: skewX(0deg);
  }

  41% {
    transform: skewX(10deg);
  }

  42% {
    transform: skewX(-10deg);
  }

  59% {
    transform: skewX(40deg) skewY(10deg);
  }

  60% {
    transform: skewX(-40deg) skewY(-10deg);
  }

  63% {
    transform: skewX(10deg) skewY(-5deg);
  }

  70% {
    transform: skewX(-50deg) skewY(-20deg);
  }

  71% {
    transform: skewX(10deg) skewY(-10deg);
  }
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
  background: #000;
  padding: 12% 0;
}

.wrapper .sidebar img {
  display: block;
  margin: auto;
  cursor: pointer;
  margin-bottom: 35px;
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
  border: none;
  background-color: #000;
  text-align: center;
  font-size: 2rem;
  color: #fff;
  font-weight: 700;
  text-transform: capitalize;
}

.wrapper button{
  margin: auto;
  border: 0;
  margin-top: 35px;
  text-decoration: none;
  font-size: inherit;
}

.Btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: 0.4s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to right, #7089c0, #c61d6e);
}

.sign {
  width: 100%;
  transition-duration: 0.4s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: white;
}

.text {
  position: absolute;
  text-transform: uppercase;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: #ecf0f1;
  font-size: .88em;
  font-weight: 600;
  transition-duration: 0.4s;
}

.Btn:hover {
  width: 150px;
  border-radius: 20px;
  transition-duration: 0.4s;
  background: linear-gradient(to right, #7089c0, #c61d6e);
}

.Btn:hover .sign {
  width: 30%;
  transition-duration: 0.4s;
  padding-left: 12px;
}

.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: 0.4s;
  padding-right: 10px;
}

.Btn:active {
  transform: translate(2px, 2px);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
}


/* .logout{
  padding: 1.25em 1.5em;
  border: 2px solid #C61D6E!important;
  border-radius: 0.75em;
  font-weight: 700;
  text-transform: uppercase;
  transform-style: preserve-3d;
} */

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
  /* color: #221e42; */
  color: #7089c0;
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
