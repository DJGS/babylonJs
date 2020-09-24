<template>
    <canvas id="demo"></canvas>
</template>

<script>
import * as BABYLON from 'babylonjs';
import img from '@images/default-avator.jpg';

export default {
    methods: {
        createScene(canvas, engine) {
            // 创建场景
            let scene = new BABYLON.Scene(engine);

            // 通用型相机
            // let camera = new BABYLON.UniversalCamera(
            //     'camera',
            //     new BABYLON.Vector3(0, 0, -2),
            //     scene
            // );
            // camera.setTarget(BABYLON.Vector3.Zero());

            // 弧型旋转相机
            let camera = new BABYLON.ArcRotateCamera(
                'camera',
                0,
                0,
                3,
                new BABYLON.Vector3(0, 0, 0),
                scene
            );

            // 跟随相机
            // let camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 0, 1), scene);

            // camera.radius = 30;

            // // 相机朝目标上方的偏移
            // camera.heightOffset = 10;

            // // 相机与目标在水平面的角度偏移，默认相机和目标在同一水平面
            // camera.rotationOffset = 0;

            // camera.cameraAcceleration = 0.005;

            // // 相机达到的最大速度
            // camera.maxCameraSpeed = 10;

            // camera.lockedTarget = box;

            // 鼠标控制
            // camera.attachControl(canvas, true, false);
            // scene.activeCamera.useCtrlForPanning = 0;

            // new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 0, 0), scene);
            // scene.ambientColor = new BABYLON.Color3(0, 0, 0);
            let light = new BABYLON.PointLight('light', new BABYLON.Vector3(0, 0, 0), scene);

            let light1 = new BABYLON.DirectionalLight(
                'DirectionalLight',
                new BABYLON.Vector3(0, -1, 0),
                scene
            );

            // 球体
            // new BABYLON.MeshBuilder.CreateSphere(
            //     'sphere',
            //     { diameterX: 0.5, diameterY: 1, diameterZ: 2, arc: 0.7 },
            //     scene
            // );

            // 平面
            // new BABYLON.MeshBuilder.CreatePlane(
            //     'plane',
            //     { width: 1, height: 2, frontUVs: BABYLON.Vector4(0, 0, 0, 1) },
            //     scene
            // );

            // 地面
            // new BABYLON.MeshBuilder.CreateGround(
            //     'ground',
            //     { width: 6, height: 4, subdivisions: 4 },
            //     scene
            // );

            // var sourcePlane = new BABYLON.Plane(0, -1, 1, 0);
            // sourcePlane.normalize();

            // 立方体;
            let box = new BABYLON.MeshBuilder.CreateBox('box', { size: 0.5 }, scene);

            let material = new BABYLON.StandardMaterial('material', scene);

            // material.diffuseColor = new BABYLON.Color3(0, 0, 1); //漫反射颜色
            // material.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87); //镜面颜色
            // material.emissiveColor = new BABYLON.Color3(0, 0, 1); //自发光颜色
            // material.ambientColor = new BABYLON.Color3(0, 1, 1); //环境光颜色

            // 材质贴图
            material.emissiveTexture = new BABYLON.Texture(img, scene);
            material.alpha = 1;

            box.material = material;
            box.wireframe = true;

            new BABYLON.Animation.CreateAndStartAnimation(
                'boxscale',
                box,
                'scaling.x',
                30,
                120,
                1.0,
                1.5
            );

            // let animationBox = new BABYLON.Animation(
            //     'myAnimation',
            //     'scaling.x',
            //     30,
            //     BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            //     BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
            // );

            // let animationBox1 = new BABYLON.Animation(
            //     'myAnimation1',
            //     'scaling.y',
            //     30,
            //     BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            //     BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
            // );

            // let keys = [];

            // keys.push({
            //     frame: 0,
            //     value: 1,
            // });

            // keys.push({
            //     frame: 20,
            //     value: 0.2,
            // });

            // keys.push({
            //     frame: 100,
            //     value: 1,
            // });

            // animationBox.setKeys(keys);

            // box.animations = [];
            // box.animations.push(animationBox);
            // // box.animations.push(animationBox1);

            // let ani = scene.beginAnimation(box, 100, 0, true);

            // 位置
            // box.position = new BABYLON.Vector3(0.2, 0.2, 0);

            // 旋转 逆时针
            // box.rotation.y = Math.PI / 3;
            // box.rotation.x = Math.PI / 2;
            // box.rotation.z = Math.PI / 6;

            // 链式调用
            box.addRotation(Math.PI / 3, 0, 0)
                .addRotation(0, Math.PI / 3, 0)
                .addRotation(0, 0, Math.PI / 3);

            // 缩放
            // box.scaling = new BABYLON.Vector3(1, 1, 1);

            // let points = [];
            // let point1 = new BABYLON.Vector3(0, 0, 0);
            // let point2 = new BABYLON.Vector3(1, 1, 0);
            // let point3 = new BABYLON.Vector3(0, 0, 0);
            // let point4 = new BABYLON.Vector3(-1, 1, 0);
            // points.push(point1);
            // points.push(point2);
            // points.push(point3);
            // points.push(point4);

            // new BABYLON.MeshBuilder.CreateLines('line', { points: points }, scene);

            return scene;
        },
        init() {
            let canvas = document.getElementById('demo');
            let engine = new BABYLON.Engine(canvas, true);

            let scene = this.createScene(canvas, engine);
            engine.runRenderLoop(() => {
                scene.render();
            });
        },
    },

    mounted() {
        this.init();
    },
};
</script>

<style lang="scss">
canvas {
    width: 100%;
    height: 100%;
}
</style>
