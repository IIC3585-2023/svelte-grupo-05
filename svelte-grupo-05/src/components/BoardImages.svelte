<script>
    import { onMount } from "svelte";
    import Image from "./Image.svelte";
    import PocketBase from "pocketbase";
    const pb = new PocketBase(import.meta.env.VITE_PB_URL);

    let images = [];
    let boardName = '';
    export let boardId;

    onMount(async () => {
        boardName  = (
            await pb.collection("boards").getFirstListItem(`id="${boardId}"`)
        ).name;
        const data = await pb
            .collection("boardspictures")
            .getFullList({ filter: `board="${boardId}"`, sort: "-created" });
        images = data.map((record) => record.image);
    });
</script>

<h1 class="text-center">{boardName}</h1>
<div class="container">
    {#each images as image (image.id)}
        <Image imageUrl={image.urls.regular} image={image} />
    {/each}
</div>

<style>
    .container {
        display: flex;
        align-self: center;
        justify-content: space-between;
        flex-wrap: wrap;
        overflow: auto;
        padding: 0;
    }
</style>
