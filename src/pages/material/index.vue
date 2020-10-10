<template>
    <canvas id="canvas"></canvas>
</template>

<script>
import * as BABYLON from 'babylonjs';

export default {
    methods: {
        createScene(canvas, engine) {
            let scene = new BABYLON.Scene(engine);

            // 环境光
            scene.ambientColor = new BABYLON.Color3(1, 1, 1);

            // camera
            let camera = new BABYLON.ArcRotateCamera(
                'camera1',
                0,
                0,
                0,
                new BABYLON.Vector3(2, 3, 4),
                scene
            );
            camera.setPosition(new BABYLON.Vector3(10, 3, -10));
            camera.attachControl(canvas, true);

            // 灯光
            let light = new BABYLON.HemisphericLight(
                'light1',
                new BABYLON.Vector3(1, 0.5, 0),
                scene
            );
            light.intensity = 0.8;

            let material = new BABYLON.StandardMaterial('material', scene);
            // 漫反射颜色
            // material.diffuseColor = new BABYLON.Color3(1, 0, 1);
            // 镜面反射
            // material.specularColor = new BABYLON.Color3(0.5, 0.05, 0.87);
            // // 自发光颜色
            // material.emissiveColor = new BABYLON.Color3(1, 1, 1);
            // 环境光颜色
            material.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
            material.alpha = 0.5;

            let box = new BABYLON.MeshBuilder.CreateBox('box', { size: 1 }, scene);
            box.material = material;

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

<style></style>
