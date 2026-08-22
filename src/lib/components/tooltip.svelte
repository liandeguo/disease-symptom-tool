<script>
	import { Tooltip } from 'bits-ui';
	let { title, information } = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root delayDuration={200}>
		<!-- Trigger is a <button>; nesting it inside the heading keeps the HTML valid
			and makes the tooltip reachable by keyboard. -->
		<h2>
			<Tooltip.Trigger class="cursor-help underline decoration-dotted underline-offset-4">
				{title}
			</Tooltip.Trigger>
		</h2>
		<Tooltip.Content
			sideOffset={8}
			class="origin-(--bits-tooltip-content-transform-origin) animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
		>
			<div
				class="max-w-100 border border-(--color-concrete-200) bg-(--color-concrete-100) px-2 py-2"
			>
				<p>{information}</p>
			</div>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
