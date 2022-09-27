import Vue from 'vue';
import MiLoading from './MiLoading.vue';

export default {
        _count: 0,
        _instance: null,
        open(){
                this._count++;
                if(this._count === 1){
                        const MiLoadingConstructor = Vue.extend(MiLoading);
                        this._instance = new MiLoadingConstructor().$mount();
                        document.body.appendChild(this._instance.$el);
                }
        },
        close(){
                this._count--;
                if(this._count === 0){
                        this._instance.$destroy(true);
                        document.body.removeChild(this._instance.$el);
                        this._instance = null;
                }
        }
};

