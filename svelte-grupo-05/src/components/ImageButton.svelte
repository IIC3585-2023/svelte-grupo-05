<script>
  import { onMount } from 'svelte';
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Icon
  } from 'sveltestrap';
  import PocketBase from "pocketbase";
  import { authStore } from '../stores/authStore';

  export let image;
  let open = false;
  let clicked = 'Nothing yet.';
  const toggle = () => (open = !open);
  const pb = new PocketBase(import.meta.env.VITE_PB_URL);
  const saveImage = async (boardId, image) => {
    const record = await pb.collection('boardspictures').create({
      board: boardId,
      image,
    });
    open = false;
  };
</script>

<Modal bind:isOpen={open}>
<ModalHeader {toggle}>Tableros</ModalHeader>
    <ModalBody>
        {#each $authStore.boards as board}
            <Button class="mb-2" id={board.id} color="primary" block on:click={()=> saveImage(board.id, image)}>{board.name}</Button>
        {/each}
    </ModalBody>
</Modal>
<div class="d-flex justify-content-center mt-2 ">
  <Button color="primary" class="rounded-circle" on:click={toggle}><Icon name='pin-fill'/></Button>
</div>
