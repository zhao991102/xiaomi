<template>
        <div>
                这是米圈
                <!--使用-->

                <MiTabBar></MiTabBar>
        </div>
</template>

<script>

//导入
import MiTabBar from '../components/MiTabBar/MiTabBar.vue';

export default {
        name: "Discover",
        //注册
        components: {
                MiTabBar: MiTabBar
        },
};
</script>

<style scoped>
</style>