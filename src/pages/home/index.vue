<template>
    <div class="home">
        <div class="demo-item">
            <router-link to="/init"> 运行babylonjs </router-link>
        </div>
        <div class="demo-item">
            <router-link to="/shape"> 常规几何体 </router-link>
        </div>
        <div class="demo-item">
            <router-link to="/line"> 参数化几何体 </router-link>
        </div>
        <div class="demo-item">
            <router-link to="/position"> 位置 </router-link>
        </div>
        <div class="demo-item">
            <router-link to="/demo"> 正方体 </router-link>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.home {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;

    .demo-item {
        flex: 0 0 auto;
        width: auto;
        height: 50px;
        padding: 0 20px;
        margin: 10px;
        text-align: center;
        line-height: 50px;
        border: 1px solid #ccc;
        border-radius: 10px;
    }
}
</style>
