<script lang="ts">
  import { Link, navigate } from "svelte-routing";
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Icon,
    Button
  } from 'sveltestrap';
  import { authStore } from "../stores/authStore";

  const handleLogout = () => {
    $authStore.token = null;
    $authStore.id = null;
    $authStore.boards = [];
    localStorage.removeItem("token");
    localStorage.removeItem("boards");
    navigate("/");
  };
</script>

<Navbar color="light" light class="mb-3">
  <Button on:click={()=>navigate("/")} class="me-auto rounded-circle"><Icon name='pinterest'/></Button>
  <Nav class="ms-auto">
  <div class="d-flex gap-2">
    {#if !!$authStore.token}
      <Button on:click={()=>navigate(`/users/${$authStore.id}/boards`)} class="me-auto rounded-circle"><Icon name='heart'/></Button>
      <Button on:click={()=>navigate("/users")} class="me-auto rounded-circle"><Icon name='people'/></Button>
      <Button on:click={handleLogout} class="me-auto rounded-circle"><Icon name='box-arrow-right'/></Button>
    {:else}
      <Button on:click={()=>navigate("/login")} class="me-auto">Login</Button>
      <Button on:click={()=>navigate("/register")} class="me-auto">Register</Button>
    {/if}
  </div>
  </Nav>
</Navbar>
