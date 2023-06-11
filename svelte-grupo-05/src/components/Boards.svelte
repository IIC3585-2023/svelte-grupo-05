<script>
 import { Card, CardBody, CardTitle, CardImg } from 'sveltestrap';
 import PocketBase from "pocketbase";
 import { navigate } from 'svelte-routing';
 import { onMount } from "svelte";
 import BoardsButton from './BoardsButton.svelte';
 const pb = new PocketBase(import.meta.env.VITE_PB_URL);
let boards = []
let userName = '';
export let userId;

const loadBoards = async () => {
  boards =  await pb
    .collection("firstpic")
    .getFullList({ filter: `user.id="${userId}"` });
};

const randomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

onMount(async () => {
  await loadBoards();

  userName = (
    await pb.collection("users").getFirstListItem(`id="${userId}"`)
  ).name;
});

</script>

<style>
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

  .card-size:hover .overlay {
    opacity: 1;
  }
    .card-size {
        display: inline-block;
        position: relative;
        width: 200px;
        height: 200px;
    }
    .img-size {
        height: 200px;
        object-fit: cover;

    }
</style>
<h1 class="text-center">Tableros de {userName}</h1>
<BoardsButton loadBoards={loadBoards}/>
<div class="d-flex gap-3 ms-2 flex-wrap justify-content-center">
    {#each boards as board}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="card-size" on:click={() => navigate(`/boards/${board.board_id}`)}>
            <Card style={`background-color: ${randomColor()}`}>
                <img src={board.image?.urls.regular} class="img-size rounded"/>
                <CardBody class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <CardTitle class="text-center bg-white rounded p-2 opacity-75 font-weight-bold">{board.name}</CardTitle>
                </CardBody>
            </Card>
        <div class="overlay rounded"></div>
    </div>
    {/each}
</div>
