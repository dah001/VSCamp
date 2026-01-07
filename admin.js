const api = "http://localhost:5005";

Vue.createApp({
  data() {
    return {
      issues: [],
      filterStatus: "alle" // ✅ TILFØJET
    };
  },

  mounted() {
    this.load();
  },

  // ✅ TILFØJET (FILTRERING)
  computed: {
    filteredIssues() {
      if (this.filterStatus === "alle") {
        return this.issues;
      }

      return this.issues.filter(i => i.status === this.filterStatus);
    }
  },

  methods: {
    async load() {
      const r = await fetch(`${api}/api/issue`);
      this.issues = await r.json();
    },

    async save(issue) {
      await axios.put(`${api}/api/issue/${issue.idissue}`, {
        status: issue.status,
        severity: issue.severity,
        categoryId: issue.categoryId
      });

      alert("Gemt i databasen");
      await this.load();
    }
  }
}).mount("#app");
