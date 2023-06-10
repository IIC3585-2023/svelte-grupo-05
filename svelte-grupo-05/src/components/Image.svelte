<script>
  import ImageButton from "./ImageButton.svelte";
  let isHovered = true;
  export let imageUrl;

</script>

<div class="image-container">
  <img class="logo" src={imageUrl} alt="logo" />
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
    display: inline-block;
    position: relative;
    height: 15em;
    margin: 0.5em;
  }

  .logo {
    height: 100%;
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
