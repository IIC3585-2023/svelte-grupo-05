<script>
  import { Link } from "svelte-routing";
  import TopAppBar, {
    Row,
    Section,
    Title,
    AutoAdjust,
  } from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  let topAppBar;
</script>

<TopAppBar class="nav" bind:this={topAppBar} variant="standard">
  <Row>
  <IconButton class="material-icons" aria-label="Download" href="/login"
        >file_download</IconButton>
  <Link to="/">Feed</Link>
  <Link to="/login">Login</Link>
  <Link to="/register">Register</Link>
  <Link to="/users">Users</Link>
  <Link to="/users/:userId/boards">Boards</Link>
  <Link to="/boards/:boardId">Board Images</Link>
  </Row>
</TopAppBar>

<!-- <nav> -->
<!--   <Link to="/">Feed</Link> -->
<!--   <Link to="/login">Login</Link> -->
<!--   <Link to="/register">Register</Link> -->
<!--   <Link to="/users">Users</Link> -->
<!--   <Link to="/users/:userId/boards">Boards</Link> -->
<!--   <Link to="/boards/:boardId">Board Images</Link> -->
<!-- </nav> -->

<style>
.nav {
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
