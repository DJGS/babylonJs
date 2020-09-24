<template>
    <canvas id="demo"></canvas>
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
                BABYLON.Vector3.Zero(),
                scene
            );

            new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);

            new BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 0.5 }, scene);

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
