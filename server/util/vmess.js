
let c = {
    name: 'Next Reset: 7 Day(s)',
    type: 'vmess',
    server: '104.219.52.93',
    port: 34052,
    uuid: 'cefcd89f-1e65-405e-b558-fdd4a737a3b4',
    alterId: 0,
    cipher: 'auto',
    udp: true,
    network: 'ws',
    'ws-opts': {
        path: '/',
        headers: {
            Host: 'us-east-1.292228.xyz'
        },
        'max-early-data': 2048,
        'early-data-header-name': 'Sec-WebSocket-Protoco'
    },
    'ws-path': '/',
    'ws-headers': {
        Host: 'us-east-1.292228.xyz'
    }
}
let test = {
    name: 'vmess',
    type: 'vmess',
    server: 'server',
    port: 443,
    uuid: 'cefcd89f-1e65-405e-b558-fdd4a737a3b4',
    alterId: 32,
    cipher: 'auto',
    udp: true,
    tls: true,
    fingerprint: 'xxxx',
    'client-fingerprint': 'chrome',
    'skip-cert-verify': true,
    servername: 'example.com',
    network: 'ws',
    'ws-opts':{
      path: '/path',
      headers:{
        Host: 'v2ray.com',
        },
      'max-early-data': 2048,
      'early-data-header-name': 'Sec-WebSocket-Protocol',
      'v2ray-http-upgrade': false,
      'v2ray-http-upgrade-fast-open': false,
    }
}
const tls = (c, data) => {
    if (c.tls) {
        data.tls={enabled: true}
        if (c.servername){
            data.tls['server_name'] = c.servername
        }else if(c.sni){
            data.tls['server_name'] = c.sni
        }
        if(c.fingerprint||c['client-fingerprint']){
            data.tls.utls={enbaled:true}
            if(c.fingerprint){
                data.tls.utls['fingerprint'] = c.fingerprint
            }else if(c['client-fingerprint']){
                data.tls.utls['fingerprint'] = c['client-fingerprint']
            }
        }
        data.tls.inscure = c['skip-cert-verify']
        data.tls.alpn = c.alpn
    }
}


const vmess = (c) => {
    var result = {
        tag: c.name,
        type: 'vmess',
        server: c.server,
        server_port: c.port,
        uuid: c.uuid,
        secruity: 'auto',
    }
    tls(c, result)
    if (c.alterId != 0) {
        result.alter_id = c.alterId
    }
    if (c.network == 'ws') {
        vmess_ws(c, result)
    }
    if (c.network == 'http') {
        vmess_http(c, result)
    }
    if (c.network == 'h2') {
        vmess_h2(c, result)
    }
    if (c.network == 'grpc') {
        vmess_grpc(c, result)
    }

    return JSON.stringify(result, null, 2)
}
//暂不支持httpupgrade
const vmess_ws = (c, data) => {
    let wsopts = c['ws-opts']
    data.transport = {
        type: 'ws',
        path: wsopts.path,
        headers: wsopts.headers
    }
    if (wsopts['max-early-data']) {
        data.transport['max_early_data'] = wsopts['max-early-data']
    }
    if (wsopts['early-data-header-name']) {
        data.transport['early_data_header_name'] = wsopts['early-data-header-name']
    }
}
const vmess_http = (c, data) => {
    data.transport = {
        type: 'http',
        headers: c['http-opts'].headers,
        method:c['http-opts'].method
    }
    if (c['http-opts'].path&&Array.isArray(c['http-opts'].path)){
        data.transport.path = c['http-opts'].path[0]
    }else{
        data.transport.path = c['http-opts'].path
    }
}

const vmess_h2 = (c, data) => {
    data.transport = {
        type: 'http',
        path: c['h2-opts'].path,
        headers: c['h2-opts'].headers
    }
}

const vmess_grpc = (c, data) => {
    data.transport = {
        type: 'grpc',
        'service_name': c['grpc-opts']['grpc-service-name']
    }
}

console.log(vmess(test)) //输出结果