<script>
  import ImageButton from "./ImageButton.svelte";
  let isHovered = true;
  const image_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkMi5l0t8ZnHZcrF3e3rymOI_c8qUgb9oSSHa0UaN0&s"
</script>

<div class="image-container">
  <img class="logo" src={image_url} alt="logo" />
  {#if isHovered}
    <div class="overlay">
      <div class="button-container">
        <ImageButton />
      </div>
    </div>
  {/if}
</div>

<style>
  .image-container {
    position: relative;
    display: inline-block;
  }

  .logo {
    width: 300px;
    height: auto;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .image-container:hover .overlay {
    opacity: 1;
  }

  .button-container {

    z-index: 2;
    
  }
</style>
