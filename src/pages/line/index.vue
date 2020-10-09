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
                new BABYLON.Vector3(0, 0, 0),
                scene
            );

            new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
            new BABYLON.PointLight('light2', new BABYLON.Vector3(0, 1, -1), scene);

            let mypoints = [
                new BABYLON.Vector3(0, 0, 0),
                new BABYLON.Vector3(1, 0, 0),
                new BABYLON.Vector3(0, 1, 0),
                new BABYLON.Vector3(0, 0, 0),
            ];

            let colors = [
                new BABYLON.Color4(0, 0, 0, 1),
                new BABYLON.Color4(1, 1, 1, 1),
                new BABYLON.Color4(0.5, 0.5, 0.5, 1),
                new BABYLON.Color4(0.8, 0.8, 0.8, 1),
            ];

            BABYLON.MeshBuilder.CreateLines('line', { points: mypoints, colors: colors }, scene);

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
