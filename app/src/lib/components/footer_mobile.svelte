<script>
  import { Separator } from "$lib/components/ui/separator/index.js";
</script>
<div class="w-screen sm:hidden">
    <Separator />
    <div class="flex justify-between items-start mt-auto p-3 max-sm:block">
        <div><h2 class="font-bold">Symptom Explorer.</h2> <h3>© 2026 Leander Guo</h3></div>
        <div><span class="text-center">For educational and research purposes only. Not a substitute for 
        professional medical advice, diagnosis, or treatment. <br>If you are 
        experiencing symptoms, consult a licensed healthcare provider.</span></div>
        <div>
            <span class="ml-3">Data sourced from <a target="_blank" class="underline" href="https://www.kaggle.com/datasets/hagari/disease-and-their-symptoms/data">Kaggle</a></span>
            <br>
            <div class="flex">
                <a href="https://github.com/liandeguo/disease-symptom-tool" target="_blank" class="underline mx-3">GitHub</a>
                <Separator orientation="vertical" />
                <a href="https://liande.me" class="underline mx-3" target="_blank">liande.me</a>
                <Separator orientation="vertical" />
                <span class="mx-3">MIT License</span>
            </div>
        </div>
    </div>
</div>