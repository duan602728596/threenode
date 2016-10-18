/*** 场景（scene） ***/
var scene = new THREE.Scene(); // 创建场景
scene.add(x);                  // 插入场景

/*** 相机（camera） ***/
// 正交投影相机
var camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
// 透视头像相机
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far); // fov：人眼夹角，aspect：长宽比

/*** 渲染器（renderer） ***/
var renderer = new THREE.WebGLRenderer(options);
// options {} 可选。参数：
// canvas：element <canvas></canvas>
renderer.setSize(长, 宽);
element.appendChild(renderer.domElement); // 插入节点
renderer.setClearColor(color, opacity);   // 设置清除后的颜色 16进制
renderer.clear();                         // 清除面板
renderer.render(scene, camera);           // 渲染

/*** 光照(light) ***/
new THREE.AmbientLight(颜色);                          // 环境光
new THREE.PointLight(颜色, 强度, 距离);                // 点光源
new THREE.DirectionalLight(颜色, 亮度);                // 平行光
new THREE.SpotLight(颜色, 强度, 距离, 夹角, 衰减指数); // 聚光灯

/*** 几何形状 ***/
new THREE.CubeGeometry(长, 宽, 高, 长的分割, 宽的分割, 高的分割);                           // 立方体
new THREE.PlanGeometry(长,宽, 长的分割, 宽的分割);                                          // 平面
new THREE.SphereGeometry(半径, 经度切片, 纬度切片, 经度开始, 经度跨过, 纬度开始, 纬度跨过); // 球体
new THREE.CircleGeometry(半径, 切片数, 开始, 跨过角度);                                     // 圆形
new THREE.CylinderGeometry(顶部面积, 底部面积, 高, 圆分割, 高分割, 是否没有顶面和底面);     // 圆台
new THREE.TetrahedronGeometry(半径, 细节);  // 正四边形
new THREE.OctahedronGeometry(半径, 细节);   // 正八边形
new THREE.IconsahedronGeometry(半径, 细节); // 正十二边形
new THREE.TorusGeometry(半径, 管道半径, 纬度分割, 经度分割, 圆环面的弧度); // 圆环面
// 自定义形状
var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vectory3(x, y, z)); // 点，其中x、y、z为坐标
geometry.faces.push(new THREE.Faces3(x, y, z));      // 面，其中x、y、z为点的数组的索引，三点确定一个面

/*** 材质 ***/
new THREE.MeshBasicMaterial(options); // 基本材质
// options {} 可选。参数：
//   visible：是否可见
//     color：颜色
// wireframe: 是否渲染线而非面
//      side：THREE.FrontSide 正面，THREE.BackSide 反面，THREE.DoubleSide 双面
//       map: 贴图
new THREE.MeshLambertMaterial(options); // Lambert材质，适合光照
//  ambient：反射能力
// emissive：自发光颜色
new THREE.MeshPhongMaterial();  // Phong材质，适合金属和镜面
//  specular：光罩颜色
// shininess：光斑大小（值越大，光斑越小）
new THREE.MeshNormalMaterial(); // 方向材质
/* 贴图 */
var texture = THREE.ImageUtils.loadTexture(url, {}, function(){}); // 载入单个贴图（建议贴图的长宽为256的倍数）
new THREE.MeshFaceMaterial() // 设置不同面的贴图，参数为单个贴图的数组
texture.wrapS texture.wrapT = THREE.RepeatWrapping // 贴图的重复方式
texture.repeat.set(x, y)     // 重复次数
new THREE.texture(canvas)    // 将canvas作为贴图

/*** 将模型和贴图结合 ***/
var mesh = new THREE.Mesh(形状, 材质);
mesh.position // 位置 mesh.position.x（y、z） 或 mesh.position.set(x, y, z)
mesh.scale    // 缩放
mesh.rotation // 旋转

/*** 监视FPS ***/
var stats = new Stats();
stats.domElement // 节点
stats.begin()    // 开始
stats.end()      // 结束

/*** 控制照像机 ***/
var obitControls = new THREE.OrbitControls(Camera); // 将照相机添加到控制器
obitControls.update();

/*** 获取点击的对象 ***/
var raycaster = new THREE.Raycaster(),
    mouse = new THREE.Vector2();
// function事件内设置鼠标的坐标
mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
// 获取对象
raycaster.setFromCamera(mouse, camera);
var intersects = raycaster.intersectObjects(Scene.children);
intersects[0].object // 你点击的物体

/*** TWEEN.js让物体运动 ***/
var t = new TWEEN.Tween(intersects[0].object.position).to({x: 3000, y: 3000, z: 3000}, 1000).easing(TWEEN.Easing.Linear.None).start();
TWEEN.update(); // 在运动主函数内执行

/*** 载入外部模型 ***/
var loader = new THREE.STLLoader(); // *.stl格式的模型
loader.load("/modules/DL_MCAirship.stl", (modules)=>{/* 载入成功后的事件 */}); // modules：载入成功的模型

/*** 陀螺仪 ***/
var Devices = new THREE.DeviceOrientationControls(Camera); // 初始化陀螺仪
Devices.connect();                                         // 初始化绑定陀螺仪
Devices.update();

/*** 3dDOM ***/
var ele = THREE.CSS3DObject(element); // 3d的dom
var renderer = THREE.CSS3DRenderer(); // 使用的渲染器

/*** ASCII字符画 ***/
var Renderer = new THREE.CanvasRenderer();    // 使用的渲染器
var Effect = new THREE.AsciiEffect(Renderer); // Effect
// 使用文件：
// Projector.js
// CanvasRenderer.js
// AsciiEffect.js

