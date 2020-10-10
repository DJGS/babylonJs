<template>
    <canvas id="canvas"></canvas>
</template>

<script>
import * as BABYLON from 'babylonjs';

export default {
    methods: {
        createScene(canvas, engine) {
            let scene = new BABYLON.Scene(engine);
            // 设置背景色
            scene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.5);

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

            let body = BABYLON.MeshBuilder.CreateCylinder(
                'body',
                {
                    height: 0.75,
                    diameterTop: 0.2,
                    diameterBottom: 0.5,
                    tessellation: 6,
                    subdivisions: 1,
                },
                scene
            );
            let arm = BABYLON.MeshBuilder.CreateBox(
                'arm',
                { height: 0.75, width: 0.3, depth: 0.1875 },
                scene
            );
            arm.position.x = 0.125;
            let pilot = BABYLON.Mesh.MergeMeshes([body, arm], true);
            let localOrigin = localAxes(2);
            localOrigin.parent = pilot;

            pilot.position = new BABYLON.Vector3(2, 3, 4);

            /*********************************Start World Axes********************/
            let showAxis = function(size) {
                let makeTextPlane = function(text, color, size) {
                    let dynamicTexture = new BABYLON.DynamicTexture(
                        'DynamicTexture',
                        50,
                        scene,
                        true
                    );
                    dynamicTexture.hasAlpha = true;
                    dynamicTexture.drawText(
                        text,
                        5,
                        40,
                        'bold 36px Arial',
                        color,
                        'transparent',
                        true
                    );
                    let plane = new BABYLON.Mesh.CreatePlane('TextPlane', size, scene, true);
                    plane.material = new BABYLON.StandardMaterial('TextPlaneMaterial', scene);
                    plane.material.backFaceCulling = false;
                    plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
                    plane.material.diffuseTexture = dynamicTexture;
                    return plane;
                };

                let axisX = BABYLON.Mesh.CreateLines(
                    'axisX',
                    [
                        new BABYLON.Vector3.Zero(),
                        new BABYLON.Vector3(size, 0, 0),
                        new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
                        new BABYLON.Vector3(size, 0, 0),
                        new BABYLON.Vector3(size * 0.95, -0.05 * size, 0),
                    ],
                    scene
                );
                axisX.color = new BABYLON.Color3(1, 0, 0);
                let xChar = makeTextPlane('X', 'red', size / 10);
                xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
                let axisY = BABYLON.Mesh.CreateLines(
                    'axisY',
                    [
                        new BABYLON.Vector3.Zero(),
                        new BABYLON.Vector3(0, size, 0),
                        new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
                        new BABYLON.Vector3(0, size, 0),
                        new BABYLON.Vector3(0.05 * size, size * 0.95, 0),
                    ],
                    scene
                );
                axisY.color = new BABYLON.Color3(0, 1, 0);
                let yChar = makeTextPlane('Y', 'green', size / 10);
                yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
                let axisZ = BABYLON.Mesh.CreateLines(
                    'axisZ',
                    [
                        new BABYLON.Vector3.Zero(),
                        new BABYLON.Vector3(0, 0, size),
                        new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
                        new BABYLON.Vector3(0, 0, size),
                        new BABYLON.Vector3(0, 0.05 * size, size * 0.95),
                    ],
                    scene
                );
                axisZ.color = new BABYLON.Color3(0, 0, 1);
                let zChar = makeTextPlane('Z', 'blue', size / 10);
                zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
            };
            /***************************End World Axes***************************/

            showAxis(8);

            /*******************************Local Axes****************************/
            function localAxes(size) {
                let pilot_local_axisX = BABYLON.Mesh.CreateLines(
                    'pilot_local_axisX',
                    [
                        new BABYLON.Vector3.Zero(),
                        new BABYLON.Vector3(size, 0, 0),
                        new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
                        new BABYLON.Vector3(size, 0, 0),
                        new BABYLON.Vector3(size * 0.95, -0.05 * size, 0),
                    ],
                    scene
                );
                pilot_local_axisX.color = new BABYLON.Color3(1, 0, 0);

                let pilot_local_axisY = BABYLON.Mesh.CreateLines(
                    'pilot_local_axisY',
                    [
                        new BABYLON.Vector3.Zero(),
                        new BABYLON.Vector3(0, size, 0),
                        new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
                        new BABYLON.Vector3(0, size, 0),
                        new BABYLON.Vector3(0.05 * size, size * 0.95, 0),
                    ],
                    scene
                );
                pilot_local_axisY.color = new BABYLON.Color3(0, 1, 0);

                let pilot_local_axisZ = BABYLON.Mesh.CreateLines(
                    'pilot_local_axisZ',
                    [
                        new BABYLON.Vector3.Zero(),
                        new BABYLON.Vector3(0, 0, size),
                        new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
                        new BABYLON.Vector3(0, 0, size),
                        new BABYLON.Vector3(0, 0.05 * size, size * 0.95),
                    ],
                    scene
                );
                pilot_local_axisZ.color = new BABYLON.Color3(0, 0, 1);

                let local_origin = BABYLON.MeshBuilder.CreateBox(
                    'local_origin',
                    { size: 1 },
                    scene
                );
                local_origin.isVisible = false;

                pilot_local_axisX.parent = local_origin;
                pilot_local_axisY.parent = local_origin;
                pilot_local_axisZ.parent = local_origin;

                return local_origin;
            }
            /*******************************End Local Axes****************************/

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
