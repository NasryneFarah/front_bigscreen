<script>
export default {
  data() {
    return {
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
      console.log(this.userResponses);

      // Si l'utilisateur est sur la dernière question, appelez finalize ici
      if (this.index === this.question.length) {
        this.finalize();
      }
    },

    //une méthode pour sauvegarder les réponses de l'utilisateur dans le tableau  userResponses
    saveUserResponse() {
      var actualQuestion = this.actualQuestion;
      var userAnswersData = {
        user_answers: this.userResponse,
        question_id: actualQuestion.id,
      };
      if (actualQuestion.id == 1) {
        // ici j'essaye juste attribuer la valeur de mon user_email à mon user_answers pour pas que le champs soit vide
        userAnswersData.user_email = this.email;
        userAnswersData.user_answers = this.email;
      }

      // Vérifier si this.userResponses[this.index] est défini, sinon initialiser comme un tableau vide
      if (!Array.isArray(this.userResponses[this.index])) {
        this.userResponses[this.index] = [];
      }

      // Enregistrez les réponses de l'utilisateur dans userResponses
      this.userResponses[this.index].push(userAnswersData);
    },

    // méthode pour revenir à la question précédente  userResponses
    previousQuestion() {
      if (this.index > 0) {
        //je vérifie si l'index actuel est supérieux à zéro si tel est le cas cela signifie qu'il y'a une question à afficher donc la méthode décrémente
        this.index--;
      }
    },

    //la méthode est utilisée lorsque l'utilisateur clique sur le bouton finaliser
    async finalize() {
      try {
        console.log(this.userResponses);
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
          //afficher un message dans le cas ou la sauvegarde réussie
          alert("Sauvegarde réussie");

          // Afficher le pop-up
          this.showPopUp = true;

          // récupérer l'uuid de l'utilisateur
          this.uuid = res.uuid;
          
          // Appel pour récupérer les réponses de l'utilisateur
          await this.showResponse();

          // Générer le lien avec l'UUID de l'utilisateur
          this.link = `http://www.mesreponses.com/responses/${this.uuid}`;

          // const link = `http://www.mesreponses.com/responses/${uuid}`;
          // console.log(link);
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
      //   const res = await (
      //     await fetch(`${this.API_URL}/responses/${this.uuid}`, {
      //       method: "get",
      //       headers: {
      //         "Content-Type": "application/json", //On précise le type du contenu
      //       },
      //     })
      //   ).json();

      //   if (res.status == 200) {
      //     this.userResponses = res.data
      //   } else {
      //     console.error("Erreur lors de la récupération des réponses utilisateur");
      //   }
      // } catch (error) {
      //   console.error('Erreur lors de la requête API', error);
      // }
  },
  },

  async mounted() {
    // Mounted appelera les fonctions citées à chaque fois que la page se charge
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
  <div class="container" v-if="actualQuestion">
    <div class="card" @submit.prevent="finalize">
      <div class="box">
        <div class="content">
          <h3>{{ actualQuestion.title }}</h3>
          <p>{{ actualQuestion.body_question }}</p>

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
          <div class="typeA">
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
            <!-- bouton pour revenir à la question précédente -->
            <button @click="previousQuestion">Précédent</button>
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
      <a :href="link">{{ link }}</a>
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

body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 100vh;
  background: rgb(34, 30, 66);
  background: linear-gradient(
    52deg,
    rgba(34, 30, 66, 1) 10%,
    rgba(52, 55, 119, 1) 56%,
    rgba(175, 37, 153, 1) 90%
  );
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
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
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

/* body .container .card .box .content .typeA{

} */

.content .btn {
  display: flex;
  position: relative;
  top: 35px;
  justify-content: space-evenly;
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
  width: 300px;
  height: 200px;
  text-align: center;
  padding: 10px;
  /* position: fixed;
  margin: auto; */
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.8);
  /* top: 45%; */
  /* left: 68%; */
  /* transform: translate(-50%, -50%); */
  /* z-index: 1000; */
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
</style>
