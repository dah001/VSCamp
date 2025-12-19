const api = "http://localhost:5005";

Vue.createApp({
  data() {
    return {
      roomId: new URLSearchParams(location.search).get("room"),
      title: "",
      description: "",
      email: "",
      imageUrl: "",
      successMessage: ""
    };
  },

  methods: {
    async uploadImage(e) {
      const file = e.target.files[0];
      if (!file) return;

      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", "campfeed");

      const r = await fetch(
        "https://api.cloudinary.com/v1_1/dzppdbkte/image/upload",
        { method: "POST", body: fd }
      );

      const json = await r.json();
      this.imageUrl = json.secure_url;
    },

    async submitReport() {
      if (!this.email.endsWith("@edu.zealand.dk")) {
        alert("Brug skolemail");
        return;
      }

      const payload = {
        email: this.email,
        title: this.title,
        description: this.description,
        roomId: Number(this.roomId),
        imageUrl: this.imageUrl
        // 🚫 INGEN categoryId
      };

      const res = await axios.post(`${api}/api/report`, payload);

      this.successMessage =
        "Sag oprettet! ID: " + res.data.issueId;

      this.title = "";
      this.description = "";
      this.email = "";
      this.imageUrl = "";
    }
  }
}).mount("#app");
