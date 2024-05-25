<script>
export default{
    data() {
    return {
        email:"",
        password:"",
    }
}, 

methods: {
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
    }
}
}
</script>

<template>
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
    /* background: url("../assets/images/logo_bigscreen.png"); */
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