<script>
  import { Container, Row } from 'sveltestrap';
  import Item from './Item.svelte';

  export let items;
</script>

<Container>
	<Row cols={{ lg: 3, md: 2, sm: 1, xs: 1 }}>
		{#each items as item (item.id)}
      <Item { ...item }/>
		{/each}
	</Row>
</Container>
