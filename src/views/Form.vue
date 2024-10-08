<script>
export default {
  data() {
    return {
      loading: true, //ça indique que mon loader est visible au début 
      index: 0, //L'index de la question actuelle commence à zéro
      email: "",
      errorMessage: "", //message d'erreur
      question: [], //La liste de mes questions
      userResponses: [], //Tableau pour stocker toutes les réponses de l'utilisateur
      userResponse: "", //Variable pour stocker la réponse acuelle de l'utilisateur
      showPopUp: false, //initailiser à false
      uuid: "", // Propriété pour stocker l'UUID de l'utilisateur
      link: "", 
    };
  },

  computed: {
    //la fonction me permet de retourner chaque question en fonction de leur index
    actualQuestion() {
      //vérifier si l'index est valide entre 0 et la longueur des questions -1
      if (this.index >= 0 && this.index < this.question.length) {
        return this.question[this.index];
      } else {
        //si l'index est invalide
        return null;
      }
    },
    // Expression régulière pour valider une adresse e-mail
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },
  },

  methods: {
    //cette fonction me permet de changer l'état de loading après 3 secondes afin qu'il disparaisse
    hideLoaderWithDelay() { 
      setTimeout(() => {
        this.loading = false;
      }, 3000); // Le loader disparaîtra après 3 secondes
    },

    //La fonction me permet de retourner la liste des questions
    async listQuestions() {
      const res = await (
        await fetch(`${this.API_URL}/listes_questions`, {
          method: "get",
          headers: {
            "Content-Type": "application/json", //On précise le type du contenu
          },
        })
      ).json();

      if (res.status == 200) {
        this.question = res.data;
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
      // Vérifier si l'utilisateur a saisi un e-mail valide
      if (
        this.actualQuestion.type === "B" &&
        this.actualQuestion.id === 1 &&
        !this.isEmailValid
      ) {
        // Afficher un message d'erreur si l'e-mail n'est pas valide
        this.errorMessage = "Veuillez saisir une adresse e-mail valide.";
        return; // Arrêter l'exécution de la méthode si l'e-mail n'est pas valide
      }

      // Effacer le message d'erreur
      this.errorMessage = "";

      if (this.index === this.question.length - 1) {
        // Si l'utilisateur est sur la dernière question, enregistrez d'abord la réponse
        this.saveUserResponse();
        this.index++;
      } else if (this.index < this.question.length - 1) {
        // Si l'utilisateur est sur une autre question, enregistrez la réponse et passez à la suivante
        this.saveUserResponse();
        this.userResponse = "";
        this.index++;
      }
      
      // Si l'utilisateur est sur la dernière question, appelez finalize ici
      if (this.index === this.question.length) {
        this.finalize();
      }
    },

    //une méthode pour sauvegarder les réponses de l'utilisateur dans le tableau  userResponses
    saveUserResponse() {
      var actualQuestion = this.actualQuestion;
      var userAnswersData = {
        value: this.userResponse,
        question_id: actualQuestion.id,
      };
      if (actualQuestion.id == 1) {
        // ici j'essaye juste d'attribuer la valeur de mon user_email à mon value pour pas que le champs soit vide
        userAnswersData.user_email = this.email;
        userAnswersData.value = this.email;
      }

      // Vérifier si this.userResponses[this.index] est défini, sinon initialiser comme un tableau vide
      if (!Array.isArray(this.userResponses[this.index])) {
        this.userResponses[this.index] = [];
      }

      // Enregistrez les réponses de l'utilisateur dans userResponses
      this.userResponses[this.index].push(userAnswersData);
    },

    //la méthode est utilisée lorsque l'utilisateur clique sur le bouton finaliser
    async finalize() {
      try {
        const res = await (
          await fetch(`${this.API_URL}/response`, {
            method: "post",
            headers: {
              "Content-Type": "application/json", //On précise le type du contenu
            },
            body: JSON.stringify({ userResponses: this.userResponses }),
          })
        ).json();

        if (res.status == 200) {
          //afficher un popup dans le cas ou la sauvegarde réussie
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Sauvegarde réussie",
            showConfirmButton: false,
            timer: 1500
          });
        
          // Afficher le pop-up
          this.showPopUp = true;

          // Générer le lien avec l'UUID de l'utilisateur
          this.link = `${location.origin}/responses/${res.data.uuid}`;

          // Appel pour récupérer les réponses de l'utilisateur
          await this.showResponse();
        } else {
          // Afficher une erreur en cas d'échec de la sauvegarde
          alert("Erreur lors de la sauvegarde des réponses");
        }
      } catch (error) {
        console.error("Erreur lors de la requête API", error);
      }
    },

    //la fonction pour afficher la liste des réponses des utilisateurs
  async showResponse() {
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
        this.userResponses = res.data;
      } else {
        console.error("Erreur lors de la récupération des réponses utilisateur");
      }
    }
  } catch (error) {
    console.error('Erreur lors de la requête API', error);
  }
  },

  // Rediriger l'utilisateur vers la page des réponses grâce à son uuid 
   redirectToResponsePage() {
    if (this.uuid && this.uuid.uuid) {
    // Assurez-vous que this.uuid est défini et contient un UUID valide
    window.location.href = `/responses/${this.uuid.uuid}`;
  } else {
    console.error("UUID invalide ou non défini.");
  }
  },

  },

  async mounted() { // Mounted appelera les fonctions citées à chaque fois que la page se charge
    this.hideLoaderWithDelay();

    await this.listQuestions();

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
  <div class="container" v-if="actualQuestion">
    <div class="card" @submit.prevent="finalize">
      <div class="box">
        <div class="content">
          <h3>{{ actualQuestion.title }}</h3>
          <p class="question">{{ actualQuestion.question_value }}</p>

          <div v-if="actualQuestion.type === 'B'">
            <input
              v-if="actualQuestion.id === 1"
              type="email"
              v-model="email"
              required
              :class="{'is-invalid': email && !isEmailValid }"
            />
            <input v-else type="text" v-model="userResponse" />
          </div>
          <div v-if="actualQuestion.type === 'C'">
            <input type="number"  v-model="userResponse" />
          </div>

          <!-- Afficher un message d'erreur si l'e-mail saisi n'est pas valide -->
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <!-- Afficher les propositions de réponses lorsque la question est de type A -->
          <div class="type-a">
            <div v-if="actualQuestion.type === 'A'">
              <ul>
                <li
                  v-for="(proposition, index) in actualQuestion.proposition"
                  :key="index"
                >
                  <input
                    type="radio"
                    :value="proposition"
                    :name="'radio-group-' + actualQuestion.id"
                    v-model="userResponse"
                  />
                  {{ proposition }}
                </li>
              </ul>
            </div>
          </div>
          <div class="btn">
            <button v-if="index === 19" @click.prevent="nextQuestion" type="submit"> Finaliser</button>
            <!--Une fois que l'index de de la question arrive à 19 mon bouton suivant devient finaliser-->
            <button v-else @click="nextQuestion">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Notification pop-up pour afficher le message de succès -->
  <div class="success-notification" v-if="showPopUp">
    <h4>
      Toute l’équipe de Bigscreen vous remercie pour votre engagement. Grâce à
      votre investissement, nous vous préparons une application toujours plus
      facile à utiliser, seul ou en famille. Si vous désirez consulter vos
      réponses ultérieurement, vous pouvez consultez cette adresse:
      <a :href="this.link" @click="redirectToResponsePage">{{ this.link }}</a>
    </h4>
  </div>
</template>

<style>
/* importer police */
@import url("https://fonts.googleapis.com/css2?family=Ysabeau+Infant:wght@1;100;200;300;400;500;600;700;800;900;1000&display=swap");

@import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap");

* {
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

body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 100vh;
  background: rgb(34,30,66);
background: linear-gradient(195deg, rgba(34,30,66,1) 0%, rgba(77,30,247,1) 99%);
}

body .container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 40px 0;
}

