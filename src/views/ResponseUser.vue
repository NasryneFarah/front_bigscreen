<script>
import { defineComponent } from 'vue' // j'importe depuis le package de vue defineComponent qui est une fonction fournie par vue pour définir des composants de manière typée

export default defineComponent({ //ici j'exporte par défaut un objet qui représente un composant Vue.Cet objet est défini en utilisant la fonction defineComponent.

    props: {
      uuid: String
    },
    setup(props) {
      props.uuid
    },
    data(){
        return{
            index: 0, //L'index de la question actuelle commence à zéro
            questions: [], // liste des questions
            responses: [],//listes des réponses
            currentDate: '', //la date du jour
            currentTime: '', //l'heure du jour 
        }
    },

    computed: {
    //la fonction me permet de retourner chaque question en fonction de leur index
    currentParticipantData() {
      //vérifier si l'index est valide entre 0 et la longueur des questions -1
      if (this.index >= 0 && this.index < this.questions.length) {
        console.log(this.index)
        return {
         question:this.questions[this.index],
         response:this.responses[this.index]
        };
      } else {
        //si l'index est invalide
        return null;
      }
    },
  },

  methods: {
    //afficher l'heure te la date du jour 
    getCurrentDateTime() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Les mois commencent à 0
    const year = now.getFullYear();

    // Formater la date en "jour/mois/année"
    this.currentDate = `${day}/${month}/${year}`;

    // Obtenir l'heure locale
    const hours = now.getHours();
    const minutes = now.getMinutes();
    // Formater l'heure
    this.currentTime = `${hours}:${minutes}`;
    },

    //La fonction me permet de retourner la liste des questions
    async getQuestions() {
      const res = await (
        await fetch(`${this.API_URL}/listes_questions`, {
          method: "get",
          headers: {
            "Content-Type": "application/json", //On précise le type du contenu
          },
        })
      ).json();

      if (res.status == 200) {
        this.questions = res.data;
      }
    },

    // / un évènement pour pouvoir passer aux questions suivantes ou revenir grâce au touche du clavier
    handleKeyPress(event) {
  if (event.key === "ArrowRight") {
    // Aller à la question suivante lorsque la touche droite est enfoncée
    this.nextQuestion();
  } else if (event.key === "ArrowLeft") {
    // Aller à la question précédente lorsque la touche gauche est enfoncée
    this.previousQuestion();
  }
},
    // méthode pour passer à la question suivante
    nextQuestion() {
    if (this.index < this.questions.length - 1) {
            this.index++;
        }
    },

    // méthode pour revenir à la question précédente  
    previousQuestion() {
      if (this.index > 0) {
        //je vérifie si l'index actuel est supérieux à zéro si tel est le cas cela signifie qu'il y'a une question à afficher donc la méthode décrémente
        this.index--;
      }
    },

    //la fonction me permet d'afficher les réponses en fonction de l'uuid de l'utilisateur
  async getResponses() {
    try {
      if (this.uuid) {
      const res = await (
        await fetch(`${this.API_URL}/responses/${this.uuid}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();

      if (res.status == 200) {
        this.responses = res.data; 
      } else {
        console.error("Erreur lors de la récupération des réponses utilisateur");
      }
    }
  } catch (error) {
    console.error('Erreur lors de la requête API', error);
  }
  },
  },

  async mounted() {
    // Mounted appelera les fonctions citées à chaque fois que la page se charge
    await this.getQuestions();
    await this.getResponses();

    // Écouter les événements de touche lorsqu'un composant est monté
    window.addEventListener("keydown", this.handleKeyPress);

    // Écouter les événements de touche pour la touche Entrée
    window.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        // Enregistrer la réponse de l'utilisateur avant de finaliser
        this.saveUserResponse();
        this.finalize();
      }
    });

    //l'heure et la date du jour
    this.getCurrentDateTime();
  },
})
</script>

<template>
    <div class="absolute">
        <div class="absolute inset-0 justify-center">
            <div class="bg-shape1 bg-teal opcaity-50 bg-blur"></div>
            <div class="bg-shape2 bg-primary opcaity-50 bg-blur"></div>
            <div class="bg-shape3 bg-purple opcaity-50 bg-blur"></div>
        </div>
    </div>

    <!-- texte de début sur la page -->
    <div class="welcome">
        <span class="fast-flicker">big</span>scr<span class="flicker">e</span>en
    </div>

    <div class="paragraphe">
        <p>Vous trouverez ci dessous les réponses que vous avez apportées à notre sondage le <span class="date">{{currentDate}}</span> &nbsp; à &nbsp; <span class="time">{{currentTime}}</span></p> 
    </div>
  

    <!-- les cards affichant les réponses -->
    <div class="card-container">
        <div class="card" v-if="currentParticipantData">
            <h3>{{ currentParticipantData.question.title }}</h3>
            <div class="card-content">
                <h4>{{ currentParticipantData.question.question_value }}</h4>
                <div class="response">{{currentParticipantData.response.value}}</div>
            </div>
            <div class="btn">
                <button @click="previousQuestion">Précédent</button>
                <button @click="nextQuestion">Suivant</button>
            </div>
        </div>
    </div>
</template>

<style>
/* importer police */
@import url("https://fonts.googleapis.com/css2?family=Ysabeau+Infant:wght@1;100;200;300;400;500;600;700;800;900;1000&display=swap");

@import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap");

*{
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  font-family: "Urbanist", sans-serif;
}

body{
    box-sizing: border-box;
    /* display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap; */
    min-height: 100vh;
    background-color: #141114;
  background-image: linear-gradient(335deg, black 23px, transparent 23px),
    linear-gradient(155deg, black 23px, transparent 23px),
    linear-gradient(335deg, black 23px, transparent 23px),
    linear-gradient(155deg, black 23px, transparent 23px);
  background-size: 58px 58px;
  background-position: 0px 2px, 4px 35px, 29px 31px, 34px 6px;
}

.welcome{
    position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  width: 50%;
  height: 50%;
  background-image: radial-gradient(
    ellipse 50% 35% at 50% 50%,
    #6b1839,
    transparent
  );
  transform: translate(-50%, -50%);
  letter-spacing: 2;
  left: 50%;
  margin-bottom: -2%;
  font-family: "Ysabeau";
  text-transform: uppercase;
  font-size: 6em;
  color: #ffe6ff;
  text-shadow: 0 0 0.6rem #ffe6ff, 0 0 1.5rem #ff65bd,
    -0.2rem 0.1rem 1rem #ff65bd, 0.2rem 0.1rem 1rem #ff65bd,
    0 -0.5rem 2rem #ff2483, 0 0.5rem 3rem #ff2483;
  animation: shine 2s forwards, flicker 3s infinite;
}

@keyframes blink {
  0%,
  22%,
  36%,
  75% {
    color: #ffe6ff;
    text-shadow: 0 0 0.6rem #ffe6ff, 0 0 1.5rem #ff65bd,
      -0.2rem 0.1rem 1rem #ff65bd, 0.2rem 0.1rem 1rem #ff65bd,
      0 -0.5rem 2rem #ff2483, 0 0.5rem 3rem #ff2483;
  }
  28%,
  33% {
    color: #ff65bd;
    text-shadow: none;
  }
  82%,
  97% {
    color: #ff2483;
    text-shadow: none;
  }
}

.flicker {
  animation: shine 2s forwards, blink 3s 2s infinite;
}

.fast-flicker {
  animation: shine 2s forwards, blink 10s 1s infinite;
}

@keyframes shine {
  0% {
    color: #6b1839;
    text-shadow: none;
  }
  100% {
    color: #ffe6ff;
    text-shadow: 0 0 0.6rem #ffe6ff, 0 0 1.5rem #ff65bd,
      -0.2rem 0.1rem 1rem #ff65bd, 0.2rem 0.1rem 1rem #ff65bd,
      0 -0.5rem 2rem #ff2483, 0 0.5rem 3rem #ff2483;
  }
}

@keyframes flicker {
  from {
    opacity: 1;
  }

  4% {
    opacity: 0.9;
  }

  6% {
    opacity: 0.85;
  }

  8% {
    opacity: 0.95;
  }

  10% {
    opacity: 0.9;
  }

  11% {
    opacity: 0.922;
  }

  12% {
    opacity: 0.9;
  }

  14% {
    opacity: 0.95;
  }

  16% {
    opacity: 0.98;
  }

  17% {
    opacity: 0.9;
  }

  19% {
    opacity: 0.93;
  }

  20% {
    opacity: 0.99;
  }

  24% {
    opacity: 1;
  }

  26% {
    opacity: 0.94;
  }

  28% {
    opacity: 0.98;
  }

  37% {
    opacity: 0.93;
  }

  38% {
    opacity: 0.5;
  }

  39% {
    opacity: 0.96;
  }

  42% {
    opacity: 1;
  }

  44% {
    opacity: 0.97;
  }

  46% {
    opacity: 0.94;
  }

  56% {
    opacity: 0.9;
  }

  58% {
    opacity: 0.9;
  }

  60% {
    opacity: 0.99;
  }

  68% {
    opacity: 1;
  }

  70% {
    opacity: 0.9;
  }

  72% {
    opacity: 0.95;
  }

  93% {
    opacity: 0.93;
  }

  95% {
    opacity: 0.95;
  }

  97% {
    opacity: 0.93;
  }

  to {
    opacity: 1;
  }
}

.paragraphe p{
    color: white;
    font-size: 20px;
    text-align: center;
}

.date{
    color: #af2599;
    font-weight: bold;
}

.time{
    color: #af2599;
    font-weight: bold;
}

/* background */
.absolute{
    position: absolute;
    top: 50px !important;
    inset: 0;
    display: inline-flex;
    flex-direction: row;
}

.justify-center{
    justify-content: center;
}

.bg-shape1{
    width: 400px;
    height: 400px;
    border-radius: 9999px;
    position: relative;
    animation: one 10s infinite;
}

.bg-shape2{
    width: 300px;
    height: 300px;
    border-radius: 9999px;
    position: relative;
    animation: two 10s infinite;
}

@keyframes one {
    0%{ left: 0px; top: 0px;}
    25%{ left: -100px; top: 70px;}
    50%{ left: 20px; top: 150px;}
    75%{ left: 50px; top: 100px;}
    100%{ left: 0px; top: 0px;}
}

@keyframes two {
    0%{ left: 0px; top: 0px;}
    25%{ left: 50px; top: 10px;}
    50%{ left: 100px; top: 50px;}
    75%{ left: 50px; top: 100px;}
    100%{ left: 0px; top: 0px;}
}

.opcaity-50{
    opacity: .8;
}

.bg-blur{
    filter: blur(90px);
}

.bg-primary{
    background-color:  rgba(34, 30, 66, 1);  
}

.bg-teal{
    background-color:rgba(175, 37, 153, 1);
}

.bg-purple{
    background-color: rgba(52, 55, 119, 1);
}

/* card des réponses  */
.card-container{
    position: absolute; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%); 
}

.card{
    width: 325px;
    height: 295px;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.3);
    /* margin: 20px; */
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
}

.card h3{
    font-family:"Ysabeau";
    color: #af2599;
    font-size: 35px;
}

.card-content{
    padding: 16px;
}

.card-content h4{
    color: #221e42;
    font-size: 18px;
    margin-bottom: 15px;
}

.card-content .response{
    padding: 11px 15px;
    border-style: dotted;
    border-radius: 2px solid rgba(34, 30, 66, 1);
}

.card button{
    cursor: pointer;
    text-decoration: none;
    padding: 10px;
    font-family: arial;
    font-size: 1em;
    color: #af2599;
    border: none;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 2px 4px 3px #BDBDBB;
    margin-right: 8px;
    animation: .15s ease;
}

.card button:hover {
    animation: .10 ease;
    padding: 10px;
    color: #ffffff;
    background-color: #af259835;
    border: 0px solid #af2599;
}

</style>