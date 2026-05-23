<script>
    import { Tooltip } from "bits-ui";
    let {title, information} = $props()
</script>

<Tooltip.Provider>
    <Tooltip.Root delayDuration={200}>
        <Tooltip.Trigger>
            <h2>{title}</h2>
        </Tooltip.Trigger>
        <Tooltip.Content
        sideOffset={8}
        class="animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--bits-tooltip-content-transform-origin)"
        >
        <div
            class="bg-(--color-concrete-100) border border-(--color-concrete-200) px-2 py-2 max-w-100"
        >
            <p>{information}</p>
        </div>
        </Tooltip.Content>
    </Tooltip.Root>
</Tooltip.Provider>