<script>

</script>

<template>
    <div class="container">
        <header>Formulaire de Bigscreen</header>
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
    width: 115%;
    height: 415px;
    border-radius: 6px;
    padding: 30px;
    margin: 0 15px;
    background-color: white;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    }

.container header{
    text-align: center;
    font-size: 35px;
    font-weight: 600;
    color: #3a3f87;
}

</style>