<script>
  import ImageButton from "./ImageButton.svelte";
  import { authStore } from "../stores/authStore";

  let isHovered = true;
  export let imageUrl;
  export let image;
  let isLogged = !!$authStore.token;

</script>

<div class="image-container">
  <img class="img" src={imageUrl} alt="logo" />
  {#if isHovered && isLogged}
    <div class="overlay">
      <div class="button-container">
        <ImageButton image={image} />
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

  .img {
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
