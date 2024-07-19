# clash&singbox-conveter
 通过clash订阅链接转换节点信息到singbox配置文件中

 作者考研更新比较慢,主要为了方便自己

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
                "include:HKG|TWN",
                "exclude:0.1X"
            ],
            "default": "自动选择"
        }
  ```

## 支持协议

| 协议     | 是否支持                                |
| :------- | --------------------------------------- |
| SS(tls)  | :heavy_check_mark:                     |
| Vless    | :heavy_check_mark:                     |
| trojon   | :x:(未来支持)                           |
| Hysteria | :x:(未来支持)                           |
| Vmess    | :heavy_check_mark:(暂不支持HTTPUpgrade) |

