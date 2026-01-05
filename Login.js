const apiUrl = "https://localhost:7099/api/auth/login";

Vue.createApp({
    data() {
        return {
            username: "",
            password: "",
            error: null,
            success: null
        };
    },

    computed: {
        isAdmin() {
            return this.username.trim().toLowerCase() === "admin@edu.zealand.dk";
        }
    },

    methods: {
        login() {
            this.error = null;
            this.success = null;

            if (!this.username.trim()) {
                this.error = "Username må ikke være tom";
                return;
            }

            const payload = {
                Username: this.username.trim(),
                Password: this.isAdmin ? this.password : null
            };

            axios.post(apiUrl, payload, { withCredentials: true })
                .then(res => {
                    const role = res.data.role;
                    this.success = `Logget ind som ${role}`;

                    setTimeout(() => {
                        window.location.href =
                            role === "admin" ? "issues.html" : "report.html";
                    }, 800);
                })
                .catch(err => {
                    this.error = err.response?.data || "Login fejlede";
                });
        }
    }
}).mount("#app");
