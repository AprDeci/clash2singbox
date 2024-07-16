<script setup>
import request from '../request/request';
import pako from 'pako'
import Buffer from 'buffer'
const link = ref('')
const isremote = ref(false)
const example = ref('')
const remoteurl = ref('')
const resultlink = ref('')
const convert = () => {
    if(isremote.value){
    //     request.get('clash2singbox', {
    //     params: {
    //         link: link.value,
    //         moduleurl:remoteurl.value
    //     }
    // }).then(res => {
    //     resultlink.value = request.defaults.baseURL+instance.defaults.url
    // })
        resultlink.value = request.defaults.baseURL+'/clash2singbox??url='+link.value+'&moduleurl='+remoteurl.value

    }else{
         let modulecoded = zlibcode(example.value)
         modulecoded = modulecoded.replaceAll('+','*plus*')
    //     request.get('clash2singbox', {
    //     params: {
    //         link: link.value,
    //         module: modulecoded
    //     }
    // }).then(res => {
    //     resultlink.value = request.defaults.baseURL+instance.defaults.url
    // })
        
        resultlink.value = request.defaults.baseURL+'/clash2singbox??url='+link.value+'&module='+modulecoded
    }

}
const zlibcode=(input)=>{
    const compressedData = pako.deflate(input, { to: 'string' });

    const compressedArray = new Uint8Array(compressedData);

    const base64String = btoa(String.fromCharCode.apply(null, compressedArray));

    return base64String
}
</script>

<template>
    <div class="main mx-auto flex justify-center items-center max-w-7xl h-3xl flex-col">
        <div class="inner mx-auto w-5xl border-solid border-gray border-2 rounded-2xl p-5 min-h-108 max-h-202 flex flex-col justify-between items-center">
            <div>
            <FloatLabel>
                <InputText class="w-3xl h-14" id="link" v-model="link" />
                <label for="link">输入订阅链接</label>
            </FloatLabel>
            </div>
            <div>
                <ToggleButton v-model="isremote" onLabel="远程模板" offLabel="本地模板" />
            </div>
            <div class="h-48">
            <InputText type="text" v-model="remoteurl" v-show="isremote" placeholder="远程模板地址" class="w-3xl h-15"/>
            <Textarea class="w-3xl h-48 max-h-160"  v-model="example"  rows="5" cols="30" v-show="!isremote" placeholder="本地模板" />
            </div>
            <Button label="转换" class="w-3xl h-14" @click="convert" />
        </div>

        <div class="result-inner mx-auto w-5xl border-solid border-gray border-2 rounded-2xl p-5 min-h-20 flex flex-col justify-between items-center m-t-10">
        <InputText type="text" v-model="resultlink" placeholder="订阅链接" class="w-3xl h-15"/>
    </div>
    </div>

</template>

<style scoped>

</style>