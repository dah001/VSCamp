const api = "http://localhost:5005";

Vue.createApp({
  data() {
    return {
      issues: []
    };
  },

  async mounted() {
    await this.load();
  },

  methods: {
    async load() {
      const r = await fetch(`${api}/api/issue`);
      const allIssues = await r.json();

      // 🧹 KUN RENGØRING
      this.issues = allIssues.filter(
        i => Number(i.categoryId) === 3
      );

      console.log("RENGØRING ISSUES:", this.issues);
    },

    async save(issue) {
      await axios.put(`${api}/api/issue/${issue.idissue}`, {
        status: issue.status,
        severity: issue.severity,
        categoryId: issue.categoryId
      });

      alert("Gemt i databasen");

      this.load(); // reload så UI matcher DB
    }
  }
}).mount("#app");
