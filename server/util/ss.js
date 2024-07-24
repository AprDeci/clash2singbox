
import YAML from 'yaml'
export default function ss(c){
    var result = {
        tag : c.name,
        type : 'shadowsocks',
        server : c.server,
        server_port : c.port,
        method : c.cipher,
        password : c.password,
    }
    if (c['udp-over-tcp']){
        result.udp_over_tcp.enabled = true,
        result.udp_over_tcp.version = c['udp-over-tcp-version']
    }
    if (c.plugin=='obfs'||c.plugin=='v2ray-plugin'){
        if(c.plugin=='v2ray-plugin'){
            result.plugin = 'v2ray-plugin'
            v2ray_plugin(c,result)
        }else{
            result.plugin = 'obfs-local'
            obfs_local(c,result)
        }
    }
    if (!c.udp_over_tcp&&c.smux){
        smux(c,result)
    }
    return result
}

function v2ray_plugin (c,result){
    if (c['plugin-opts'].mode){
        result.plugin_opts.mode = c['plugin-opts'].mode
    }
    if (c['plugin-opts'].host){
        result.plugin_opts.host = c['plugin-opts'].host
    }
    if (c['plugin-opts'].path){
        result.plugin_opts.path = c['plugin-opts'].path
    }
    if (c['plugin-opts'].tls){
        result.plugin_opts.tls = c['plugin-opts'].tls
    }
    if (c['plugin-opts'].mux){
        result.plugin_opts.mux = c['plugin-opts'].mux
    }
}

function obfs_local (c,result){
    if(c['plugin-opts'].mode)
        result.plugin_opts.mode = c['plugin-opts'].mode
    if(c['plugin-opts'].host)
        result.plugin_opts.host = c['plugin-opts'].host
}
function smux (c,result){
    result.multiplex.enabled = c.smux.enabled
    result.multiplex.protocol = c.smux.protocol
    if(c.smux['max-connections']){
        result.multiplex.max_connections = c.smux[max-connections]
    }
    if(c.smux['min-streams']){
        result.multiplex.min_streams = c.smux['min-streams']
    }
    if(c.smux['max-streams']){
        result.multiplex.max_streams = c.smux['max-streams']
    }
    if(c.smux.padding){
        result.multiplex.padding = c.smux.padding
    }

}
