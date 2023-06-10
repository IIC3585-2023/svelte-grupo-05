<script lang="ts">
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import IconButton, { Icon } from '@smui/icon-button';

  let open = false;
  let clicked = 'Nothing yet.';
</script>

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Title id="simple-title">Dialog Title</Title>
  <Content id="simple-content">Super awesome dialog body text?</Content>
  <Actions>
    <Button on:click={() => (clicked = 'No')}>
      <Label>No</Label>
    </Button>
    <Button on:click={() => (clicked = 'Yes')}>
      <Label>Yes</Label>
    </Button>
  </Actions>
</Dialog>

<Button on:click={() => (open = true)}>
  <IconButton>
    <Icon class="material-icons text-center">push_pin</Icon>
  </IconButton>
</Button>