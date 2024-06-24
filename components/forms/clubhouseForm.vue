<template>
  <div class="my-form-style">
    <FormKit
      v-model="state"
      type="form"
      :config="{ validationVisibility: 'live' }"
      submit-label="Submit"
      @submit="submitForm(state)"
    >
      <FormKit
        label="Title"
        name="clubhouse_title"
        type="text"
        validation="required"
      />
      <FormKit
        label="Description"
        name="clubhouse_description"
        type="textarea"
        validation="required"
      />
      <FormKit
        type="select"
        label="Category?"
        name="clubhouse_category"
        placeholder="Select a category"
        :options="['ball', 'jersey', 'plaque', 'photo', 'trophy']"
        validation="required"
      />

      <FormKit
        label="Owner"
        name="clubhouse_owner"
        type="text"
      />
      <FormKit
        type="text"
        label="Year"
        name="clubhouse_date"
        validation="required|number|between:1965,2050"
        validation-visibility="live"
      />
      <div class="my-fileupload-wrapper-style">
        <p>Clubhouse Image file {{ state.clubhouse_filepath }}</p>
        <Image
          :src="state.clubhouse_filepath"
          alt="Image"
          width="160"
        />

        <FileUpload
          class="mb-4 my-text-style"
          mode="basic"
          name="fileInput"
          :auto="true"
          accept="image/*"
          customUpload
          @uploader="submitFileUpload"
        />
        <p
          v-if="error"
          class="alert-danger w-full"
        >
          Error: Must submit image file
        </p>
      </div>
      <display-cancelform :destination="'/admin/clubhouse'" />
    </FormKit>

    <p v-if="saving">
      <ProgressBar
        mode="indeterminate"
        style="height: 6px"
      ></ProgressBar>
      Saving ...
    </p>
  </div>

  <!-- Modal -->
  <Dialog
    v-model:visible="displayModal"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
  >
    <template #header>
      <div class="my-dialog-header">
        <h3>Processing file</h3>
      </div></template
    >
    <ProgressBar
      mode="indeterminate"
      style="height: 6px"
    ></ProgressBar>
  </Dialog>
</template>

<script setup>
  import { useAuthStore } from '~/stores/authStore'
  const auth = useAuthStore()
  const saving = ref(false)
  const error = ref(false)

  //
  // Outgoing
  //
  const emit = defineEmits(['submitted'])
  //
  // Incoming
  //
  const props = defineProps({
    id: { type: String, default: '0' },
  })
  // const fileInput = ref(null)

  //
  // Initialize Add form
  //
  const state = ref({})
  //
  // edit if there is an id - add if not
  //
  if (props.id !== '0') {
    //
    // Initialize Edit form
    //
    const { data: clubhouse_data } = await useFetch(`/clubhouse/${props.id}`, {
      method: 'get',
      headers: {
        authorization: auth.user.token,
      },
    })
    state.value = clubhouse_data.value
  }

  //
  // progress modal
  //
  const displayModal = ref(false)
  const openProgressModal = () => {
    displayModal.value = true
  }
  const closeProgressModal = () => {
    displayModal.value = false
  }

  const submitFileUpload = async (event) => {
    state.value.clubhouse_filepath = null
    const file = event.files[0]

    const formData = new FormData()
    formData.append('file', file)
    openProgressModal()

    // Find server code in folder Nuxt3-brc-media-api
    const CONFIG = useRuntimeConfig()
    const url = `${CONFIG.public.MEDIA_URL}clubhouse`

    const res = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        authorization: auth.user.token,
      },
    })

    const data = await res.json()
    closeProgressModal()
    state.value.clubhouse_filepath = data.imageUrl
  }
  //
  // form handlers
  //
  const submitForm = (state) => {
    if (state.clubhouse_filepath) {
      saving.value = true
      error.value = false
      emit('submitted', state)
    } else {
      error.value = true
    }
  }
</script>
