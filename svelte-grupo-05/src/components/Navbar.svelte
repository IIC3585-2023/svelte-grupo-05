<script>
  import { Link } from "svelte-routing";
</script>

<nav>
  <Link to="/">Feed</Link>
  <Link to="/login">Login</Link>
  <Link to="/register">Register</Link>
  <Link to="/users">Users</Link>
  <Link to="/users/:userId/boards">Boards</Link>
  <Link to="/boards/:boardId">Board Images</Link>
</nav>