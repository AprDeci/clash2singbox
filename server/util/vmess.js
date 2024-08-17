
const tls = (c, data) => {
    if (c.tls||c.type==='trojan') {
        data.tls={enabled: true}
        if (c.servername){
            data.tls['server_name'] = c.servername
        }else if(c.sni){
            data.tls['server_name'] = c.sni
        }
        if(c.fingerprint||c['client-fingerprint']){
            data.tls.utls={enabled:true}
            if(c.fingerprint){
                data.tls.utls['fingerprint'] = c.fingerprint
            }else if(c['client-fingerprint']){
                data.tls.utls['fingerprint'] = c['client-fingerprint']
            }z
        }
        if (c['skip-cert-verify']){
            data.tls.insecure = c['skip-cert-verify']
        }else{
            data.tls.insecure = false
        }
        if (c['reality-opts']) {
            data.tls.reality={}
            data.tls.reality.enabled = true
            data.tls.reality.public_key = c['reality-opts']['public-key']
            data.tls.reality.short_id = c['reality-opts']['short-id']
        }
        if (c.alpn){
            data.tls.alpn = c.alpn
        }
        
    }
}


export const vmess = (c) => {
    var result = {
        tag: c.name,
        type: 'vmess',
        server: c.server,
        server_port: c.port,
        uuid: c.uuid,
        security: 'auto',
    }
    tls(c, result)
    if (c.alterId != 0) {
        result.alter_id = c.alterId
    }
    transport(c, result)

    return result
}

export const vless = (c) => {
    var result ={
        tag: c.name,
        type: 'vless',
        server: c.server,
        server_port: c.port,
        uuid: c.uuid,
    }
    if (c.flow) {
        result.flow = c.flow
    }
    tls(c,result)
    transport(c, result)
    return result
}

export const trojan = (c) => {
    var result = {
        tag: c.name,
        type: 'trojan',
        server: c.server,
        port: c.port,
        password: c.password,
    }
    tls(c, result)
    if (c.network =='ws'){
        vmess_ws(c, result)
    }
    if (c.network == 'grpc'){
        vmess_grpc(c, result)
    }
    return result
}

const transport = (c, result) => { 
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