body .container .card {
  position: relative;
  min-width: 520px;
  height: 440px;
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.3),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  margin: 10px;
  transition: 0.5s;
}

body .container .card .box {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  background: whitesmoke;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: 0.5s;
}

body .container .card .box .content {
  padding: 20px;
  text-align: center;
}

body .container .card .box .content h3 {
  font-size: 1.8rem;
  color: #3a3f87;
  z-index: 1;
  transition: 0.5s;
  margin-bottom: 15px;
}

body .container .card .box .content p {
  font-size: 1rem;
  font-weight: 200;
  color: #7089c0;
}

body .container .card .box .content input {
  padding: 8px 20px;
  border-radius: 5px;
  outline: none;
  color: #7089c0;
  margin-top: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border: none;
}

.type-a ul {
  width: fit-content;
  margin: auto;
  text-align: left !important;
}

.btn {
  margin-top: 3rem;
}

.btn button {
  display: inline-block;
  margin: 0 25px;
}

.content button {
  padding: 8px 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background: #221e42;
  font-size: 10px;
  font-weight: 600;
  color: #7089c0;
  box-shadow: 0 6px #3a3f87;
  outline: none;
}

.content button:active {
  box-shadow: 0 0 #3a3f87;
  top: 6px;
}

/* style du pop-up */
.success-notification {
  background-color: #7089c0;
  border: none;
  border-radius: 2px;
  color: whitesmoke;
  width: 500px;
  height: 183px;
  text-align: center;
  padding: 10px;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.8);
}

.success-notification.show {
  display: block;
  animation: fadeOut 3s;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

/* style pour l'erreur par rapport à l'email*/

.error-message {
  color: red;
  margin-top: 5px;
}

.success-notification h4{
  position: relative;
  top: 15%;
}

</style>
