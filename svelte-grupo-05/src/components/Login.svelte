<script>
    import { Button, Form, FormGroup, Label, Input, Container, Alert } from 'sveltestrap';
    import { navigate } from 'svelte-routing';
    import PocketBase from "pocketbase";
    import jwt_decode from "jwt-decode";
    import { authStore } from '../stores/authStore';
  
    let email = '';
    let password = '';
    let alertText = '';
    const pb = new PocketBase(import.meta.env.VITE_PB_URL);
  
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Login
            const { token } = await pb
                .collection("users")
                .authWithPassword(email, password);
            $authStore.token = token;
            const { id: _id } = jwt_decode(token);
            $authStore.id = _id;
            localStorage.setItem("token", token);

            // Get boards
            const response = await pb
                .collection("boards")
                .getFullList({ filter: `user.id="${_id}"`, sort: "-created" });
            $authStore.boards = response.map((board) => ({
                id: board.id,
                name: board.name,
                }));
            localStorage.setItem("boards", JSON.stringify($authStore.boards));
            navigate("/");
        } catch (error) {
            alertText = "Ha ocurrido un error al iniciar sesión";
        }
    }
  </script>
  
  <Container class="w-50">
    <h2>Ingresa a tu cuenta</h2>
    <Form>
        <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" id="email" bind:value={email} placeholder="Ingrese su email" />
        </FormGroup>
    
        <FormGroup>
            <Label for="password">Contraseña</Label>
            <Input type="password" id="password" bind:value={password} placeholder="Ingrese su contraseña" />
        </FormGroup>

        {#if alertText}
            <Alert color="danger">{alertText}</Alert>
        {/if}
        <div class="text-center">
            <Button color="primary" on:click={handleLogin}>Iniciar sesión</Button>
        </div>
    </Form>
</Container>
