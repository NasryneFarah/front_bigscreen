<script>
export default{
    data() {
    return {
        loading: true, //ça indique que mon loader est visible au début 
        email:"",
        password:"",
    }
}, 

methods: {
     //cette fonction me permet de changer l'état de loading après 3 secondes afin qu'il disparaisse
     hideLoaderWithDelay() { 
      setTimeout(() => {
        this.loading = false;
      }, 3000); // Le loader disparaîtra après 3 secondes
    },

    async submit(){
        const res = await(
            await fetch(`${this.API_URL}/login`, {
          method: "post",
          headers: {
            "Content-Type": "application/json", //On précise le type du contenu
          },
          body: JSON.stringify({
            //je renvoie  les données sous format json
            email: this.email,
            password: this.password,
          }),
        })
        ).json();

        if (res.status == 'Utilisateur connecté') {
            window.location.href = "/administration"; // Redirection vers la page "/dashboard" si la connexion est réussie
      } else {
        console.error(res.error);
      }
    },
    // Mounted appelera les fonctions citées à chaque fois que la page se charge
    async mounted() {
      this.hideLoaderWithDelay();
    },
}
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

   <div class="container" >
    <form action="#" @submit.prevent="submit()">
  <div class="brand-logo">
    <img src=" ../../public/assets/images/logo_bigscreen.png" width="30">
  </div>
  <div class="brand-title">Bigscreen</div>
  <div class="inputs">
    <label>Email</label>
    <input type="email" v-model="email" required placeholder="exemple@test.com" />
    <label>Password</label>
    <input type="password" v-model="password" required  placeholder="Minimum 6 caractères" />
    <button type="submit">Connexion</button>
  </div>
</form>
</div>

<!-- pop up -->

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ysabeau+Infant:wght@1;100;200;300;400;500;600;700;800;900;1000&display=swap');

@font-face {
    font-family: 'Lunar';
    src: url('public/assets/fonts/neuropolitical rg.otf');
}

input {
  caret-color: red;
}

body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  background: #ecf0f3;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  place-items: center;
  overflow: hidden;
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

.container {
  position: relative;
  width: 350px;
  height: 500px;
  border-radius: 20px;
  padding: 40px;
  box-sizing: border-box;
  background: #ecf0f3;
  box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
}

.brand-logo img{
    height: 100px;
    width: 100px;
    background-size: cover;
    background-position: center center;
    object-fit: contain;
    margin: auto;
    border-radius: 50%;
    box-sizing: border-box;
    box-shadow: 7px 7px 10px #cbced1, -7px -7px 10px white;
}

.brand-title {
  font-family: 'Lunar';
  margin-top: 10px;
  font-weight: 900;
  font-size: 1.8rem;
  color: #c61d6e;
  letter-spacing: 1px;
}

.inputs {
  text-align: left;
  margin-top: 30px;
  font-family: 'Ysabeau Infant', sans-serif;
  font-weight: 200;
}

label, input, button {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  outline: none;
  box-sizing: border-box;
}

label {
  margin-bottom: 4px;
}

label:nth-of-type(2) {
  margin-top: 12px;
}

input::placeholder {
  color: gray;
}

input {
  background: #ecf0f3;
  padding: 10px;
  padding-left: 20px;
  height: 50px;
  font-size: 14px;
  border-radius: 50px;
  box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
}

button {
  font-family: 'Ysabeau Infant', sans-serif;
  color: white;
  margin-top: 20px;
  background: #c61d6e;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 200;
  font-size: 18px;
  box-shadow: 6px 6px 6px #221e4279, -6px -6px 6px rgb(226, 225, 225);
  transition: 0.5s;
}

button:hover {
  box-shadow: none;
}

a {
  position: absolute;
  font-size: 8px;
  bottom: 4px;
  right: 4px;
  text-decoration: none;
  color: black;
  background: yellow;
  border-radius: 10px;
  padding: 2px;
}

h1 {
  position: absolute;
  top: 0;
  left: 0;
}

/* pop up */

</style>