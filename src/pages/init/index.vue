<template>
    <canvas id="canvas" />
</template>

<script>
// 引入Babylon
import * as BABYLON from 'babylonjs';

export default {
    methods: {
        createScene(canvas, engine) {
            // 创建场景
            let scene = new BABYLON.Scene(engine);

            // 初始化相机
            let camera = new BABYLON.ArcRotateCamera(
                'camera',
                Math.PI / 2,
                Math.PI / 2,
                2,
                BABYLON.Vector3.Zero(),
                scene
            );

            camera.attachControl(canvas, true);

            // 添加点光源
            new BABYLON.PointLight('light1', new BABYLON.Vector3(0, 1, -1), scene);
            // 添加半球光
            new BABYLON.HemisphericLight('light2', new BABYLON.Vector3(1, 1, 0), scene);

            // 添加球体
            BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene);

            return scene;
        },
        init() {
            let canvas = document.getElementById('canvas');
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
