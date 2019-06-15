<template>
  <div :class="['detail-list', size === 'small' ? 'small' : 'large']">
    <div v-if="title" class="title">{{title}}</div>
    <div :class="layout" :style="{gridTemplateColumns:gridtemplatecolumns}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  // import ACol from 'ant-design-vue/es/grid/Col'
  const Item = {
    name: 'DetailListItem',
    //template:`<div><div class="term">{{term}}</div><div class="content" >{{$slots.default.text}}</div></div>`,
    props: {
      term: {
        type: String,
        required: false
      },
      span: {
        type: Number,
        required: false
      }
    },
    // inject: {
    //   col: {
    //     type: Number
    //   }
    // },
    computed:{
      gridcolumn(){
        if(this.span){
          return `span ${this.span}`
        }
        return '';
      }
    },
    methods: {
      renderTerm(h, term) {
        return term ? h(
          'div', {
            attrs: {
              class: 'term'
            }
          },
          [term]
        ) : null
      },
      renderContent(h, content) {
        return h(
          'div', {
            attrs: {
              class: 'content'
            }
          },
          [content]
        )
      }
    },
    render(h) {
      const term = this.renderTerm(h, this.$props.term)
      const content = this.renderContent(h, this.$slots.default)
      return h(
        'div', {
          attrs: {
              style: `grid-column:${this.gridcolumn}`
          }
        },
        [term, content]
      )
    }
  }

  // const responsive = {
  //   1: { xs: 24 },
  //   2: { xs: 24, sm: 12 },
  //   3: { xs: 24, sm: 12, md: 12 },
  //   4: { xs: 24, sm: 12, md: 12 }
  // }

  export default {
    name: 'DetailList',
    Item: Item,
    props: {
      title: {
        type: String,
        required: false
      },
      col: {
        type: Number,
        required: false,
        default: 3
      },
      size: {
        type: String,
        required: false,
        default: 'large'
      },
      layout: {
        type: String,
        required: false,
        default: 'horizontal'
      }
    },
    computed: {
      gridtemplatecolumns() {
        return `repeat(${this.col},1fr)`
      }
    }

  }

</script>

<style lang="less">
  .detail-list {
    .title {
      font-size: 16px;
      color: rgba(0, 0, 0, .85);
      font-weight: bolder;
      margin-bottom: 16px;
    }

    .term {
      // Line-height is 22px IE dom height will calculate error
      line-height: 20px;
      padding-bottom: 16px;
      margin-right: 8px;
      color: rgba(0, 0, 0, .85);
      white-space: nowrap;
      display: table-cell;

      &:after {
        content: ':';
        margin: 0 8px 0 2px;
        position: relative;
        top: -0.5px;
      }
    }

    .content {
      line-height: 22px;
      width: 100%;
      padding-bottom: 16px;
      color: rgba(0, 0, 0, .65);
      display: table-cell;
    }

    &.small {
      .title {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        font-weight: normal;
        margin-bottom: 12px;
      }

      .term,
      .content {
        padding-bottom: 8px;
      }
    }

    &.large {

      .term,
      .content {
        padding-bottom: 16px;
      }
    }

    .grid {
      display: grid;
      //grid-template-columns: repeat(2,1fr);
    }

    &.vertical {
      .term {
        padding-bottom: 8px;
      }

      .term,
      .content {
        display: block;
      }
    }

  }

</style>
