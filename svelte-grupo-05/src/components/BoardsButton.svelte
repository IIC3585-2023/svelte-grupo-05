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
    
    export let loadBoards;
  
    let open = false;
    let name;
    const toggle = () => (open = !open);
    const pb = new PocketBase(import.meta.env.VITE_PB_URL);
    const createBoard = async () => {
      const record = await pb.collection('boards').create({
        name,
        user: $authStore.id
      });
      open = false;
      $authStore.boards.push({id: record.id, name: record.name});
      loadBoards();
    };
  </script>
  
  <Modal bind:isOpen={open}>
  <ModalHeader {toggle}>Crear tablero</ModalHeader>
        <ModalBody>
          <input type="text" class="form-control mb-2" placeholder="Nombre del tablero" bind:value={name} />
          <Button color="primary" block on:click={createBoard}>Crear</Button>
        </ModalBody>
  </Modal>
  <div class="d-flex justify-content-center m-2 ">
    <Button color="primary" on:click={toggle}><Icon name='plus-circle-fill'/></Button>
  </div>
  