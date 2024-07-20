<script setup>
import pako from 'pako'
import { useToast } from "primevue/usetoast";
const link = ref('')
const isremote = ref(false)
const example = ref('')
const remoteurl = ref('')
const resultlink = ref('')
const apiurl = ref(window.location.hostname+':3000')
const toast = useToast();
const convert = () => {
    if(isremote.value){
        resultlink.value = 'http://'+apiurl.value+'/clash2singbox?url='+link.value+'&moduleurl='+remoteurl.value

    }else{
        let modulecoded = zlibcode(example.value)
        resultlink.value = 'http://'+apiurl.value+'/clash2singbox?url='+link.value+'&module='+modulecoded
    }
    // 剪切板内容设置为resultlink.value
    navigator.clipboard.writeText(resultlink.value).then(() => {
        toast.add({ severity: 'success', summary: '成功', detail: '已复制到剪贴板', life: 3000 });
    }).catch((error) => {

    });

}
const zlibcode=(input)=>{
    const compressedData = pako.deflate(input, { to: 'string' });

    const compressedArray = new Uint8Array(compressedData);

    const base64String = btoa(String.fromCharCode.apply(null, compressedArray));

    return base64String
}
</script>

<template>
    <Toast />
    <div class="main mx-auto flex sm:justify-center items-center max-w-7xl sm:h-3xl flex-col">
        <div class="inner mx-auto w-100%  max-w-5xl border-solid border-gray border-2 rounded-2xl p-5 min-h-108 max-h-202 flex flex-col justify-between items-center">
            <div class="m-b-5">
            <FloatLabel>
                <InputText class="w-80vw sm:w-3xl h-14" id="link" v-model="link" />
                <label for="link">输入订阅链接</label>
            </FloatLabel>
            </div>
            <div class="flex items-center gap-5 sm:gap-12 ">
                <ToggleButton class="" v-model="isremote" onLabel="远程模板" offLabel="本地模板" />
                <InputText class="w-48 sm:w-64  h-10" id="apiurl" v-model="apiurl" placeholder="输入后端地址" />

            </div>
            <div class="h-48 m-b-5">
            <InputText type="text" v-model="remoteurl" v-show="isremote" placeholder="远程模板地址" class="w-80vw sm:w-3xl h-15 m-t-5"/>
            <Textarea class="w-80vw sm:w-3xl h-48 max-h-160 m-xy"  v-model="example"  rows="5" cols="30" v-show="!isremote" placeholder="本地模板" />
            </div>
            <Button label="转换" class="w-80vw sm:w-3xl h-14" @click="convert" />
        </div>

        <div class="inner mx-auto w-100%  max-w-5xl border-solid border-gray border-2 rounded-2xl p-5  max-h-202 flex flex-col justify-between items-center m-t-5">
        <InputText  type="text" v-model="resultlink" placeholder="订阅链接" class="w-80vw sm:w-3xl h-15"/>
    </div>
    </div>

</template>

<style scoped>

</style>