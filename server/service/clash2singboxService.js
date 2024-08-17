
import axios from 'axios'
import YAML from 'yaml'
import zlib from 'zlib'
import {union} from 'es-toolkit';
import {concat} from 'es-toolkit/compat';
import convetor from '../util/convetor.js';

const HKKEY = ['香港', 'HK', 'Hong Kong', 'hk']
const TWKEY = ['台湾', 'TW', 'Taiwan', 'tw']
const JPKEY = ['日本', 'JP', 'Japan', 'jp']
const USKEY = ['美国', 'US', 'America', 'us']
const SGKEY = ['新加坡', 'SG', 'Singapore', 'sg']



export default class clash2singboxService {

    async getyaml(clashyamlurl, options = {}) {
        var {
            module,
            moduleurl
        } = options
        const urls = this.clashurltoarray(clashyamlurl)
        const datas = await this.downloadclash(urls)
        if (module) {
            // 将module的空格替换为+
            module = module.replace(/\s/g, '+')
            const decompressed = zlib.inflateSync(Buffer.from(module, 'base64')).toString('utf8');
            const result = this.parsemodule(datas, decompressed)
            return result
        }
        if (moduleurl) {
            const module = await this.downloadmodule(moduleurl)
            const result = this.parsemodule(datas, module)
            return result
        }


    }

    clashurltoarray(clashurls) {
        const urls = clashurls.split('|')
        return urls
    }

    async downloadclash(urls) {
        const responses = await Promise.all(urls.map(async url => {
            var config = {
                method: 'get',
                headers: {
                    'User-Agent': 'clash-meta',
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
        }));
    
        return responses.filter(response => response !== undefined);
    }
    async downloadmodule(url) {
        var config = {
            method: 'get',
            headers: {
                'User-Agent': 'clash-meta',
                'Accept': '*/*',
                'Connection': 'keep-alive'
            }
        };

        try {
            const response = await axios(url, config);
            return JSON.stringify(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    // 转换为singbox节点
    processProxies(clashconfigs) {
        const result = []
        clashconfigs.forEach((clashconfig) => {
            const yamlcontent = YAML.parse(clashconfig)
            const proxies = yamlcontent.proxies
            result.push(convetor(proxies))
        })
        return result
    }


    parsemodule(clashconfigs, moduel) {
        let names = []
        // 定义一个函数getProxyNames，接收一个参数proxies
        const getProxyNames = (proxies) => {
            // 使用reduce函数，将proxies中的每一个元素proxy的name属性添加到acc数组中，并返回acc数组
            return proxies
                .reduce((names, proxy) => {
                    names.push(proxy.name);
                    return names;
                }, []);
        };

        for (const clashconfig of clashconfigs) {
            const yamlcontent = YAML.parse(clashconfig)
            const proxies = yamlcontent.proxies
            const pre_proxies = getProxyNames(proxies)
            names = concat(names, pre_proxies)
        }

        console.log(names)

        // 调用getProxyNames函数，传入proxies参数，并将返回的names数组赋值给names变量
        // const names = getProxyNames(proxies);
        var example = JSON.parse(moduel)

        // 对策略组添加需要添加的节点tag
        example.outbounds.forEach((outbound) => {
            if (outbound.outbounds) {
                var finalnames = []
                // 解析include
                if (outbound.outbounds.some(item => item.startsWith('include'))) {
                    let includes = outbound.outbounds.filter(item => item.startsWith('include'))
                    let include = includes[0].split(':')[1].split('|')
                    include = addKey(include) //添加关键词                                  
                    finalnames = names.filter(name => include.some(keyword => name.includes(keyword)))
                }
                if (outbound.outbounds.some(item => item.startsWith('exclude'))) {
                    let excludes = outbound.outbounds.filter(item => item.startsWith('exclude'))
                    var exclude = excludes[0].split(':')[1].split('|')
                    exclude = addKey(exclude) //添加关键词
                    finalnames = finalnames.filter(name => exclude.every(keyword => !name.includes(keyword)))

                }
                outbound.outbounds = outbound.outbounds.filter(item => !item.startsWith('include') && !item.startsWith('exclude'))
                outbound.outbounds = outbound.outbounds.concat(finalnames)
            }
        })

        //添加outbounds节点信息
        example.outbounds = example.outbounds.concat(this.processProxies(clashconfigs))
        return example


    }


}

const addKey = (array) => {
    if (array.includes('HKKEY')) {
        array = union(array, HKKEY)
    }
    if (array.includes('TWKEY')) {
        array = union(array, TWKEY)
    }
    if (array.includes('SGKEY')) {
        array = union(array, SGKEY)
    }
    if (array.includes('JPKEY')) {
        array = union(array, JPKEY)
    }
    if (array.includes('USKEY')) {
        array = union(array, USKEY)
    }
    return array

}

