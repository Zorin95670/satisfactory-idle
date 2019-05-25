<template>
  <div class="app">
    <div class="header">
      <a href="https://www.satisfactorygame.com/" target="_blank">
        <img class="logo" src="./assets/logo.png" alt="logo"/>
      </a>
    </div>
    <div class="body">
      <div v-bind:class="{menu: true, open: this.menuVisibility, close: !this.menuVisibility}">
        <div class="first-item" @click="menuVisibility = !menuVisibility">
          <font-awesome-icon
            icon="chevron-left"
            class="menu-icon"
            v-if="menuVisibility"/>
          <font-awesome-icon
            icon="chevron-right"
            class="menu-icon"
            v-else/>
        </div>
        <div
          v-bind:class="{item: true, current: '/' === currentRoute}"
          @click="naviguate('/')">
          <font-awesome-icon
            icon="home"
            class="menu-icon"/>
          <h2>Home</h2>
        </div>
        <div
          v-bind:class="{item: true, current: 'inventory' === currentRoute}"
          @click="naviguate('inventory')">
          <font-awesome-icon
            icon="toolbox"
            class="menu-icon"/>
          <h2>Inventory</h2>
        </div>
        <div
          v-bind:class="{item: true, current: 'mine' === currentRoute}"
          @click="naviguate('mine')">
          <font-awesome-icon
            icon="mountain"
            class="menu-icon"/>
          <h2>Mine</h2>
        </div>
        <div
          v-bind:class="{item: true, current: 'craft' === currentRoute}"
          @click="naviguate('craft')">
          <font-awesome-icon
            icon="tools"
            class="menu-icon"/>
          <h2>Craft</h2>
        </div>
      </div>
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      menuVisibility: true,
      currentRoute: this.$router.currentRoute.path,
    };
  },
  methods: {
    naviguate(route) {
      if (route !== this.$router.currentRoute.path) {
        this.currentRoute = route;
        this.$router.push(route);
      }
    },
  },
};
</script>

<style lang="scss">
  html, body, .app, .app .body, .app .body .menu, .app .body .content {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  * {
    user-select: none;
  }

  body {
    background-color: #1c1c1c;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 0.1rem;
    text-align: center;
    color: white;
  }

  .app {
    display: flex;
    flex-direction: column;

    .header {
      padding: .6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;

      a {
        margin-right: 1rem;

        .logo {
          width: 12.5rem;
        }
      }
    }

    .body {
      display: flex;
      flex-direction: row;

      .menu {
        display: flex;
        flex-direction: column;
        width: 4.25rem;
        background-color: #666666;

        &.open {
          width: 15rem;
        }

        &.close h2 {
          display: none;
        }

        .first-item {
          font-size: 2rem;
        }

        .item {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 0.25rem;
          cursor: pointer;
          border-left: 0.5rem solid;
          border-color: #666666;

          .menu-icon {
            font-size: 2rem;
            width: 3rem;
          }

          &.current {
            border-color: #1c1c1c;
          }

          h2 {
            margin: 0 0 0 1rem;
            width: 100%;
            text-align: left;
          }
        }
      }
    }
  }
</style>
