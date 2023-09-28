<script>
export default {
  data() {
    return {
      index: 0, //L'index de la question actuelle commence à zéro
      question: [], //La liste de mes questions
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
  },

  async mounted() {
    // Mounted appelera les fonctions citées à chaque fois que la page se charge
    await this.listQuestions();
  },
 
};
</script>
<template>
  <div class="container" v-if="actualQuestion">
    <div class="card">
      <div class="box">
        <div class="content">
          <h3>{{ actualQuestion.title }}</h3>
          <p>{{ actualQuestion.body_question }}</p>
          <!-- Afficher l'input en fonction du type de question -->
          <div v-if=" actualQuestion.type === 'A' ">
            <!-- <li>
              <input type="radio"/>
            </li> -->
          </div>
          <div v-if="actualQuestion.type === 'B' ">
            <input type="text"/>
          </div>
          <div v-if="actualQuestion.type === 'C' ">
            <input type="number"/>
          </div>
          <!-- Afficher les propositions de réponses lorsque la question est de type A -->
          <div v-if="actualQuestion.type === 'A'">
            <ul>
              <li v-for="(proposition,index) in actualQuestion.proposition" :key="index">
                <input type="radio" :value="proposition" id="radio"  :name="'radio-group-' + actualQuestion.id" />
                {{ proposition }}
              </li>
            </ul>
          </div>
          <div class="btn">
            <button>Précédent</button>
            <button v-if="index === 19">Finaliser</button> <!--Une fois que l'index de de la question arrive à 19 mon bouton suivant devient finaliser-->
            <button v-else>Suivant</button>
          </div>
        </div>
      </div>
    </div>
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
  min-width: 320px;
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
</style>
