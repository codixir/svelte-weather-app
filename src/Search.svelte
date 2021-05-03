<script>
  import { Input, Button, InputGroup, InputGroupAddon} from 'sveltestrap';
  import { createEventDispatcher } from 'svelte';

  export let city = 'london';
  let timer;

  const dispatch = createEventDispatcher();

  const handleSubmit = () => {
    dispatch('message', {
      city: city,
    });
  };

  const debounce = param => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      city = param;

      dispatch('message', {
        city: city,
      });
    }, 400);
  };

</script>

<form on:submit|preventDefault={handleSubmit}>
  <InputGroup> 
      <Input 
        type="text"
        placeholder="Enter city"
        on:keyup={( { target: { value }}) =>  debounce(value)}
      />
      <InputGroupAddon addonType="append">
        <Button type="submit">Submit</Button>
      </InputGroupAddon>
  </InputGroup>
</form>