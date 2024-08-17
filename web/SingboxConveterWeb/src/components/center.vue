<script setup>
import pako from 'pako'
import { useToast } from "primevue/usetoast";
const link = ref('')
const isremote = ref(false)
const advancemod = ref(false)
const example = ref('')
const remoteurl = ref('')
const resultlink = ref('')
const apiurl = ref(window.location.hostname+':3000')
const toast = useToast();

const linktextarea_placeholder="输入订阅链接地址,多个订阅使用 | 间隔"
const localmodueltextarea_placeholder=`输入本地模板,只修改outbounds部分,配置格式如下,多个关键词使用|分割
{
          "type": "selector",
          "tag": "手动选择",
          "outbounds": [
              "direct-out",
              "block-out",
              "自动选择",
              "include:HKG|TWN|JPKEY",(相当于include:HKG|TWN|日本|JP|Japan|jp)
              "exclude:0.1X"
          ],
          "default": "自动选择"
      }`
const convert = () => {
    if(isremote.value){
        resultlink.value = 'http://'+apiurl.value+'/clash2singbox?urls='+link.value+'&moduleurl='+remoteurl.value

    }else{
        let modulecoded = zlibcode(example.value)
        resultlink.value = 'http://'+apiurl.value+'/clash2singbox?urls='+link.value+'&module='+modulecoded
    }
    // 剪切板内容设置为resultlink.value
    navigator.clipboard.writeText(resultlink.value).then(() => {
        toast.add({ severity: 'success', summary: '成功', detail: '已复制到剪贴板', life: 3000 });
    }).catch((error) => {
        toast.add({ severity: 'error', summary: '失败', detail: error, life: 3000 });
    });

}
const zlibcode=(input)=>{
    const compressedData = pako.deflate(input, { to: 'string' });

    const compressedArray = new Uint8Array(compressedData);

    const base64String = btoa(String.fromCharCode.apply(null, compressedArray));

    return base64String
}

const linkgroups = ref([{
    "link":"",
    "name":"",
}])

const addlinkgroup = ()=>{
    linkgroups.value.push({
        "link":"",
        "name":"",
    })
}
const removeLinkGroup = (index) => {
    linkgroups.value.splice(index, 1);
}



</script>

<template>
    <Toast />
    <div class="main mx-auto flex xl:justify-center items-center max-w-7xl  flex-col">
        <div class="inner mx-auto w-100%  max-w-5xl border-solid border-gray border-2 rounded-2xl p-5 min-h-108  flex flex-col justify-between items-center">
            <div class="m-b-5">
            <Textarea v-if="!advancemod" class="w-80vw sm:w-3xl h-28 break-all resize-none" rows="5" cols="30" v-model="link" :placeholder="linktextarea_placeholder"/>
            <div v-if="advancemod">
                <div  class="advanc_link_input linkgroup" v-for="(linkgroup,index) in linkgroups" :key="index">
                    <div class="linkgroupinput  border-b-black border-solid border-1 rounded-xl flex justify-between items-center p-2 gap-5 m-b-5">
                    <Textarea class="w-50vw sm:w-120 h-10 break-all resize-none" rows="5" cols="30" ></textarea>
                    <Textarea class="w-50vw sm:w-13vw h-10 break-all resize-none" rows="5" cols="30" ></textarea>
                    <Button class="h-10" label="X" severity="danger" @click="removeLinkGroup"></Button>
                    </div>
                </div>
                <div class="flex">
                    <Button class="items-center" label="添加链接" @click="addlinkgroup" />
                </div>
            </div>
            </div>
            <div class="flex items-center gap-5 sm:gap-12 ">
                <ToggleButton class="" v-model="advancemod" onLabel="高级模式" offLabel="简便模式" />
                <ToggleButton class="" v-model="isremote" onLabel="远程模板" offLabel="本地模板" />
                <InputText class="w-48 sm:w-64  h-10" id="apiurl" v-model="apiurl" placeholder="输入后端地址" />
            </div>
            <div>
            <InputText type="text" v-model="remoteurl" v-show="isremote" placeholder="远程模板地址" class="w-80vw sm:w-3xl h-15 m-t-5"/>
            <Textarea class="w-80vw sm:w-3xl h-64 max-h-160 m-xy resize-none"  v-model="example"  rows="5" cols="30" v-show="!isremote" :placeholder="localmodueltextarea_placeholder" />
            </div>
            <Button label="转换" class="w-80vw sm:w-3xl h-14" @click="convert" />
        </div>

        <div class="inner mx-auto w-100%  max-w-5xl border-solid border-gray border-2 rounded-2xl p-5  max-h-202 flex flex-col justify-between items-center m-t-5">
        <InputText  type="text" v-model="resultlink" placeholder="订阅链接" class="w-80vw sm:w-3xl h-15"/>
    </div>
    </div>

</template>

<style scoped>
.p-floatlabel:has(input:focus) label,
.p-floatlabel:has(input.p-filled) label,
.p-floatlabel:has(input:-webkit-autofill) label,
.p-floatlabel:has(textarea:focus) label,
.p-floatlabel:has(textarea.p-filled) label,
.p-floatlabel:has(.p-inputwrapper-focus) label,
.p-floatlabel:has(.p-inputwrapper-filled) label {
    top: -.5rem;
}
</style>