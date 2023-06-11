<script>
    import { Button, Form, FormGroup, Label, Input, Container, Alert } from 'sveltestrap';
    import { navigate } from 'svelte-routing';
    import PocketBase from "pocketbase";
    import jwt_decode from "jwt-decode";
    import { authStore } from '../stores/authStore';
  
    let email = '';
    let name = '';
    let password = '';
    let confirmPassword = '';
    let alertText = '';
    const pb = new PocketBase(import.meta.env.VITE_PB_URL);
  
    const handleRegister = async (e) => {
        e.preventDefault();
        if (
            !email ||
            !name ||
            !password ||
            !confirmPassword
            ) {
            alertText = "Por favor complete todos los campos";
            return;
        }
        const emailRegex = /.+@.+\..+/;
        if (!emailRegex.test(email)) {
            alertText = "Por favor ingrese un email válido";
            return;
        }
        if (name.length < 3) {
            alertText = "El nombre debe tener al menos 3 caracteres";
            return;
        }
        if (password !== confirmPassword) {
            alertText = "Las contraseñas no coinciden";
            return;
        }
        if (password.length < 6) {
            alertText = "La contraseña debe tener al menos 6 caracteres";
            return;
        }
        try {
            // Register
            await pb.collection("users").create({
                email,
                name,
                password,
                passwordConfirm: confirmPassword,
            });

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
            console.log(token)
        } catch (error) {
            alertText = "Ha ocurrido un error al iniciar sesión";
        }
    }
  </script>
  
  <Container class="w-50">
    <h2>Crea una cuenta</h2>
    <Form>
        <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" id="email" bind:value={email} placeholder="Ingrese su email" />
        </FormGroup>

        <FormGroup>
            <Label for="name">Nombre</Label>
            <Input type="text" id="name" bind:value={name} placeholder="Ingrese su nombre" />
        </FormGroup>
    
        <FormGroup>
            <Label for="password">Contraseña</Label>
            <Input type="password" id="password" bind:value={password} placeholder="Ingrese su contraseña" />
        </FormGroup>

        <FormGroup>
            <Label for="passwordConfirmation">Confirmación de contraseña</Label>
            <Input type="password" id="passwordConfirmation" bind:value={confirmPassword} placeholder="Confirme su contraseña" />
        </FormGroup>

        {#if alertText}
            <Alert color="danger">{alertText}</Alert>
        {/if}
        <div class="text-center">
            <Button color="primary" on:click={handleRegister}>Iniciar sesión</Button>
        </div>
    </Form>
</Container>
