<template>
        <MiModalDialog>
                <img slot="title" :src="avatar" alt="" class="avatar">
                <p v-text="message" class="message"></p>
                <button slot="foot" @click="ok">确定</button>
        </MiModalDialog>
</template>

<script>
import avatar from './msg.png';
import MiModalDialog from '../MiModalDialog/MiModalDialog.vue';

export default {
        name: 'MiAlert',
        components: {
                MiModalDialog,
        },
        data(){
                return {
                        message: "",
                        avatar
                }

        },
        methods: {
                ok(){
                        this.$destroy(true);
                        document.body.removeChild(this.$el)
                }
        }
}
</script>

<style lang="stylus" scoped>


</style>