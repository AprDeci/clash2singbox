import {vmess,vless,trojan} from './vmess.js'
import ss from './ss.js'
import sstls from './sstls.js'
import { multiplex } from './multiplex.js'

export default function convetor(proxies){
    var result = []
    
    proxies.forEach(proxie => {
        if (proxie.type === 'vmess'){
            result.push(vmess(proxie))
        }
        if (proxie.type === 'ss'){
            if ('plugin-opts' in proxie && proxie['plugin-opts'].mode == 'tls'){
                result.push(sstls(proxie))
            }else{
                result.push(ss(proxie))
            }
        }
        if (proxie.type==='vless'){
            result.push(vless(proxie))
        }
        if (proxie.type==='trojan'){
            console.log('1111')
            result.push(trojan(proxie))
        }
    })
    return result
}


