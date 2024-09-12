<script>
export default {
  data() {
    return {
      loading: true, //ça indique que mon loader est visible au début 
      textVisible: false // Indique que le texte n'est pas encore visible
    };
  },
  methods: {
    //cette fonction me permet de changer l'état de loading après 3 secondes afin qu'il disparaisse
    hideLoaderWithDelay() { 
      setTimeout(() => {
        this.loading = false;
        this.showTextWithDelay();
      }, 3000); // Le loader disparaîtra après 3 secondes
    },
    showTextWithDelay() {
      setTimeout(() => {
        this.textVisible = true;
      }, 500); // Le texte apparaît 0.5 seconde après la disparition du loader
    }
  },
  mounted() {
    this.hideLoaderWithDelay();
  }
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

 <!-- la video en background -->
    <video autoplay loop muted id="bg_video">
        <source src="public/assets/videos/bigscreen.mp4" type="video/mp4">
    </video>

<!-- le logo du site -->
    <div class="logo">
        <!-- <img src="public/assets/images/logo_bigscreen.png" width="200"> -->
        <img src="public/assets/images/bigscreen.svg" width="200">
    </div>
<!-- le texte d'arriver sur le site -->
    <div class="text" v-if="textVisible">
        <h1 class="animate__animated animate__fadeInDown animate__delay-1s">
           Bienvenue à <br> Bigscreen
        </h1>
    </div>
    <!-- flèche directionnelle -->
    <div class="box">
        <a href="#main">
        <span></span>
        <span></span>
        <span></span>
        </a>
        
    </div>

    <!-- div pour accéder au sondage -->
   <main id="main">
    <section class="home">
        <div class="home-content">
            <!-- <h1>Bigscreen</h1> -->
            <img src="public/assets/images/bigscreen.svg" width="500">
            <p>Merci de répondre à toutes les questions et de valider le formulaire en cliquant sur le bouton finaliser</p>
            <router-link to="/form">
                <button class="btn">Participer au sondage</button>
            </router-link>   
        </div>
    </section>
   </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ysabeau+Infant:wght@1;100;200;300;400;500;600;700;800;900;1000&display=swap');

*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    text-decoration: none;
}
/* rajouter un effet lorsque je scroll avec mes flèches directionnelles */
html{
    scroll-behavior: smooth;
}

/*--importer mes polices*/
@font-face {
    font-family: 'Lunar';
    src: url('public/assets/fonts/neuropolitical rg.otf');
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

/*--video*/
#bg_video{
    height: 100vh;
    width: 100vw;
    object-fit: cover;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
}

.logo img{
    margin-left: 30px;
    margin-top:15px ;
}

.text{
    font-family: 'Lunar';
    text-align: center;
    font-size: 3.6rem;
    color: rgba(77,30,247,1);
    /* color: #787E81; */
    letter-spacing: 2px;
    text-shadow: 3px 5px 2px #787E81;
    position: absolute;
    margin: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

}
/* flèche directionnelle */
.box{
    cursor: pointer;
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%,-50%);
}

.box span{
    display: block;
    width: 30px;
    height: 30px;
    border-bottom: 2px solid #7089C0;
    border-right: 2px solid #7089C0;
    margin: -10px;
    transform: rotate(45deg);
    animation: animate 7s infinite;
}

/* animation des arrows */
.box span:nth-child(1){
    animation-delay: -0.2s;
    transform: rotate(45deg) translate(-20px,-20px);
}

.box span:nth-child(2){
    animation-delay: -0.4s;
}

.box span:nth-child(3){
    animation-delay: .2s;
}
@keyframes animate
{
    0%{
        opacity: 0;
        transform: rotate(45deg) translate(-20px,-20px);
    }

    50%{
        opacity: 1;
    }

    100%{
        opacity: 0;
        transform: rotate(45deg) translate(20px,20px);
    }
}

/* main */
main{
    position: absolute;
    top: 110%;
    width: 100%;
    height: 100vh;
    background: rgb(34,30,66);
    background: linear-gradient(195deg, rgba(34,30,66,1) 0%, rgba(77,30,247,1) 99%);
    /* background: rgb(34,30,66);
    background: linear-gradient(335deg, rgba(34,30,66,1) 25%, rgba(198,29,110,1) 90%); */
    background-size: 400% 400%;
    animation: animation 10s ease infinite;
}

    /*-----Animation------*/

    @keyframes animation{
    0%{
        background-position: 0 50%;
    }

    50%{
        background-position: 100% 50%;
    }

    100%{
        background-position: 0 50%;
    }
}

.home{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.home-content {
    max-width: 600px;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.home-content h1{
    font-family: 'Lunar';
    color: #7089C0;
    font-size: 78px;
    font-weight: 700;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.219);
}

.home-content p{
    font-family: 'Ysabeau Infant', sans-serif;
    font-weight: 100;
    font-size: 25px;
    text-align: center;
    color: #fff;
    text-shadow: 0 0 10px #7089C0;
    margin-top: 15px;
    margin-bottom: 30px;
}

.home-content .btn{
    font-family: 'Ysabeau Infant', sans-serif;
    display: block;
    font-size: 30px;
    font-weight: 400;
    /* color: #7089C0; */
    color: whitesmoke;
    padding: 25px 80px;
    /* background: #221E42; */
    background: linear-gradient(to right, #7089c0, #c61d6e);
    outline: none;
    border: none;
    cursor: pointer;
    border-radius: 20px;
    position: relative;
    box-shadow: 0 6px rgba(0, 0, 0, 0.2);
}

.btn:active {
    box-shadow: 0 0 #3A3F87;
    top: 6px;
}

/*responsivité*/

@media (min-width: 768px) {
    .loader {
        font-size: 30px;
    }
    
    .glitch {
        font-size: 35px;
    }

    .text {
        font-size: 2.5rem; 
    }

    .home-content h1 {
        font-size: 3rem; 
    }

    .home-content p {
        font-size: 1rem;
    }

    .home-content .btn {
        font-size: 1rem;
        padding: 10px 20px;
    }

    .box {
        top: 95%;
    }
}

@media (min-width: 600px) {
    /* Logo */
    .logo img {
        width: 200px;
    }

    /* Texte */
    .text {
        font-size: 3rem; /* Augmente la taille du texte pour écrans moyens */
    }

    /* Section principale */
    .home-content h1 {
        font-size: 48px; /* Ajuste la taille pour écrans moyens */
    }

    .home-content p {
        font-size: 20px; /* Augmente la taille du texte */
    }

    .home-content .btn {
        font-size: 25px;
        padding: 20px 60px; /* Réduit le padding */
    }
}

@media (min-width: 1024px) {
    /* Vidéo */
    #bg_video {
        height: 100vh;
    }

    /* Logo */
    .logo img {
        width: 250px;
        margin-left: 30px;
        margin-top: 15px;
    }

    /* Texte */
    .text {
        font-size: 3.6rem;
    }

    /* Flèche directionnelle */
    .box {
        top: 90%;
    }

    /* Section principale */
    .home-content h1 {
        font-size: 78px;
    }

    .home-content p {
        font-size: 25px;
    }

    .home-content .btn {
        font-size: 30px;
        padding: 25px 80px;
    }
}
</style>