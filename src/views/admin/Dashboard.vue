<script></script>

<template>
    <!-- sidebar -->
    <div class="wrapper">
        <!-- le menu à gauche -->
       <div class="sidebar">
        <router-link to="/Dashboard">
            <img src="public/assets/images/logo_bigscreen.png" width="150">
        </router-link>
        
        <ul>
            <li><a href="#"><i class="fas fa-solid fa-house" style="color: #7089c0;"></i>Accueil</a></li>

            <li>
            <router-link to="/Survey">
                <a href="#"><i class="fas fa-solid fa-question" style="color: #7089c0"></i>Questionnaire</a>
            </router-link>
          </li>
            
          <li>
            <router-link to="">
                <a href="#"><i class="fas fa-solid fa-scroll" style="color: #7089c0"></i>Réponses</a>
            </router-link>
          </li>

        </ul>
       </div>
       <!-- corps du dashboard -->
    <div class="main-content">
        <div class="header">Bienvenue sur le Dashboard de l'admin <i class="fa-solid fa-door-open fa-beat-fade" style="color: #C61D6E;"></i></div>
    </div>
    </div>

    
</template>

<style>
/* importer police */
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap');

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
    font-family: 'Urbanist', sans-serif;
}

body{
    background: rgb(112,137,192);
    background: linear-gradient(69deg, rgba(112,137,192,1) 22%, rgba(198,29,110,1) 100%);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    min-height: 100vh;
}

.wrapper{
    display: flex;
    position: relative;
}

.wrapper .sidebar{
    position: fixed;
    width: 200px;
    height: 100%;
    background: #221E42;
    /* padding: 55px 0; */
    padding: 12% 0;
}

.wrapper .sidebar img{
    display: block;
    margin: auto;
    cursor: pointer;
}

.wrapper .sidebar ul li{
    padding: 15px;
    border-bottom: 1px solid rgb(112,137,192);
    border-top: 1px solid rgb(112,137,192);
}

.wrapper .sidebar ul li a{
    color: #fff;
    text-shadow: 0 0 10px #7089C0;
    font-size: 20px;
    display: block;
}

.wrapper .sidebar ul li a .fas{
    width: 30px;
}

.wrapper .sidebar ul li:hover{
    background: #C61D6E;
}

.wrapper .main-content{
    width: 100%;
    margin-left: 200px;
}

.wrapper .main-content .header{
    padding: 20px;
    border-bottom: 1px solid #7089C0;
    border-top: 1px solid #7089C0;
    background: rgba(245, 245, 245, 0.334);
    text-align: center;
    font-size: 2rem;
    color: #221E42;
    font-weight: 700;
    text-transform:capitalize;
}
</style>