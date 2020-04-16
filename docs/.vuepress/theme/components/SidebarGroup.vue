<template>
		<section class="sidebar-group"
						:class="[{collapsable,'is-sub-group': depth !== 0},`depth-${depth}`]"
		>
				<router-link
								v-if="item.path"
								class="sidebar-heading clickable"
								:class="{open,'active': isActive($route, item.path)}"
								:to="item.path"
								@click.native="$emit('toggle')"
				>
						<span>{{ item.title }}</span>
						<span
										class="arrow"
										v-if="collapsable"
										:class="open ? 'down' : 'right'">
      </span>
				</router-link>
				
				<p
								v-else
								class="sidebar-heading"
								:class="{ open }"
								@click="$emit('toggle')">
						<!--TODO 判断是不是外链-->
						<router-link v-if="item.link" :to="($localePath+item.link).replace('//','/')" >{{ item.title }}</router-link>
						<span v-else>{{ item.title }}</span>
						<span class="icon-experiment" title="实验！" v-show="item.isExperiment"></span>
						<span
										class="arrow"
										v-if="collapsable&&item.children&&item.children.length"
										:class="open ? 'down' : 'right'">
      </span>
				</p>
				
				<DropdownTransition>
						<SidebarLinks
										class="sidebar-group-items"
										:items="item.children"
										v-if="open || !collapsable"
										:sidebarDepth="item.sidebarDepth"
										:depth="depth + 1"
						></SidebarLinks>
				</DropdownTransition>
		</section>
</template>

<script>
	import {isActive} from '../util';
	import DropdownTransition from '@theme/components/DropdownTransition.vue';
	
	export default {
		name: 'SidebarGroup',
		props: ['item', 'open', 'collapsable', 'depth'],
		components: {DropdownTransition},
		// ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
		beforeCreate() {
			this.$options.components.SidebarLinks = require('./SidebarLinks.vue').default;
		},
		methods: {isActive}
	};
</script>

<style lang="stylus">
		.sidebar-group
				.sidebar-group
						padding-left 0.5em
				
				&:not(.collapsable)
						.sidebar-heading:not(.clickable)
								cursor auto
								color inherit
				
				// refine styles of nested sidebar groups
				
				&.is-sub-group
						padding-left 0
						
						& > .sidebar-heading
								font-size 0.95em
								line-height 1.4
								font-weight normal
								padding-left 2rem
								&.open
										/*background #eaecef*/
										background-color rgba(27,31,35,0.05);

						& > .sidebar-group-items
								padding-left 1rem
								
								& > li > .sidebar-link
										font-size: 0.95em;
										border-left none
				
				&.depth-2
						& > .sidebar-heading
								border-left none
		
		.sidebar-heading
				color $textColor
				transition color .15s ease
				cursor pointer
				font-size 1.1em
				font-weight bold
				// text-transform uppercase
				padding 0.35rem 1.5rem 0.35rem 1.25rem
				width 100%
				box-sizing border-box
				margin 0
				border-left 0.25rem solid transparent
				
				&.open, &:hover
						color inherit
				
				.arrow
						position relative
						top -0.12em
						left 0.5em
				
				&.clickable
						&.active
								font-weight 600
								color $accentColor
								border-left-color $accentColor
						
						&:hover
								color $accentColor
		
		.sidebar-group-items
				transition height .1s ease-out
				font-size 0.95em
				overflow hidden
		
		/*icon-experiment,添加实验性icon*/
		.icon-experiment
				position relative;
				top -16px;
				width 10px;
				height 10px;
				border-radius 4px;
				border-left 10px solid transparent;
				border-right 10px solid transparent;
				border-bottom 15px solid #3eaf7c;
				&:before
						content "";
						position absolute
						left -5px
						top 21px
						background #3eaf7c;
						width 10px;
						height 3px;
				&:after
						content: "";
						position absolute;
						background: #3eaf7c;
						width 6px;
						height 6px;
						left -3px;
						top 21px;
</style>
