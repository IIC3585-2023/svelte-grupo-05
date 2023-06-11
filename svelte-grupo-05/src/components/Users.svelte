<script>
import PocketBase from "pocketbase";
import { onMount } from "svelte";
import { Card, CardTitle, Button } from 'sveltestrap';
import { navigate } from 'svelte-routing';
const pb = new PocketBase(import.meta.env.VITE_PB_URL);

let users = [];
onMount(async () => {
  users = await pb.collection("users").getFullList({ sort: "-created" });
});
</script>

<div class="text-center">
    <h1>Usuarios</h1>
    <div class="d-flex gap-3 ms-2 flex-wrap justify-content-center">
        {#each users as user}
            <Card class="m-auto p-4 text-center">
                <CardTitle>{user.name}</CardTitle>
                <Button color="primary" on:click={() => navigate(`/users/${user.id}/boards`)}>Ver tableros</Button>
            </Card>
        {/each}
    </div>
    

</div>