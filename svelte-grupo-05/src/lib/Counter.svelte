<script>
  import  Button, {Label} from '@smui/button'
  let count = 0
</script>

<Button on:click={() => count++} color="primary" variant="raised">
  Count is {count}
</Button>
