<template>

  <div class="jumbotron">
    <h1>Welcome to Vue Demo</h1>
    <p>
      <a
        role="button"
        class="btn btn-success btn-lg"
        v-link="{ path: '/msg' }">
        Go to Message Board
      </a>
    </p>
  </div>
  
</template>
