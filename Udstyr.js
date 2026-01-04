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

      // 🔧 Kun Udstyr
      this.issues = allIssues.filter(
        i => Number(i.categoryId) === 2
      );

      console.log("UDSTYR ISSUES:", this.issues);
    },

    async save(issue) {
      await axios.put(`${api}/api/issue/${issue.idissue}`, {
        status: issue.status,
        severity: issue.severity,
        categoryId: issue.categoryId
      });

      alert("Gemt i databasen");

      // reload så UI matcher DB
      this.load();
    }
  }
}).mount("#app");
