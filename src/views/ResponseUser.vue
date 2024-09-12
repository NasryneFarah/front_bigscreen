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
            loading: true, //ça indique que mon loader est visible au début 
            index: 0, //L'index de la question actuelle commence à zéro
            questions: [], // liste des questions
            responses: [],//listes des réponses
            currentDate: '', //la date du jour
            currentTime: '', //l'heure du jour 
            isEditing: false, //modifier les réponses
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
    //cette fonction me permet de changer l'état de loading après 3 secondes afin qu'il disparaisse
    hideLoaderWithDelay() { 
      setTimeout(() => {
        this.loading = false;
      }, 3000); // Le loader disparaîtra après 3 secondes
    },

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

  // Méthode pour sauvegarder les réponses
  async updateResponses() {
      try {
        const res = await fetch(`${this.API_URL}/answers/${this.uuid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userResponses: this.responses }),
        });

        const data = await res.json();
        if (data.status === 200) {
          swal.fire({
          position: "center",
          icon: "success",
          title: "Réponses mise à jour avec succès",
          showConfirmButton: false,
          timer: 1500
        });
        // Recharger la page après un délai
        setTimeout(() => {
                location.reload(); // Recharge la page
            }, 1500); // Délai de 1,5 seconde avant le rechargement

        } else {
          swal.fire({
          position: "center",
          icon: "error",
          title: "Erreur lors de la mise à jour des réponses.",
          showConfirmButton: false,
          timer: 1500
        });
        }
      } catch (error) {
        console.error('Erreur lors de la requête API', error);
      }
    },

    // Méthode pour activer le mode édition
    editResponses() {
      this.isEditing = true;
    },
  },

  async mounted() { // Mounted appelera les fonctions citées à chaque fois que la page se charge
    this.hideLoaderWithDelay();
    await this.getQuestions();
    await this.getResponses();
    //l'heure et la date du jour
    this.getCurrentDateTime();
  },
})
</script>

<template>
    <!-- loader de la page  -->
 <!-- transition est un composant vue qui me permet d'appliquer des effets à mes éléments -->
 <transition name="fade">
    <div class="loader" v-if="loading" >
   <div data-glitch="Bigscreen..." class="glitch">Bigscreen...</div>
</div>
 </transition>

    <div class="absolute">
        <div class="absolute inset-0 justify-center">
            <div class="bg-shape1 bg-teal opcaity-50 bg-blur"></div>
            <div class="bg-shape2 bg-primary opcaity-50 bg-blur"></div>
            <div class="bg-shape3 bg-purple opcaity-50 bg-blur"></div>
        </div>
    </div>

    <!-- texte de début sur la page -->
    <div class="welcome">
      <img src=" ../../public/assets/images/bigscreen.svg" width="350">
    </div>

    <div class="paragraphe">
        <p>Vous trouverez ci dessous les réponses que vous avez apportées à notre sondage le <span class="date">{{currentDate}}</span> &nbsp; à &nbsp; <span class="time">{{currentTime}}</span></p> 
    </div>
  

    <!-- les cards affichant les réponses -->
      <div class="card-container">
      <!-- j'utilise v-for pour parcourir toutes les questions et réponses. Cela me permet d'afficher chaque question et réponse dans une carte individuelle. -->
        <div class="card" v-for="(question, index) in questions" :key="index">
            <h3>{{ question.title }}</h3>
            <div class="card-content">
                <h4>{{ question.question_value }}</h4>
                <div v-if="isEditing" class="response">
                  <input v-model="responses[index].value" type="text" />
                </div>
                <div  v-els class="response">
                  {{ responses[index]?.value }}
                </div>
            </div>
            <div class="actions">
              <button v-if="isEditing" @click="updateResponses">Sauvegarder</button>
              <button v-else @click="editResponses">Modifier</button>
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

body{
    box-sizing: border-box;
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
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
  margin-top: 3%;
  margin-bottom: 1%;
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
    z-index: -10;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px; /* Espacement entre les cartes */
    margin-top: 20px; /* Espace au-dessus des cartes */
}

.card{
    width: 325px;
    height: 265px;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.3);
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

.response {
  font-size: 18px;
  font-weight: bold;
}

.response input {
    width: 100%; 
    padding: 10px; 
    border: 1px solid #ccc; 
    border-radius: 5px; 
    font-size: 16px; 
    transition: border-color 0.3s;
}

.response input:focus {
    border-color: #007bff; 
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); 
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