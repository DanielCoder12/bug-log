<template>
  <div class="container-fluid">
    <section class="row d-flex justify-content-center">
      <div class="col-11 px-4 pt-4 pb-2 d-flex justify-content-between align-items-end">
<div >
<p class="mb-0 fs-4 fw-bold">Bugs</p>
</div>
<div>
<button class="button-color shadow mb-2 mt-2 px-4 py-2">Report Bug</button>
</div>
      </div>
    </section>
    <section class="row d-flex justify-content-center">
<div class="col-11    bg-blue border border-dark pb-5">
  <div class="d-flex justify-content-between px-3 pt-3 pb-5 fw-bold">
    
    <div>  
      <p class="mb-0">Title</p>
    </div>
    <div class="d-flex">
      <div>
        <button class="rounded-circle pe-2" title="Sort"><i class="mdi mdi-penguin"></i></button> 
      </div >
      <p class="mb-0 ps-2">Priority</p> </div>
      <div>  
        <p class="mb-0">Reported By</p>
      </div>
      <div> 
        <p class="mb-0">Last Updated</p> </div>
        <div class="form-check form-switch">  
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
        </div>
      </div>
    </div>
    </section>
    <section class="row d-flex justify-content-center move-up">
      <div class="col-11 ">
        <div class="border border-dark shadow ">
          <div :class="{'bg-white':index%2==0, 'bg-dark-gray':index%2==1}"  v-for="(bug,index) in bugs" :key="bug.id" >
            <BugComponent :bug="bug" />
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import BugComponent from '../components/BugComponent.vue';
import Pop from '../utils/Pop';
import {bugsService} from '../services/BugsService'
import { AppState } from '../AppState';

export default {
    setup() {
      onMounted(()=>{
        getAllBugs()
      })
      async function getAllBugs(){
        try {
          await bugsService.getAllBugs()
        } catch (error) {
          Pop.error(error)
        }
      }
        return {
bugs: computed(()=> AppState.bugs)

        };
    },
    components: { BugComponent }
}
</script>

<style scoped lang="scss">
.button-color{
  background-color: #FFE55C;
}

.move-up{
  position: relative;
  top: -5rem;
}
.bg-dark-gray{
  background-color: #e9e7e7;
}
.bg-blue{
  background-color: #60B8EA;
}
</style>
