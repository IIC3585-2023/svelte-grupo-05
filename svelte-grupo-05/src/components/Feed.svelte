<script>
  import { onMount } from "svelte";
  import Image from "./Image.svelte"

  let images = [];

  onMount(async () => {
    let response;
    try {
      response = await fetch(
        "https://api.unsplash.com/photos?per_page=20&client_id=yA6WWENZgBuiWAt9TOFlUXFHAN0iWOCMkzaRnlFq_XA",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    images = await response.json();
  });
</script>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-self: center;
    flex-wrap: wrap;
    overflow: auto;
    padding: 0;
  }
</style>

{#each images as image (image.id)}
  <Image imageUrl={image.urls.regular} />
{/each}


<div class="container">
  {#each images as image (image.id)}
    <Image imageUrl={image.urls.regular} />
  {/each}
</div>
