const api = "http://localhost:5005";

Vue.createApp({
  data() {
    return {
      issues: [],
      filterStatus: "alle" // ✅ TILFØJET
    };
  },

  async mounted() {
    await this.load();
  },

  // ✅ TILFØJET: STATUS-FILTRERING
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
      const allIssues = await r.json();

      // 🏢 KUN ADMINISTRATIVE (BEHOLDT UÆNDRET)
      this.issues = allIssues.filter(
        i => Number(i.categoryId) === 5
      );

      console.log("ADMINISTRATIVE ISSUES:", this.issues);
    },

    async save(issue) {
      await axios.put(`${api}/api/issue/${issue.idissue}`, {
        status: issue.status,
        severity: issue.severity,
        categoryId: issue.categoryId
      });

      alert("Gemt i databasen");
      this.load();
    }
  }
}).mount("#app");
