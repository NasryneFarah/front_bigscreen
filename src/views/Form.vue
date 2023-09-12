<script>

</script>

<template>
    <div class="container">
        <header>Formulaire de Bigscreen</header>

        <form action="#">
            <div class="form first">
                <div class="first details">
                    <span class="title">Détails personnels</span>

                    <div class="fields">
                        <div class="input-field">
                            <label>Votre adresse email ?</label>
                            <input type="email" required>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<style>
/* importer police */
@import url("https://fonts.googleapis.com/css2?family=Ysabeau+Infant:wght@1;100;200;300;400;500;600;700;800;900;1000&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Ysabeau Infant", sans-serif;
}

body{
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(34,30,66);
    background: linear-gradient(52deg, rgba(34,30,66,1) 10%, rgba(52,55,119,1) 56%, rgba(175,37,153,1) 90%);
}

.container{
    position: relative;
    max-width: 900px;
    width: 100%;
}
</style>