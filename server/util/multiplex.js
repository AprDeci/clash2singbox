export function multiplex(c,s){
    s.multiplex.enabled = true;
    s.multiplex.protocol = c.smux.protocol;
    s.multiplex.max_connections = c.smux['max-connections'];
    s.multiplex.min_streams = c.smux['min-streams'];
    s.multiplex.max_streams = c.smux['max-streams'];
    if(c.smux.padding){
        s.multiplex.padding = c.smux.padding;
    }
    if(c.smux['brutal-opts'].enabled){
        s.multiplex.brutal.enabled = true;
        s.multiplex.brutal.up_mbps = c.smux['brutal-opts'].up;
        s.multiplex.brutal.down_mbps = c.smux['brutal-opts'].down;
    }
        
}

