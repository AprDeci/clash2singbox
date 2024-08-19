# clash&singbox-conveter
 通过clash订阅链接转换节点信息到singbox配置文件中

 作者考研更新比较慢,主要为了方便自己

[demo(后端端口需改为48909)](http://singbox.aprdec.top/)

## 配置文件编写方法
  程序只修改outbounds部分,**配置格式如下,多个关键词使用|分割**
  ```
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
        }
  ```

**支持特定关键词,方便不同订阅配置通用**

| 关键词 | 包含内容                       |
| ------ | ------------------------------ |
| HKKEY  | '香港','HK','Hong Kong','hk'   |
| TWKEY  | '台湾','TW','Taiwan','tw'      |
| JPKEY  | '日本','JP','Japan','jp'       |
| USKEY  | '美国','US','America','us'     |
| SGKEY  | '新加坡','SG','Singapore','sg' |

**高级模式**

每行输入一个链接和指定名称,将自动创建该名称urltest策略组包含该订阅所有节点.

防止多订阅节点重复,所有命名订阅添加后缀

## 支持协议

| 协议     | 是否支持                                |
| :------- | --------------------------------------- |
| SS(tls)  | :heavy_check_mark:                     |
| Vless    | :heavy_check_mark:                     |
| trojon   | :heavy_check_mark:                     |
| Hysteria | :x:(未来支持)                           |
| Vmess    | :heavy_check_mark:(暂不支持HTTPUpgrade) |

## 部署方式

docker,访问IP:4012

~~~docker
docker run -p 3000:3000 -p 4012:4012 --name clash2singbox -d aprdec/clash2singbox:latest
~~~
