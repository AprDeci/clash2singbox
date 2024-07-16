
import {
    vmess
} from '../util/vmess.js'
import axios from 'axios'
import fs from 'fs'
import YAML from 'yaml'
import zlib from 'zlib'



let url = 'https://fm-sub-mainpanel-vygijfogpm.cn-shanghai.fcapp.run/api/v1/client/subscribe?token=dfaf6c382c75d5f1295ec484a1864ea0'
let bajie = 'https://bajie.xyz/api/v1/client/subscribe?token=550f49c71449c40a79d9ade3d0fec769'
export default class clash2singboxService {
    
    async getyaml(clashyamlurl,options={}) {
        var {module,moduleurl} = options
        console.log(module,moduleurl)
        const data = await this.downloadclash(clashyamlurl)
        if (module) {
            // 将module的空格替换为+
            module = module.replace(/\s/g, '+')
            const decompressed = zlib.inflateSync(Buffer.from(module, 'base64')).toString('utf8');
            const result = this.parsemodule(data,decompressed)
            return result
        }
        if (moduleurl) {
            const module = await this.downloadmodule(moduleurl)
            const result = this.parsemodule(data,module)
            return result
        }

    }
    
    async downloadclash(url) {
         var config = {
                method: 'get',
                headers: { 
                   'User-Agent': 'clash', 
                   'Accept': '*/*', 
                   'Connection': 'keep-alive'
                }
             };
             
             try {
                const response = await axios(url, config);
                return response.data;
            } catch (error) {
                console.log(error);
            }

        }
    async downloadmodule(url) {
        var config = {
            method: 'get',
            headers: { 
               'User-Agent': 'clash', 
               'Accept': '*/*', 
               'Connection': 'keep-alive'
            }
         };
         
         try {
            const response = await axios(url, config);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    
    
    
        parsemodule(clashconfig,moduel){
                    const yamlcontent = YAML.parse(clashconfig)
                    // const proxies = yamlcontent.get('proxies').toJSON()
                    const proxies = yamlcontent.proxies
    
                    // 定义一个函数getProxyNames，接收一个参数proxies
                    const getProxyNames = (proxies) => {
                        // 使用reduce函数，将proxies中的每一个元素proxy的name属性添加到acc数组中，并返回acc数组
                        return proxies
                            .reduce((names, proxy) => {
                                names.push(proxy.name);
                                return names;
                            }, []);
                    };
    
                    // 调用getProxyNames函数，传入proxies参数，并将返回的names数组赋值给names变量
                    const names = getProxyNames(proxies);
    
                    //读取模板文件
                    //var example = JSON.parse(fs.readFileSync('util/example.json', 'utf8'), )

                    var example = JSON.parse(moduel)
                    // 对策略组添加需要添加的节点tag
                    example.outbounds.forEach((outbound) => {
                        if (outbound.outbounds) {
                            var finalnames = []
                            if (outbound.outbounds.some(item => item.startsWith('include'))) {
                                let includes = outbound.outbounds.filter(item => item.startsWith('include'))
                                let include = includes[0].split(':')[1].split('|')
                                finalnames = names.filter(name => include.some(keyword => name.includes(keyword)))
                            }
                            if (outbound.outbounds.some(item => item.startsWith('exclude'))) {
                                let excludes = outbound.outbounds.filter(item => item.startsWith('exclude'))
                                var exclude = excludes[0].split(':')[1].split('|')
                                finalnames = finalnames.filter(name => exclude.some(keyword => !name.includes(keyword)))
                            }
                            outbound.outbounds = outbound.outbounds.filter(item => !item.startsWith('include') && !item.startsWith('exclude'))
                            outbound.outbounds = outbound.outbounds.concat(finalnames)
                        }
                    })
        
                    function processProxies(proxies) {
                        let result = []
                        proxies.forEach((proxy) => {
                            if (proxy.type === 'vmess') {
                                result.push(vmess(proxy))
                            }
                        })
                        return result
                    }
                    example.outbounds = example.outbounds.concat(processProxies(proxies))
                    //fs.writeFileSync('server/util/result.json', JSON.stringify(example, null, 4), 'utf8')
                    return example
    }

    abc(){
        console.log('abc')
    }
}


