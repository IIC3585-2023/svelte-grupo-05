<script>
  import { Router, Link, Route } from "svelte-routing";
  import Navbar from "../components/Navbar.svelte";
  import Feed from "../components/Feed.svelte";
  import Login from "../components/Login.svelte";
  import Register from "../components/Register.svelte";
  import Users from "../components/Users.svelte";
  import Boards from "../components/Boards.svelte";
  import BoardImages from "../components/BoardImages.svelte";

  export let url = "/";
</script>

<Router {url}>
  <Navbar />
  <div>
    <Route path="/" component={Feed} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/users" component={Users} />
    <Route path="/users/:userId/boards" component={Boards} />
    <Route path="/boards/:boardId" component={BoardImages} />
  </div>
</Router>
