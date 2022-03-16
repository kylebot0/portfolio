<template>
  <header>
    <router-link class="logo" to="/" ><img src="../assets/kb-logo-white.svg" alt="logo"></router-link>

    <nav>
      <ul>
        <li><router-link to="/projects" class="hvr-underline-from-center" >Projects</router-link></li>
        <li><router-link to="/about" class="hvr-underline-from-center">About</router-link></li>
        <li><router-link to="/contact" class="hvr-underline-from-center">Contact</router-link></li>
      </ul>
    </nav>

    <div class="burger">
      <i class="fas fa-bars"></i>
    </div>

  </header>
</template>

<script>

export default {
  mounted(){
    const burger = document.querySelector('.burger i');
    const nav = document.querySelector('nav ul');

    function toggleNav() {
      burger.classList.toggle('fa-bars');
      burger.classList.toggle('fa-times');
      nav.classList.toggle('nav-active');
    }

    burger.addEventListener('click', function() {
    toggleNav();
    });

    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
  }
}
</script>

<style lang="scss" scoped>
@import ".././assets/scss/_variables.scss";

header {
  margin: auto;
max-width: 95%;
height: 10vh;
display: flex;
align-items: center;
justify-content: space-between;
}

.logo {
  animation-name: fade-in;
	animation-fill-mode: both;
	animation-duration: .9s;
  img {
    height: 75px;
    width: 75px;
    margin-top: 16px;
  }
}

ul {
display: flex;
justify-content: space-around;
}

nav a {
color: $txt-color;
text-decoration: none;
}

nav li {
  animation-name: fade-in;
	animation-fill-mode: both;
	animation-duration: .9s;
  padding: 0 20px;
  list-style: none;
  margin: 0;
  font-weight: 400;
  font-size: $header-fnt;
}

.burger {
font-size: 1.2em;
display: none;
}

.nav-active {
right: 0;
}

$animationDelay: 1;
@for $i from 1 through 5 {
	nav li:nth-of-type(#{$i}) {
		animation-delay: #{0.3+($i)/30}s;
  }
}

@keyframes fade-in {
  0% { 
    opacity: 0;
    transform: translate(0, -50px);
     }
  100% { 
    opacity: 1;
    transform: translate(0, 0);
     }
}

// Media query
@media screen and (max-width: 678px) {
  .burger {
  display: block;
  }
  .logo img{
    height: 40px;
    width: 40px;
    margin-top: 10px;
  }

  nav ul {
    z-index: 1;
    display: none;
  margin: 0;
  background: #343434;
  position: absolute;
  right: 0;
  top: 70px;
  width: 50%;
  height: calc(100% - 70px);
  flex-direction: column;
  justify-content: space-around;
  padding: 0;
  }
  .nav-active {
    display: flex;
  }
}

</style>
