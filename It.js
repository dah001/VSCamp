const api = "http://localhost:5005";

Vue.createApp({
  data() {
    return {
      issues: []
    };
  },

  async mounted() {
    const r = await fetch(`${api}/api/issue`);
    const allIssues = await r.json();

    // 🔗 FILTRERING: KUN IT
    this.issues = allIssues.filter(
      i => Number(i.categoryId) === 1
    );

    console.log(this.issues); // debug
  }
}).mount("#app");
