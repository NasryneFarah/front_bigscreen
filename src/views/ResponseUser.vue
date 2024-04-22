<script>
export default{
    data(){

    },
}
</script>

<template>
    <div class="absolute">
        <div class="absolute inset-0 justify-center">
            <div class="bg-shape1 bg-teal opcaity-50 bg-blur"></div>
            <div class="bg-shape2 bg-primary opcaity-50 bg-blur"></div>
            <div class="bg-shape3 bg-purple opcaity-50 bg-blur"></div>
        </div>
    </div>
    
    <!-- les cards affichant les réponses -->
    <div class="card-container">
        <div class="card">
            Question 1/20
            <div class="card-content">
                <h3>Votre adresse email ?</h3>
                <div class="response">farahyedidah&gmail.com</div>
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

body{
    justify-content: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    min-height: 100vh;
}

/* background */
.absolute{
    position: absolute;
    top: 50px !important;
    inset: 0;
    display: inline-flex;
    flex-direction: row;
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
    opacity: .7;
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

</style>