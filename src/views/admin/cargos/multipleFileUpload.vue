<template>
  <form action="/action_page.php">
  <label for="files">Select files:</label>
  <input type="file" id="files" name="files" multiple><br><br>
  <input type="submit">
</form>
</template>

<script>
export default {
  data() {
    return {
      files: [],
    };
  },
  methods: {
    handleSubmit() {
      let data = new FormData();
      data.append("files[]", this.files);
    },
    onChangeFiles(event) {
      let file = event.target.files;

      for (let i = 0; i < file.length; i++) {
        this.files.push(file[i]);
      }
    },
  },
};
</script>
