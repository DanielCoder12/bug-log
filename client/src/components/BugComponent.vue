<template>
  
<router-link class="text-dark" :to="{name:'BugDetails', params:{bugId: bug.id}}">

    
    <div :class="{'bg-yellow': bug.priority ==5, }" class="d-flex px-4 align-items-center justify-content-between">
            
    <div class="width">
        <p class="mb-0">
        {{ bug.title }}
    </p>
</div>  

<div class="width">
    <p class="mb-0 ps-5">
{{ bug.priority }}
    </p>
</div>

<div class="width">
    <p class="mb-0 text-end">
        {{ bug.creator.email }}
    </p>
</div>

<div class="width">
    <p class="mb-0 text-end">
        <!-- FIXME FIX DATE/ -->
        {{ bug.updatedAt.toLocaleDateString('en-us') }}
    </p>
</div>

<div class="d-flex align-items-center justify-content-end width p-3" v-if="bug.closed">
<p class="text-end mb-0 pe-3">
Closed
</p>
<div class="circle-red rounded-circle border border-dark">

</div>
</div>
<div class="d-flex align-items-center justify-content-end width p-3" v-else>
<p class="text-end pe-3 mb-0">
Open
</p>
<div  class="circle-green rounded-circle border border-dark">

</div>
</div>
</div>

</router-link>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import {Bug} from '../models/Bug'
export default {
    props:{
        bug:{type: Bug, required: true}
    },
    setup(){
    return {  }
}
};
</script>


<style lang="scss" scoped>
.width{
    width: 20%;
}
.bg-yellow{
    background-color: #ffe55c;
}
.circle-green{
    height: 3rem;
    aspect-ratio: 1/1;
    background-color: green;
}

.circle-red{
    height: 3rem;
    aspect-ratio: 1/1;
    background-color: red;
}

</style>