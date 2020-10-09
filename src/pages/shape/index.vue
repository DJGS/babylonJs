<template>
    <canvas id="canvas"></canvas>
</template>

<script>
import * as BABYLON from 'babylonjs';

export default {
    methods: {
        createScene(canvas, engine) {
            let scene = new BABYLON.Scene(engine);

            new BABYLON.ArcRotateCamera(
                'camera',
                Math.PI / 2,
                Math.PI / 2,
                2,
                new BABYLON.Vector3(0, 1, 1),
                scene
            );

            new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
            new BABYLON.PointLight('light2', new BABYLON.Vector3(0, 1, -1), scene);

            // 创建立方体
            // let color1 = new BABYLON.Color3(0.5, 0.5, 0.5);
            // BABYLON.MeshBuilder.CreateBox(
            //     'box',
            //     {
            //         // 立方体大小
            //         size: 0.5,
            //         // 可单独设置
            //         // width: 0.5,
            //         // height: 0.5,
            //         // depth: 0.5,
            //         faceColors: [color1, color1, color1, color1, color1, color1],
            //         sideOrientation: 2,
            //     },
            //     scene
            // );

            // 创建球体
            // BABYLON.MeshBuilder.CreateSphere(
            //     'sphere',
            //     {
            //         // 直径
            //         diameter: 0.5,
            //         // diameterX: 0.5,
            //         // diameterY: 0.5,
            //         // diameterZ: 0.5,
            //         // 纬度切割 0-1
            //         arc: 0.6,
            //         // 经度切割
            //         slice: 0.4,
            //     },
            //     scene
            // );

            // 平面
            BABYLON.MeshBuilder.CreatePlane(
                'plane',
                { height: 2, width: 1, sideOrientation: 2 },
                scene
            );

            // 地表
            // BABYLON.MeshBuilder.CreateGround(
            //     'myGround',
            //     { width: 5, height: 10, subdivisions: 4 },
            //     scene
            // );

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
