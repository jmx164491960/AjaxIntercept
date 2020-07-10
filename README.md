# AjaxIntercept

### ajaxIntercept.min.js:
https://github.com/jmx164491960/AjaxIntercept/blob/master/dist/ajaxIntercept-min.js

### ajaxIntercept.js:
https://github.com/jmx164491960/AjaxIntercept/blob/master/dist/ajaxIntercept.js

接口拦截器,可自定义拦截逻辑和返回数据。实现思路参考[https://github.com/nuysoft/Mock](https://github.com/nuysoft/Mock)
相比Mock.js，精简了mock数据模板算法，压缩后仅7KB。增加了对Promise的支持，用法：

```
AjaxIntercept.add('getData1+getData2', () => {
    return Promise.all([
        () => {
            return axios({
                url: '/getData1'
            })
        },
        () => {
            return axios({
                url: '/getData2'
            })
        }
    ]).then(([res1, res2]) => {
        // 数据处理
        const result = formate(res1, res2);
        return result;
    })
});

axios({
    url: 'getData1+getData2'
})
```

### 使用场景

1.很多jquery生态里的UI组件库，都把渲染功能和数据获取功能耦合，一个组件对应一个接口。当获取数据的接口不止一个的时候就不够灵活：
```
// 当请求完/demo/table/user/之后，还需要请求别的接口组装数据，这时候插件不支持。可以使用接口拦截器，把多个接口复合成一个接口

table.render({
    elem: '#demo'
    ,height: 312
    // 数据接口
    ,url: '/demo/table/user/', 
    ,page: true //开启分页
    ,cols: [[ //表头
      {field: 'id', title: 'ID', width:80, sort: true, fixed: 'left'}
      ,{field: 'username', title: '用户名', width:80}
      ,{field: 'sex', title: '性别', width:80, sort: true}
      ,{field: 'city', title: '城市', width:80} 
      ,{field: 'sign', title: '签名', width: 177}
      ,{field: 'experience', title: '积分', width: 80, sort: true}
      ,{field: 'score', title: '评分', width: 80, sort: true}
      ,{field: 'classify', title: '职业', width: 80}
      ,{field: 'wealth', title: '财富', width: 135, sort: true}
    ]]
});
``