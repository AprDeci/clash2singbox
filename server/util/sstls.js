export default function sstls (c){
    var result = {
        type : 'shadowtls',
        tag : c.name,
        server : c.server,
        server_port : c.port,
        version : c['plugin-opts'].version,
        password : c['plugin-opts'].password
    }
    tls(c,result)
    return result
}

const tls = (c,result)=>{
    result.tls.server_name = c['plugin-opts'].host
    result.tls.enable = true
    if (c['client-fingerprint']){
        result.tls.utls.fingerprint=c['client-fingerprint']
        result.tls.utls.enable=true
    }
}