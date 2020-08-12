/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  let place = document.getElementById('aqi-city-input').value.trim()
  let air = document.getElementById('aqi-value-input').value.trim()
  let reg = /^[\u4E00-\u9FA5|a-zA-Z]+$/
  if(!reg.test(place)){
    alert("城市要为中文或英文");
    return
  }
  if(!Number.isInteger(parseInt(air))){
    alert("空气质量要为整数");
    return
  }
  aqiData[place] = air
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  let table = document.getElementById('aqi-table')
  table.innerHTML = ''
  let head = document.createElement('tr')
  head.innerHTML = '<td>城市</td><td>空气质量</td><td>操作</td>'
  table.appendChild(head)
  for(let key in aqiData){
    let tr = document.createElement('tr')
    tr.innerHTML = `<td>${key}</td><td>${aqiData[key]}</td><td><button>删除</button></td>`
    table.appendChild(tr)
  }
  
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
  var tr = target.parentElement.parentElement;
  var strCity = tr.children[0].innerHTML;
  delete aqiData[strCity];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById('add-btn').addEventListener('click',function(){
    addBtnHandle()
  })

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.getElementById('aqi-table').addEventListener('click',function(e){
    if(e.srcElement && e.srcElement.nodeName === 'BUTTON'){
      delBtnHandle(e.target)
    }
  })
}
window.onload = function(){
  init();
}