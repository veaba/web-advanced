<!--目录-->
<template>
		<div class="catalog">
				<p>{{this.$page}}</p>
				
				<p>{{xx}}</p>
				
		</div>
</template>

<script>
	export default {
		name: "Catalog",
		props: {
			xx: {
				type: String
			},
		},
		data() {
			return {
				manual: [
					{
						title: "一组",
						children: [{
							title: 'xxx'
						}]
					},
					{
						title: "二组",
						children: [{
							title: 'xxx'
						}]
					}
				]
			};
		}
	};
</script>

<style scoped>
		.catalog {
				color: red;
		}
</style>
