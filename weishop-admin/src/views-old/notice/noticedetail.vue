<template>
  <div>
    <a-form>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="标题">
          {{info.title}}
      </a-form-item>
      <a-form-item :label-col="labelcol" :wrapper-col="wrappercol" label="内容">
          {{info.content}}
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
  export default {
    props: {
      id: {
        type: [String, Number],
        required: true
      }
    },
    data() {
      return {
          labelcol: {
          span: 5
        },
        wrappercol: {
          span: 19
        },
        info:{}
      }
    },
    mounted(){
        this.load()
    },
    methods:{
        async load(){
            if(!this.id){
                return;
            }
            var ret=await this.$http.Get('/api/services/app/B_Notice/Get',{id:this.id});
            if(ret.success){
                this.info=ret.result
            }
        }
    }
  }

</script>
