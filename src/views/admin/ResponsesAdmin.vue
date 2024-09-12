<script setup>
import { ref } from 'vue';
import Paginator from 'primevue/paginator';
import UserSurvey from '../../components/UserSurvey.vue';
const first = ref(0);
</script>

<script>
export default {
    data() {
        return {
          loading: true, //ça indique que mon loader est visible au début 
          answersByUuid: {},
        }
    },

    computed: {
      async getQuestions(){
            var url = `${this.API_URL}/listes_questions`;
            const res = await(
                await fetch(url,{
                   method: "get",
                   headers: {
                    "Content-Type": "application/json", //je précise le type du contenu
                   } 
                })
            ).json();

            // je fais une condition
            if (res.status == 200) {
                this.questions = res.data;
            }
        }
    },
   
    methods: {
      //cette fonction me permet de changer l'état de loading après 3 secondes afin qu'il disparaisse
     hideLoaderWithDelay() { 
      setTimeout(() => {
        this.loading = false;
      }, 3000); // Le loader disparaîtra après 3 secondes
    },

      async getAnswersByUuid(){
            var url = `${this.API_URL}/listes_responses`;
            const res = await(
                await fetch(url,{
                   method: "get",
                   headers: {
                    "Content-Type": "application/json", //je précise le type du contenu
                   } 
                })
            ).json();

            // je fais une condition
            if (res.status === 200) {
                this.answersByUuid = res.data.reduce((acc, item) => {
                    const { id, question_value, value, uuid_id } = item;
                    if (!acc[uuid_id]) {
                        acc[uuid_id] = [];
                    }
                    acc[uuid_id].push({ id, question_value, value });
                    return acc;
                }, {});
            }
        },
    },  
     
    mounted() {
      this.hideLoaderWithDelay();
      this.getAnswersByUuid();
    },   
}
</script>

<template>
  <!-- loader de la page  -->
 <!-- transition est un composant vue qui me permet d'appliquer des effets à mes éléments -->
 <transition name="fade">
    <div class="loader" v-if="loading" >
   <div data-glitch="Bigscreen..." class="glitch">Bigscreen...</div>
</div>
 </transition>

    <div>
        <!-- sidebar -->
    <div class="wrapper">
      <!-- le menu à gauche -->
      <div class="sidebar">

        <router-link to="/administration">
            <img src=" ../../public/assets/images/bigscreen.svg" width="150">
        </router-link>
       
        <ul>
          <li>
            <router-link to="/administration">
                <a href="#"><i class="fas fa-solid fa-house" style="color: #7089c0"></i>Accueil</a>
            </router-link>
          </li>

          <li>
            <router-link to="/administration/questions">
                <a href="#"><i class="fas fa-solid fa-question" style="color: #7089c0"></i>Questionnaire</a>
            </router-link>
          </li>

          <li>
            <router-link to="/administration/responses">
                <a href="#"><i class="fas fa-solid fa-scroll" style="color: #7089c0"></i>Réponses</a>
            </router-link>
          </li>

        </ul>
      </div>
      <!-- corps du dashboard -->
      <div class="main-content">
        <div class="header">Affichage de toutes les réponses de l'utilisateur
        </div>
         <!-- mon composant UserSurvey contenant les tableaux des différentes réponses -->
      <UserSurvey :answerByUuid="answersByUuid[first + 1]"/>
    
      <!-- pagination -->
      <div class=" pagination">
      <Paginator v-model:first="first" :rows="1" :totalRecords="Object.values(answersByUuid).length"/>
    </div>
      </div>
    </div>
    </div>
</template>
<style>
/* importer police */
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  font-family: 'Urbanist', sans-serif;
}

body {
  background: rgb(34,30,66);
  background: linear-gradient(195deg, rgba(34,30,66,1) 0%, rgba(77,30,247,1) 99%);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  min-height: 100vh;
}/* loader de la page */
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
    text-shadow: 0 0 10px #7089C0;
    font-size: 18px;
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
  background-color: #000;
  text-align: center;
  font-size: 2rem;
  color: #fff;
  font-weight: 700;
}

/* tableau */
.tableau{
    border-collapse: collapse;
    max-width: 95%;
    border: 1px solid rgba(245, 245, 245, 0.469);
    width: auto;
    box-shadow: 0 5px 50px rgba(0, 0, 0, 0.15);
    margin: 20px auto;
    cursor: pointer;
}

thead tr{
    background-color: #343777;
    color: #7089c0;
    text-align: center;
    font-size: 20px;
}

th, td{
    padding: 15px 20px;
}

td{
    color: #fff;
    text-shadow: 0 3px 15px #7089C0;
    font-size: 15px;
}

tbody tr, td, th{
    border: 1px solid #343777;
}

tbody tr:nth-child(even){
    background-color: rgba(245, 245, 245, 0.469)!important;
}

tbody tr:last-of-type{
   border-bottom: 2px solid #343777;
}

.chart {
  margin-bottom: 20px;
}

.pagination {
  cursor: pointer;
  display: flex; 
  justify-content: center;
  margin: 20px;
}

.pagination button {  
  margin-right: 15px;
  border-radius: 50%; 
  margin-right: 10px;
  width: 40px;
  height: 40px; 
  background-color: #7089c0;
  color: white;
  cursor: pointer;
  transition:  0.3s ease;
}

/* Pour éviter un espace après le dernier élément */
.pagination button:last-child,
.pagination span:last-child {
  margin-right: 10px;
}

</style>